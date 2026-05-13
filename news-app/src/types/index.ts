// src/types/index.ts

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  role?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string;
  icon?: string;
  count?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: Category;
  tags: Tag[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  viewCount: number;
  isBreaking?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  sourceUrl?: string;
  sourceName?: string;
}

export interface NewsFilters {
  category?: string;
  search?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'latest' | 'trending' | 'popular';
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface NewsResponse {
  articles: NewsArticle[];
  pagination: PaginationInfo;
}

export interface UserPreferences {
  followedCategories: string[];
  savedArticles: string[];
  readHistory: string[];
}
