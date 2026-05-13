// src/app/news/page.tsx
'use client';

import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BreakingTicker } from '@/components/news/BreakingTicker';
import { NewsListContent } from './NewsListContent';

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <BreakingTicker />
      <main className="pt-[calc(3.5rem+1.5rem+1px)]">
        <Suspense fallback={<div className="max-w-screen-xl mx-auto px-4 py-8">Loading...</div>}>
          <NewsListContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
