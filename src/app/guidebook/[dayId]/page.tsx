import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ROADMAP_DAYS } from '@/data/curriculum';
import GuidebookDetail from '@/components/guidebook/GuidebookDetail';

interface GuidebookPageProps {
  params: Promise<{ dayId: string }>;
}

export async function generateStaticParams() {
  return ROADMAP_DAYS.map((day) => ({
    dayId: day.id
  }));
}

export async function generateMetadata({
  params
}: GuidebookPageProps): Promise<Metadata> {
  const { dayId } = await params;
  const day = ROADMAP_DAYS.find((d) => d.id === dayId);
  if (!day) return { title: 'Tài liệu hướng dẫn | Sapia AI' };

  return {
    title: `${day.title} - Hướng Dẫn | Sapia AI EduGap`,
    description: day.desc
  };
}

export default async function GuidebookPage({ params }: GuidebookPageProps) {
  const { dayId } = await params;
  const day = ROADMAP_DAYS.find((d) => d.id === dayId);

  if (!day) {
    notFound();
  }

  return <GuidebookDetail day={day} />;
}
