'use client';

import React from 'react';
import Link from 'next/link';
import { RoadmapDay } from '@/data/curriculum';
import { useEduGapStore } from '@/store/useEduGapStore';
import { cn } from '@/lib/utils';

interface GuidebookDetailProps {
  day: RoadmapDay;
}

export default function GuidebookDetail({ day }: GuidebookDetailProps) {
  const { openSurveyModal } = useEduGapStore();

  const handleStartQuiz = () => {
    openSurveyModal({
      dayId: day.id,
      nodeId: day.nodes[0].id,
      subCode: 'C.1',
      dayTitle: day.badge,
      nodeTitle: day.nodes[0].title
    });
  };

  return (
    <section className="space-y-5 animate-fadeIn">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-extrabold text-slate-700 shadow-sm transition"
        >
          <span>&lt; TRỞ VỀ LỘ TRÌNH</span>
        </Link>
      </div>

      {/* Guidebook Header Card */}
      <div
        className={cn(
          'rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all',
          day.bannerBg
        )}
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl shrink-0">
            📘
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest bg-black/20 px-2.5 py-1 rounded-full">
              HƯỚNG DẪN {day.badge.toUpperCase()}
            </span>
            <h2 className="text-2xl font-serif-title font-black mt-2">
              {day.title}
            </h2>
            <p className="text-sm text-white/90 mt-1 max-w-xl leading-relaxed">
              {day.desc}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleStartQuiz}
          className="shrink-0 px-5 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs uppercase tracking-wider shadow-sm transition active:scale-95 cursor-pointer"
        >
          Làm bộ đề ngay →
        </button>
      </div>

      {/* Notice Card matching original site */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 text-center space-y-3 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center text-2xl mx-auto">
          ✨
        </div>
        <h3 className="text-lg font-extrabold text-slate-900">
          Tài liệu học tập đang được soạn thảo
        </h3>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Tài liệu tóm tắt kiến thức chuyên sâu cho ngày học này đang được đội ngũ Giảng viên AI20K
          chuẩn bị. Bạn có thể xem nhanh <strong>Thẻ Tóm Tắt Cốt Lõi</strong> bên dưới hoặc tiến
          hành làm các bộ đề trắc nghiệm để củng cố và kiểm tra tri thức ngay bây giờ!
        </p>
      </div>

      {/* Core Cheat-sheet cards for the selected day */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-700">
            📌 Tóm tắt Kiến thức Trọng tâm (Preview)
          </h4>
          <span className="text-xs font-semibold text-green-600">Đồng bộ RAG Slide</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {day.keyPoints.map((kp, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
            >
              <div className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                <span className="text-green-600">✔</span>
                <span>{kp.title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{kp.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
