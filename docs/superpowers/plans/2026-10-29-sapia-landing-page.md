# Sapia Landing Page (Marketing) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thêm landing page marketing tại route `/landing` (hero, features, roadmap 8 ngày, waitlist CTA, footer) vào app Sapia EduGap hiện có, không đụng logic app.

**Architecture:** Landing là 1 server component page (`/landing`) bọc 1 client component chứa toàn bộ sections. App shell (Sidebar, MobileHeader, BottomNav, GamificationSidebar) bị ẩn khi ở `/landing` bằng 4 edit 1 dòng tận dụng `usePathname` sẵn có. Nội dung roadmap render từ `ROADMAP_DAYS` (dữ liệu có sẵn), không hardcode.

**Tech Stack:** Next.js 16.4.3 (App Router), React 19, Tailwind CSS 4, lucide-react (đã cài), Zustand store (đã cài, dùng `addToast`). Không thêm dependency nào.

**Spec:** Quyết định của user: landing marketing mới (route riêng, app hiện tại giữ nguyên là sản phẩm chính), phong cách tự thiết kế theo design system hiện có (xanh `#16a34a`, mascot Sofi, nút 3D, `font-serif-title`).

## Global Constraints

- Không thêm dependency, không thêm test runner (project hiện tại không có) — verify bằng `npm run build` + `npm run lint`
- Toàn bộ UI text tiếng Việt, giữ tone copy của app (uppercase tracking-wide cho label, `font-extrabold`)
- Tái sử dụng trước khi viết mới: `Button` (variant `3d-green`/`outline`), class `btn-3d-green`, class `.font-serif-title`, mascot SVG (copy từ `RoadmapView`), `ROADMAP_DAYS` từ `curriculum.ts`, `addToast` từ `useEduGapStore`
- Route mới chỉ được thêm, không sửa route hiện có (`/`, `/tutor`, `/leaderboard`, `/guidebook/[dayId]` giữ nguyên)
- `AGENTS.md`: Next version này có thay đổi so với training data — khi gặp API lạ, đọc `node_modules/next/dist/docs/` (sau khi `npm ci`)
- Commit messages kết thúc bằng: `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`

## Review Focus

1. **Mobile không có bottom nav ở `/landing`** → landing tự mang sticky nav riêng với 1 CTA về `/`, đủ để rời trang (chấp nhận thiết kế, ghi trong task 3)
2. **Không có link trong-app nào tới `/landing`** (đây là entry marketing từ bên ngoài) → footer của app không có link ngược; nếu user muốn link từ Sidebar thì là scope riêng, chưa làm
3. **Waitlist form không có backend** → submit chỉ set state local + toast (giống hệt pattern hiện có trong `GamificationSidebar`); email không đi đâu — chấp nhận với prototype, phải ghi rõ trong UI copy là "danh sách chờ"
4. **`GlobalToast` render ngoài shell** → toast waitlist ở `/landing` vẫn hiển thị đúng (vì `GlobalToast` nằm trực tiếp trong root layout)
5. **Mascot SVG copy từ 3 nơi có sẵn** (Sidebar, RoadmapView, MobileHeader) → chọn bản đầy đủ nhất (RoadmapView) làm canonical; không refactor 3 bản thành 1 component (ngoài scope)

---

### Task 1: Chuẩn bị môi trường (install + verify baseline)

**Files:**
- Sửa: không sửa file nào, chỉ chạy commands

- [ ] **Step 1: Install dependencies**

```bash
npm ci
```

Expected: `node_modules` xuất hiện, không error. (Nếu `package-lock.json` lỗi với npm hiện tại, fallback `npm install`.)

- [ ] **Step 2: Verify baseline build**

Run: `npm run build`
Expected: build thành công (các route hiện có compile OK). Ghi nhận thời gian + warning để so sau.

- [ ] **Step 3: Verify lint baseline**

Run: `npm run lint`
Expected: pass hoặc chỉ có warnings có sẵn.

- [ ] **Step 4: Commit (chỉ nếu có file lock được sinh/sửa)**

