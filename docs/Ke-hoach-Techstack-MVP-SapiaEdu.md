# SAPIA EDU — EDUGAP
## Kế hoạch TechStack & Lộ trình MVP

Nền tảng học tập AI thích ứng (adaptive learning) cho cohort AI20K · Nhóm đồ án cuối khóa · Cập nhật: 01/11/2026

> **Trạng thái hiện tại:** prototype 100% client-side (Next.js), Socratic tutor đang là mock. Tài liệu này định hình techstack + lộ trình xây dựng MVP bám sát yêu cầu của giảng viên.

---

## 1. Tổng quan & mục tiêu

- Xây dựng trợ lý Socratic AI (Sofi) có khả năng truy xuất giáo trình (RAG) và gợi mở thay vì trả lời thẳng, kèm trích dẫn slide.
- Tạo **Evaluation Dataset (300–500 câu)** để đo & so sánh chất lượng retrieval (Recall@K, MRR, NDCG) — yêu cầu bắt buộc của GV.
- MVP chạy được end-to-end trên máy dev (macOS) với dữ liệu PDF, không cần GPU.

---

## 2. TechStack tổng thể (tuân hướng giảng viên)

| Lớp | Công nghệ | Vai trò / lý do |
|---|---|---|
| Frontend | Next.js 16 + React 19 + TypeScript + Tailwind 4 + Zustand + TanStack Query + shadcn/ui | Giữ nguyên repo hiện tại. RSC cho Guidebook/Leaderboard, client component cho Quiz + chat Tutor. |
| RAG Backend & Agent | **Python + FastAPI** | Service tách riêng cho index, retrieval, guardrail, streaming LLM. Đúng hướng GV (không gộp vào Next). |
| Dense Retrieval | PostgreSQL + pgvector (Supabase) | Lưu embedding + metadata; cosine similarity. Gộp chung 1 DB với auth, progress, learning_events. |
| Full-text / BM25 | **Elasticsearch / OpenSearch** | Engine BM25 chuẩn để chạy baseline, so sánh với hybrid (yêu cầu ưu tiên của GV). |
| Embedding | **Sentence Transformers (local)** | Inference local — không tốn phí API, offline được. Phù hợp máy dev thường. |
| Reranker (nâng cao) | Cross-encoder (sentence-transformers) | Re-rank top-20 → top-5 trước khi vào LLM; có số liệu so sánh cho báo cáo. |
| LLM Generation | **Claude (Anthropic API)** | Chất lượng Socratic + tiếng Việt cao, streaming mượt. Generation dùng API, retrieval/rerank local. |
| Auth & Data | Supabase (Postgres + Auth + Realtime) | Xác thực MSSV/OAuth, lưu tiến độ ẩn danh, leaderboard realtime, learning events. |
| Sandbox code (nâng cao) | Pyodide (client) / Modal (cloud) | Chạy Python/JS nhẹ ngay trình duyệt; cô lập bài backend phức tạp trong container. |

---

## 3. Pipeline RAG

### 3.1. Giai đoạn Index (một lần, khi import PDF)

1. PDF (slide giáo trình) → `pdfplumber` / `PyMuPDF` extract text theo page.
2. Mỗi slide = 1 chunk (metadata: `docId`, `page`, `heading?`).
3. Phân phối song song: **OpenSearch (BM25)** + **pgvector (embedding Sentence Transformers → vector)**.
4. Lưu metadata document (title, page_count, cohort) vào PostgreSQL.

### 3.2. Giai đoạn Retrieval + Generation (mỗi lần học sinh hỏi)

1. **Guardrail check:** liên quan môn học? Đang hỏi đáp án quiz? → chặn / chuyển Socratic.
2. **Hybrid Retrieval:** BM25 (top-20) + dense cosine (top-20) → **RRF (Reciprocal Rank Fusion)** → top-10.
3. *(Nâng cao)* Cross-encoder rerank top-10 → top-5.
4. **Confidence check:** top score ≥ ngưỡng → có context; < ngưỡng → fallback Socratic (không bịa, hỏi ngược).
5. **LLM (Claude) streaming SSE:** câu trả lời Socratic + cite slide. Vercel AI SDK client render text + thẻ Generative UI (bấm để mở slide).
6. Log ẩn danh vào `learning_events` (question, retrieved_chunks, answer, latency_ms).

---

## 4. Phân rã phạm vi: MVP vs Nâng cao

### 4.1. MVP (bắt buộc đủ tiêu đồ án)

