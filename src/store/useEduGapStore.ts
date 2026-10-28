import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QUIZ_QUESTIONS_BANK, QuizQuestion, TOTAL_SETS_COUNT } from '@/data/curriculum';

export interface UserProfile {
  name: string;
  studentId: string;
  initials: string;
}

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'warn' | 'info';
}

export interface QuizSessionState {
  isOpen: boolean;
  dayId: string;
  nodeId: string;
  subCode: string;
  dayTitle: string;
  questions: QuizQuestion[];
  currentIndex: number;
  answered: boolean;
  selectedOption: number | null;
  correctCount: number;
  hintsRemaining: number;
  hintVisible: boolean;
  drawerOpen: boolean;
  drawerMessages: Array<{ sender: 'user' | 'tutor'; text: string; time: string }>;
}

export interface EduGapState {
  // Gamification metrics
  xp: number;
  streak: number;
  elo: number;
  completedSets: number;
  totalSets: number;
  completedSetIds: string[];
  nodeMastery: Record<string, number>;

  // UI state
  devMode: boolean;
  weekCollapsed: boolean;
  expandedNodeId: string | null;
  userProfile: UserProfile | null;
  authModalOpen: boolean;
  isLoginMode: boolean;
  toasts: ToastItem[];

  // Survey state
  surveyModalOpen: boolean;
  surveyStarRating: number;
  pendingQuizMeta: {
    dayId: string;
    nodeId: string;
    subCode: string;
    dayTitle: string;
    nodeTitle: string;
  } | null;

  // Active quiz session
  activeQuiz: QuizSessionState;

  // Socratic Tutor state
  socraticMode: string;
  socraticTopic: string;
  socraticMessages: Array<{
    id: string;
    sender: 'user' | 'ai';
    content: string;
    badge?: string;
  }>;

  // Leaderboard filter
  leaderboardTab: 'today' | 'alltime';

  // Actions
  addToast: (message: string, type?: 'success' | 'warn' | 'info') => void;
  removeToast: (id: string) => void;
  toggleDevMode: () => void;
  setWeekCollapsed: (collapsed: boolean) => void;
  setExpandedNodeId: (nodeId: string | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  loginBypass: () => void;
  logout: () => void;
  openAuthModal: (isLogin?: boolean) => void;
  closeAuthModal: () => void;
  setIsLoginMode: (isLogin: boolean) => void;

  openSurveyModal: (meta: {
    dayId: string;
    nodeId: string;
    subCode: string;
    dayTitle: string;
    nodeTitle: string;
  }) => void;
  closeSurveyModal: () => void;
  setSurveyStarRating: (rating: number) => void;
  startQuizFromSurvey: () => void;

  answerQuiz: (selectedIdx: number) => { isCorrect: boolean; deltaElo: number };
  nextQuestion: () => void;
  exitQuiz: () => void;
  triggerAiHint: () => void;
  toggleQuizDrawer: (force?: boolean) => void;
  sendDrawerMessage: (text: string) => void;

  setSocraticMode: (mode: string) => void;
  setSocraticTopic: (topic: string) => void;
  sendSocraticMessage: (text: string) => void;
  triggerSocraticPreset: (presetKey: string) => void;
  resetSocraticChat: () => void;

  setLeaderboardTab: (tab: 'today' | 'alltime') => void;
}

const initialQuizState: QuizSessionState = {
  isOpen: false,
  dayId: 'day1',
  nodeId: 'd1-n1',
  subCode: 'C.1',
  dayTitle: 'Ngày 1',
  questions: QUIZ_QUESTIONS_BANK,
  currentIndex: 0,
  answered: false,
  selectedOption: null,
  correctCount: 0,
  hintsRemaining: 3,
  hintVisible: false,
  drawerOpen: false,
  drawerMessages: [
    {
      sender: 'tutor',
      text: 'Chào bạn! Mình sẽ không đưa sẵn đáp án A/B/C/D mà sẽ đặt câu hỏi gợi mở giúp bạn tự suy luận ra bản chất nhé.',
      time: 'Ngay bây giờ'
    }
  ]
};

export const useEduGapStore = create<EduGapState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 0,
      elo: 1200,
      completedSets: 0,
      totalSets: TOTAL_SETS_COUNT,
      completedSetIds: [],
      nodeMastery: {
        'd1-n1': 0,
        'd1-n2': 0,
        'd2-n1': 0,
        'd2-n2': 0,
        'd3-n1': 0,
        'd4-n1': 0,
        'd5-n1': 0,
        'd6-n1': 0,
        'd7-n1': 0,
        'd8-n1': 0
      },

