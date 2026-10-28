export interface KeyPoint {
  title: string;
  body: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  icon: string;
  unlockedIcon?: string;
  type: string;
  mastery: number;
  unlocked: boolean;
  subCodes: string[];
}

export interface RoadmapDay {
  id: string;
  badge: string;
  title: string;
  desc: string;
  bannerBg: string;
  borderAccent: string;
  ringAccent: string;
  unlockedByDefault: boolean;
  keyPoints: KeyPoint[];
  nodes: RoadmapNode[];
}

export interface QuizQuestion {
  id?: string;
  q: string;
  options: string[];
  correct: number;
  hint: string;
  whyCorrect: string;
  whyWrong: string;
  dayId?: string;
  subCode?: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  initials: string;
  xpToday: number;
  xpAll: number;
  color: string;
  cohort: string;
  isCurrentUser?: boolean;
}

export const ROADMAP_DAYS: RoadmapDay[] = [
  {
    id: 'day1',
    badge: 'Ngày 1',
    title: 'Ngày 1: AI & LLM Foundation',
    desc: 'Nắm vững Transformer, Tokenization, Embeddings và Inference Dynamics.',
    bannerBg: 'bg-emerald-600',
    borderAccent: 'border-emerald-600',
    ringAccent: 'ring-emerald-200',
    unlockedByDefault: true,
    keyPoints: [
      {
        title: 'Self-Attention Mechanism',
        body: 'Tính trọng số liên kết giữa mọi cặp token trong chuỗi qua bộ ba ma trận Query (Q), Key (K), Value (V) với độ phức tạp O(N²).'
      },
      {
        title: 'Subword Tokenization (BPE)',
        body: 'Chia nhỏ từ hiếm thành các subword giúp cân bằng kích thước từ điển và tránh lỗi Out-Of-Vocabulary (OOV).'
      },
      {
        title: 'Temperature & Top-p Sampling',
        body: 'Điều chỉnh phân phối xác suất đầu ra: Temperature thấp (0.1) giúp câu trả lời nhất quán; cao (0.8+) tăng tính sáng tạo.'
      },
      {
        title: 'KV Cache trong Inference',
        body: 'Lưu trữ Key và Value của các token phía trước để tránh tính toán lại ở pha Autoregressive Decoding.'
      }
    ],
    nodes: [
      {
        id: 'd1-n1',
        title: 'Transformer & LLM Foundations',
        icon: '📖',
        type: 'Lý thuyết nền tảng',
        mastery: 0,
        unlocked: true,
        subCodes: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'ALL']
      },
      {
        id: 'd1-n2',
        title: 'Tokenization & Context Window',
        icon: '🏋️',
        type: 'Thực hành chuyên sâu',
        mastery: 0,
        unlocked: false,
        subCodes: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'ALL']
      }
    ]
  },
  {
    id: 'day2',
    badge: 'Ngày 2',
    title: 'Ngày 2: Xác định Bài toán cho AI',
    desc: 'Định hình bài toán, đánh giá tính khả thi, chiến lược dữ liệu và đo lường chất lượng.',
    bannerBg: 'bg-amber-500',
    borderAccent: 'border-amber-500',
    ringAccent: 'ring-amber-200',
    unlockedByDefault: false,
    keyPoints: [
      {
        title: 'AI Problem Framing',
        body: 'Phân biệt bài toán cần Deterministic Rules và bài toán cần Generative/Probabilistic Reasoning.'
      },
      {
        title: 'Evaluation-Driven Development',
        body: 'Xây dựng bộ Golden Dataset và rubric chấm điểm tự động (LLM-as-a-Judge) trước khi tối ưu hệ thống.'
      }
    ],
    nodes: [
      {
        id: 'd2-n1',
        title: 'Khung đánh giá khả thi AI',
        icon: '🔒',
        unlockedIcon: '📖',
        type: 'Chiến lược sản phẩm',
        mastery: 0,
        unlocked: false,
        subCodes: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'ALL']
      },
      {
        id: 'd2-n2',
        title: 'Chiến lược Dữ liệu & Metrics',
        icon: '🔒',
        unlockedIcon: '🏋️',
        type: 'Thực hành đo lường',
        mastery: 0,
        unlocked: false,
        subCodes: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'ALL']
      }
    ]
  },
  {
    id: 'day3',
    badge: 'Ngày 3',
    title: 'Ngày 3: Design Pattern ReAct',
    desc: 'Kết hợp suy luận chuỗi (Reasoning) và gọi công cụ (Acting) cho AI Agent tự chủ.',
    bannerBg: 'bg-blue-600',
    borderAccent: 'border-blue-600',
    ringAccent: 'ring-blue-200',
    unlockedByDefault: false,
    keyPoints: [
      {
        title: 'Chu trình Thought → Action → Observation',
        body: 'Cho phép LLM lập luận từng bước, tra cứu API bên ngoài và tự điều chỉnh kế hoạch dựa trên kết quả trả về.'
      },
      {
        title: 'Kiểm soát vòng lặp vô hạn',
        body: 'Đặt giới hạn max_iterations và cơ chế fallback an toàn khi công cụ trả về lỗi.'
      }
    ],
    nodes: [
      {
        id: 'd3-n1',
        title: 'ReAct Loop & Agent Architecture',
        icon: '🔒',
        unlockedIcon: '📖',
        type: 'Kiến trúc Agent',
        mastery: 0,
        unlocked: false,
        subCodes: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'ALL']
      }
    ]
  },
  {
    id: 'day4',
    badge: 'Ngày 4',
    title: 'Ngày 4: Prompt Engineering & Tool Calling',
    desc: 'Làm chủ Structured Outputs, Few-shot Prompting và giao thức Function Calling.',
    bannerBg: 'bg-rose-600',
    borderAccent: 'border-rose-600',
    ringAccent: 'ring-rose-200',
    unlockedByDefault: false,
    keyPoints: [
      {
        title: 'JSON Schema & Structured Outputs',
        body: 'Ép mô hình trả về đúng định dạng kiểu dữ liệu phục vụ tích hợp Backend tin cậy.'
      },
      {
        title: 'Tool Selection & Parameter Extraction',
        body: 'Mô tả docstring rõ ràng để LLM chọn đúng hàm và trích xuất tham số chính xác.'
      }
    ],
    nodes: [
      {
        id: 'd4-n1',
        title: 'Structured Prompt & Function Call',
        icon: '🔒',
        unlockedIcon: '🏋️',
        type: 'Kỹ thuật Prompt',
        mastery: 0,
        unlocked: false,
        subCodes: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'ALL']
      }
    ]
  },
  {
    id: 'day5',
    badge: 'Ngày 5',
    title: 'Ngày 5: Thiết kế sản phẩm AI cho sự không chắc chắn',
    desc: 'Thiết kế UX thích ứng, Guardrails chống ảo giác và cơ chế Fallback an toàn.',
    bannerBg: 'bg-teal-600',
    borderAccent: 'border-teal-600',
    ringAccent: 'ring-teal-200',
    unlockedByDefault: false,
    keyPoints: [
      {
        title: 'Confidence Calibration & Citations',
        body: 'Hiển thị nguồn trích dẫn trực tiếp và cảnh báo khi độ tin cậy truy xuất thấp.'
      },
      {
        title: 'Socratic Guardrails',
        body: 'Ngăn người học yêu cầu giải hộ bài tập trực tiếp, chuyển sang đặt câu hỏi gợi mở.'
      }
    ],
    nodes: [
      {
        id: 'd5-n1',
        title: 'Guardrails & UX Bất định',
        icon: '🔒',
        unlockedIcon: '📖',
        type: 'Thiết kế AI UX',
        mastery: 0,
        unlocked: false,
        subCodes: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'ALL']
      }
    ]
  },
  {
    id: 'day6',
    badge: 'Ngày 6',
    title: 'Ngày 6: Hackathon Day & Prototyping',
    desc: 'Tăng tốc xây dựng bản mẫu End-to-End từ ý tưởng đến sản phẩm AI chạy thực tế.',
    bannerBg: 'bg-orange-600',
    borderAccent: 'border-orange-600',
    ringAccent: 'ring-orange-200',
    unlockedByDefault: false,
    keyPoints: [
      {
        title: 'Rapid AI Prototyping',
        body: 'Kết hợp Next.js, Vercel AI SDK và FastAPI để dựng luồng streaming chỉ trong vài giờ.'
      }
    ],
    nodes: [
      {
        id: 'd6-n1',
        title: 'Xây dựng AI Prototype Thực chiến',
        icon: '🔒',
        unlockedIcon: '🏋️',
        type: 'Hackathon Sprint',
        mastery: 0,
        unlocked: false,
        subCodes: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'ALL']
      }
    ]
  },
  {
    id: 'day7',
    badge: 'Ngày 7',
    title: 'Ngày 7: Data Foundations - Embedding & Vector Store',
    desc: 'Chiến lược Chunking, Vector Similarity Search, Hybrid Search và kiến trúc RAG.',
    bannerBg: 'bg-slate-700',
    borderAccent: 'border-slate-700',
    ringAccent: 'ring-slate-200',
    unlockedByDefault: false,
    keyPoints: [
      {
        title: 'Semantic Chunking & Overlap',
        body: 'Cắt văn bản theo ngữ nghĩa kèm đoạn gối đầu (overlap) để không mất mạch văn khi truy xuất.'
      },
      {
        title: 'Hybrid Search (BM25 + Dense Vector)',
        body: 'Kết hợp tìm kiếm từ khóa chính xác và tương đồng ngữ nghĩa cùng Reranker.'
      }
    ],
    nodes: [
      {
        id: 'd7-n1',
        title: 'Embeddings, HNSW & Hybrid RAG',
        icon: '🔒',
        unlockedIcon: '📖',
        type: 'Hạ tầng Dữ liệu',
        mastery: 0,
        unlocked: false,
        subCodes: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'ALL']
      }
    ]
  },
  {
    id: 'day8',
    badge: 'Ôn tập',
    title: 'Ôn Tập Tổng Hợp Tuần 1',
    desc: 'Tổng kiểm tra toàn bộ kiến thức Tuần 1 và đánh giá năng lực thực chiến.',
    bannerBg: 'bg-cyan-600',
    borderAccent: 'border-cyan-600',
    ringAccent: 'ring-cyan-200',
    unlockedByDefault: false,
    keyPoints: [
      {
        title: 'Tổng hợp Kiến trúc LLM → RAG → Agent',
        body: 'Kết nối liền mạch từ nền tảng Transformer đến ứng dụng RAG và ReAct Agent có Guardrails.'
      }
    ],
    nodes: [
      {
        id: 'd8-n1',
        title: 'Đề Thi Tổng Hợp Tuần 1',
        icon: '🏆',
        unlockedIcon: '🏆',
        type: 'Kiểm tra tổng kết',
        mastery: 0,
        unlocked: false,
        subCodes: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'ALL']
      }
    ]
  }
];

