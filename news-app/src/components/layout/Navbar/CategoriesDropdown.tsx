'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Category } from '@/types';



type Props = {
  categories: Category[];
};

export function CategoriesDropdown({ categories }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="btn-ghost flex items-center gap-1.5 text-sm">
        Categories
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] shadow-lg p-3 grid grid-cols-2 gap-1 z-50">
          {categories.map((cat) => (
           <Link
  key={cat.id}
  href={`/category/${cat.slug}`}
  className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[var(--bg-hover)] min-w-0"
>
  {/* Icon */}
  <span className="shrink-0">
    {cat.icon}
  </span>

  {/* Name */}
  <span className="text-sm flex-1 min-w-0 truncate">
    {cat.name}
  </span>

  {/* Count */}
  <span className="ml-auto text-xs shrink-0">
    {cat.count}
  </span>
</Link>
          ))}
        </div>
      )}
    </div>
  );
}
