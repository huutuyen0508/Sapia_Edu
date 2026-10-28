'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useEduGapStore } from '@/store/useEduGapStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function QuizModal() {
  const {
    activeQuiz,
    elo,
    exitQuiz,
    answerQuiz,
    nextQuestion,
    triggerAiHint,
    toggleQuizDrawer,
    sendDrawerMessage,
    addToast
  } = useEduGapStore();

  const [drawerInput, setDrawerInput] = useState('');
  const [lastDelta, setLastDelta] = useState<number | null>(null);

  const {
    isOpen,
    questions,
    currentIndex,
    answered,
    selectedOption,
    hintsRemaining,
    hintVisible,
    drawerOpen,
    drawerMessages,
    dayTitle,
    subCode
  } = activeQuiz;

  const currentQ = questions[currentIndex] || questions[0];
  const isCorrect = answered && selectedOption === currentQ.correct;
  const isSkip = answered && selectedOption === -1;
  const letters = ['A', 'B', 'C', 'D'];

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;

      if (['1', '2', '3', '4'].includes(e.key) && !answered) {
        const idx = Number(e.key) - 1;
        handleAnswer(idx);
      } else if (e.key === 'Enter' && answered) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, answered, currentIndex]);

  if (!isOpen || !currentQ) return null;

  const handleAnswer = (idx: number) => {
    if (answered) return;
    const res = answerQuiz(idx);
    setLastDelta(res.deltaElo);

    if (res.isCorrect) {
      // Fire confetti burst for right answer!
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch {
        // gracefully ignore if canvas context unavailable
      }
    }
  };

  const handleNext = () => {
    if (!answered) return;
    if (currentIndex === questions.length - 1) {
      // Final quiz celebration
      try {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.6 }
        });
      } catch {}
    }
    nextQuestion();
    setLastDelta(null);
  };

  const handleSendDrawer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!drawerInput.trim()) return;
    sendDrawerMessage(drawerInput.trim());
    setDrawerInput('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-[#f8fafc] overflow-hidden animate-fadeIn"
    >
      {/* Segmented Top Progress Bar */}
      <div className="w-full grid grid-cols-5 gap-1.5 px-4 pt-3 bg-white">
        {questions.map((_, idx) => {
          let color = 'bg-slate-200';
          if (idx < currentIndex) color = 'bg-orange-500';
          else if (idx === currentIndex) color = 'bg-orange-400 animate-pulse';
          return <div key={idx} className={cn('h-2 rounded-full transition-all', color)} />;
        })}
      </div>

      {/* Quiz Header Controls */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={exitQuiz}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition cursor-pointer"
          >
            <span>✕</span>
          </button>
          <span className="px-3 py-1 rounded-xl bg-orange-100 text-orange-800 font-extrabold text-xs">
            Câu {currentIndex + 1}/{questions.length}
          </span>
          <span className="hidden sm:inline-block px-3 py-1 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs">
            Từ: {dayTitle} ({subCode})
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 rounded-xl bg-green-50 border border-green-200 text-green-700 font-extrabold text-xs">
            Elo: {elo}
          </span>
          <button
            type="button"
            onClick={() => addToast('Đã sao chép liên kết câu hỏi hiện tại vào clipboard!')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 flex items-center gap-1.5 transition cursor-pointer"
          >
            <span>Chia sẻ</span>
          </button>
        </div>
      </div>

      {/* Main Quiz Body + Socratic AI Tutor Drawer */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Center Question & Options Scroll Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* AI Hint Banner */}
            {hintVisible && (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-900 flex items-start gap-3 animate-fadeIn">
                <span className="text-xl">💡</span>
                <div>
                  <div className="font-extrabold uppercase text-[11px] tracking-wider text-amber-700">
                    Gợi ý Socratic từ Sofi
                  </div>
                  <p className="mt-0.5 leading-relaxed">{currentQ.hint}</p>
                </div>
              </div>
            )}

            {/* Question Heading Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
              <h2 className="font-serif-title font-bold text-lg sm:text-xl text-slate-900 leading-relaxed">
                {currentQ.q}
              </h2>
            </div>

            {/* 2x2 Answer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {currentQ.options.map((optText, idx) => {
                const isSelected = selectedOption === idx;
                const isOptionCorrect = idx === currentQ.correct;

                let cardStyle =
                  'bg-white border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 text-slate-800 shadow-sm';

                if (answered) {
                  if (isOptionCorrect) {
                    cardStyle =
                      'bg-green-50 border-2 border-green-600 text-green-900 shadow-sm';
                  } else if (isSelected && !isOptionCorrect) {
                    cardStyle =
                      'bg-rose-50 border-2 border-rose-500 text-rose-900 opacity-90';
                  } else {
                    cardStyle =
                      'bg-slate-50 border border-slate-200 text-slate-500 opacity-55';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={answered}
                    onClick={() => handleAnswer(idx)}
                    className={cn(
                      'text-left p-4 sm:p-5 rounded-2xl transition flex items-start gap-3.5 cursor-pointer',
                      cardStyle
                    )}
                  >
                    <span
                      className={cn(
                        'w-8 h-8 rounded-xl font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 transition',
                        answered && isOptionCorrect
                          ? 'bg-green-600 text-white'
                          : answered && isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-amber-100 text-amber-900'
                      )}
                    >
                      {letters[idx]}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold leading-relaxed">
                      {optText.replace(/^[A-D]\.\s*/, '')}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Skip Question Link */}
            {!answered && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => handleAnswer(-1)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Chưa biết? Bỏ qua câu này để xem đáp án
                </button>
              </div>
            )}

            {/* Answer Validation & Detailed Explanation Box */}
            {answered && (
              <div
                className={cn(
                  'rounded-3xl border-2 p-5 sm:p-6 space-y-4 animate-fadeIn',
                  isCorrect
                    ? 'bg-green-50/90 border-green-300'
                    : 'bg-amber-50/90 border-amber-300'
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-extrabold uppercase',
                        isCorrect
                          ? 'bg-green-600 text-white'
                          : 'bg-amber-600 text-white'
                      )}
                    >
                      {isCorrect ? 'Chuẩn xác' : isSkip ? 'Đã bỏ qua' : 'Chưa chính xác'}
                    </span>
                    {lastDelta !== null && (
                      <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-extrabold text-slate-700">
                        Elo:{' '}
                        {lastDelta >= 0
                          ? `${elo - lastDelta} -> ${elo} (+${lastDelta})`
                          : `${elo - lastDelta} -> ${elo} (${lastDelta})`}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    🦊 AI Tutor:{' '}
                    {isCorrect
                      ? '"Lựa chọn tuyệt vời! Bạn đang nắm rất chắc bản chất kỹ thuật."'
                      : '"Đừng lo nhé! Hãy đọc kỹ phần phân tích bên dưới để hiểu rõ cơ chế."'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/90 rounded-2xl p-4 border border-green-200 space-y-1">
                    <div className="text-xs font-extrabold text-green-700 uppercase">
                      ✓ TẠI SAO ĐÚNG ({letters[currentQ.correct]})
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {currentQ.whyCorrect}
                    </p>
                  </div>
                  <div className="bg-white/90 rounded-2xl p-4 border border-slate-200 space-y-1">
                    <div className="text-xs font-extrabold text-rose-700 uppercase">
                      ✕ TẠI SAO PHƯƠNG ÁN KHÁC CHƯA TỐI ƯU
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {currentQ.whyWrong}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Socratic AI Tutor Drawer */}
        {drawerOpen && (
          <aside className="w-full sm:w-96 bg-white border-l border-slate-200 flex flex-col justify-between shrink-0 z-20 animate-fadeIn">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-green-600 text-white flex items-center justify-center text-lg shadow-xs">
                  🦊
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-slate-900">AI Tutor</span>
                    <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[9px] font-extrabold uppercase">
                      ONLINE
                    </span>
                  </div>
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    SOCRATIC MODE
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500">
                  Gợi ý đã dùng: {3 - hintsRemaining}/3
                </span>
                <button
                  type="button"
                  onClick={() => toggleQuizDrawer(false)}
                  className="w-7 h-7 rounded-lg bg-slate-200/70 hover:bg-slate-300 text-slate-700 text-xs font-bold flex items-center justify-center cursor-pointer"
                >
                  <span>✕</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40 text-xs">
              {drawerMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'p-3.5 rounded-2xl shadow-sm text-xs leading-relaxed',
                    msg.sender === 'user'
                      ? 'bg-green-600 text-white ml-6 font-medium'
                      : 'bg-white border border-slate-200 mr-4 text-slate-700 space-y-1'
                  )}
                >
                  {msg.sender === 'tutor' && (
                    <div className="font-extrabold text-green-700 text-[11px]">
                      🦊 Sofi (Socratic Mode)
                    </div>
                  )}
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendDrawer}
              className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={drawerInput}
                onChange={(e) => setDrawerInput(e.target.value)}
                placeholder="Hỏi trợ lý Socratic..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-green-600 transition"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs transition cursor-pointer"
              >
                Gửi
              </button>
            </form>
          </aside>
        )}
      </div>

      {/* Quiz Footer Bar */}
      <div className="bg-white border-t border-slate-200 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleQuizDrawer()}
            className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-extrabold text-xs transition cursor-pointer"
          >
            {drawerOpen ? 'Đóng AI Tutor 🦊' : 'Hỏi AI Tutor 🦊'}
          </button>
          <button
            type="button"
            onClick={triggerAiHint}
            className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-extrabold text-xs transition cursor-pointer"
          >
            <span>✨ AI Hint ({hintsRemaining})</span>
          </button>
        </div>

        <div className="hidden lg:block text-[11px] font-semibold text-slate-400">
          Mẹo: Bấm <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded text-slate-700">1</kbd>{' '}
          <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded text-slate-700">2</kbd>{' '}
          <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded text-slate-700">3</kbd>{' '}
          <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded text-slate-700">4</kbd> để
          chọn nhanh |{' '}
          <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded text-slate-700">Enter</kbd> để
          tiếp tục
        </div>

        <Button
          type="button"
          disabled={!answered}
          variant={answered ? '3d-orange' : 'secondary'}
          className="px-6 py-2.5 text-xs uppercase tracking-wider"
          onClick={handleNext}
        >
          {currentIndex === questions.length - 1 ? 'HOÀN THÀNH BỘ ĐỀ ->' : 'TIẾP TỤC ->'}
        </Button>
      </div>
    </div>
  );
}
