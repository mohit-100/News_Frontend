// src/lib/mock-data.ts
import { NewsArticle, Category } from '@/types';

export const mockCategories: Category[] = [
  { id: '1', name: 'World', slug: 'world', color: '#ef4444', icon: '🌍', count: 142 },
  { id: '2', name: 'Politics', slug: 'politics', color: '#3b82f6', icon: '🏛️', count: 89 },
  { id: '3', name: 'Technology', slug: 'technology', color: '#8b5cf6', icon: '💻', count: 234 },
  { id: '4', name: 'Business', slug: 'business', color: '#f59e0b', icon: '📈', count: 167 },
  { id: '5', name: 'Science', slug: 'science', color: '#10b981', icon: '🔬', count: 98 },
  { id: '6', name: 'Health', slug: 'health', color: '#ec4899', icon: '🏥', count: 76 },
  { id: '7', name: 'Sports', slug: 'sports', color: '#f97316', icon: '⚽', count: 203 },
  { id: '8', name: 'Entertainment', slug: 'entertainment', color: '#06b6d4', icon: '🎬', count: 118 },
  { id: '9', name: 'Climate', slug: 'climate', color: '#22c55e', icon: '🌱', count: 61 },
  { id: '10', name: 'Economy', slug: 'economy', color: '#eab308', icon: '💰', count: 134 },
];

export const mockAuthors = [
  { id: 'a1', name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/sarah/100/100', bio: 'Senior correspondent covering global affairs.', role: 'Senior Correspondent' },
  { id: 'a2', name: 'Marcus Webb', avatar: 'https://picsum.photos/seed/marcus/100/100', bio: 'Technology and innovation reporter.', role: 'Tech Reporter' },
  { id: 'a3', name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/priya/100/100', bio: 'Political analyst and journalist.', role: 'Political Analyst' },
  { id: 'a4', name: 'James O\'Brien', avatar: 'https://picsum.photos/seed/james/100/100', bio: 'Business and economics editor.', role: 'Business Editor' },
  { id: 'a5', name: 'Aisha Patel', avatar: 'https://picsum.photos/seed/aisha/100/100', bio: 'Science and health reporter.', role: 'Science Reporter' },
];

const generateArticle = (id: string, overrides: Partial<NewsArticle> = {}): NewsArticle => {
  const categories = mockCategories;
  const authors = mockAuthors;
  const cat = categories[parseInt(id) % categories.length];
  const author = authors[parseInt(id) % authors.length];

  return {
    id,
    title: `Breaking: ${['Global Leaders Convene for Emergency Climate Summit', 'AI Surpasses Human Performance in Medical Diagnostics', 'Markets Rally Amid Economic Uncertainty', 'Historic Peace Deal Signed in Geneva', 'Scientists Discover New Earth-Like Exoplanet', 'Tech Giants Face New Antitrust Regulations', 'Olympic Records Shattered at World Championships', 'Central Banks Signal Rate Cut Cycle Beginning'][parseInt(id) % 8]}`,
    slug: `article-${id}`,
    excerpt: 'In a development that has sent shockwaves through the international community, world leaders gathered today to address pressing global challenges with unprecedented urgency and cooperation.',
    content: `<p>In a development that has sent shockwaves through the international community, world leaders gathered today to address pressing global challenges with unprecedented urgency and cooperation.</p><p>The summit, which brought together representatives from over 140 nations, marks a pivotal moment in international relations and policy-making. Experts from various fields have weighed in on the potential outcomes and their far-reaching implications.</p><p>"This is a historic moment," said Dr. Elena Martinez, a leading policy analyst. "The convergence of multiple crises has forced nations to set aside differences and work toward common solutions."</p><p>The discussions are expected to continue through the weekend, with a formal declaration anticipated by Sunday evening. Markets have responded positively to the news, with global indices posting modest gains.</p>`,
    coverImage: `https://picsum.photos/seed/${id}/1200/675`,
    author,
    category: cat,
    tags: [
      { id: 't1', name: 'Breaking', slug: 'breaking' },
      { id: 't2', name: 'Global', slug: 'global' },
    ],
    publishedAt: new Date(Date.now() - parseInt(id) * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - parseInt(id) * 1800000).toISOString(),
    readingTime: 3 + (parseInt(id) % 8),
    viewCount: 1000 + parseInt(id) * 234,
    isBreaking: parseInt(id) % 5 === 0,
    isTrending: parseInt(id) % 3 === 0,
    isFeatured: parseInt(id) % 7 === 0,
    ...overrides,
  };
};

export const mockArticles: NewsArticle[] = Array.from({ length: 30 }, (_, i) =>
  generateArticle(String(i + 1))
);

export const mockBreakingNews: NewsArticle[] = Array.from({ length: 5 }, (_, i) =>
  generateArticle(String(i + 100), {
    isBreaking: true,
    title: ['BREAKING: Emergency Session of UN Security Council Called', 'BREAKING: Major Earthquake Strikes Pacific Region', 'BREAKING: Central Bank Announces Emergency Rate Decision', 'BREAKING: Ceasefire Agreement Reached in Conflict Zone', 'BREAKING: Historic Merger Between Tech Giants Announced'][i],
  })
);

export const mockTrending: NewsArticle[] = Array.from({ length: 10 }, (_, i) =>
  generateArticle(String(i + 200), { isTrending: true })
);
