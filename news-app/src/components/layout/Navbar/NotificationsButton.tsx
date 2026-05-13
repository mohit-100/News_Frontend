'use client';

import { Bell } from 'lucide-react';

export function NotificationsButton() {
  return (
    <button className="btn-ghost p-2 rounded-lg relative">
      <Bell size={18} />
      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
    </button>
  );
}