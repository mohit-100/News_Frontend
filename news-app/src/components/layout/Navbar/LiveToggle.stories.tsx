import type { Meta, StoryObj } from '@storybook/react';
import { LiveToggle } from './LiveToggle';

const meta: Meta<typeof LiveToggle> = {
  title: 'Navbar/LiveToggle',
  component: LiveToggle,
};

export default meta;

type Story = StoryObj<typeof LiveToggle>;

export const Live: Story = {
  args: {
    isLive: true,
    onToggle: () => console.log('toggle'),
  },
};

export const Paused: Story = {
  args: {
    isLive: false,
    onToggle: () => console.log('toggle'),
  },
};