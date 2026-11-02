---
name: sapia-techstack-mvp
description: Quyết định techstack đã chốt với user cho Sapia Edu MVP (tuân hướng giảng viên)
metadata:
  type: project
---

Techstack MVP đã chốt (01/11/2026, user đồng ý, tuân hướng giảng viên):

- **Frontend:** giữ nguyên repo hiện tại — Next.js 16 + React 19 + TypeScript + Tailwind 4 + Zustand + TanStack Query + shadcn/ui
- **RAG Backend & Agent:** Python + FastAPI (service tách riêng `Sapia_Edu/sapia-rag/`, KHÔNG gộp vào Next.js)
- **Retrieval:** hybrid — OpenSearch/Elasticsearch (BM25) + Supabase pgvector (dense, cosine) merge bằng RRF
- **Embedding:** Sentence Transformers chạy local (all-MiniLM-L6-v2) — không tốn API phí, không cần GPU
- **LLM Generation:** Claude (Anthropic API), streaming SSE; Vercel AI SDK phía frontend (Generative UI: thẻ slide, mini_quiz)
- **Auth:** Supabase (Postgres + Auth + Realtime) — user đã xác nhận dùng Supabase (không dùng Clerk)
- **Sandbox code (nâng cao):** Pyodide client / Modal cloud

**Quyết định quan trọng:** user chọn tuân stack phía BE + agent theo hướng giảng viên (Python FastAPI + OpenSearch), bỏ hướng "all-in Node" ban đầu. Embedding/rerank local, generation dùng LLM API (đã trao đổi: GV không bắt buộc train LLM local; "local" ở đây = inference embedding local).

Liên quan: [[sapia-instructor-requirements]], [[sapia-mvp-vs-advanced-scope]], [[sapia-machine-repo-state]]
