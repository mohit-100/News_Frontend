import type { Meta, StoryObj } from '@storybook/react';
import { SearchButton } from './SearchButton';

const meta: Meta<typeof SearchButton> = {
  title: 'Navbar/SearchButton',
  component: SearchButton,
};

export default meta;

type Story = StoryObj<typeof SearchButton>;

export const Default: Story = {};