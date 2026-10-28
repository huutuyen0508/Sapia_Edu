'use client';

import React from 'react';
import { useEduGapStore } from '@/store/useEduGapStore';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SurveyModal() {
  const {
    surveyModalOpen,
    closeSurveyModal,
    pendingQuizMeta,
    surveyStarRating,
    setSurveyStarRating,
    startQuizFromSurvey,
    addToast
  } = useEduGapStore();

  const captions = [
    'Hãy chọn từ 1 đến 5 sao để bắt đầu',
    '1 sao — Mới nghe lần đầu, cần giải thích kỹ từ đầu',
    '2 sao — Nắm sơ bộ khái niệm nhưng còn bối rối',
    '3 sao — Hiểu khoảng 60% nội dung trên lớp',
    '4 sao — Nắm khá vững, muốn luyện thêm câu hỏi vận dụng',
    '5 sao — Tự tin làm chủ kiến thức, sẵn sàng thử thách ELO cao!'
  ];

  const handleShare = () => {
    if (!pendingQuizMeta) return;
    addToast(`Đã sao chép liên kết bộ đề ?set=${pendingQuizMeta.dayId}-${pendingQuizMeta.subCode} vào clipboard!`);
  };

  if (!pendingQuizMeta) return null;

  return (
    <Dialog open={surveyModalOpen} onOpenChange={closeSurveyModal}>
      <DialogContent className="max-w-lg w-full space-y-5" onClose={closeSurveyModal}>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={closeSurveyModal}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition cursor-pointer"
          >
            <span>✕</span>
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition cursor-pointer"
          >
            <span>🔗</span> <span>Chia sẻ</span>
          </button>
        </div>

        <div className="text-center space-y-1.5">
          <h3 className="font-serif-title font-black text-xl sm:text-2xl text-slate-900">
            Khảo sát mức độ tiếp thu
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Để hệ thống tối ưu hóa lộ trình cá nhân, bạn hãy đánh giá độ hiểu bài hôm nay trên lớp
            nhé!
          </p>
        </div>

        {/* Selected Module Card */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
              Phần 1: {pendingQuizMeta.nodeTitle}
            </h4>
            <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-extrabold uppercase">
              {pendingQuizMeta.subCode === 'ALL' ? 'TỔNG HỢP' : 'DỄ'}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nắm nền tảng về Transformer, tokenization và cách mô hình ngôn ngữ lớn xử lý ngữ cảnh.
          </p>
          <div className="flex items-center justify-between pt-1 text-[11px] font-bold text-slate-500">
            <span>5 câu hỏi trắc nghiệm thích ứng</span>
            <span className="text-green-700 font-extrabold">
              Bộ đề: {pendingQuizMeta.subCode}
            </span>
          </div>
        </div>

        {/* 5-Star Rating Control */}
        <div className="space-y-2.5 text-center">
          <p className="text-xs font-bold text-slate-700">
            Bạn tự đánh giá độ hiểu bài học này trên lớp của mình như thế nào?
          </p>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= surveyStarRating;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setSurveyStarRating(star)}
                  className={cn(
                    'w-11 h-11 rounded-2xl transition flex items-center justify-center text-2xl cursor-pointer',
                    isFilled
                      ? 'border-2 border-amber-400 bg-amber-50 text-amber-500 scale-105'
                      : 'border border-slate-200 bg-slate-50 hover:bg-amber-50 text-slate-400'
                  )}
                >
                  {isFilled ? '★' : '☆'}
                </button>
              );
            })}
          </div>
          <div className="text-xs font-semibold text-slate-500 h-5">
            {captions[surveyStarRating]}
          </div>
        </div>

        <Button
          type="button"
          disabled={surveyStarRating === 0}
          variant={surveyStarRating > 0 ? '3d-green' : 'secondary'}
          className="w-full py-3.5 text-xs uppercase tracking-wider"
          onClick={startQuizFromSurvey}
        >
          BẮT ĐẦU LÀM BÀI
        </Button>
      </DialogContent>
    </Dialog>
  );
}
