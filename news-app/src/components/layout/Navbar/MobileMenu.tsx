'use client';

import Link from 'next/link';
import { Category } from '@/types';

type Props = {
  open: boolean;
  categories: Category[];
  onClose: () => void;
};

export function MobileMenu({ open, categories, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="lg:hidden border-t border-[var(--border)] bg-[var(--bg-card)]">
       <div className="px-4 py-3 space-y-2"> 
      
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 rounded text-sm"
          >
            <span>{cat.icon}</span>
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}