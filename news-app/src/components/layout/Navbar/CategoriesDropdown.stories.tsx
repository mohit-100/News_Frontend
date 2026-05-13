import type { Meta, StoryObj } from '@storybook/react';
import { CategoriesDropdown } from './CategoriesDropdown';

const mockCategories = [
  {
    id: '1',
    slug: 'tech',
    name: 'Tech',
    icon: '💻',
    count: 12,
  },
  {
    id: '2',
    slug: 'sports',
    name: 'Sports',
    icon: '🏅',
    count: 8,
  },
  {
    id: '3',
    slug: 'world',
    name: 'World',
    icon: '🌍',
    count: 20,
  },
];

const meta: Meta<typeof CategoriesDropdown> = {
  title: 'Navbar/CategoriesDropdown',
  component: CategoriesDropdown,
};

export default meta;

type Story = StoryObj<typeof CategoriesDropdown>;

export const Default: Story = {
  args: {
    categories: mockCategories,
  },
};