export const TOTAL_SETS_COUNT = 46;

export const QUIZ_QUESTIONS_BANK: QuizQuestion[] = [
  {
    id: 'q1',
    q: 'Trong kiến trúc Transformer, tại sao phép tính Scaled Dot-Product Attention lại cần chia cho √d_k?',
    options: [
      'A. Để giảm dung lượng bộ nhớ VRAM khi lưu trữ ma trận trọng số.',
      'B. Để ngăn tích vô hướng Q·K^T phình quá lớn khi chiều d_k cao, tránh đẩy hàm Softmax vào vùng đạo hàm cực nhỏ (vanishing gradients).',
      'C. Để thay thế hoàn toàn lớp Layer Normalization phía sau mỗi khối.',
      'D. Để tự động cắt bỏ các token hiếm gặp trong câu đầu vào.'
    ],
    correct: 1,
    hint: 'Hãy nghĩ xem điều gì xảy ra với hàm mũ trong Softmax khi các giá trị đầu vào có phương sai rất lớn.',
    whyCorrect: 'Khi số chiều d_k lớn, tích vô hướng Q·K^T có phương sai tăng theo d_k, làm Softmax bão hòa về 0 hoặc 1 khiến gradient gần như triệt tiêu. Chia cho √d_k đưa phương sai về 1.',
    whyWrong: 'Phương án A sai vì phép chia vô hướng không giảm VRAM; C và D không liên quan đến vai trò chuẩn hóa phương sai của hệ số tỷ lệ.'
  },
  {
    id: 'q2',
    q: 'Khi thiết kế hệ thống RAG cho giáo dục (như Sapia AI), chiến lược Hybrid Search kết hợp hai thành phần nào để đạt độ chính xác cao nhất?',
    options: [
      'A. Kết hợp tìm kiếm từ khóa (BM25 / Sparse) và tìm kiếm tương đồng ngữ nghĩa (Dense Vector Embedding).',
      'B. Chỉ sử dụng Regex kết hợp với câu lệnh SQL LIKE.',
      'C. Tăng Temperature của LLM lên 1.5 để mô hình tự suy diễn thêm thông tin.',
      'D. Nén toàn bộ cơ sở dữ liệu vào một ảnh PNG duy nhất.'
    ],
    correct: 0,
    hint: 'Một bên mạnh về khớp chính xác thuật ngữ/mã lỗi, một bên mạnh về hiểu ý nghĩa tương đồng.',
    whyCorrect: 'BM25 bắt chính xác tên hàm, thuật ngữ chuyên ngành hoặc mã lỗi, trong khi Dense Vector nắm bắt ngữ nghĩa diễn đạt khác nhau.',
    whyWrong: 'Regex/SQL không hiểu ngữ nghĩa; tăng Temperature gây ảo giác (hallucination); nén ảnh không phải kỹ thuật truy xuất văn bản.'
  },
  {
    id: 'q3',
    q: 'Mẫu thiết kế (Design Pattern) ReAct trong AI Agent hoạt động theo chu trình cốt lõi nào?',
    options: [
      'A. Compile → Link → Execute.',
      'B. Thought (Suy luận) → Action (Gọi công cụ) → Observation (Quan sát kết quả).',
      'C. Map → Shuffle → Reduce.',
      'D. Encode → Compress → Decode.'
    ],
    correct: 1,
    hint: 'Tên gọi ReAct là viết tắt của Reasoning + Acting.',
    whyCorrect: 'ReAct xen kẽ bước suy luận nội tại (Thought) để chọn công cụ phù hợp (Action), sau đó đọc kết quả thực thi (Observation) để quyết định bước kế tiếp.',
    whyWrong: 'Các chu trình còn lại thuộc về trình biên dịch, xử lý dữ liệu phân tán MapReduce và nén dữ liệu.'
  },
  {
    id: 'q4',
    q: 'Trong quá trình sinh văn bản (Autoregressive Decoding) của LLM, kỹ thuật KV Cache giải quyết nút thắt nào?',
    options: [
      'A. Tự động dịch câu trả lời sang 50 ngôn ngữ cùng lúc.',
      'B. Tránh phải tính toán lại các vector Key và Value của những token đã xử lý ở các bước trước đó.',
      'C. Tăng gấp đôi kích thước từ điển của bộ Tokenizer.',
      'D. Thay thế hoàn toàn GPU bằng ổ cứng HDD.'
    ],
    correct: 1,
    hint: 'Ở bước sinh token thứ t+1, các token từ 1 đến t có thay đổi biểu diễn Key và Value không?',
    whyCorrect: 'Nhờ mặt nạ nhân quả (Causal Mask), Key và Value của các token quá khứ không đổi nên lưu vào bộ nhớ đệm (KV Cache) giúp giảm độ phức tạp mỗi bước sinh từ O(t²) xuống O(t).',
    whyWrong: 'KV Cache chỉ tối ưu tốc độ suy luận (inference latency), không dịch thuật hay thay đổi bộ từ điển.'
  },
  {
    id: 'q5',
    q: 'Khi người học yêu cầu AI Tutor "Làm hộ em toàn bộ bài tập về nhà này", cơ chế Socratic Guardrail cần phản hồi như thế nào?',
    options: [
      'A. Đưa ngay toàn bộ đáp án và code hoàn chỉnh để tiết kiệm thời gian.',
      'B. Từ chối giải hộ trực tiếp, đồng thời chia nhỏ vấn đề và đặt câu hỏi gợi mở để học viên tự suy luận bước đầu tiên.',
      'C. Ngắt kết nối máy chủ ngay lập tức.',
      'D. Trả về một đoạn văn bản ngẫu nhiên không liên quan.'
    ],
    correct: 1,
    hint: 'Phương pháp Socratic hướng tới việc khơi gợi tư duy của người học thông qua câu hỏi định hướng.',
    whyCorrect: 'Socratic Guardrail bảo vệ mục tiêu sư phạm: giữ tính trung thực học thuật và dẫn dắt người học tự khám phá lời giải qua từng gợi ý nhỏ.',
    whyWrong: 'Đưa đáp án ngay làm mất khả năng tự tư duy; ngắt kết nối hoặc trả lời ngẫu nhiên làm hỏng trải nghiệm học tập.'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { id: 'lb-1', name: 'Nguyễn Minh Trí', initials: 'MT', xpToday: 580, xpAll: 4250, color: 'bg-amber-500', cohort: 'AI20K Cohort 2' },
  { id: 'lb-2', name: 'Hoàng Hải Nam', initials: 'HN', xpToday: 510, xpAll: 3980, color: 'bg-slate-400', cohort: 'AI20K Cohort 2' },
  { id: 'lb-3', name: 'Trần Quỳnh Anh', initials: 'QA', xpToday: 460, xpAll: 3610, color: 'bg-orange-500', cohort: 'AI20K Cohort 2' },
  { id: 'lb-4', name: 'Phạm Minh Đức', initials: 'MĐ', xpToday: 320, xpAll: 2890, color: 'bg-emerald-600', cohort: 'AI20K Cohort 2' },
  { id: 'lb-5', name: 'Lê Thu Trang', initials: 'TT', xpToday: 270, xpAll: 2540, color: 'bg-blue-600', cohort: 'AI20K Cohort 2' },
  { id: 'lb-6', name: 'Đặng Tuấn Kiệt', initials: 'TK', xpToday: 210, xpAll: 2190, color: 'bg-purple-600', cohort: 'AI20K Cohort 2' },
  { id: 'lb-7', name: 'Ngô Gia Bảo', initials: 'GB', xpToday: 150, xpAll: 1840, color: 'bg-teal-600', cohort: 'AI20K Cohort 2' },
  { id: 'lb-8', name: 'Vũ Thảo Vy', initials: 'TV', xpToday: 90, xpAll: 1420, color: 'bg-rose-600', cohort: 'AI20K Cohort 2' },
  { id: 'lb-9', name: 'Lê Minh Quân', initials: 'MQ', xpToday: 40, xpAll: 980, color: 'bg-indigo-600', cohort: 'AI20K Cohort 2' }
];

export const SOCRATIC_DEMO_PRESETS = {
  welcome: {
    badge: 'SOCRATIC GREETING',
    content: `Xin chào! Mình là <strong>Sofi</strong> — Trợ lý Socratic AI của bạn. Chủ đề hiện tại là <strong>Docker Compose & Container Orchestration</strong>.<br/><br/>Thay vì đưa sẵn lời giải thụ động, mình sẽ đồng hành cùng bạn qua các câu hỏi định hướng dựa trên tài liệu bài giảng đã xác thực (Grounded RAG). Bạn muốn mình hỗ trợ theo chế độ nào hôm nay?`
  },
  guardrail: {
    badge: '🚨 GUARDRAIL TRIGGERED • ACADEMIC INTEGRITY',
    content: `<strong>[Chặn yêu cầu giải hộ trực tiếp]</strong> Mình nhận thấy bạn đang yêu cầu viết sẵn toàn bộ lời giải cho bài tập chấm điểm.<br/><br/>Theo giao thức <strong>Socratic Guardrail</strong> của Sapia AI, mình không thể cung cấp nguyên văn đáp án. Tuy nhiên, chúng ta hãy cùng bóc tách bước 1 nhé: <em>Trong file <code>docker-compose.yml</code> của bạn, hai service <code>web</code> và <code>redis</code> cần giao tiếp qua cổng nào?</em>`
  },
  fallback: {
    badge: '⚠️ LOW CONFIDENCE FALLBACK (SCORE: 0.41 < 0.75)',
    content: `<strong>[Cảnh báo độ tin cậy truy xuất thấp]</strong> Câu hỏi của bạn nằm ngoài phạm vi tài liệu chính thức của học phần <em>Tuần 1: AI & LLM Foundation</em>.<br/><br/>Để tránh hiện tượng ảo giác (Hallucination), Sofi tạm dừng suy diễn tự do. Bạn có muốn chuyển câu hỏi này tới <strong>Giảng viên hướng dẫn</strong> hoặc thu hẹp câu hỏi về chủ đề Docker Compose / Transformer không?`
  },
  rag_slide: {
    badge: '🦊 GROUNDED RAG • SLIDE #14 (DOCKER NETWORKING)',
    content: `Theo <strong>Slide 14 — Docker Compose Networking</strong>: Khi bạn chạy <code>docker compose up</code>, Docker tự động khởi tạo một <em>default bridge network</em> chung cho toàn bộ các service trong cùng file cấu hình.<br/><br/>💡 <strong>Câu hỏi Socratic cho bạn:</strong> Nhờ cơ chế DNS nội bộ này, container <code>backend</code> có thể gọi tới database bằng tên service (ví dụ <code>postgres:5432</code>) hay bắt buộc phải dùng địa chỉ IP cứng?`
  },
  sandbox_py: {
    badge: '💻 CLIENT SANDBOX • PYTHON TRACE',
    content: `Mình đã chạy thử hàm đệ quy tính giai thừa của bạn trong <strong>Client Sandbox</strong>:<br/><pre class="mt-2 p-3 rounded-xl bg-slate-900 text-green-300 font-mono text-xs overflow-x-auto">def factorial(n):\n    if n == 0: return 1\n    return n * factorial(n - 1)\n# Output: factorial(5) =&gt; 120 (Time: 0.04ms)</pre><div class="mt-2">Hãy thử suy nghĩ: Nếu người dùng truyền vào <code>n = -1</code> thì điều gì sẽ xảy ra với ngăn xếp lệnh (Call Stack)?</div>`
  },
  mini_quiz: {
    badge: '📝 ADAPTIVE MINI-QUIZ • NEXT.JS RSC',
    content: `<strong>Thử thách nhanh 30 giây (Elo 1100):</strong> Trong Next.js App Router, tại sao <em>React Server Components (RSC)</em> giúp giảm kích thước gói JavaScript tải về trình duyệt?<br/><br/>A. Vì RSC chỉ chạy trên trình duyệt bằng WebAssembly.<br/>B. Vì mã nguồn và thư viện phụ thuộc của RSC được thực thi trên Server và chỉ gửi kết quả tuần tự hóa (RSC Payload) về Client.`
  }
};
