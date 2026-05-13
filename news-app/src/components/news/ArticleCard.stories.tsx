import type { Meta, StoryObj } from '@storybook/react';

import { ArticleCard } from './ArticleCard';

const mockArticle = {
  id: '1',
  title: 'Breaking AI News',
  excerpt: 'AI is transforming the industry.',
  content: '<p>Full article content</p>',
  slug: 'breaking-ai-news',
  coverImage: 'https://picsum.photos/600/400',
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  readingTime: 5,
  viewCount: 1200,
  isBreaking: true,
  isTrending: true,
  isFeatured: false,

  category: {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    color: '#8b5cf6',
    icon: '💻',
    count: 120,
  },

  author: {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://picsum.photos/100',
    role: 'Tech Reporter',
    bio: 'Senior tech journalist',
  },

  tags: [],
};
const meta: Meta<typeof ArticleCard> = {
  title: 'News/ArticleCard',
  component: ArticleCard,
};

export default meta;

type Story = StoryObj<typeof ArticleCard>;

export const Default: Story = {
  args: {
    article: mockArticle,
  },
};

export const Breaking: Story = {
  args: {
    article: {
      ...mockArticle,
      isBreaking: true,
    },
  },
};

export const Trending: Story = {
  args: {
    article: {
      ...mockArticle,
      isTrending: true,
    },
  },
};