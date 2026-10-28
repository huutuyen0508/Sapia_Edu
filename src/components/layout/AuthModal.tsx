'use client';

import React, { useState } from 'react';
import { useEduGapStore } from '@/store/useEduGapStore';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function AuthModal() {
  const {
    authModalOpen,
    closeAuthModal,
    isLoginMode,
    setIsLoginMode,
    setUserProfile,
    loginBypass
  } = useEduGapStore();

  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !studentId.trim()) return;

    const parts = fullName.trim().split(/\s+/);
    const initials =
      parts.length >= 2
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : fullName.slice(0, 2).toUpperCase();

    setUserProfile({
      name: fullName.trim(),
      studentId: studentId.trim(),
      initials
    });

    closeAuthModal();
    setFullName('');
    setStudentId('');
  };

  return (
    <Dialog open={authModalOpen} onOpenChange={closeAuthModal}>
      <DialogContent className="max-w-md w-full relative" onClose={closeAuthModal}>
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition cursor-pointer"
        >
          <span>✕</span>
        </button>

        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-[11px] font-extrabold uppercase tracking-wider">
            SAPIA AI PORTAL
          </span>
          <h3 className="font-serif-title font-black text-2xl text-slate-900">
            {isLoginMode ? 'Đăng nhập học viên' : 'Đăng ký tài khoản'}
          </h3>
          <p className="text-xs text-slate-500">
            Vui lòng sử dụng thông tin được cấp từ Giảng viên/BTC
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
              HỌ VÀ TÊN
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400">👤</span>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nhập họ và tên đầy đủ"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-green-600 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
              MÃ SỐ SINH VIÊN
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400">🎓</span>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Nhập mã số sinh viên (VD: SE190245)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-green-600 focus:bg-white transition"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="3d-green"
            className="w-full py-3 text-xs uppercase tracking-wider"
          >
            {isLoginMode ? 'ĐĂNG NHẬP ->' : 'ĐĂNG KÝ ->'}
          </Button>
        </form>

        <div className="mt-4 space-y-2.5 text-center">
          <button
            type="button"
            onClick={loginBypass}
            className="w-full py-2.5 px-4 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>⚡ ĐĂNG NHẬP NHANH (BYPASS SERVER)</span>
          </button>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-xs font-bold text-slate-600 hover:text-green-700 cursor-pointer"
            >
              {isLoginMode ? (
                <>
                  Chưa có tài khoản?{' '}
                  <span className="text-green-600 underline font-extrabold">ĐĂNG KÝ NGAY</span>
                </>
              ) : (
                <>
                  Đã có tài khoản?{' '}
                  <span className="text-green-600 underline font-extrabold">ĐĂNG NHẬP NGAY</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
            AI20K COHORT 2 • EDUGAP
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
