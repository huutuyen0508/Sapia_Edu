'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEduGapStore } from '@/store/useEduGapStore';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const pathname = usePathname();
  const {
    elo,
    openAuthModal,
    userProfile,
    socraticTopic,
    setSocraticTopic,
    resetSocraticChat
  } = useEduGapStore();

  const isTutorPage = pathname === '/tutor';

  const navItems = [
    { href: '/', label: 'HỌC TẬP', icon: '📖', active: pathname === '/' || pathname.startsWith('/guidebook') },
    { href: '/tutor', label: 'TRỢ LÝ AI', icon: '💬', active: pathname === '/tutor' },
    { href: '/leaderboard', label: 'XẾP HẠNG', icon: '🏆', active: pathname === '/leaderboard' },
    {
      href: '#profile',
      label: 'CÁ NHÂN',
      icon: '👤',
      active: false,
      onClick: () => openAuthModal(false)
    }
  ];

  return (
    <aside className="w-full lg:w-64 xl:w-72 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 shrink-0 flex flex-col justify-between lg:sticky lg:top-0 lg:h-screen z-20">
      <div className="p-4 lg:p-6 overflow-y-auto">
        {/* Brand Logo (Desktop) */}
        <Link href="/" className="hidden lg:flex items-center gap-3 mb-8 cursor-pointer group">
          <div className="w-11 h-11 rounded-2xl bg-green-600 flex items-center justify-center shadow-md shadow-green-600/20 group-hover:scale-105 transition-transform">
            <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="28" fill="#16a34a" />
              <path
                d="M18 22L23 15L28 20H36L41 15L46 22V42C46 47.5 40 51 32 51C24 51 18 47.5 18 42V22Z"
                fill="#ffffff"
              />
              <circle cx="25" cy="29" r="6.5" stroke="#0f172a" strokeWidth="2.5" fill="#fef08a" />
              <circle cx="39" cy="29" r="6.5" stroke="#0f172a" strokeWidth="2.5" fill="#fef08a" />
              <circle cx="25" cy="29" r="2.5" fill="#0f172a" />
              <circle cx="39" cy="29" r="2.5" fill="#0f172a" />
              <line x1="31.5" y1="29" x2="32.5" y2="29" stroke="#0f172a" strokeWidth="2.5" />
              <polygon points="32,33 28.5,38.5 35.5,38.5" fill="#f97316" />
            </svg>
          </div>
          <div>
            <h1 className="font-serif-title font-black text-xl text-slate-900 tracking-tight leading-none">
              Sapia AI
            </h1>
            <p className="text-[10px] font-extrabold tracking-[0.18em] text-green-600 uppercase mt-1">
              VIBRANT LEARNING
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0" aria-label="Main Navigation">
          {navItems.map((item) => {
            if (item.onClick) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.onClick}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-100 transition-all whitespace-nowrap border border-transparent w-full text-left cursor-pointer"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap',
                  item.active
                    ? 'bg-green-50 text-green-700 border border-green-200 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                )}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Socratic AI Contextual Sub-Sidebar (Shown when TRỢ LÝ AI is active) */}
        {isTutorPage && (
          <div className="mt-6 pt-5 border-t border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                TRỢ LÝ SOCRATIC
              </span>
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                RAG v2
              </span>
            </div>
            <button
              type="button"
              onClick={resetSocraticChat}
              className="w-full py-2.5 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
            >
              <span>+ CUỘC HỘI THOẠI MỚI</span>
            </button>
            <div className="mt-4">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                LỊCH SỬ HỎI ĐÁP
              </div>
              <div className="space-y-1.5">
                {[
                  { topic: 'Docker Compose & Network', icon: '🐳', elo: 1100 },
                  { topic: 'Transformer Self-Attention', icon: '🧠', elo: 1120 },
                  { topic: 'ReAct Agent Loop', icon: '🤖', elo: 1150 }
                ].map((item) => {
                  const isSelected = socraticTopic === item.topic;
                  return (
                    <button
                      key={item.topic}
                      type="button"
                      onClick={() => setSocraticTopic(item.topic)}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition cursor-pointer',
                        isSelected
                          ? 'bg-slate-100 font-semibold text-slate-900 border border-slate-200'
                          : 'font-medium text-slate-600 hover:bg-slate-50'
                      )}
                    >
                      <span className="truncate">
                        {item.icon} {item.topic}
                      </span>
                      <span
                        className={cn(
                          'text-[10px] font-bold shrink-0 ml-1',
                          isSelected ? 'text-green-600' : 'text-slate-400'
                        )}
                      >
                        {item.elo}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Left Sidebar Footer */}
      <div className="hidden lg:block p-5 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Elo Thích ứng</span>
            <span className="font-extrabold text-green-600">{elo} ELO</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Cohort: AI20K Cohort 2 • EduGap
          </div>
        </div>
        <p className="text-xs font-semibold text-slate-400">Sapia AI © 2026</p>
      </div>
    </aside>
  );
}
