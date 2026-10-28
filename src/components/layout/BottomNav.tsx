'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEduGapStore } from '@/store/useEduGapStore';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const pathname = usePathname();
  const { openAuthModal } = useEduGapStore();

  const navItems = [
    { href: '/', label: 'Học tập', icon: '📖', active: pathname === '/' || pathname.startsWith('/guidebook') },
    { href: '/tutor', label: 'Trợ lý AI', icon: '💬', active: pathname === '/tutor' },
    { href: '/leaderboard', label: 'Xếp hạng', icon: '🏆', active: pathname === '/leaderboard' },
    {
      href: '#profile',
      label: 'Cá nhân',
      icon: '👤',
      active: false,
      onClick: () => openAuthModal(false)
    }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        if (item.onClick) {
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className="flex flex-col items-center gap-1 py-1 px-3 text-slate-500 hover:text-green-600 transition cursor-pointer"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-1 py-1 px-3 transition',
              item.active
                ? 'text-green-600 font-extrabold'
                : 'text-slate-500 hover:text-slate-900'
            )}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[10px]">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
