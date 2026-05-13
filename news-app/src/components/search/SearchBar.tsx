// src/components/search/SearchBar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useNewsStore } from '@/store/news-store';
import { useArticles } from '@/lib/hooks/useNews';
import { debounce } from '@/lib/utils';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';


const POPULAR_SEARCHES = ['Climate Summit', 'AI Technology', 'Market Rally', 'Elections', 'Tech Regulations'];

export function SearchBar({ fullPage = false }: { fullPage?: boolean }) {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useNewsStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { articles: suggestions } = useArticles({ search: localQuery }, 1, 5);

  
 const debouncedUpdate = debounce((val: string) => setSearchQuery(val), 300);
 
  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalQuery(val);
    debouncedUpdate(val);
    setShowSuggestions(val.length > 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(localQuery.trim())}`);
    }
  };

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (fullPage) {
    return (
      <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={handleChange}
            onFocus={() => { setFocused(true); setShowSuggestions(localQuery.length > 1); }}
            placeholder="Search breaking news, topics, categories…"
            className="input-field pl-12 pr-12 py-4 text-base rounded-xl"
            autoFocus
          />
          {localQuery && (
            <button type="button" onClick={handleClear} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[var(--bg-hover)]">
              <X size={16} style={{ color: 'var(--text-muted)' }} />
            </button>
          )}
        </form>

        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 card rounded-xl overflow-hidden z-50 animate-slide-up">
            <div className="p-2">
              {suggestions.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  onClick={() => setShowSuggestions(false)}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bg-hover)] transition-colors group"
                >
                  <Search size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1 group-hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}>
                      {article.title}
                    </p>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{article.category.name}</span>
                  </div>
                  <ArrowRight size={14} className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Popular searches */}
        {!localQuery && (
          <div className="mt-6">
            <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <TrendingUp size={14} /> Popular searches
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setLocalQuery(term);
                    setSearchQuery(term);
                    router.push(`/search?q=${encodeURIComponent(term)}`);
                  }}
                  className="px-3 py-1.5 rounded-full text-sm border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
        <input
          ref={inputRef}
          type="text"
          value={localQuery}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          placeholder="Search news…"
          className="input-field pl-9 pr-8 py-2 text-sm rounded-lg w-48 focus:w-64 transition-all"
        />
        {localQuery && (
          <button type="button" onClick={handleClear} className="absolute right-2 top-1/2 -translate-y-1/2">
            <X size={14} style={{ color: 'var(--text-muted)' }} />
          </button>
        )}
      </form>
    </div>
  );
}
