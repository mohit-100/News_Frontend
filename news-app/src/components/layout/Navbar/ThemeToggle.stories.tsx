import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Navbar/ThemeToggle',
  component: ThemeToggle,
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Light: Story = {
  args: {
    theme: 'light',
    onToggle: () => {},
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
    onToggle: () => {},
  },
};