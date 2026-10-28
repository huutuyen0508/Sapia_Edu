'use client';

import React from 'react';
import { RoadmapDay, RoadmapNode } from '@/data/curriculum';
import { useEduGapStore } from '@/store/useEduGapStore';
import { cn } from '@/lib/utils';

interface RoadmapNodeItemProps {
  day: RoadmapDay;
  node: RoadmapNode;
  nodeIndex: number;
}

export default function RoadmapNodeItem({ day, node, nodeIndex }: RoadmapNodeItemProps) {
  const {
    devMode,
    expandedNodeId,
    setExpandedNodeId,
    openSurveyModal,
    nodeMastery,
    addToast
  } = useEduGapStore();

  const isUnlocked = devMode || node.unlocked;
  const isExpanded = expandedNodeId === node.id;
  const mastery = nodeMastery[node.id] !== undefined ? nodeMastery[node.id] : node.mastery;

  // Alternate zigzag S-curve offset
  const offsetClass = nodeIndex % 2 === 1 ? 'sm:translate-x-8' : 'sm:-translate-x-4';

  const handleCircleClick = () => {
    if (!isUnlocked) {
      addToast(
        'Bài học này đang khóa! Hãy bật "DEV MODE: ON" ở góc trên bên phải để mở khóa ngay.',
        'warn'
      );
      return;
    }
    setExpandedNodeId(isExpanded ? null : node.id);
  };

  const handleSubNodeClick = (subCode: string) => {
    if (!isUnlocked) {
      addToast('Hãy hoàn thành bài học trước hoặc bật DEV MODE để mở bộ đề này!', 'warn');
      return;
    }
    openSurveyModal({
      dayId: day.id,
      nodeId: node.id,
      subCode,
      dayTitle: day.badge,
      nodeTitle: node.title
    });
  };

  // Node display icon — render emoji directly (matches prototype)
  const displayIcon = isUnlocked ? (node.unlockedIcon || node.icon) : '🔒';

  return (
    <div className={cn('flex flex-col items-center transition-all', offsetClass)}>
      {/* Status Badge */}
      {isUnlocked ? (
        <span className="mb-2 px-3 py-0.5 rounded-full bg-green-600 text-white font-extrabold text-[10px] uppercase tracking-widest shadow-sm animate-bounce">
          {mastery > 0 ? 'TIẾP TỤC' : 'START'}
        </span>
      ) : (
        <span className="mb-2 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-500 font-extrabold text-[10px] uppercase tracking-widest">
          LOCKED
        </span>
      )}

      {/* 3D Round Node Circle Button */}
      <button
        type="button"
        onClick={handleCircleClick}
        aria-label={`${node.title} - ${isUnlocked ? 'Đã mở khóa' : 'Đang khóa'}`}
        className={cn(
          'w-20 h-20 rounded-full node-btn-shadow flex items-center justify-center transition focus:outline-none cursor-pointer',
          isUnlocked
            ? `${day.bannerBg} text-white ring-8 ${day.ringAccent}`
            : 'bg-slate-200 text-slate-400 ring-8 ring-slate-100'
        )}
      >
        <span className="text-3xl">{displayIcon}</span>
      </button>

      {/* Node Title & Mastery card */}
      <div className="mt-2.5 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm text-center max-w-[220px]">
        <div className="font-extrabold text-xs sm:text-sm text-slate-800 line-clamp-1">
          {node.title}
        </div>
        <div
          className={cn(
            'text-[10px] font-extrabold tracking-wider uppercase mt-0.5',
            mastery > 0 ? 'text-green-600' : 'text-slate-400'
          )}
        >
          {mastery}% THÔNG THẠO
        </div>
      </div>

      {/* Sub-nodes Tray (Expanded) */}
      {isExpanded && (
        <div className="mt-4 bg-white rounded-3xl border-2 border-slate-200 p-4 shadow-xl max-w-md w-full space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-extrabold text-slate-800 truncate mr-2">
              {node.title}
            </span>
            <span className="text-[11px] font-extrabold text-green-600 shrink-0">
              {mastery}% THÔNG THẠO
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Chọn một bộ câu hỏi con (C.1 – C.5) hoặc làm bài tổng hợp (ALL):
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {['C.1', 'C.2', 'C.3', 'C.4', 'C.5'].map((code, idx) => (
              <button
                key={code}
                type="button"
                onClick={() => handleSubNodeClick(code)}
                className={cn(
                  'w-11 h-11 rounded-2xl font-extrabold text-xs border-2 transition flex flex-col items-center justify-center cursor-pointer',
                  isUnlocked
                    ? 'bg-green-50 border-green-500 text-green-800 hover:bg-green-600 hover:text-white shadow-sm'
                    : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                )}
              >
                <span>{idx + 1}</span>
                <span className="text-[9px] opacity-75">{code}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleSubNodeClick('ALL')}
              className={cn(
                'px-3.5 h-11 rounded-2xl font-extrabold text-xs border-2 transition flex items-center gap-1 cursor-pointer',
                isUnlocked
                  ? 'bg-amber-500 border-amber-600 text-white hover:bg-amber-600 shadow-sm'
                  : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
              )}
            >
              <span>⚡</span>
              <span>ALL</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
