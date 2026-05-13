// src/app/news/[slug]/ArticleDetailContent.tsx
'use client';

import { useArticle, useArticles } from '@/lib/hooks/useNews';
import { useNewsStore } from '@/store/news-store';
import { ArticleCard } from '@/components/news/ArticleCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatFullDate, formatViewCount, cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock, Eye, Bookmark, BookmarkCheck, Share2, Twitter,
  Facebook, Link2, ArrowLeft, ChevronRight, Tag
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function ArticleDetailContent({ slug }: { slug: string }) {
  const { article, loading } = useArticle(slug);
  const { preferences, saveArticle, unsaveArticle, markAsRead } = useNewsStore();
  const { articles: related } = useArticles({ category: article?.category.slug }, 1, 4);
  const [imgError, setImgError] = useState(false);

  const isSaved = article ? preferences.savedArticles.includes(article.id) : false;

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-4/5" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <div className="space-y-3 pt-4">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">📰</p>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
          Article not found
        </h1>
        <Link href="/news" className="btn-primary inline-flex mt-4">← Back to News</Link>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article.title;
    if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    if (platform === 'facebook') window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast.success('Link copied!');
    }
  };

  const handleSave = () => {
    if (isSaved) {
      unsaveArticle(article.id);
      toast.success('Removed from saved');
    } else {
      saveArticle(article.id);
      markAsRead(article.id);
      toast.success('Article saved!');
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
          <ChevronRight size={14} />
          <Link href="/news" className="hover:text-[var(--accent)]">News</Link>
          <ChevronRight size={14} />
          <Link href={`/category/${article.category.slug}`} className="hover:text-[var(--accent)]">
            {article.category.name}
          </Link>
        </nav>

        {/* Back button */}
        <Link href="/news" className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={16} /> Back to News
        </Link>

        <article>
          {/* Category + badges */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {article.isBreaking && (
              <span className="breaking-badge">Breaking</span>
            )}
            <Link href={`/category/${article.category.slug}`}>
              <span className="category-badge hover:opacity-80 transition-opacity"
                style={{ background: `${article.category.color}18`, color: article.category.color }}>
                {article.category.icon} {article.category.name}
              </span>
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-black leading-tight mb-4"
            style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg leading-relaxed mb-6 font-medium"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>
            {article.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex items-center flex-wrap gap-4 pb-6 mb-6 border-b border-[var(--border)]">
            {/* Author */}
            <div className="flex items-center gap-2.5">
              {article.author.avatar && (
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={40} height={40}
                  className="rounded-full object-cover border-2 border-[var(--border)]"
                />
              )}
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{article.author.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{article.author.role}</p>
              </div>
            </div>

            <div className="h-4 w-px" style={{ background: 'var(--border)' }} />

            {/* Published */}
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {formatFullDate(article.publishedAt)}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 text-sm ml-auto" style={{ color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {article.readingTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={14} /> {formatViewCount(article.viewCount)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 ml-auto">
              <button onClick={handleSave} className="btn-ghost p-2 rounded-lg flex items-center gap-1.5 text-sm">
                {isSaved
                  ? <BookmarkCheck size={16} style={{ color: 'var(--accent)' }} />
                  : <Bookmark size={16} />
                }
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button onClick={() => handleShare('copy')} className="btn-ghost p-2 rounded-lg">
                <Link2 size={16} />
              </button>
              <button onClick={() => handleShare('twitter')} className="btn-ghost p-2 rounded-lg">
                <Twitter size={16} />
              </button>
              <button onClick={() => handleShare('facebook')} className="btn-ghost p-2 rounded-lg">
                <Facebook size={16} />
              </button>
            </div>
          </div>

          {/* Cover image */}
          <div className="relative rounded-2xl overflow-hidden mb-8" style={{ aspectRatio: '16/9' }}>
            {!imgError ? (
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                className="object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl"
                style={{ background: 'var(--bg-secondary)' }}>📰</div>
            )}
            {article.sourceName && (
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded text-xs"
                style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}>
                📷 {article.sourceName}
              </div>
            )}
          </div>

          {/* Article body */}
          <div
            className="article-content max-w-none mb-10"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 pt-6 border-t border-[var(--border)] mb-8">
              <Tag size={14} style={{ color: 'var(--text-muted)' }} />
              {article.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/search?q=${tag.name}`}
                  className="px-3 py-1 rounded-full text-xs border hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Author bio */}
          <div className="card rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-4">
              {article.author.avatar && (
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={56} height={56}
                  className="rounded-full object-cover border-2 border-[var(--border)] flex-shrink-0"
                />
              )}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>About the Author</p>
                <p className="font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
                  {article.author.name}
                </p>
                <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{article.author.role}</p>
                {article.author.bio && (
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{article.author.bio}</p>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section>
            <div className="divider mb-8" />
            <div className="section-header">
              <span className="w-1 h-6 rounded-full" style={{ background: 'var(--accent)' }} />
              <h2 className="section-title">Related Stories</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.slice(0, 3).map((rel) => (
                <ArticleCard key={rel.id} article={rel} variant="default" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
