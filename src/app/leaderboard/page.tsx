import React from 'react';
import type { Metadata } from 'next';
import LeaderboardList from '@/components/leaderboard/LeaderboardList';

export const metadata: Metadata = {
  title: 'Bảng Xếp Hạng | Sapia AI - EduGap',
  description: 'Bảng xếp hạng thi đua tích lũy XP và nâng hạng ELO giữa các học viên AI20K.'
};

export default function LeaderboardPage() {
  return <LeaderboardList />;
}
