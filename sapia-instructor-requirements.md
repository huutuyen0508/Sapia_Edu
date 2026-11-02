---
name: sapia-instructor-requirements
description: Yêu cầu bắt buộc của giảng viên cho đồ án Sapia Edu (hình GV chia sẻ 01/11/2026)
metadata:
  type: project
---

Yêu cầu của GV (chụp từ màn hình, user chia sẻ 01/11/2026):

1. **Knowledge Base** trên 1 môn học: giáo trình, slide, bài tập
2. **Evaluation Dataset: 300–500 cặp** (question, ground truth, evidence, topic, difficulty) — dùng để đo retrieval (Recall@K, MRR, NDCG)
3. **Learning Dataset:** lịch sử tương tác/quiz thật, ẩn danh hoặc mô phỏng
4. Thuật toán/components ưu tiên: **BM25 (baseline!)**, Dense Retriever, Reranking, LLM Generation, Learner Modeling, Recommendation, Knowledge Tracing
5. Stack gợi ý: Python, FastAPI, React/Flutter, PostgreSQL + Elasticsearch/OpenSearch, pgvector, Sentence Transformers, Reranker, LLM
6. Deliverable: Web App + RAG Backend + KB + Evaluation Dataset + Learner Model + **báo cáo thử nghiệm (Recall@K, MRR, NDCG)**
7. AI Evaluation (nếu khả thi): correctness, groundedness, citation accuracy, latency, usability

**Điểm dễ quên nhất (lần so sánh đã chỉ ra user/assistant bỏ sót):** Evaluation Dataset + báo cáo metric + BM25 baseline.

Liên quan: [[sapia-techstack-mvp]], [[sapia-mvp-vs-advanced-scope]]
