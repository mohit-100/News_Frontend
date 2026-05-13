// src/components/feed/LiveUpdates.tsx
'use client';

import { useEffect, useState } from 'react';
import { useNewsStore } from '@/store/news-store';
import { useLiveUpdates } from '@/lib/hooks/useNews';
import { NewsArticle } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { Radio, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function LiveUpdatesBanner() {
  const { isLiveEnabled, liveUpdates, addLiveUpdate } = useNewsStore();
  const { updates } = useLiveUpdates(isLiveEnabled);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    updates.forEach((article) => {
      if (!liveUpdates.find((u) => u.id === article.id)) {
        addLiveUpdate({
          id: article.id,
          article,
          type: article.isBreaking ? 'breaking' : article.isTrending ? 'trending' : 'new',
          timestamp: new Date().toISOString(),
        });
      }
    });
  }, [updates]);

  const visibleUpdates = liveUpdates
    .filter((u) => !dismissed.includes(u.id))
    .slice(0, 3);

  if (!isLiveEnabled || visibleUpdates.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 space-y-2 max-w-sm hidden lg:block">
      <AnimatePresence>
        {visibleUpdates.map((update) => (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="card rounded-xl p-4 pr-10 relative max-w-sm shadow-lg border border-[var(--border-strong)]"
          >
            <button
              onClick={() => setDismissed((prev) => [...prev, update.id])}
              className="absolute top-3 right-3 p-1 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <X size={12} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="live-indicator">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--live-dot)] animate-pulse" />
                {update.type === 'breaking' ? 'Breaking' : update.type === 'trending' ? 'Trending' : 'New'}
              </div>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {formatRelativeTime(update.timestamp)}
              </span>
            </div>

            <p className="text-sm font-semibold line-clamp-2 mb-2 leading-snug"
              style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
              {update.article.title}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: update.article.category.color }}>
                {update.article.category.name}
              </span>
              <Link href={`/news/${update.article.slug}`} className="flex items-center gap-1 text-xs font-medium hover:underline" style={{ color: 'var(--accent)' }}>
                Read <ExternalLink size={10} />
              </Link>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function LiveFeedSection({ articles }: { articles: NewsArticle[] }) {
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
        <div className="live-indicator">
          <span className="w-2 h-2 rounded-full bg-[var(--live-dot)] animate-pulse" />
          Live Feed
        </div>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Auto-refreshing every 60s</span>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {articles.slice(0, 8).map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.slug}`}
            className="flex items-start gap-3 p-4 hover:bg-[var(--bg-hover)] transition-colors group"
          >
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 rounded-full" style={{ background: article.category.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider block mb-0.5" style={{ color: article.category.color }}>
                {article.category.name}
              </span>
              <p className="text-sm font-medium line-clamp-2 group-hover:text-[var(--accent)] transition-colors"
                style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
                {article.title}
              </p>
              <span className="text-xs mt-1 block" style={{ color: 'var(--text-muted)' }}>
                {formatRelativeTime(article.publishedAt)} · {article.author.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