| # | Hạng mục | Nội dung cụ thể |
|---|---|---|
| 1 | Hệ thống RAG | PDF → extract → chunk → index song song BM25 + dense → hybrid (RRF) → top-k vào context LLM. |
| 2 | Evaluation Dataset | **300–500 cặp** (question, ground truth, evidence, topic, difficulty) trên 1 môn học nhất định. |
| 3 | Đo thử nghiệm | Chạy dataset qua pipeline → **Recall@K, MRR, NDCG**; so **BM25 baseline vs hybrid** → viết báo cáo. |
| 4 | AI Tutor (LLM) | FastAPI + Claude streaming, câu trả lời có trích dẫn slide (grounded), guardrail, fallback khi confidence thấp. |
| 5 | Learner Modeling (cơ bản) | Log quiz + hint + tutor turns ẩn danh (PostgreSQL), tính mastery/elo per-topic → cá nhân hóa độ khó. |
| 6 | Auth | Supabase Auth (MSSV/OAuth) — lưu user + lịch sử ẩn danh. |

### 4.2. Nâng cao (nếu kịp — ghi trong báo cáo)

| # | Hạng mục | Giá trị / ghi chú |
|---|---|---|
| 1 | Reranker (cross-encoder) | Tăng Recall@K/precision, thêm số liệu so sánh cho báo cáo. |
| 2 | Recommendation | Đề xuất node/quiz tiếp theo dựa trên learner model. |
| 3 | Knowledge Tracing | Mô hình xu hướng mastery theo thời gian (IRT/DeepKT giản lược). |
| 4 | Knowledge Graph | Bản đồ khái niệm 1 môn, query đa bước. |
| 5 | AI Evaluation metric | Correctness, groundedness, citation accuracy (LLM-as-judge), latency, usability. |
| 6 | Multi-format input | Mở rộng indexer sang Word (.docx) / PPTX. |
| 7 | Sandbox code | Pyodide chạy Python trong trình duyệt cho bài tập code. |

---

## 5. Lộ trình xây dựng MVP (theo giai đoạn)

| Giai đoạn | Công việc chính | Đầu ra / nghiệm thu |
|---|---|---|
| **GĐ 1** | Schema Supabase (documents, chunks, learning_events, elo) + bật pgvector. Dựng service FastAPI. | DB chạy được, FastAPI khởi động, `/health`. |
| **GĐ 2** | Indexer PDF: pdfplumber/PyMuPDF → chunk per-page → BM25 (OpenSearch) + dense (Sentence Transformers → pgvector). | Index 5–10 PDF mẫu, tra được chunk. |
| **GĐ 3** | Hybrid retrieval (RRF) + endpoint `/api-rag/search`. Chạy BM25 baseline & hybrid, đo Recall@K/MRR/NDCG trên tập con. | So sánh số liệu baseline vs hybrid (báo cáo sơ bộ). |
| **GĐ 4** | Evaluation Dataset 300–500 câu + script đo tự động. Guardrail + confidence fallback trong agent. | Dataset hoàn chỉnh, pipeline đo metric tự động. |
| **GĐ 5** | Tutor FastAPI + Claude streaming SSE; guardrail → RAG → fallback → Socratic + cite. Log learning_events. | Tutor thật thay mock, trả lời có cite slide. |
| **GĐ 6** | Frontend Next: Vercel AI SDK gọi FastAPI, render Generative UI (thẻ slide, mini_quiz). Auth Supabase MSSV. | Học sinh đăng nhập → hỏi → Sofi trả lời + mở slide. |
| **GĐ 7** | Learner model cơ bản (mastery/elo per-topic) cá nhân hóa độ khó. Tổng hợp báo cáo thử nghiệm cuối. | Báo cáo đầy đủ (metric + learner model + demo video). |

---

## 6. Cấu trúc dịch vụ & thư mục

| Thành phần | Vị trí | Ghi chú |
|---|---|---|
| Frontend | `Sapia_Edu/` (Next.js, hiện tại) | Thay mock Socratic bằng gọi `/api-rag/tutor`. Sanitize nội dung AI trước khi render (bỏ `dangerouslySetInnerHTML`). |
| RAG service | `Sapia_Edu/sapia-rag/` (Python) | FastAPI: indexer, retrieval, agent, LLM streaming. |
| Evaluation | `Sapia_Edu/sapia-rag/eval/` | Dataset + script đo Recall@K/MRR/NDCG + báo cáo. |
| Data | Supabase (hosted) | documents, chunks, learning_events, elo + pgvector + OpenSearch. |

---

## 7. Triển khai local (tóm tắt)

- **Frontend:** cài Node.js 22+ (`brew install node`) → `npm install` & `npm run dev`.
- **Backend RAG:** tạo venv, `pip install fastapi uvicorn pdfplumber sentence-transformers elasticsearch pgvector psycopg2-binary anthropic` → `uvicorn app.main:app --port 8000`.
- **OpenSearch:** chạy bằng Docker (chỉ cần khi index).
- **Supabase:** dùng hosted. Keys (`ANTHROPIC_API_KEY`, `SUPABASE_*`) trong `.env.local`.
