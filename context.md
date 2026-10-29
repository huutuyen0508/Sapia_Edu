# Sapia AI — EduGap: Kiến trúc dự án

> File context cho AI agent / developer mới. Cập nhật: 2026-10-29.
> Project gốc là đồ án cuối khóa (chạy trên Windows `F:\do_an_cuoi_khoa`), hiện đang dev trên macOS.

## 1. Tổng quan

Nền tảng học tập AI thích ứng (**adaptive learning**) cho cohort **AI20K**, hiện ở giai đoạn **prototype** — mọi logic chạy 100% client-side, **không có backend**, không API routes, không database. Dữ liệu người dùng persist vào `localStorage` qua Zustand.

- **Tech**: Next.js 16.4.3 (App Router, `next dev --webpack`) · React 19 · TypeScript · Tailwind CSS 4 · Zustand 5 · TanStack Query · canvas-confetti
- **Ngôn ngữ UI**: tiếng Việt (`<html lang="vi">`), font Inter + Merriweather (next/font)
- **Mascot**: Sofi (cú), trợ lý Socratic AI — hiện là kịch bản demo mock

> ⚠️ **Next.js version này có thay đổi so với training data** (theo [AGENTS.md](AGENTS.md)) — trước khi viết code, đọc docs trong `node_modules/next/dist/docs/`.

## 2. Cấu trúc thư mục

```
src/
├── app/                          # App Router pages (4 route)
│   ├── page.tsx                  # /            → RoadmapView
│   ├── layout.tsx                # Root layout (3 cột + mobile shell)
│   ├── guidebook/[dayId]/page.tsx# /guidebook/day1..day8 (static, generateStaticParams)
│   ├── tutor/page.tsx            # /tutor       → SocraticAssistant
│   └── leaderboard/page.tsx      # /leaderboard → LeaderboardList
├── components/
│   ├── layout/                   # Sidebar, MobileHeader, BottomNav,
│   │                             #   GamificationSidebar, AuthModal, GlobalToast
│   ├── roadmap/                 # RoadmapView, RoadmapNodeItem
│   ├── guidebook/               # GuidebookDetail
│   ├── quiz/                    # QuizModal, SurveyModal
│   ├── tutor/                   # SocraticAssistant
│   ├── leaderboard/             # LeaderboardList
│   ├── providers/               # QueryProvider (TanStack Query)
│   └── ui/                      # shadcn-style: button, card, dialog, tabs,
│                                 #   sheet, progress, badge
├── data/
│   └── curriculum.ts            # Nguồn dữ liệu duy nhất: roadmap 8 ngày,
│                                 #   quiz bank (5 câu), leaderboard mock, Socratic presets
├── store/
│   └── useEduGapStore.ts        # "Bộ não" của app (559 dòng) — xem mục 4
├── lib/utils.ts                 # cn() (clsx + tailwind-merge)
└── types/                       # type declarations (canvas-confetti)
```

Ngoài `src/`:
- `sapia_edugap_prototype.html` (114KB) — bản prototype HTML standalone trước khi port sang Next.js
- `.agents/skills/` — bộ skill thiết kế cho AI agent (design-system, brand, slides, ui-ux…). **Không phải code app**, không đụng vào khi dev tính năng
- `dev-server.log`, `dev-server.pid` — artifact từ Windows, có thể xóa

## 3. Layout & điều hướng

Root layout (3 cột desktop / stack mobile):

```
[GlobalToasts, AuthModal, SurveyModal, QuizModal]  ← portals toàn cục
MobileHeader (lg:hidden, sticky)
┌────────────┬──────────────────┬──────────────┐
│ Sidebar    │  <main>          │ Gamification │
│ (desktop)  │  (content)       │ Sidebar (XP,  │
│ w-64/72    │  max-w-4xl       │ Streak, Auth) │
└────────────┴──────────────────┴──────────────┘
BottomNav (lg:hidden, fixed)
```

- 4 nav items: Học tập `/` · Trợ lý AI `/tutor` · Xếp hạng `/leaderboard` · Cá nhân (mở `AuthModal`)
- `Sidebar` hiện `elo`, chủ đề Socratic đang chọn, nút reset chat — đọc store trực tiếp

## 4. State management (trọng tâm)

`src/store/useEduGapStore.ts` — 1 store Zustand duy nhất, **persist** (key `sapia-edugap-storage`, `partialize` chỉ lưu: xp, streak, elo, completedSets, completedSetIds, nodeMastery, devMode, userProfile).

Chứa 3 nhóm:

### 4.1 Gamification metrics
| Trường | Ý nghĩa |
|---|---|
| `xp` | Điểm tích lũy (+20/câu đúng, +30/thuốc thưởng cuối quiz) |
| `streak` | Chuỗi ngày học |
| `elo` | Hệ số ELO, floor 1000 (+15 đúng / −5 sai) |
| `completedSets` / `completedSetIds` | Số / id các bộ đề đã xong (key dạng `day1-d1-n1:C.1`) |
| `nodeMastery` | Record nodeId → % mastery (cấp max +25/lần, trần 100) |

### 4.2 Quiz session (`activeQuiz: QuizSessionState`)
Flow đầy đủ: **click Node → SurveyModal (đánh giá sao) → QuizModal**
- QuizModal: chọn phương án → `answerQuiz()` trả về `{isCorrect, deltaElo}` để component render phản hồi + giải thích (`whyCorrect`/`whyWrong`)
- 3 lượt **AI Hint** (`hintsRemaining`), drawer chat tutor gợi mở (không cho đáp án)
- Câu cuối → `nextQuestion()` phát thưởng + confetti + toast
- `exitQuiz()`, `toggleQuizDrawer()`, `sendDrawerMessage()` (trả lời mock dùng `hint` của câu hiện tại)

