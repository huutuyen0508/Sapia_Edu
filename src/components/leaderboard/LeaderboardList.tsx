'use client';

import React from 'react';
import { INITIAL_LEADERBOARD } from '@/data/curriculum';
import { useEduGapStore } from '@/store/useEduGapStore';
import { cn } from '@/lib/utils';

export default function LeaderboardList() {
  const { leaderboardTab, setLeaderboardTab, xp, userProfile } = useEduGapStore();

  const isToday = leaderboardTab === 'today';
  const userName = userProfile ? `${userProfile.name} (Bạn)` : 'Bạn (Học viên)';
  const userInitials = userProfile ? userProfile.initials : 'BẠN';
  const userScore = isToday ? xp : xp + 420;

  const combined = [
    ...INITIAL_LEADERBOARD.map((item) => ({
      name: item.name,
      initials: item.initials,
      xp: isToday ? item.xpToday : item.xpAll,
      color: item.color,
      isCurrentUser: false
    })),
    {
      name: userName,
      initials: userInitials,
      xp: userScore,
      color: 'bg-orange-500',
      isCurrentUser: true
    }
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <h2 className="font-serif-title font-black text-xl sm:text-2xl text-slate-900 uppercase">
              BẢNG XẾP HẠNG
            </h2>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Cạnh tranh lành mạnh cùng các học viên AI Thực Chiến.
          </p>
        </div>

        {/* Period Switcher */}
        <div className="inline-flex bg-slate-100 p-1 rounded-2xl border border-slate-200 self-start">
          <button
            type="button"
            onClick={() => setLeaderboardTab('today')}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer',
              isToday
                ? 'bg-white text-green-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Hôm nay
          </button>
          <button
            type="button"
            onClick={() => setLeaderboardTab('alltime')}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer',
              !isToday
                ? 'bg-white text-green-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Chung cuộc
          </button>
        </div>
      </div>

      {/* Leaderboard List Items */}
      <div className="mt-5 space-y-2.5">
        {combined.map((entry, idx) => {
          const rank = idx + 1;
          let medal = '';
          if (rank === 1) medal = '🥇';
          else if (rank === 2) medal = '🥈';
          else if (rank === 3) medal = '🥉';

          return (
            <div
              key={`${entry.name}-${idx}`}
              className={cn(
                'flex items-center justify-between px-4 py-3 rounded-2xl transition animate-fadeIn',
                entry.isCurrentUser
                  ? 'bg-orange-50 border-2 border-orange-300 shadow-sm'
                  : 'bg-slate-50/70 border border-slate-200/80 hover:bg-slate-100/70'
              )}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={cn(
                    'w-7 text-center font-extrabold text-sm',
                    rank <= 3 ? 'text-amber-600' : 'text-slate-500'
                  )}
                >
                  {rank}
                </div>
                <div
                  className={cn(
                    'w-10 h-10 rounded-full text-white font-extrabold text-xs flex items-center justify-center shadow-sm shrink-0',
                    entry.color
                  )}
                >
                  {entry.initials}
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>{entry.name}</span>
                    {medal && <span className="text-base">{medal}</span>}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400">
                    AI20K Cohort 2
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  'font-extrabold text-sm',
                  entry.isCurrentUser ? 'text-orange-700' : 'text-green-700'
                )}
              >
                {entry.xp} XP
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
