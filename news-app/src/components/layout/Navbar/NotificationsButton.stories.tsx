import type { Meta, StoryObj } from '@storybook/react';
import { NotificationsButton } from './NotificationsButton';

const meta: Meta<typeof NotificationsButton> = {
  title: 'Navbar/NotificationsButton',
  component: NotificationsButton,
};

export default meta;

type Story = StoryObj<typeof NotificationsButton>;

export const Default: Story = {};