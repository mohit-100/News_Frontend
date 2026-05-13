// src/app/news/NewsListContent.tsx
'use client';

import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useArticles } from '@/lib/hooks/useNews';
import { useNewsStore } from '@/store/news-store';
import { ArticleCard } from '@/components/news/ArticleCard';
import { FilterBar } from '@/components/news/FilterBar';
import { TrendingSidebar } from '@/components/feed/TrendingSidebar';
import { ArticleListSkeleton } from '@/components/ui/Skeleton';
import { useInfiniteScroll } from '@/lib/hooks/useNews';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { NewsArticle } from '@/types';


export function NewsListContent() {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') as 'latest' | 'trending' | 'popular' | null;
  const { filters, setFilters } = useNewsStore();
  const [page, setPage] = useState(1);

  // Apply URL sort param
  const activeFilters = { ...filters, sortBy: sort || filters.sortBy || 'latest' };
  const { articles, loading, error, hasMore, total, refetch } = useArticles(activeFilters, 1, page * 12);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) setPage((p) => p + 1);
  }, [loading, hasMore]);

  const { loadMoreRef } = useInfiniteScroll(loadMore, hasMore);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-black" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
            {sort === 'trending' ? 'Trending Now' : sort === 'popular' ? 'Most Popular' : 'Latest News'}
          </h1>
          <button
            onClick={refetch}
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {total} stories · Updated in real-time
        </p>
      </div>

     {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">   */}

     {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start"> */}
        <div className="space-y-8">  
       
         {/* <div className="xl:col-span-2 space-y-6">  */}
          <div className="xl:col-span-2 space-y-6 min-w-0">
          {/* Filters */}
          <div className="card rounded-xl p-4">
            <FilterBar />
          </div>

          {/* Error */}
          {error && (
            <div className="card rounded-xl p-6 flex items-center gap-3" style={{ borderColor: 'var(--accent)' }}>
              <AlertCircle size={20} style={{ color: 'var(--accent)' }} />
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Failed to load articles</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Using cached data. Check your connection.</p>
              </div>
              <button onClick={refetch} className="ml-auto btn-primary text-xs px-3 py-1.5 rounded-lg">Retry</button>
            </div>
          )}

          {/* Articles grid */}
          {loading && articles.length === 0 ? (
            <ArticleListSkeleton count={9} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {articles.map((article: NewsArticle) => (
                  <ArticleCard key={article.id} article={article} variant="default" />
                ))}
              </div>

              {/* Infinite scroll sentinel */}
              <div ref={loadMoreRef} className="h-8 flex items-center justify-center">
                {loading && (
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <RefreshCw size={14} className="animate-spin" />
                    Loading more…
                  </div>
                )}
                {!hasMore && articles.length > 0 && (
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    You've reached the end · {total} stories total
                  </p>
                )}
              </div>

              {articles.length === 0 && !loading && (
                <div className="text-center py-16">
                  <p className="text-4xl mb-4">🔍</p>
                  <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No articles found</p>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
                  <button onClick={() => setFilters({ category: undefined, sortBy: 'latest' })} className="btn-primary">
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <TrendingSidebar />
        </div>
      </div>
    </div>
  );
}
