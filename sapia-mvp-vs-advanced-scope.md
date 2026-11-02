---
name: sapia-mvp-vs-advanced-scope
description: Ranh giới MVP vs nâng cao đã thống nhất cho Sapia Edu
metadata:
  type: project
---

**MVP (6 hạng mục bắt buộc):**
1. RAG hệ thống: PDF → extract → chunk per-page → BM25 (OpenSearch) + dense (pgvector) → RRF → top-k vào context
2. Evaluation Dataset 300–500 câu trên 1 môn học
3. Đo Recall@K, MRR, NDCG; so BM25 baseline vs hybrid → báo cáo
4. AI Tutor: FastAPI + Claude streaming, grounded + cite slide, guardrail, fallback khi confidence thấp
5. Learner Modeling cơ bản: log quiz/hint/tutor ẩn danh, mastery/elo per-topic, cá nhân hóa độ khó
6. Auth Supabase (MSSV/OAuth)

**Nâng cao (7 hạng mục, ghi trong báo cáo nếu kịp):**
1. Reranker cross-encoder (top-20 → top-5)
2. Recommendation node/quiz
3. Knowledge Tracing (IRT/DeepKT giản lược)
4. Knowledge Graph khái niệm
5. AI Evaluation metric (correctness, groundedness, citation accuracy, LLM-as-judge, latency)
6. Multi-format input (Word/PPTX)
7. Sandbox code (Pyodide/Modal)

MVP chỉ index **PDF** (user chốt). Nguồn tài liệu thật sẽ là slide giáo trình 1 môn — **chưa chốt môn cụ thể** (hiện nội dung mock 8 ngày trong `src/data/curriculum.ts`).

Liên quan: [[sapia-techstack-mvp]], [[sapia-instructor-requirements]]
