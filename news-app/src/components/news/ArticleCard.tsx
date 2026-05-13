// src/components/news/ArticleCard.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@/types';
import { formatRelativeTime, formatViewCount, cn } from '@/lib/utils';
import { useNewsStore } from '@/store/news-store';
import { Bookmark, Eye, Clock, BookmarkCheck, TrendingUp, Zap } from 'lucide-react';

interface ArticleCardProps {
  article: NewsArticle;
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const { preferences, saveArticle, unsaveArticle } = useNewsStore();
  const isSaved = preferences.savedArticles.includes(article.id);
  const [imgError, setImgError] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) unsaveArticle(article.id);
    else saveArticle(article.id);
  };

  if (variant === 'compact') {
    return (
      <Link href={`/news/${article.slug}`} className="group flex gap-3 items-start py-3 border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-hover)] rounded-lg px-2 -mx-2 transition-colors">
        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-[var(--bg-secondary)]">
          {!imgError ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              width={64} height={64}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">📰</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider mb-1 block"
            style={{ color: article.category.color || 'var(--accent)' }}>
            {article.category.name}
          </span>
          <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors"
            style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
            {article.title}
          </h3>
          <span className="text-xs mt-1 block" style={{ color: 'var(--text-muted)' }}>
            {formatRelativeTime(article.publishedAt)}
          </span>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/news/${article.slug}`} className="group card flex gap-4 p-4 rounded-xl hover:shadow-md">
        <div className="relative flex-shrink-0 w-36 h-24 rounded-lg overflow-hidden bg-[var(--bg-secondary)]">
          {!imgError ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl">📰</div>
          )}
          {article.isBreaking && (
            <div className="absolute top-2 left-2 breaking-badge text-[9px]">Breaking</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="category-badge text-[10px]"
              style={{ background: `${article.category.color}18`, color: article.category.color }}>
              {article.category.name}
            </span>
            {article.isTrending && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--gold)]">
                <TrendingUp size={10} /> Trending
              </span>
            )}
          </div>
          <h3 className="text-base font-bold leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors"
            style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
            {article.title}
          </h3>
          <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span>{article.author.name}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={10} />{article.readingTime}m read</span>
            <span>·</span>
            <span>{formatRelativeTime(article.publishedAt)}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/news/${article.slug}`} className="group relative block card rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[2/1]">
        {!imgError ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover group-hover:scale-103 transition-transform duration-700"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-hover)] flex items-center justify-center text-6xl">📰</div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            {article.isBreaking && <div className="breaking-badge">Breaking</div>}
            <span className="category-badge text-[10px]"
              style={{ background: `${article.category.color}30`, color: 'white', borderColor: `${article.category.color}50` }}>
              {article.category.icon} {article.category.name}
            </span>
          </div>
          <h2 className="text-xl md:text-3xl font-black text-white leading-tight mb-3 group-hover:text-yellow-200 transition-colors"
            style={{ fontFamily: 'var(--font-playfair)' }}>
            {article.title}
          </h2>
          <p className="text-white/75 text-sm line-clamp-2 hidden md:block mb-3">{article.excerpt}</p>
          <div className="flex items-center gap-3 text-white/60 text-xs">
            <span className="font-medium text-white/80">{article.author.name}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={10} />{article.readingTime}m</span>
            <span>·</span>
            <span>{formatRelativeTime(article.publishedAt)}</span>
            <span className="flex items-center gap-1 ml-auto"><Eye size={10} />{formatViewCount(article.viewCount)}</span>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110"
        >
          {isSaved ? <BookmarkCheck size={16} className="fill-current" /> : <Bookmark size={16} />}
        </button>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/news/${article.slug}`} className="group card rounded-xl overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-secondary)]">
        {!imgError ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">📰</div>
        )}
        {article.isBreaking && (
          <div className="absolute top-3 left-3 breaking-badge">Breaking</div>
        )}
        {article.isTrending && !article.isBreaking && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-[10px] font-bold text-yellow-300 uppercase tracking-wider">
            <TrendingUp size={10} /> Trending
          </div>
        )}
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
        >
          {isSaved ? <BookmarkCheck size={14} className="fill-current" /> : <Bookmark size={14} />}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="category-badge text-[10px]"
            style={{ background: `${article.category.color}15`, color: article.category.color }}>
            {article.category.name}
          </span>
        </div>

        <h3 className="font-bold text-base leading-snug line-clamp-2 mb-2 group-hover:text-[var(--accent)] transition-colors flex-1"
          style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
          {article.title}
        </h3>

        <p className="text-sm line-clamp-2 mb-3" style={{ color: 'var(--text-muted)' }}>
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[var(--border)]">
          {article.author.avatar && (
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={24} height={24}
              className="rounded-full object-cover"
            />
          )}
          <span className="text-xs font-medium truncate" style={{ color: 'var(--text-secondary)' }}>
            {article.author.name}
          </span>
          <div className="ml-auto flex items-center gap-2 text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-0.5"><Clock size={10} />{article.readingTime}m</span>
            <span>·</span>
            <span>{formatRelativeTime(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
