// src/components/feed/LiveUpdates.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { LiveUpdatesBanner, LiveFeedSection } from './LiveUpdates';
import { mockArticles } from '@/lib/mock-data';

const meta: Meta<typeof LiveFeedSection> = {
  title: 'Feed/LiveUpdates',
  component: LiveFeedSection,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof LiveFeedSection>;

export const FeedSection: Story = {
  args: {
    articles: mockArticles.slice(0, 8),
  },
};

export const EmptyFeed: Story = {
  args: {
    articles: [],
  },
};

export const BannerOnly: StoryObj<typeof LiveUpdatesBanner> = {
  render: () => <LiveUpdatesBanner />,
};