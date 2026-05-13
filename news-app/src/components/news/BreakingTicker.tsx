// src/components/news/BreakingTicker.tsx
'use client';

import { NewsArticle } from '@/types';
import { useBreakingNews } from '@/lib/hooks/useNews';
import { cn } from '@/lib/utils';
import { Radio } from 'lucide-react';

export function BreakingTicker() {
  const { news } = useBreakingNews();

  if (!news.length) return null;

  const tickerText = news.map((n:NewsArticle) => `▸ ${n.title}`).join('    ');

  return (
    <div
      className="flex items-stretch text-sm overflow-hidden border-b border-[var(--border)]"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Label */}
      <div
        className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 font-black text-xs tracking-widest uppercase text-white"
        style={{ background: 'var(--accent)', minWidth: 'fit-content' }}
      >
        <Radio size={12} className="animate-pulse" />
        Breaking
      </div>

      {/* Ticker */}
      <div className="ticker-container flex-1 relative flex items-center">
        <div className="ticker-content py-2.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-source-sans)' }}>
          {tickerText}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {tickerText}
        </div>
      </div>
    </div>
  );
}
