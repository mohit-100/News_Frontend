// src/app/search/page.tsx
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchBar } from '@/components/search/SearchBar';
import { ArticleCard } from '@/components/news/ArticleCard';
import { ArticleListSkeleton } from '@/components/ui/Skeleton';
import { useArticles } from '@/lib/hooks/useNews';
import { FilterBar } from '@/components/news/FilterBar';
import { useNewsStore } from '@/store/news-store';
import { Search, X } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const { filters, setSearchQuery } = useNewsStore();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const { articles, loading, total } = useArticles(
    { ...filters, search: query },
    1, 12
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      {/* Search hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-black mb-6 text-center" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
          Search News
        </h1>
        <SearchBar fullPage />
      </div>

      {query && (
        <>
          {/* Results header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
            <div>
              <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {loading ? 'Searching…' : `${total} result${total !== 1 ? 's' : ''} for`}{' '}
                <span style={{ color: 'var(--accent)' }}>"{query}"</span>
              </p>
            </div>
            <button
              onClick={() => setQuery('')}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <X size={14} /> Clear
            </button>
          </div>

          {/* Filters */}
          <div className="card rounded-xl p-4 mb-6">
            <FilterBar />
          </div>

          {/* Results */}
          {loading ? (
            <ArticleListSkeleton count={6} />
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <Search size={48} className="mx-auto mb-4 opacity-20" style={{ color: 'var(--text-muted)' }} />
              <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
                No results found
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                Try different keywords or browse our categories
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setQuery('')} className="btn-ghost border border-[var(--border)] rounded-xl px-4 py-2">
                  Clear Search
                </button>
                <a href="/category" className="btn-primary rounded-xl px-4 py-2">
                  Browse Categories
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </>
      )}

      {!query && (
        <div className="text-center py-12">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
            Discover stories that matter
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Search across thousands of articles by topic, author, or keyword
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Suspense fallback={
          <div className="max-w-screen-xl mx-auto px-4 py-10">
            <div className="h-12 w-full max-w-xl mx-auto skeleton rounded-xl mb-8" />
            <ArticleListSkeleton count={6} />
          </div>
        }>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
