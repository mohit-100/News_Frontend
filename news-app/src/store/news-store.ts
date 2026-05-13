// src/store/news-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewsArticle, NewsFilters, UserPreferences } from '@/types';

interface LiveUpdate {
  id: string;
  article: NewsArticle;
  type: 'breaking' | 'trending' | 'new';
  timestamp: string;
}

interface NewsStore {
  // Filters
  filters: NewsFilters;
  setFilters: (filters: Partial<NewsFilters>) => void;
  resetFilters: () => void;

  // Live updates
  liveUpdates: LiveUpdate[];
  addLiveUpdate: (update: LiveUpdate) => void;
  clearLiveUpdates: () => void;
  isLiveEnabled: boolean;
  toggleLive: () => void;

  // User preferences
  preferences: UserPreferences;
  followCategory: (categoryId: string) => void;
  unfollowCategory: (categoryId: string) => void;
  saveArticle: (articleId: string) => void;
  unsaveArticle: (articleId: string) => void;
  markAsRead: (articleId: string) => void;

  // UI state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const defaultFilters: NewsFilters = {
  sortBy: 'latest',
};

const defaultPreferences: UserPreferences = {
  followedCategories: [],
  savedArticles: [],
  readHistory: [],
};

export const useNewsStore = create<NewsStore>()(
  persist(
    (set) => ({
      filters: defaultFilters,
      setFilters: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
      resetFilters: () => set({ filters: defaultFilters }),

      liveUpdates: [],
      addLiveUpdate: (update) =>
        set((state) => ({
          liveUpdates: [update, ...state.liveUpdates].slice(0, 20),
        })),
      clearLiveUpdates: () => set({ liveUpdates: [] }),
      isLiveEnabled: true,
      toggleLive: () => set((state) => ({ isLiveEnabled: !state.isLiveEnabled })),

      preferences: defaultPreferences,
      followCategory: (categoryId) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            followedCategories: state.preferences.followedCategories.includes(categoryId)
              ? state.preferences.followedCategories
              : [...state.preferences.followedCategories, categoryId],
          },
        })),
      unfollowCategory: (categoryId) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            followedCategories: state.preferences.followedCategories.filter((id) => id !== categoryId),
          },
        })),
      saveArticle: (articleId) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            savedArticles: state.preferences.savedArticles.includes(articleId)
              ? state.preferences.savedArticles
              : [...state.preferences.savedArticles, articleId],
          },
        })),
      unsaveArticle: (articleId) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            savedArticles: state.preferences.savedArticles.filter((id) => id !== articleId),
          },
        })),
      markAsRead: (articleId) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            readHistory: state.preferences.readHistory.includes(articleId)
              ? state.preferences.readHistory
              : [articleId, ...state.preferences.readHistory].slice(0, 100),
          },
        })),

      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: 'news-preferences',
      partialize: (state) => ({ preferences: state.preferences, isLiveEnabled: state.isLiveEnabled }),
    }
  )
);
