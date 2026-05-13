// src/app/category/[slug]/page.tsx
'use client';

import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BreakingTicker } from '@/components/news/BreakingTicker';
import { ArticleCard } from '@/components/news/ArticleCard';
import { TrendingSidebar } from '@/components/feed/TrendingSidebar';
import { FilterBar } from '@/components/news/FilterBar';
import { ArticleListSkeleton } from '@/components/ui/Skeleton';
import { useArticles, useCategories } from '@/lib/hooks/useNews';
import { useNewsStore } from '@/store/news-store';
import { mockCategories } from '@/lib/mock-data';
import Link from 'next/link';
import { ArrowLeft, Users, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface Props {
  params: { slug: string };
}

export default function CategoryPage({ params }: Props) {
  const { slug } = params;
  const { filters } = useNewsStore();
  const { preferences, followCategory, unfollowCategory } = useNewsStore();
  const { categories } = useCategories();

  const category = mockCategories.find((c) => c.slug === slug);
  const [page, setPage] = useState(1);

  const { articles, loading, hasMore, total, refetch } = useArticles(
    { ...filters, category: slug }, 1, 12
  );

  const isFollowing = category ? preferences.followedCategories.includes(category.id) : false;

  const handleFollow = () => {
    if (!category) return;
    if (isFollowing) unfollowCategory(category.id);
    else followCategory(category.id);
  };

  if (!category) {
    return (
      <>
        <Navbar />
        <main className="pt-14">
          <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
            <p className="text-4xl mb-4">📂</p>
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
              Category not found
            </h1>
            <Link href="/category" className="btn-primary inline-flex mt-4">Browse Categories</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <BreakingTicker />
      <main className="pt-[calc(3.5rem+1.5rem+1px)]">
        {/* Category hero */}
        <div className="border-b border-[var(--border)]" style={{ background: `${category.color}08` }}>
          <div className="max-w-screen-xl mx-auto px-4 py-8">
            <Link href="/news" className="inline-flex items-center gap-2 mb-4 text-sm hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-muted)' }}>
              <ArrowLeft size={14} /> All News
            </Link>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{category.icon}</span>
                  <h1 className="text-3xl font-black" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
                    {category.name}
                  </h1>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {total} articles · Updated in real-time
                </p>
              </div>
              <button
                onClick={handleFollow}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  isFollowing ? 'text-white border-transparent' : 'border-[var(--border)] hover:border-current'
                }`}
                style={isFollowing
                  ? { background: category.color, color: 'white' }
                  : { color: category.color }
                }
              >
                <Users size={14} />
                {isFollowing ? '✓ Following' : 'Follow'}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 py-8">
         {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">  */}
            <div className="space-y-8">  
            <div className="xl:col-span-2 space-y-6">
              {/* Filters */}
              <div className="card rounded-xl p-4">
                <FilterBar />
              </div>

              {/* Articles */}
              {loading && articles.length === 0 ? (
                <ArticleListSkeleton count={6} />
              ) : articles.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-4xl mb-3">{category.icon}</p>
                  <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No articles in {category.name} yet</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Check back soon for updates</p>
                </div>
              ) : (
                <>
                  {/* Featured first article */}
                  {articles[0] && <ArticleCard article={articles[0]} variant="featured" />}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {articles.slice(1).map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </>
              )}

              {hasMore && (
                <div className="text-center mt-4">
                  <button onClick={() => setPage((p) => p + 1)} className="btn-primary flex items-center gap-2 mx-auto">
                    {loading ? <RefreshCw size={14} className="animate-spin" /> : null}
                    Load More
                  </button>
                </div>
              )}
            </div>
             
  <TrendingSidebar />

          </div>

          {/* Related categories */}
          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
              Other Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.filter((c) => c.slug !== slug).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: `${cat.color}10`,
                    color: cat.color,
                    borderColor: `${cat.color}25`,
                  }}
                >
                  {cat.icon} {cat.name}
                  <span className="text-xs opacity-60 ml-1">({cat.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
