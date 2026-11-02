---
name: sapia-machine-repo-state
description: Trạng thái máy (chưa có Node.js) và repo (prototype client-side, Next 16 breaking changes)
metadata:
  type: project
---

- Repo: Next.js 16.4.3 (App Router, `next dev --webpack`), React 19, Tailwind 4, Zustand (store chính `src/store/useEduGapStore.ts` ~559 dòng), 100% client-side, data mock ở `src/data/curriculum.ts`, tutor Sofi đang là mock `setTimeout`
- ⚠️ **Next 16 repo này có breaking changes** (theo AGENTS.md) — trước khi viết code, đọc docs trong `node_modules/next/dist/docs/`
- ⚠️ Tin AI hiện render qua `dangerouslySetInnerHTML` — khi nối LLM thật phải sanitize
- **Máy user (macOS, Darwin 22.5.0): chưa cài Node.js, chưa có Homebrew/nvm/fnm, chưa có node_modules** — user cần `brew install node` (Node 22+) trước khi chạy
- User ngôn ngữ làm việc: **tiếng Việt** (đã yêu cầu trả lời bằng tiếng Việt)

Liên quan: [[sapia-techstack-mvp]]
