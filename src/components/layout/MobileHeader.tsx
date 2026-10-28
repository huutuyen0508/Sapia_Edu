'use client';

import React from 'react';
import Link from 'next/link';
import { useEduGapStore } from '@/store/useEduGapStore';

export default function MobileHeader() {
  const { streak, xp } = useEduGapStore();

  return (
    <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white shadow-sm">
          <svg className="w-6 h-6" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" fill="#16a34a" />
            <path
              d="M18 24C18 17 24 14 32 14C40 14 46 17 46 24V42C46 47 40 50 32 50C24 50 18 47 18 42V24Z"
              fill="#ffffff"
            />
            <circle cx="25" cy="29" r="6" stroke="#0f172a" strokeWidth="2.5" fill="#fef08a" />
            <circle cx="39" cy="29" r="6" stroke="#0f172a" strokeWidth="2.5" fill="#fef08a" />
            <circle cx="25" cy="29" r="2.5" fill="#0f172a" />
            <circle cx="39" cy="29" r="2.5" fill="#0f172a" />
            <polygon points="32,33 29,38 35,38" fill="#f97316" />
          </svg>
        </div>
        <div>
          <div className="font-serif-title font-black text-base text-slate-900 leading-none">
            Sapia AI
          </div>
          <div className="text-[10px] font-bold tracking-widest text-green-600 uppercase mt-0.5">
            VIBRANT LEARNING
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full text-xs font-bold text-orange-600 shadow-xs">
          <span>🔥</span>
          <span>{streak}</span>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-bold text-amber-700 shadow-xs">
          <span>🏆</span>
          <span>{xp} XP</span>
        </div>
      </div>
    </header>
  );
}
