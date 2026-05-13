// src/app/HomeContent.tsx
'use client';

import { useArticles, useTrending } from '@/lib/hooks/useNews';
import { useNewsStore } from '@/store/news-store';
import { ArticleCard } from '@/components/news/ArticleCard';
import { TrendingSidebar } from '@/components/feed/TrendingSidebar';
import { LiveFeedSection } from '@/components/feed/LiveUpdates';
import { FilterBar } from '@/components/news/FilterBar';
import { ArticleListSkeleton, FeaturedSkeleton, ArticleCardSkeleton } from '@/components/ui/Skeleton';
import { SearchBar } from '@/components/search/SearchBar';
import { mockCategories } from '@/lib/mock-data';
import { useNewsStore as useStore } from '@/store/news-store';
import { useState, useCallback } from 'react';
import { RefreshCw, ChevronDown, Rss, Zap, BookOpen, Grid3X3 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function HomeContent() {
  const { filters } = useNewsStore();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const { preferences } = useStore();

  console.log("store",useNewsStore.getState());

  const { articles, loading, hasMore, total } = useArticles(filters, 1, 12);
  const { trending } = useTrending(6);

  const featuredArticles = articles.slice(0, 3);
  const gridArticles = articles.slice(3);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await new Promise((r) => setTimeout(r, 500));
    setPage((p) => p + 1);
    setLoadingMore(false);
  };

  // Personalized feed
  const hasPersonalization = preferences.followedCategories.length > 0;
  const personalizedCategories = mockCategories.filter((c) =>
    preferences.followedCategories.includes(c.id)
  );
     //max-w-screen-xl
  return (
    <div className="w-full mx-auto px-4 py-8">
      {/* Hero search */}
      <div className="text-center mb-10 py-6">
        <h1 className="text-3xl md:text-5xl font-black mb-3"
          style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
          What's happening <span style={{ color: 'var(--accent)' }}>right now</span>
        </h1>
        <p className="text-base mb-6" style={{ color: 'var(--text-muted)' }}>
          Real-time news from {total}+ stories across {mockCategories.length} categories
        </p>
        <div className="flex justify-center">
          <Link href="/search" className="w-full max-w-xl">
            <div className="input-field flex items-center gap-3 cursor-pointer hover:border-[var(--accent)] transition-all group">
              <span style={{ color: 'var(--text-muted)' }}>🔍</span>
              <span style={{ color: 'var(--text-muted)' }} className="text-sm">Search breaking news, topics, people…</span>
               <span className="ml-auto px-2 py-0.5 rounded text-xs border border-[var(--border)]" style={{ color: 'var(--text-muted)' }}>⌘K</span> 
            </div>
          </Link>
        </div>
      </div>

      {/* Category Quick Links */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {mockCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105"
            style={{
              background: `${cat.color}12`,
              color: cat.color,
              borderColor: `${cat.color}30`,
            }}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </Link>
        ))}
      </div>

     {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">  */}
       <div className="space-y-8">  
        {/* Main content */}
          {/* <div className="xl:col-span-2 space-y-8">   */}
          <div className="space-y-8"> 

          {/* Featured stories */}
          <section>
            <div className="section-header">
              <span className="w-1 h-6 rounded-full" style={{ background: 'var(--accent)' }} />
              <h2 className="section-title">Top Stories</h2>
              <div className="live-indicator ml-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--live-dot)] animate-pulse" />
                Live
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                <FeaturedSkeleton />
                <div className="grid grid-cols-2 gap-4">
                  <ArticleCardSkeleton />
                  <ArticleCardSkeleton />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {featuredArticles[0] && <ArticleCard article={featuredArticles[0]} variant="featured" />}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuredArticles.slice(1, 3).map((article) => (
                    <ArticleCard key={article.id} article={article} variant="default" />
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Filters */}
          <section>
            <FilterBar />
          </section>

          {/* Article grid */}
          <section>
            <div className="section-header">
              <span className="w-1 h-6 rounded-full" style={{ background: 'var(--accent)' }} />
              <h2 className="section-title">Latest News</h2>
              <span className="text-sm ml-2" style={{ color: 'var(--text-muted)' }}>{total} stories</span>
            </div>

            {loading ? (
              <ArticleListSkeleton count={6} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {gridArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="default" />
                ))}
              </div>
            )}

            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="btn-primary flex items-center gap-2 mx-auto px-6 py-3 rounded-xl"
                >
                  {loadingMore ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                  {loadingMore ? 'Loading…' : 'Load More Stories'}
                </button>
              </div>
            )}
          </section>

          {/* Live Feed */}
          {articles.length > 0 && (
            <section>
              <div className="section-header">
                <span className="w-1 h-6 rounded-full" style={{ background: 'var(--live-dot)' }} />
                <h2 className="section-title">Live Feed</h2>
              </div>
              <LiveFeedSection articles={articles} />
            </section>
          )}

          {/* Personalized */}
          {hasPersonalization && (
            <section>
              <div className="section-header">
                <span className="w-1 h-6 rounded-full" style={{ background: 'var(--gold)' }} />
                <h2 className="section-title">Your Feed</h2>
                <div className="flex items-center gap-1 ml-2">
                  {personalizedCategories.map((cat) => (
                    <span key={cat.id} className="text-lg">{cat.icon}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {articles
                  .filter((a) => preferences.followedCategories.includes(a.category.id))
                  .slice(0, 4)
                  .map((article) => (
                    <ArticleCard key={article.id} article={article} variant="horizontal" />
                  ))}
              </div>
              {preferences.followedCategories.length === 0 && (
                <div className="card rounded-xl p-8 text-center">
                  <p className="text-3xl mb-3">📰</p>
                  <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Personalize your feed</p>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Follow categories to see personalized news</p>
                  <Link href="/category" className="btn-primary inline-flex">Browse Categories</Link>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Sidebar */}
        {/* <div className="space-y-6"> */}
        <div className="space-y-6">
          <TrendingSidebar />

          {/* Quick nav */}
          <div className="card rounded-xl p-5">
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Explore</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: '/news', icon: <Rss size={16} />, label: 'All News' },
                { href: '/news?sort=trending', icon: <Zap size={16} />, label: 'Trending' },
                { href: '/category', icon: <Grid3X3 size={16} />, label: 'Categories' },
                { href: '/news/saved', icon: <BookOpen size={16} />, label: 'Saved' },
              ].map(({ href, icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 p-3 rounded-lg text-sm font-medium hover:bg-[var(--bg-hover)] transition-colors border border-[var(--border)]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span style={{ color: 'var(--accent)' }}>{icon}</span>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
