// src/components/news/FilterBar.tsx
'use client';

import { useNewsStore } from '@/store/news-store';
import { useCategories } from '@/lib/hooks/useNews';
import { NewsFilters } from '@/types';
import { cn } from '@/lib/utils';
import { SlidersHorizontal, X, Clock, TrendingUp, Star } from 'lucide-react';
import { useState } from 'react';

const SORT_OPTIONS: { value: NewsFilters['sortBy']; label: string; icon: React.ElementType }[] = [
  { value: 'latest', label: 'Latest', icon: Clock },
  { value: 'trending', label: 'Trending', icon: TrendingUp },
  { value: 'popular', label: 'Popular', icon: Star },
];

export function FilterBar() {
  const { filters, setFilters, resetFilters } = useNewsStore();
  const { categories } = useCategories();
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll ? categories : categories.slice(0, 7);
  const hasActiveFilters = filters.category || (filters.sortBy && filters.sortBy !== 'latest');

  return (
    <div className="space-y-3">
      {/* Sort options */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={14} style={{ color: 'var(--text-muted)' }} />
        <div className="flex items-center gap-1">
          {SORT_OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setFilters({ sortBy: value })}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                filters.sortBy === value || (!filters.sortBy && value === 'latest')
                  ? 'text-white shadow-sm'
                  : 'hover:bg-[var(--bg-hover)]'
              )}
              style={
                filters.sortBy === value || (!filters.sortBy && value === 'latest')
                  ? { background: 'var(--accent)', color: 'white' }
                  : { color: 'var(--text-secondary)' }
              }
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="ml-auto flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            <X size={12} />
            Clear filters
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilters({ category: undefined })}
          className={cn(
            'category-badge transition-all',
            !filters.category
              ? 'text-white'
              : 'hover:opacity-80'
          )}
          style={!filters.category
            ? { background: 'var(--text-primary)', color: 'var(--bg-primary)' }
            : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }
          }
        >
          All
        </button>

        {visibleCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilters({ category: filters.category === cat.slug ? undefined : cat.slug })}
            className="category-badge transition-all"
            style={
              filters.category === cat.slug
                ? { background: cat.color, color: 'white', border: `1px solid ${cat.color}` }
                : { background: `${cat.color}12`, color: cat.color, border: `1px solid ${cat.color}30` }
            }
          >
            {cat.icon} {cat.name}
          </button>
        ))}

        {categories.length > 7 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-medium px-2 py-1 rounded-full hover:bg-[var(--bg-hover)] transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            {showAll ? 'Show less' : `+${categories.length - 7} more`}
          </button>
        )}
      </div>
    </div>
  );
}