      devMode: false,
      weekCollapsed: false,
      expandedNodeId: 'd1-n1',
      userProfile: null,
      authModalOpen: false,
      isLoginMode: false,
      toasts: [],

      surveyModalOpen: false,
      surveyStarRating: 0,
      pendingQuizMeta: null,

      activeQuiz: initialQuizState,

      socraticMode: 'Giải thích',
      socraticTopic: 'Docker Compose',
      socraticMessages: [
        {
          id: 'welcome',
          sender: 'ai',
          badge: 'SOCRATIC GREETING',
          content: `Xin chào! Mình là <strong>Sofi</strong> — Trợ lý Socratic AI của bạn. Chủ đề hiện tại là <strong>Docker Compose & Container Orchestration</strong>.<br/><br/>Thay vì đưa sẵn lời giải thụ động, mình sẽ đồng hành cùng bạn qua các câu hỏi định hướng dựa trên tài liệu bài giảng đã xác thực (Grounded RAG). Bạn muốn mình hỗ trợ theo chế độ nào hôm nay?`
        }
      ],

      leaderboardTab: 'today',

      addToast: (message, type = 'success') => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
          toasts: [...state.toasts, { id, message, type }]
        }));
        setTimeout(() => {
          get().removeToast(id);
        }, 3000);
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id)
        }));
      },

      toggleDevMode: () => {
        const next = !get().devMode;
        set({ devMode: next });
        get().addToast(
          next
            ? 'Đã bật DEV MODE: Mở khóa toàn bộ 8 Ngày học và tất cả các Node bài tập!'
            : 'Đã tắt DEV MODE: Quay về chế độ mở khóa tuần tự.',
          next ? 'success' : 'warn'
        );
      },

      setWeekCollapsed: (collapsed) => set({ weekCollapsed: collapsed }),
      setExpandedNodeId: (nodeId) => set({ expandedNodeId: nodeId }),

      setUserProfile: (profile) => {
        set({ userProfile: profile });
        if (profile) {
          get().addToast(`Chào mừng ${profile.name}! Đã đồng bộ hồ sơ học tập.`);
        }
      },

      loginBypass: () => {
        const demoUser: UserProfile = {
          name: 'Hoàng Blue (Demo)',
          studentId: 'SE190888',
          initials: 'HB'
        };
        set((state) => ({
          userProfile: demoUser,
          authModalOpen: false,
          streak: state.streak === 0 ? 3 : state.streak,
          xp: state.xp === 0 ? 120 : state.xp
        }));
        get().addToast(`Chào mừng ${demoUser.name}! Đã đăng nhập nhanh.`);
      },

      logout: () => {
        set({ userProfile: null });
        get().addToast('Đã đăng xuất khỏi Sapia AI Portal.');
      },

      openAuthModal: (isLogin = false) =>
        set({ authModalOpen: true, isLoginMode: isLogin }),

      closeAuthModal: () => set({ authModalOpen: false }),

      setIsLoginMode: (isLogin) => set({ isLoginMode: isLogin }),

      openSurveyModal: (meta) => {
        set({
          surveyModalOpen: true,
          pendingQuizMeta: meta,
          surveyStarRating: 0
        });
      },

      closeSurveyModal: () => {
        set({ surveyModalOpen: false });
      },

      setSurveyStarRating: (rating) => {
        set({ surveyStarRating: rating });
      },

      startQuizFromSurvey: () => {
        const meta = get().pendingQuizMeta;
        if (!meta) return;

        set({
          surveyModalOpen: false,
          activeQuiz: {
            ...initialQuizState,
            isOpen: true,
            dayId: meta.dayId,
            nodeId: meta.nodeId,
            subCode: meta.subCode,
            dayTitle: meta.dayTitle,
            questions: QUIZ_QUESTIONS_BANK
          }
        });
      },

      answerQuiz: (selectedIdx) => {
        const quiz = get().activeQuiz;
        if (quiz.answered) return { isCorrect: false, deltaElo: 0 };

        const currentQ = quiz.questions[quiz.currentIndex];
        const isCorrect = selectedIdx === currentQ.correct;
        const prevElo = get().elo;
        let deltaElo = 0;

        if (isCorrect) {
          deltaElo = 15;
          set((state) => ({
            elo: state.elo + 15,
            xp: state.xp + 20,
            activeQuiz: {
              ...state.activeQuiz,
              answered: true,
              selectedOption: selectedIdx,
              correctCount: state.activeQuiz.correctCount + 1
            }
          }));
        } else {
          deltaElo = -5;
          set((state) => ({
            elo: Math.max(1000, state.elo - 5),
            activeQuiz: {
              ...state.activeQuiz,
              answered: true,
              selectedOption: selectedIdx
            }
          }));
        }

        return { isCorrect, deltaElo };
      },

      nextQuestion: () => {
        const quiz = get().activeQuiz;
        if (quiz.currentIndex < quiz.questions.length - 1) {
          set((state) => ({
            activeQuiz: {
              ...state.activeQuiz,
              currentIndex: state.activeQuiz.currentIndex + 1,
              answered: false,
              selectedOption: null,
              hintVisible: false
            }
          }));
        } else {
          // Finish quiz
          const setKey = `${quiz.dayId}-${quiz.nodeId}:${quiz.subCode}`;
          const isNewCompletion = !get().completedSetIds.includes(setKey);

          set((state) => {
            const nextSets = isNewCompletion
              ? state.completedSets + 1
              : state.completedSets;
            const nextIds = isNewCompletion
              ? [...state.completedSetIds, setKey]
              : state.completedSetIds;
            const currentMastery = state.nodeMastery[quiz.nodeId] || 0;

            return {
              completedSets: nextSets,
              completedSetIds: nextIds,
              streak: state.streak === 0 ? 1 : state.streak,
              xp: state.xp + 30,
              nodeMastery: {
                ...state.nodeMastery,
                [quiz.nodeId]: Math.min(100, currentMastery + 25)
              },
              activeQuiz: {
                ...state.activeQuiz,
                isOpen: false
              }
            };
          });

          get().addToast(
            `Hoàn thành bộ đề ${quiz.subCode}! Đúng ${quiz.correctCount}/${quiz.questions.length} câu • +50 XP tổng thưởng!`,
            'success'
          );
        }
      },

      exitQuiz: () => {
        set((state) => ({
          activeQuiz: {
            ...state.activeQuiz,
            isOpen: false
          }
        }));
      },

      triggerAiHint: () => {
        const quiz = get().activeQuiz;
        if (quiz.hintsRemaining <= 0) {
          get().addToast('Bạn đã sử dụng hết 3 lượt AI Hint trong bộ đề này!', 'warn');
          return;
        }

        if (!quiz.hintVisible) {
          set((state) => ({
            activeQuiz: {
              ...state.activeQuiz,
              hintsRemaining: state.activeQuiz.hintsRemaining - 1,
              hintVisible: true
            }
          }));
        }
      },

      toggleQuizDrawer: (force) => {
        set((state) => ({
          activeQuiz: {
            ...state.activeQuiz,
            drawerOpen: typeof force === 'boolean' ? force : !state.activeQuiz.drawerOpen
          }
        }));
      },

      sendDrawerMessage: (text) => {
        const quiz = get().activeQuiz;
        const currentQ = quiz.questions[quiz.currentIndex];

        set((state) => ({
          activeQuiz: {
            ...state.activeQuiz,
            drawerMessages: [
              ...state.activeQuiz.drawerMessages,
              { sender: 'user', text, time: 'Vừa xong' },
              {
                sender: 'tutor',
                text: `Câu hỏi rất hay! Thay vì nhìn vào kết quả cuối, bạn hãy thử suy nghĩ: "${currentQ.hint}" — từ đó loại trừ các phương án không liên quan trước nhé!`,
                time: 'Vừa xong'
              }
            ]
          }
        }));
      },

      setSocraticMode: (mode) => {
        set({ socraticMode: mode });
        get().addToast(`Đã chuyển Trợ lý Socratic sang chế độ: ${mode}`);
      },

      setSocraticTopic: (topic) => {
        set({ socraticTopic: topic });
        set((state) => ({
          socraticMessages: [
            ...state.socraticMessages,
            {
              id: Math.random().toString(),
              sender: 'ai',
              badge: `CHỦ ĐỀ: ${topic.toUpperCase()}`,
              content: `Đã chuyển ngữ cảnh RAG sang chủ đề <strong>${topic}</strong>. Bạn muốn thảo luận khía cạnh nào của bài học này?`
            }
          ]
        }));
      },

      sendSocraticMessage: (text) => {
        const state = get();
        const userMsgId = Math.random().toString();
        const aiMsgId = Math.random().toString();

        set((s) => ({
          socraticMessages: [
            ...s.socraticMessages,
            { id: userMsgId, sender: 'user', content: text }
          ]
        }));

        setTimeout(() => {
          set((s) => ({
            socraticMessages: [
              ...s.socraticMessages,
              {
                id: aiMsgId,
                sender: 'ai',
                badge: `SOCRATIC • ${state.socraticMode.toUpperCase()}`,
                content: `Ở chế độ <strong>${state.socraticMode}</strong> cho chủ đề <em>${state.socraticTopic}</em>: Câu hỏi của bạn chạm đúng trọng tâm! Trước khi mình tổng hợp công thức cuối cùng, theo bạn yếu tố nào quyết định chi phí tính toán lớn nhất trong tình huống này?`
              }
            ]
          }));
        }, 300);
      },

      triggerSocraticPreset: (presetKey) => {
        const userMsgId = Math.random().toString();
        const aiMsgId = Math.random().toString();
        const presets: Record<string, { badge: string; content: string; label: string }> = {
          guardrail: {
            label: '🚨 Kích hoạt Guardrail (Chống gian lận)',
            badge: '🚨 GUARDRAIL TRIGGERED • ACADEMIC INTEGRITY',
            content: `<strong>[Chặn yêu cầu giải hộ trực tiếp]</strong> Mình nhận thấy bạn đang yêu cầu viết sẵn toàn bộ lời giải cho bài tập chấm điểm.<br/><br/>Theo giao thức <strong>Socratic Guardrail</strong> của Sapia AI, mình không thể cung cấp nguyên văn đáp án. Tuy nhiên, chúng ta hãy cùng bóc tách bước 1 nhé: <em>Trong file <code>docker-compose.yml</code> của bạn, hai service <code>web</code> và <code>redis</code> cần giao tiếp qua cổng nào?</em>`
          },
          fallback: {
            label: '⚠️ Kích hoạt Fallback (Độ tin cậy thấp)',
            badge: '⚠️ LOW CONFIDENCE FALLBACK (SCORE: 0.41 < 0.75)',
            content: `<strong>[Cảnh báo độ tin cậy truy xuất thấp]</strong> Câu hỏi của bạn nằm ngoài phạm vi tài liệu chính thức của học phần <em>Tuần 1: AI & LLM Foundation</em>.<br/><br/>Để tránh hiện tượng ảo giác (Hallucination), Sofi tạm dừng suy diễn tự do. Bạn có muốn chuyển câu hỏi này tới <strong>Giảng viên hướng dẫn</strong> hoặc thu hẹp câu hỏi về chủ đề Docker Compose / Transformer không?`
          },
          rag_slide: {
            label: '🦊 [Demo] RAG Slide: Docker Compose',
            badge: '🦊 GROUNDED RAG • SLIDE #14 (DOCKER NETWORKING)',
            content: `Theo <strong>Slide 14 — Docker Compose Networking</strong>: Khi bạn chạy <code>docker compose up</code>, Docker tự động khởi tạo một <em>default bridge network</em> chung cho toàn bộ các service trong cùng file cấu hình.<br/><br/>💡 <strong>Câu hỏi Socratic cho bạn:</strong> Nhờ cơ chế DNS nội bộ này, container <code>backend</code> có thể gọi tới database bằng tên service (ví dụ <code>postgres:5432</code>) hay bắt buộc phải dùng địa chỉ IP cứng?`
          },
          sandbox_py: {
            label: '💻 [Demo] Sandbox: Giai thừa Python',
            badge: '💻 CLIENT SANDBOX • PYTHON TRACE',
            content: `Mình đã chạy thử hàm đệ quy tính giai thừa của bạn trong <strong>Client Sandbox</strong>:<br/><pre class="mt-2 p-3 rounded-xl bg-slate-900 text-green-300 font-mono text-xs overflow-x-auto">def factorial(n):\n    if n == 0: return 1\n    return n * factorial(n - 1)\n# Output: factorial(5) =&gt; 120 (Time: 0.04ms)</pre><div class="mt-2">Hãy thử suy nghĩ: Nếu người dùng truyền vào <code>n = -1</code> thì điều gì sẽ xảy ra với ngăn xếp lệnh (Call Stack)?</div>`
          },
          mini_quiz: {
            label: '📝 [Demo] Quiz: Next.js RSC',
            badge: '📝 ADAPTIVE MINI-QUIZ • NEXT.JS RSC',
            content: `<strong>Thử thách nhanh 30 giây (Elo 1100):</strong> Trong Next.js App Router, tại sao <em>React Server Components (RSC)</em> giúp giảm kích thước gói JavaScript tải về trình duyệt?<br/><br/>A. Vì RSC chỉ chạy trên trình duyệt bằng WebAssembly.<br/>B. Vì mã nguồn và thư viện phụ thuộc của RSC được thực thi trên Server và chỉ gửi kết quả tuần tự hóa (RSC Payload) về Client.`
          }
        };

        const target = presets[presetKey];
        if (!target) return;

        set((s) => ({
          socraticMessages: [
            ...s.socraticMessages,
            { id: userMsgId, sender: 'user', content: `Kích hoạt kịch bản kiểm thử: ${target.label}` }
          ]
        }));

        setTimeout(() => {
          set((s) => ({
            socraticMessages: [
              ...s.socraticMessages,
              { id: aiMsgId, sender: 'ai', badge: target.badge, content: target.content }
            ]
          }));
        }, 250);
      },

      resetSocraticChat: () => {
        set({
          socraticMessages: [
            {
              id: 'new_session',
              sender: 'ai',
              badge: 'PHIÊN HỘI THOẠI MỚI',
              content: `Xin chào! Mình là <strong>Sofi</strong> — Trợ lý Socratic AI của bạn. Chủ đề hiện tại là <strong>${get().socraticTopic}</strong>. Hãy đặt câu hỏi hoặc chọn một kịch bản demo bên dưới nhé!`
            }
          ]
        });
        get().addToast('Đã tạo cuộc hội thoại Socratic mới!');
      },

      setLeaderboardTab: (tab) => set({ leaderboardTab: tab })
    }),
    {
      name: 'sapia-edugap-storage',
      partialize: (state) => ({
        xp: state.xp,
        streak: state.streak,
        elo: state.elo,
        completedSets: state.completedSets,
        completedSetIds: state.completedSetIds,
        nodeMastery: state.nodeMastery,
        devMode: state.devMode,
        userProfile: state.userProfile
      })
    }
  )
);
