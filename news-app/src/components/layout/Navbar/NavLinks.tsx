'use client';

import Link from 'next/link';
import { Globe, Radio, TrendingUp, Bookmark, Info } from 'lucide-react';

const links = [
  { href: '/', label: 'Home', icon: Globe },
  { href: '/news', label: 'Latest', icon: Radio },
  { href: '/news?sort=trending', label: 'Trending', icon: TrendingUp },
  { href: '/news/saved', label: 'Saved', icon: Bookmark },
  { href: '/news/about', label: 'About', icon: Info },
];

export function NavLinks() {
  return (
    <div className="hidden lg:flex items-center gap-1 ml-4">
      {links.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} className="btn-ghost flex items-center gap-1.5 text-sm">
          <Icon size={14} />
          {label}
        </Link>
      ))}
    </div>
  );
}