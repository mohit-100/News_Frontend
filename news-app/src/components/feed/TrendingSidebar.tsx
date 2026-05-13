// src/components/feed/TrendingSidebar.tsx
'use client';

import { useTrending } from '@/lib/hooks/useNews';
import { ArticleCard } from '@/components/news/ArticleCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export function TrendingSidebar() {
  const { trending, loading } = useTrending(8);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 600));
    setRefreshing(false);
  };

  return (
    // <aside className="space-y-6">

    <aside className="w-full space-y-6">
      {/* Trending Now */}
      <div className="card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} style={{ color: 'var(--accent)' }} />
            <h3 className="font-bold text-base" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
              Trending Now
            </h3>
          </div>
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3 py-2">
                <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-0">
            {trending.slice(0, 6).map((article, index) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="flex items-start gap-3 py-3 border-b border-[var(--border)] last:border-0 group hover:bg-[var(--bg-hover)] -mx-2 px-2 rounded-lg transition-colors"
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                  style={{
                    background: index < 3 ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: index < 3 ? 'white' : 'var(--text-muted)',
                  }}
                >
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold line-clamp-2 leading-snug group-hover:text-[var(--accent)] transition-colors"
                    style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
                    {article.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: article.category.color }}>
                      {article.category.name}
                    </span>
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      · {formatRelativeTime(article.publishedAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="rounded-xl p-5 relative overflow-hidden" style={{ background: 'var(--accent)' }}>
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(25%, -25%)' }} />
        <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(-25%, 25%)' }} />
        <h3 className="font-black text-lg text-white mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
          Stay Informed
        </h3>
        <p className="text-white/75 text-sm mb-4">Get daily top stories delivered to your inbox.</p>
        <input
          type="email"
          placeholder="Your email address"
          className="w-full px-3 py-2 rounded-lg text-sm mb-2 outline-none"
          style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
        />
        <button className="w-full py-2 rounded-lg text-sm font-bold transition-all hover:opacity-90"
          style={{ background: 'white', color: 'var(--accent)' }}>
          Subscribe Free
        </button>
      </div>
    </aside>
  );
}
