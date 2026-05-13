'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';

export function SearchButton() {
  return (
    <Link href="/search" className="btn-ghost p-2 rounded-lg">
      <Search size={18} />
    </Link>
  );
}