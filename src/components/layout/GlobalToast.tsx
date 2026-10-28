'use client';

import React from 'react';
import { useEduGapStore } from '@/store/useEduGapStore';
import { cn } from '@/lib/utils';

export default function GlobalToast() {
  const { toasts, removeToast } = useEduGapStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[90] flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarn = toast.type === 'warn';

        return (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={cn(
              'pointer-events-auto px-4 py-3 rounded-2xl border-l-4 shadow-xl text-xs font-bold flex items-center gap-2.5 transition-all duration-300 animate-fadeIn cursor-pointer',
              isSuccess && 'bg-slate-900 text-white border-green-500',
              isWarn && 'bg-amber-900 text-white border-amber-400',
              !isSuccess && !isWarn && 'bg-slate-900 text-white border-blue-500'
            )}
          >
            {isSuccess && <span className="text-green-400 shrink-0">✨</span>}
            {isWarn && <span className="text-amber-400 shrink-0">⚠️</span>}
            {!isSuccess && !isWarn && <span className="text-blue-400 shrink-0">✓</span>}
            <span className="leading-snug">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
