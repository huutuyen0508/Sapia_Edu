'use client';

import React, { useState } from 'react';
import { useEduGapStore } from '@/store/useEduGapStore';
import { cn } from '@/lib/utils';

export default function SocraticAssistant() {
  const {
    socraticMode,
    setSocraticMode,
    socraticTopic,
    socraticMessages,
    sendSocraticMessage,
    triggerSocraticPreset,
    addToast
  } = useEduGapStore();

  const [inputVal, setInputVal] = useState('');

  const modes = [
    'Giải thích',
    'Gợi ý từng bước',
    'Sửa lỗi code',
    'Luyện tập',
    'Review bài làm'
  ];

  const presets = [
    { key: 'guardrail', label: '🚨 Kích hoạt Guardrail (Chống gian lận)', bg: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' },
    { key: 'fallback', label: '⚠️ Kích hoạt Fallback (Độ tin cậy thấp)', bg: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' },
    { key: 'rag_slide', label: '🦊 [Demo] RAG Slide: Docker Compose', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100' },
    { key: 'sandbox_py', label: '💻 [Demo] Sandbox: Giai thừa Python', bg: 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100' },
    { key: 'mini_quiz', label: '📝 [Demo] Quiz: Next.js RSC', bg: 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendSocraticMessage(inputVal.trim());
    setInputVal('');
  };

  const handleAttachFile = () => {
    addToast('Đã đính kèm tệp ngữ cảnh bài tập (docker-compose.yml) vào phiên hỏi đáp!');
  };

  return (
    <section className="space-y-4">
      {/* Top Sandbox Notice Banner */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
          <span>🧪</span>
          <span>Chế độ Demo: Giao thức RAG &amp; Sandbox thích ứng hoạt động tại Client</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-200/80 text-amber-900">
          SANDBOX MODE
        </span>
      </div>

      {/* Main Socratic Chat Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
        {/* Chat Topic Header */}
        <div className="p-4 sm:px-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/60">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif-title font-black text-lg text-slate-900">
                {socraticTopic}
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-800 text-[10px] font-extrabold uppercase">
                Grounded
              </span>
            </div>
            <p className="text-[11px] font-extrabold tracking-wider text-slate-500 uppercase mt-0.5">
              HỌC CHẾ THÍCH ỨNG: DEEP STYLE (ELO: 1100)
            </p>
          </div>

          {/* Action Mode Pills */}
          <div className="flex flex-wrap gap-1.5">
            {modes.map((mode) => {
              const isSelected = socraticMode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSocraticMode(mode)}
                  className={cn(
                    'px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer',
                    isSelected
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  )}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30">
          {socraticMessages.map((msg) => {
            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="flex justify-end animate-fadeIn">
                  <div className="max-w-lg bg-green-600 text-white px-4 py-3 rounded-2xl rounded-tr-none text-xs sm:text-sm font-medium shadow-sm leading-relaxed">
                    {msg.content}
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className="flex items-start gap-3 animate-fadeIn">
                <div className="w-10 h-10 rounded-2xl bg-green-600 text-white flex items-center justify-center text-lg shrink-0 shadow-sm">
                  🦉
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-extrabold text-xs text-slate-900">
                      Sofi — Socratic AI Assistant
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-extrabold text-[10px] uppercase">
                      {msg.badge || 'GROUNDED RAG'}
                    </span>
                  </div>
                  <div
                    className="text-xs sm:text-sm text-slate-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                  />
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addToast('Cảm ơn phản hồi đánh giá chất lượng câu trả lời của bạn!')}
                      className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-green-50 text-slate-500 hover:text-green-700 text-xs font-bold border border-slate-200 transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>👍</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addToast('Cảm ơn phản hồi! Hệ thống sẽ tinh chỉnh câu trả lời.')}
                      className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-700 text-xs font-bold border border-slate-200 transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>👎</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addToast('Đã gửi báo cáo kiểm tra trích dẫn RAG về hệ thống!', 'warn')}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-amber-50 text-slate-500 hover:text-amber-800 text-[10px] font-extrabold uppercase border border-slate-200 transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>BÁO LỖI TRÍCH DẪN</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Demo Preset Buttons */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200/80">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
            Kịch bản Demo Nhanh (Click để kiểm thử giao thức):
          </div>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset) => (
              <button
                key={preset.key}
                type="button"
                onClick={() => triggerSocraticPreset(preset.key)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer',
                  preset.bg
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="p-3 sm:px-5 border-t border-slate-200 bg-white"
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAttachFile}
              title="Đính kèm tài liệu/code"
              className="w-10 h-10 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 flex items-center justify-center shrink-0 transition cursor-pointer"
            >
              <span>📎</span>
            </button>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Hỏi Sofi về bài học (VD: Tại sao Transformer cần Positional Encoding?)..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-green-500 focus:bg-white transition"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shrink-0 shadow-sm transition active:scale-95 cursor-pointer"
            >
              <span>➤</span>
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-1">
            <span className="flex items-center gap-1.5">
              <span>✨</span>
              <span>SOCRATIC RAG V2 &nbsp;•&nbsp; ✓ GROUNDED LOGIC</span>
            </span>
            <span className="text-green-600">CHẾ ĐỘ: {socraticMode.toUpperCase()}</span>
          </div>
        </form>
      </div>
    </section>
  );
}
