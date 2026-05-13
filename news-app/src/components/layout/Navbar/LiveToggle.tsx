'use client';

import { cn } from '@/lib/utils';
import { useNewsStore } from '@/store/news-store';

export function LiveToggle() {
  const { isLiveEnabled, toggleLive } = useNewsStore();

  return (
    <button
      onClick={toggleLive}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider',
        isLiveEnabled
          ? 'bg-[var(--accent-muted)] text-[var(--accent)]'
          : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          isLiveEnabled ? 'bg-[var(--accent)] animate-pulse' : 'bg-[var(--text-muted)]'
        )}
      />
      {isLiveEnabled ? 'Live' : 'Paused'}
    </button>
  );
}