```bash
git add package-lock.json
git commit -m "chore: install dependencies

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Nếu `package-lock.json` không thay đổi, bỏ qua commit.

---

### Task 2: Ẩn app shell ở `/landing`

**Files:**
- Sửa: `src/components/layout/Sidebar.tsx` (đã có `usePathname` ở line 10)
- Sửa: `src/components/layout/MobileHeader.tsx` (cần thêm hook)
- Sửa: `src/components/layout/BottomNav.tsx` (đã có `usePathname` ở line 10)
- Sửa: `src/components/layout/GamificationSidebar.tsx` (cần thêm hook)

**Interfaces:**
- Consumes: `usePathname()` từ `next/navigation` (pattern có sẵn trong Sidebar/BottomNav)
- Produces: không export gì mới; hành vi = 4 component trả `null` khi `pathname.startsWith('/landing')`

- [ ] **Step 1: Sidebar — thêm guard đầu component**

Sau `const pathname = usePathname();` (line 10), chèn:

```tsx
if (pathname.startsWith('/landing')) return null;
```

- [ ] **Step 2: BottomNav — cùng pattern ở line 10**

```tsx
if (pathname.startsWith('/landing')) return null;
```

- [ ] **Step 3: MobileHeader + GamificationSidebar — thêm hook + guard**

Cả hai file: import `usePathname` (MobileHeader đã import `Link` từ next, thêm 1 dòng import), đầu component:

```tsx
const pathname = usePathname();
if (pathname.startsWith('/landing')) return null;
```

Lưu ý: `MobileHeader` hiện render `streak`/`xp` — không cần guard riêng cho chúng, cả component ẩn là đủ.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: pass. (Typecheck bắt lỗi nếu lỡ thiếu import.)

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Sidebar.tsx src/components/layout/MobileHeader.tsx src/components/layout/BottomNav.tsx src/components/layout/GamificationSidebar.tsx
git commit -m "feat: hide app shell on /landing route

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: Landing page + LandingView

**Files:**
- Tạo: `src/app/landing/page.tsx`
- Tạo: `src/components/landing/LandingView.tsx`

**Interfaces:**
- Consumes: `ROADMAP_DAYS` (`src/data/curriculum.ts`), `Button` (`src/components/ui/button.tsx`, variants `3d-green`, `outline`), `addToast` (`useEduGapStore`), class `font-serif-title`, `btn-3d-green`, icons `lucide-react` (Sparkles, ShieldCheck, BrainCircuit, Trophy — nếu tên khác thì `grep -o 'export.*Icon' node_modules/lucide-react/dist/lucide-react.d.ts | head` để lấy đúng)
- Produces: route `/landing` với metadata riêng; `LandingView` default export, không props

- [ ] **Step 1: Tạo `src/app/landing/page.tsx`**

Server component, pattern như `leaderboard/page.tsx` (metadata + render 1 client component):

```tsx
import type { Metadata } from 'next';
import LandingView from '@/components/landing/LandingView';

export const metadata: Metadata = {
  title: 'Sapia AI - EduGap | Course-grounded AI Tutor cho Cohort AI20K',
  description: 'Nền tảng học tập AI thích ứng: quiz theo ELO, trợ lý Socratic RAG, gamification XP & leaderboard.'
};

export default function LandingPage() {
  return <LandingView />;
}
```

- [ ] **Step 2: Tạo `src/components/landing/LandingView.tsx` (client component, `'use client'`)**

1 file, 6 sections theo thứ tự. Dùng đúng class/tone có trong codebase (rounded-3xl, border-slate-200, shadow-sm, `text-green-600`, label `text-[10-11px] font-extrabold uppercase tracking-wider`):

1. **Landing nav (sticky top, cả mobile + desktop — điểm Review Focus #1):** bar trắng `sticky top-0 z-50 backdrop-blur`: mascot SVG nhỏ (copy block `<svg viewBox="0 0 64 64">` từ `RoadmapView.tsx` line 88-99, thu về 36px) + "Sapia AI" (`font-serif-title`), phải: anchor `TÍNH NĂNG` → `#features`, `LỘ TRÌNH` → `#roadmap`, `Button` size sm variant `3d-green` "VÀO HỌC NGAY" → `<Link href="/">`
2. **Hero (id không cần):** badge pill `AI20K COHORT 2 • ADAPTIVE LEARNING`, H1 `font-serif-title` "EduGap — Course-Grounded AI Tutor", sub 1-2 câu (quiz thích ứng ELO + Sofi Socratic RAG), 2 CTA: `Button 3d-green` "BẮT ĐẦU HỌC MIỄN PHÍ" (Link → `/`), `Button outline` "XEM LỘ TRÌNH 8 NGÀY" (anchor `#roadmap`). Bên cạnh: mascot SVG lớn (bản RoadmapView, 96px, nền xanh rounded-3xl như `GamificationSidebar` không có — tự làm: div `w-24 h-24 bg-green-600 rounded-3xl` bọc svg trắng). 3 stat chip nhỏ (ELO / XP / Streak) copy icon 🔥🏅🏆 + label từ `GamificationSidebar`
3. **Features (id="features"):** heading `TÍNH NĂNG NỔI BẬT`, grid 4 card (`grid sm:grid-cols-2 gap-4`, card = `bg-white rounded-3xl border border-slate-200 p-5 shadow-sm`), mỗi card: icon lucide trong box `w-10 h-10 rounded-xl bg-green-50 border border-green-200`, title + description. 4 card cố định:
   - `BrainCircuit` "Quiz thích ứng ELO" — đúng/sai cập nhật ELO + XP, 3 AI Hints, tutor drawer gợi mở
   - `ShieldCheck` "Socratic RAG Grounded" — Sofi không giải hộ, Grounded RAG + Guardrail chống gian lận
   - `Sparkles` "Lộ trình 8 ngày" — từ Transformer đến RAG & Vector Store, guidebook kèm mỗi ngày
   - `Trophy` "Gamification" — XP, streak, rank (Học viên mới → Thực chiến AI), leaderboard cohort
