import type { Meta, StoryObj } from '@storybook/react';

import { BreakingTicker } from './BreakingTicker';

const meta: Meta<typeof BreakingTicker> = {
  title: 'News/BreakingTicker',
  component: BreakingTicker,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof BreakingTicker>;

export const Default: Story = {};

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};