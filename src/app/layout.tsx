import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import BottomNav from '@/components/layout/BottomNav';
import GamificationSidebar from '@/components/layout/GamificationSidebar';
import GlobalToast from '@/components/layout/GlobalToast';
import AuthModal from '@/components/layout/AuthModal';
import SurveyModal from '@/components/quiz/SurveyModal';
import QuizModal from '@/components/quiz/QuizModal';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap'
});

const merriweather = Merriweather({
  weight: ['700', '900'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-merriweather',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Sapia AI - EduGap | Nền tảng Học tập AI Thích ứng & Socratic',
  description:
    'Nền tảng học tập thích ứng cá nhân hóa cho học viên AI20K. Lộ trình học AI & LLM, Trợ lý Socratic RAG, và kiểm tra tri thức thích ứng theo hệ số ELO.',
  keywords: [
    'Sapia AI',
    'EduGap',
    'AI20K',
    'Adaptive Learning',
    'Socratic AI',
    'RAG',
    'Transformer',
    'LLM'
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-screen flex flex-col lg:flex-row overflow-x-hidden selection:bg-green-200 selection:text-green-900 bg-[#f6faf6] text-slate-900 antialiased">
        <QueryProvider>
          {/* Global Floating Portals */}
          <GlobalToast />
          <AuthModal />
          <SurveyModal />
          <QuizModal />

          {/* Mobile Top Header */}
          <MobileHeader />

          {/* Left Navigation Sidebar */}
          <Sidebar />

          {/* Center Main Content Area */}
          <main className="flex-1 min-w-0 px-4 py-5 sm:px-6 lg:px-8 lg:py-7 max-w-4xl mx-auto w-full">
            {children}
          </main>

          {/* Right Gamification & Progress Sidebar */}
          <GamificationSidebar />

          {/* Mobile Bottom Navigation */}
          <BottomNav />
        </QueryProvider>
      </body>
    </html>
  );
}
