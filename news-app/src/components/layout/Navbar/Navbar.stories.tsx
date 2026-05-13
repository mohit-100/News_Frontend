import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import React, { useEffect } from 'react';

// -----------------------------
// Mock Data
// -----------------------------
const mockCategories = [
  { id: 1, slug: 'tech', name: 'Tech', icon: '💻', count: 12 },
  { id: 2, slug: 'sports', name: 'Sports', icon: '🏅', count: 8 },
  { id: 3, slug: 'world', name: 'World', icon: '🌍', count: 20 },
];

// -----------------------------
// Mock Store
// -----------------------------
const mockModules = (overrides?: any) => {
  (window as any).__NEWS_STORE__ = {
    setSearchQuery: () => {},
    isLiveEnabled: true,
    toggleLive: () => {},
    ...(overrides?.store || {}),
  };

  (window as any).__CATEGORIES__ =
    overrides?.categories || mockCategories;
};

// -----------------------------
// Decorator
// -----------------------------
const StoryWrapper = (Story: any, context: any) => {
  const isLiveEnabled =
    context.parameters.isLiveEnabled ?? true;

  useEffect(() => {
    mockModules({
      store: {
        isLiveEnabled,
      },
      categories:
        context.parameters.categories || mockCategories,
    });
  }, [isLiveEnabled, context.parameters.categories]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Story />
    </div>
  );
};

// -----------------------------
// Meta
// -----------------------------
const meta: Meta<typeof Navbar> = {
  title: 'Layout/Navbar',
  component: Navbar,
  decorators: [StoryWrapper],

  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

// -----------------------------
// Stories
// -----------------------------
export const Default: Story = {};

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const LivePaused: Story = {
  parameters: {
    isLiveEnabled: false,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const FewCategories: Story = {
  parameters: {
    categories: mockCategories.slice(0, 2),
  },
};

// -----------------------------
// Auto open mobile menu
// -----------------------------
export const MobileMenuOpen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },

  play: async ({ canvasElement }) => {
    const buttons =
      canvasElement.querySelectorAll('button');

    const menuButton = Array.from(buttons).find(
      (btn) =>
        btn.innerHTML.includes('Menu') ||
        btn.innerHTML.includes('X')
    ) as HTMLElement;

    menuButton?.click();
  },
};

// -----------------------------
// Focus right section only
// -----------------------------
export const RightActionsOnly: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          overflow: 'hidden',
          height: '80px',
        }}
      >
        <div
          style={{
            width: '420px',
            marginLeft: 'auto',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
};