### 4.3 Socratic Tutor (`/tutor`)
- `socraticMode` (5 chế độ: Giải thích / Gợi ý từng bước / Sửa lỗi code / Luyện tập / Review)
- `socraticTopic` — đổi topic thì append 1 tin mock
- `sendSocraticMessage()` — trả lời bằng `setTimeout` + kịch bản cứng (mock, không gọi LLM thật)
- `triggerSocraticPreset()` — 5 kịch bản demo: **guardrail** (chống gian lận), **fallback** (low-confidence), **rag_slide**, **sandbox_py**, **mini_quiz** (nội dung trùng `SOCRATIC_DEMO_PRESETS` trong curriculum.ts, nhưng presets dict đang inline trong store — coi store là nguồn thực tế)
- Lưu ý bảo mật: tin AI render qua `dangerouslySetInnerHTML` — nội dung hiện cứng trong code nên an toàn, nhưng nếu nối LLM thật phải sanitize

### 4.4 UI state
`devMode` (mở khóa toàn bộ lộ trình), `weekCollapsed`, `expandedNodeId`, `userProfile`, `authModalOpen`/`isLoginMode`, `toasts` (auto-remove sau 3s), `leaderboardTab` (today/alltime)

### Đăng nhập (mock)
`loginBypass()` — user demo "Hoàng Blue (Demo)", MSSV SE190888, seed streak=3, xp=120. `logout()` bỏ profile. Chưa có auth thật.

## 5. Dữ liệu (src/data/curriculum.ts, 442 dòng — single source of truth)

| Export | Nội dung |
|---|---|
| `ROADMAP_DAYS` (8 ngày) | `day1`: AI & LLM Foundation (Transformer, Tokenization) · `day2`: Xác định Bài toán AI · `day3`: ReAct Pattern · `day4`: Prompt Engineering & Tool Calling · `day5`: AI Product & Guardrails · `day6`: Hackathon & Prototyping · `day7`: Embeddings & Vector Store · `day8`: Đề Tổng hợp. Mỗi ngày: banner colors (Tailwind classes), `keyPoints` (8–9 trang guidebook dùng), `nodes[]` (mỗi node có `subCodes` C.1–C.5/ALL = các bộ đề quiz) |
| `QUIZ_QUESTIONS_BANK` | 5 câu (Transformer √d_k, Hybrid RAG, ReAct, KV Cache, Socratic Guardrail) — **chung cho mọi bộ đề**, mỗi câu có `hint`, `whyCorrect`, `whyWrong` |
| `TOTAL_SETS_COUNT = 46` | dùng cho % tiến độ (note: 46 × 12% ≠ khớp số node thực tế — mock) |
| `INITIAL_LEADERBOARD` | 9 user mock, cohort "AI20K Cohort 2" |
| `SOCRATIC_DEMO_PRESETS` | nội dung tin demo (xem 4.3) |

## 6. Gamification vòng lặp

```
Node (roadmap) → Survey (★) → Quiz (5 câu, ELO/XP)
  → hoàn thành → +XP, +mastery, streak, confetti, toast
  → XP quyết định rank (GamificationSidebar):
      0 = "Học viên mới" / >0 = "Đang tăng tốc" / ≥150 = "Thực chiến AI"
```
Progress bar tuần = `completedSets × 12%` (trần 100).

## 7. UI conventions

- Tailwind 4 (CSS-first, `@import "tailwindcss"`), design tokens trong `globals.css` (`--primary: #16a34a`…)
- Nút 3D: class `btn-3d-green` / `btn-3d-orange` (box-shadow hard, `:active` lún)
- Nút bấm node có `node-btn-shadow`; connector zigzag = `node-connector` (nền dashed gradient)
- `.font-serif-title` (Merriweather) cho headings lớn
- UI kit trong `src/components/ui/` (shadcn style + CVA) — ưu tiên dùng hơn viết component mới
- Responsive: desktop 3 cột (lg+), mobile: header sticky + bottom nav, GamificationSidebar đổi thành section đầy màn hình dưới cùng

## 8. Chạy project

```bash
npm run dev    # next dev --webpack (port 3000, log cho thấy dev server trước đó chạy ở 3001)
npm run build / npm run start / npm run lint
```
Note: `dev-server.log` ghi nhận warning SWC win32 (tàn dư Windows) — không ảnh hưởng trên macOS.

## 9. Giới hạn / điểm cần biết

- **Mock toàn bộ**: quiz bank 5 câu dùng chung, leaderboard cứng, Sofi trả lời bằng kịch bản, auth bypass — đây là prototype demo, chưa có AI backend
- `useEduGapStore.ts` nặng (559 dòng, chứa logic quiz + chat + gamification) — nơi cần tách nếu phát triển thêm
- `SOCRATIC_DEMO_PRESETS` (curriculum.ts) và dict presets (store) trùng nội dung — store đang inline, curriculum export hiện không được import từ component nào (kiểm tra khi dùng)
- `TOTAL_SETS_COUNT=46` không khớp với số node × subCode thực tế trong ROADMAP_DAYS
- Canvas-confetti đã có type declaration (`src/types/canvas-confetti.d.ts`) — import thẳng, không cần `declare` lại
