'use client';

import React, { useState } from 'react';
import { useEduGapStore } from '@/store/useEduGapStore';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export default function GamificationSidebar() {
  const {
    streak,
    xp,
    completedSets,
    totalSets,
    userProfile,
    openAuthModal,
    logout,
    addToast
  } = useEduGapStore();

  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const pct = Math.min(100, Math.round((completedSets / totalSets) * 100));

  let masteryRank = 'Học viên mới';
  if (xp >= 150) {
    masteryRank = 'Thực chiến AI';
  } else if (xp > 0 || completedSets > 0) {
    masteryRank = 'Đang tăng tốc';
  }

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;
    setWaitlistSubmitted(true);
    addToast('Đã thêm email của bạn vào danh sách ưu tiên Lộ trình AI Cá nhân hóa!');
    setWaitlistEmail('');
  };

  return (
    <aside className="w-full lg:w-80 xl:w-88 shrink-0 px-4 pb-20 lg:pb-8 lg:px-5 lg:py-7 space-y-5 border-t lg:border-t-0 lg:border-l border-slate-200 bg-white/60">
      {/* Top Stats Bar (Streak & XP) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-sm flex items-center justify-around">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-xl">
            <span>🔥</span>
          </div>
          <div>
            <div className="font-extrabold text-base text-slate-900 leading-none">
              {streak}
            </div>
            <div className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">
              Chuỗi ngày
            </div>
          </div>
        </div>
        <div className="h-8 w-px bg-slate-200" />
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl">
            <span>🏅</span>
          </div>
          <div>
            <div className="font-extrabold text-base text-amber-600 leading-none">
              {xp} XP
            </div>
            <div className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">
              Điểm tích lũy
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            TIẾN ĐỘ TỔNG QUÁT
          </h3>
          <span className="text-xs font-extrabold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
            Đã hoàn thành {completedSets}/{totalSets} bộ đề
          </span>
        </div>
        <Progress value={pct} indicatorClassName="bg-green-500" />
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>
            Tỷ lệ hoàn thành: <strong className="text-slate-800">{pct}%</strong>
          </span>
          <span className="text-green-600 font-bold">{masteryRank}</span>
        </div>
      </div>

      {/* Account Callout / Logged-in Profile Card */}
      {!userProfile ? (
        <div className="bg-[#fdfaf2] rounded-3xl border border-amber-200/80 p-5 shadow-sm space-y-3.5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🛡️</span>
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-tight">
              TẠO HỒ SƠ ĐỂ LƯU TIẾN TRÌNH!
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tạo tài khoản cá nhân giúp bạn lưu giữ điểm tích lũy (XP), chuỗi học tập (Streak) và
            đồng bộ hóa kết quả lên bảng xếp hạng chung.
          </p>
          <div className="space-y-2 pt-1">
            <Button
              variant="3d-green"
              className="w-full text-xs uppercase tracking-wider"
              onClick={() => openAuthModal(false)}
            >
              TẠO HỒ SƠ
            </Button>
            <Button
              variant="outline"
              className="w-full text-xs uppercase tracking-wider border-2 border-green-600 text-green-700 hover:bg-green-50"
              onClick={() => openAuthModal(true)}
            >
              ĐĂNG NHẬP
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-green-200 p-5 shadow-sm space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-extrabold uppercase">
              ĐÃ ĐỒNG BỘ PORTAL
            </span>
            <button
              type="button"
              onClick={logout}
              className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
            >
              Đăng xuất
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-green-600 text-white font-extrabold text-lg flex items-center justify-center shadow-sm">
              {userProfile.initials}
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900">
                {userProfile.name}
              </div>
              <div className="text-xs font-semibold text-slate-500">
                MSSV: {userProfile.studentId.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Personalized Waitlist Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 shadow-md space-y-3">
        <span className="inline-block px-2.5 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-[10px] font-extrabold uppercase tracking-wider">
          LỘ TRÌNH AI CÁ NHÂN HÓA
        </span>
        <h3 className="font-serif-title font-bold text-base leading-snug">
          Khám phá lỗ hổng kiến thức qua AI trợ giảng
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Nhận gợi ý lý thuyết, bài thi cá nhân hóa sau mỗi lượt kiểm tra để củng cố tri thức nhanh
          chóng.
        </p>
        <form onSubmit={handleWaitlistSubmit} className="space-y-2 pt-1">
          <input
            type="email"
            required
            value={waitlistEmail}
            onChange={(e) => setWaitlistEmail(e.target.value)}
            placeholder="Nhập email học tập..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-green-400 transition"
          />
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>THAM GIA WAITLIST -&gt;</span>
          </button>
        </form>
        {waitlistSubmitted && (
          <div className="text-xs font-bold text-green-300 bg-green-950/60 border border-green-500/40 rounded-xl p-2.5 text-center flex items-center justify-center gap-1.5 animate-fadeIn">
            <span>✓ Đã đăng ký Waitlist thành công!</span>
          </div>
        )}
      </div>
    </aside>
  );
}
