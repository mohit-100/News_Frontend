// src/app/news/saved/page.tsx
'use client';

import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/news/ArticleCard';
import { useNewsStore } from '@/store/news-store';
import { mockArticles } from '@/lib/mock-data';
import Link from 'next/link';
import { Bookmark, ArrowLeft } from 'lucide-react';

export default function SavedPage() {
  const { preferences } = useNewsStore();
   console.log("Zustand->",preferences)
  const savedArticles = mockArticles.filter((a) =>
    preferences.savedArticles.includes(a.id)
  );

  return (
    <>
      <Navbar />
      <main className="pt-14">
        <div className="max-w-screen-xl mx-auto px-4 py-10">
          <div className="mb-8">
            <Link href="/news" className="inline-flex items-center gap-2 mb-4 text-sm hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-muted)' }}>
              <ArrowLeft size={14} /> Back to News
            </Link>
            <div className="flex items-center gap-3">
              <Bookmark size={24} style={{ color: 'var(--accent)' }} />
              <h1 className="text-3xl font-black" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
                Saved Articles
              </h1>
              <span className="ml-2 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
                {savedArticles.length}
              </span>
            </div>
          </div>

          {savedArticles.length === 0 ? (
            <div className="text-center py-20">
              <Bookmark size={56} className="mx-auto mb-4 opacity-15" style={{ color: 'var(--text-muted)' }} />
              <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
                No saved articles yet
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                Bookmark articles to read them later
              </p>
              <Link href="/news" className="btn-primary inline-flex px-6 py-3 rounded-xl">
                Explore News
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
