import type { Meta, StoryObj } from '@storybook/react';
import { NavLinks } from './NavLinks';

const meta: Meta<typeof NavLinks> = {
  title: 'Navbar/NavLinks',
  component: NavLinks,
};

export default meta;

type Story = StoryObj<typeof NavLinks>;

export const Default: Story = {};