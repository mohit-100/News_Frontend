import type { Meta, StoryObj } from '@storybook/react';
import { MobileMenu } from './MobileMenu';

const mockCategories = [
  { id: '1', slug: 'tech', name: 'Tech', icon: '💻', count: 12 },
  { id: '2', slug: 'sports', name: 'Sports', icon: '🏅', count: 8 },
];

const meta: Meta<typeof MobileMenu> = {
  title: 'Navbar/MobileMenu',
  component: MobileMenu,
};

export default meta;

type Story = StoryObj<typeof MobileMenu>;

export const Open: Story = {
  args: {
    open: true,
    categories: mockCategories,
    onClose: () => {},
  },
};