4. **Roadmap (id="roadmap"):** heading `LỘ TRÌNH TUẦN 1`, map `ROADMAP_DAYS` → list 8 hàng (không grid): mỗi hàng `flex items-center gap-4 bg-white rounded-2xl border border-slate-200 p-4` gồm: badge `day.badge` (pill `day.borderAccent` style — dùng `day.bannerBg` làm nền pill `bg-black/...`? không: dùng text `day.badge` trong pill trắng border), `day.title` + `day.desc` (text-xs), phải: nút ghost "GUIDEBOOK →" (`<Link href={'/guidebook/' + day.id}>`) — pattern Link có sẵn ở `RoadmapView` line 146-152. Cuối list: 1 dòng CTA "MỞ KHÓA TRẢI NGHIỆM ĐẦY ĐỦ →" (Button 3d-green, Link → `/`)
5. **Waitlist CTA:** card gradient (copy nguyên block `bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950` + form email từ `GamificationSidebar.tsx` line 153-185, bỏ "Lộ trình AI cá nhân hóa" đổi copy thành "NHẬN BẢN 02 KHI SẴN SẴNG"), state `email` + `submitted` local, submit → `addToast('Đã thêm bạn vào danh sách chờ EduGap! (demo — không lưu email)', 'success')` — toast hiện vì `GlobalToast` nằm ngoài shell (Review Focus #3, #4)
6. **Footer:** `border-t border-slate-200 py-8 text-center`: mascot 24px + "Sapia AI — Vibrant Learning" (font-serif-title), 1 dòng links: `Học tập` `/` · `Trợ lý AI` `/tutor` · `Xếp hạng` `/leaderboard` (Link, text-xs), dòng cuối `© 2026 Sapia AI EduGap • Prototype đồ án AI20K`

Không hardcode tên 8 ngày, không hardcode số stat XP/ELO cụ thể (tránh lệch với data thật).

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: pass; route `/landing` xuất hiện trong build output; không lỗi import icon (nếu lucide không có icon tên đó, grep `.d.ts` lấy tên thật thay — đã ghi ở Interfaces).

- [ ] **Step 4: Verify bằng mắt qua dev server (optional nhưng khuyến nghị)**

```bash
npm run dev
# mở http://localhost:3000/landing
```
Kiểm tra: shell app (sidebar, bottom nav) không hiện; anchor `#features`/`#roadmap` scroll đúng; nút "VÀO HỌC NGAY" về `/` (ở đó shell hiện bình thường); mobile (resize) landing vẫn đọc được, sticky nav đủ CTA.

- [ ] **Step 5: Commit**

```bash
git add src/app/landing/page.tsx src/components/landing/LandingView.tsx
git commit -m "feat: add marketing landing page at /landing

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Self-review (đã chạy)

- **Spec coverage:** landing marketing (hero/features/roadmap/CTA/footer) → Task 3; giữ nguyên app → Task 2 chỉ ẩn shell, không đụng route nào. Không thiếu.
- **Step scan:** mọi step có thể làm đúng 1 thứ; body code chỉ cho phần spec chốt sẵn (metadata, guard 1 dòng) — phần sections của LandingView là brief, không phải transcript code.
- **Type consistency:** `ROADMAP_DAYS`, `day.bannerBg`/`badge`/`title`/`desc`/`id` khớp `curriculum.ts`; `addToast(msg, type)` khớp store; `Button` variants `3d-green`/`outline` khớp `button.tsx` line 12.
- **Review Focus:** 5 dòng ở trên, từng dòng đã gán test/kiểm tra vào task (1→Step 4, 2→ghi nhận scope, 3→Step 2 waitlist, 4→Step 2, 5→đ decision ghi trong task 3 section 1).
- **Proportion:** plan ~300 dòng cho 3 task, code chủ yếu là signatures + class pattern; LandingView to nhất (~150 dòng khi viết xong) — tương xứng.
