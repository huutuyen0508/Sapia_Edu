'use client';

import React from 'react';
import Link from 'next/link';
import { ROADMAP_DAYS } from '@/data/curriculum';
import { useEduGapStore } from '@/store/useEduGapStore';
import RoadmapNodeItem from './RoadmapNodeItem';
import { cn } from '@/lib/utils';

export default function RoadmapView() {
  const {
    devMode,
    toggleDevMode,
    weekCollapsed,
    setWeekCollapsed,
    completedSets
  } = useEduGapStore();

  const weekProgressPct = Math.min(100, completedSets * 12);

  return (
    <section className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">✨</span>
          <h2 className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 uppercase">
            LỘ TRÌNH HỌC TẬP
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDevMode}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide border transition-all cursor-pointer',
              devMode
                ? 'bg-green-600 text-white border-green-700 shadow-sm'
                : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
            )}
          >
            {devMode ? 'DEV MODE: ON' : 'DEV MODE: OFF'}
          </button>
        </div>
      </div>

      {/* Week 1 Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-[11px] font-extrabold uppercase tracking-wide">
              <span>TUẦN HỌC HIỆN TẠI</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif-title font-black text-slate-900">
              Tuần 1: Nền Tảng AI &amp; LLM &amp; Prototyping
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nắm vững Transformer, xác định bài toán AI, Prompt Engineering, Agent ReAct,
              Prototype, và Vector Store.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setWeekCollapsed(!weekCollapsed)}
            className="self-start shrink-0 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs tracking-wide uppercase shadow-sm transition active:scale-95 cursor-pointer"
          >
            {weekCollapsed ? 'MỞ RỘNG' : 'THU GỌN'}
          </button>
        </div>

        {/* Week Progress Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
            <span>Tiến độ Tuần 1</span>
            <span className="text-green-600 font-extrabold">{weekProgressPct}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${weekProgressPct}%` }}
            />
          </div>
        </div>

        {/* Mascot Welcome Bubble */}
        <div className="mt-5 flex items-center gap-3.5 bg-green-50/80 border border-green-200/80 rounded-2xl p-3.5">
          <div className="w-11 h-11 rounded-2xl bg-green-600 flex items-center justify-center shrink-0 shadow-sm">
            <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="28" fill="#16a34a" />
              <path
                d="M18 22L23 15L28 20H36L41 15L46 22V42C46 47.5 40 51 32 51C24 51 18 47.5 18 42V22Z"
                fill="#ffffff"
              />
              <circle cx="25" cy="29" r="6" stroke="#0f172a" strokeWidth="2.5" fill="#fef08a" />
              <circle cx="39" cy="29" r="6" stroke="#0f172a" strokeWidth="2.5" fill="#fef08a" />
              <circle cx="25" cy="29" r="2.5" fill="#0f172a" />
              <circle cx="39" cy="29" r="2.5" fill="#0f172a" />
              <polygon points="32,33 28.5,38.5 35.5,38.5" fill="#f97316" />
            </svg>
          </div>
          <div className="text-xs sm:text-sm font-semibold text-slate-700">
            <span className="font-extrabold text-green-700">Sofi (Cú Thông Thái):</span> "Chào mừng
            bạn đến với tuần đầu tiên! Hãy bấm vào từng Node tròn bên dưới để chọn bộ đề C.1–C.5
            hoặc bật{' '}
            <span
              onClick={toggleDevMode}
              className="underline decoration-green-500 cursor-pointer font-bold text-green-800"
            >
              DEV MODE
            </span>{' '}
            để mở khóa toàn bộ lộ trình nhé."
          </div>
        </div>
      </div>

      {/* Days Roadmap List */}
      {!weekCollapsed && (
        <div className="space-y-8 animate-fadeIn">
          {ROADMAP_DAYS.map((day) => {
            const isDayUnlocked = devMode || day.unlockedByDefault;

            return (
              <div key={day.id} className="space-y-4">
                {/* Day Banner Card */}
                <div
                  className={cn(
                    'text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all',
                    day.bannerBg
                  )}
                >
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest bg-black/20 px-2.5 py-0.5 rounded-full">
                      <span>{day.badge}</span>
                      <span>•</span>
                      <span>
                        {isDayUnlocked ? 'ĐÃ MỞ KHÓA' : 'YÊU CẦU HOÀN THÀNH NGÀY TRƯỚC'}
                      </span>
                    </div>
                    <h4 className="font-serif-title font-black text-lg sm:text-xl">
                      {day.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xl">
                      {day.desc}
                    </p>
                  </div>
                  <Link
                    href={`/guidebook/${day.id}`}
                    className="self-start sm:self-center shrink-0 px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition"
                  >
                    <span>📘</span>
                    <span>GUIDEBOOK</span>
                  </Link>
                </div>

                {/* Vertical Dotted Connector with Zigzag Nodes */}
                <div className="node-connector py-4 flex flex-col items-center gap-7">
                  {day.nodes.map((node, nodeIdx) => (
                    <RoadmapNodeItem
                      key={node.id}
                      day={day}
                      node={node}
                      nodeIndex={nodeIdx}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
