'use client';

import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
      <div
        className="w-8 h-8 rounded-sm flex items-center justify-center"
        style={{ background: 'var(--accent)' }}
      >
        <span
          className="text-white font-black text-lg leading-none"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          P
        </span>
      </div>

      <span
        className="font-black text-xl tracking-tight hidden sm:block"
        style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}
      >
        Pulse<span style={{ color: 'var(--accent)' }}>News</span>
      </span>
    </Link>
  );
}