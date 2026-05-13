// src/lib/hooks/useNews.ts
'use client';


import { useQuery } from '@apollo/client';

import {
  GET_ARTICLES,
  GET_ARTICLE,
  GET_BREAKING_NEWS,
  GET_TRENDING,
  GET_CATEGORIES,
} from '@/lib/graphql/queries';

//  import { useEffect, useRef, useState } from 'react';

import { useState, useEffect, useCallback, useRef } from 'react';
import { NewsArticle, NewsFilters, Category } from '@/types';
import { useNewsStore } from '@/store/news-store';
 import { mockArticles, mockBreakingNews, mockTrending, mockCategories } from '@/lib/mock-data';

// Simulates Apollo useQuery with loading/error states
export function useArticles(filters?: NewsFilters, page = 1, limit = 12) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      let filtered = [...mockArticles];
      if (filters?.category) {
        filtered = filtered.filter((a) => a.category.slug === filters.category);
      }
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(
          (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
        );
      }
      if (filters?.sortBy === 'trending') filtered = filtered.filter((a) => a.isTrending);
      if (filters?.sortBy === 'popular') filtered.sort((a, b) => b.viewCount - a.viewCount);
      
      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);
      setTotal(filtered.length);
      setArticles(page === 1 ? paginated : (prev) => [...prev, ...paginated]);
      setHasMore(start + limit < filtered.length);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, [filters?.category, filters?.search, filters?.sortBy, page, limit]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, loading, error, hasMore, total, refetch: fetchArticles };
}

export function useArticle(slug: string) {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 300));
        const found = mockArticles.find((a) => a.slug === slug) || mockArticles[0];
        setArticle(found);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  return { article, loading, error };
}

// export function useBreakingNews() {
//   const [news, setNews] = useState<NewsArticle[]>(mockBreakingNews);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Simulate real-time breaking news
//     const interval = setInterval(() => {
//       setNews((prev) => {
//         const newItem = { ...mockBreakingNews[Math.floor(Math.random() * mockBreakingNews.length)] };
//         newItem.id = String(Date.now());
//         newItem.publishedAt = new Date().toISOString();
//         return [newItem, ...prev.slice(0, 4)];
//       });
//     }, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   return { news, loading };
// }
export function useBreakingNews() {
  const { isLiveEnabled } = useNewsStore();

  const [news, setNews] = useState<NewsArticle[]>(mockBreakingNews);

  useEffect(() => {
    if (!isLiveEnabled) return;

    const interval = setInterval(() => {
      const random =
        mockBreakingNews[
          Math.floor(Math.random() * mockBreakingNews.length)
        ];

      const update: NewsArticle = {
        ...random,
        id: String(Date.now()),
        publishedAt: new Date().toISOString(),
      };

      setNews((prev) => [update, ...prev.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(interval);
  }, [isLiveEnabled]);

  return { news };
}


export function useTrending(limit = 10) {
  const [trending, setTrending] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      await new Promise((r) => setTimeout(r, 200));
      setTrending(mockTrending.slice(0, limit));
      setLoading(false);
    };
    fetch();

    const interval = setInterval(() => {
      setTrending((prev) => {
        const shuffled = [...prev].sort(() => Math.random() - 0.5);
        return shuffled;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [limit]);

  return { trending, loading };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      await new Promise((r) => setTimeout(r, 150));
      setCategories(mockCategories);
      setLoading(false);
    };
    fetch();
  }, []);

  return { categories, loading };
}

export function useLiveUpdates(enabled: boolean) {
  const [updates, setUpdates] = useState<NewsArticle[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      const randomArticle = mockArticles[Math.floor(Math.random() * mockArticles.length)];
      const update = {
        ...randomArticle,
        id: String(Date.now()),
        publishedAt: new Date().toISOString(),
      };
      setUpdates((prev) => [update, ...prev].slice(0, 5));
    }, 15000);

    return () => clearInterval(intervalRef.current);
  }, [enabled]);

  return { updates };
}

export function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const observerRef = useRef<IntersectionObserver>();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [callback, hasMore]);

  return { loadMoreRef };
}


//src/lib/hooks/useNews.ts
// 'use client';

// import { useEffect, useRef } from 'react';
// import { useQuery } from '@apollo/client';

// import {
//   GET_ARTICLES,
//   GET_ARTICLE,
//   GET_BREAKING_NEWS,
//   GET_TRENDING,
//   GET_CATEGORIES,
// } from '@/lib/graphql/queries';

// import { NewsFilters } from '@/types';

// // =========================
// // ARTICLES
// // =========================

// export function useArticles(
//   filters?: NewsFilters,
//   page = 1,
//   limit = 12
// ) {
//   const { data, loading, error, refetch, fetchMore } = useQuery(
//     GET_ARTICLES,
//     {
//       variables: {
//         filters,
//         page,
//         limit,
//       },
//       notifyOnNetworkStatusChange: true,
//     }
//   );

//   console.log('GRAPHQL DATA:', data);

//   const articles = data?.articles?.articles || [];
//   const pagination = data?.articles?.pagination;

//   return {
//     articles,
//     loading,
//     error,
//     total: pagination?.total || 0,
//     hasMore: pagination?.hasNextPage || false,
//     refetch,
//     fetchMore,
//   };
// }

// // =========================
// // SINGLE ARTICLE
// // =========================

// export function useArticle(slug: string) {
//   const { data, loading, error, refetch } = useQuery(
//     GET_ARTICLE,
//     {
//       variables: { slug },
//       skip: !slug,
//     }
//   );

//   return {
//     article: data?.article || null,
//     loading,
//     error,
//     refetch,
//   };
// }

// // =========================
// // BREAKING NEWS
// // =========================

// export function useBreakingNews(limit = 5) {
//   const { data, loading, error, refetch } = useQuery(
//     GET_BREAKING_NEWS,
//     {
//       variables: { limit },
//       pollInterval: 30000,
//     }
//   );

//   return {
//     news: data?.breakingNews || [],
//     loading,
//     error,
//     refetch,
//   };
// }

// // =========================
// // TRENDING
// // =========================

// export function useTrending(limit = 10) {
//   const { data, loading, error, refetch } = useQuery(
//     GET_TRENDING,
//     {
//       variables: { limit },
//       pollInterval: 60000,
//     }
//   );

//   return {
//     trending: data?.trending || [],
//     loading,
//     error,
//     refetch,
//   };
// }

// // =========================
// // CATEGORIES
// // =========================

// export function useCategories() {
//   const { data, loading, error, refetch } = useQuery(
//     GET_CATEGORIES
//   );

//   return {
//     categories: data?.categories || [],
//     loading,
//     error,
//     refetch,
//   };
// }

// // =========================
// // LIVE UPDATES
// // =========================

// export function useLiveUpdates(enabled: boolean) {
//   const { data } = useQuery(GET_BREAKING_NEWS, {
//     variables: { limit: 5 },
//     skip: !enabled,
//     pollInterval: enabled ? 15000 : 0,
//   });

//   return {
//     updates: data?.breakingNews || [],
//   };
// }

// // =========================
// // INFINITE SCROLL
// // =========================

// export function useInfiniteScroll(
//   callback: () => void,
//   hasMore: boolean
// ) {
//   const observerRef = useRef<IntersectionObserver>();
//   const loadMoreRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           callback();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (loadMoreRef.current) {
//       observerRef.current.observe(loadMoreRef.current);
//     }

//     return () => observerRef.current?.disconnect();
//   }, [callback, hasMore]);

//   return { loadMoreRef };
// }


//NewAPI--------#####-------






