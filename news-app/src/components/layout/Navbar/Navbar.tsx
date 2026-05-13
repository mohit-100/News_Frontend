'use client';

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { LiveToggle } from "./LiveToggle";
import { SearchButton } from "./SearchButton";
import { NotificationsButton } from "./NotificationsButton";
import { ThemeToggle } from "./ThemeToggle";
// import { Category } from "@/types";
import { useCategories } from '@/lib/hooks/useNews';

import { CategoriesDropdown } from './CategoriesDropdown';

// type Props = {
//   categories?: Category[];
// };


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const { categories } = useCategories();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--bg-card)] border-b border-[var(--border)] shadow-md"
          : "bg-[var(--bg-card)]/95 backdrop-blur-md border-b border-[var(--border)]"
      )}
    >
    <nav className="flex items-center px-4 py-3">
  {/* Left section */}
  <div className="flex items-center gap-6">
    <Logo />
    <NavLinks />
  </div>

  {/* Middle section (Categories) */}
  <div className="ml-6">
    <CategoriesDropdown categories={categories} />
  </div>

  {/* Right section */}
  <div className="ml-auto flex items-center gap-2">
    <LiveToggle />
    <SearchButton />
    <NotificationsButton />
    <ThemeToggle />
  </div>
</nav>
    </header>
  );
}










// // src/components/layout/Navbar.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useTheme } from 'next-themes';
// import { useNewsStore } from '@/store/news-store';
// import { useCategories } from '@/lib/hooks/useNews';
// import {
//   Search, Sun, Moon, Menu, X, Bell, Bookmark,
//   Radio, TrendingUp, Globe, ChevronDown,Info
// } from 'lucide-react';
//  import { cn } from '@/lib/utils';
//  import { Category } from '@/types';

// export function Navbar() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [categoriesOpen, setCategoriesOpen] = useState(false);
//   const { setSearchQuery, isLiveEnabled, toggleLive } = useNewsStore();
//   const { categories } = useCategories();

//   useEffect(() => {
//     setMounted(true);
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navLinks = [
//     { href: '/', label: 'Home', icon: Globe },
//     { href: '/news', label: 'Latest', icon: Radio },
//     { href: '/news?sort=trending', label: 'Trending', icon: TrendingUp },
//     { href: '/news/saved', label: 'Saved', icon: Bookmark },
//     { href: '/news/about', label: 'about', icon: Info },
//   ];

//   return (
//     <header
//       className={cn(
//         'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
//         scrolled
//           ? 'bg-[var(--bg-card)] border-b border-[var(--border)] shadow-md'
//           : 'bg-[var(--bg-card)]/95 backdrop-blur-md border-b border-[var(--border)]'
//       )}
//     >
//       {/* Top strip */}
//       <div className="bg-[var(--accent)] text-white px-4 py-1.5 text-center text-xs font-semibold tracking-wider hidden sm:flex items-center justify-center gap-4">
//         <span className="flex items-center gap-1.5">
//           <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-slow" />
//           LIVE COVERAGE
//         </span>
//         <span className="opacity-60">|</span>
//         <span>Real-time global news updates every 60 seconds</span>
//       </div>

//       {/* Main nav */}
//       <nav className="max-w-screen-xl mx-auto px-4 h-14 flex items-center gap-4">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
//           <div className="w-8 h-8 rounded-sm flex items-center justify-center"
//             style={{ background: 'var(--accent)' }}>
//             <span className="text-white font-black text-lg leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>P</span>
//           </div>
//           <span className="font-black text-xl tracking-tight hidden sm:block"
//             style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
//             Pulse<span style={{ color: 'var(--accent)' }}>News</span>
//           </span>
//         </Link>

//         {/* Desktop nav */}
//         <div className="hidden lg:flex items-center gap-1 ml-4">
//           {navLinks.map(({ href, label, icon: Icon }) => (
//             <Link key={href} href={href}
//               className="btn-ghost flex items-center gap-1.5 text-sm">
//               <Icon size={14} />
//               {label}
//             </Link>
//           ))}

          

//           {/* Categories dropdown */}
//           <div className="relative">
//             <button
//               onMouseEnter={() => setCategoriesOpen(true)}
//               onMouseLeave={() => setCategoriesOpen(false)}
//               className="btn-ghost flex items-center gap-1.5 text-sm"
//             >
//               Categories <ChevronDown size={12} />
//             </button>
//             {categoriesOpen && (
//               <div
//                 onMouseEnter={() => setCategoriesOpen(true)}
//                 onMouseLeave={() => setCategoriesOpen(false)}
//                 className="absolute top-full left-0 mt-1 w-64 card rounded-lg p-3 grid grid-cols-2 gap-1 z-50 animate-slide-up"
//               >
//                 {categories.map((cat:Category) => (
//                   <Link
//                     key={cat.id}
//                     href={`/category/${cat.slug}`}
//                     className="flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-[var(--bg-hover)] transition-colors"
//                   >
//                     <span>{cat.icon}</span>
//                     <span style={{ color: 'var(--text-secondary)' }}>{cat.name}</span>
//                     <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>{cat.count}</span>
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right actions */}
//          <div className="ml-auto flex items-center gap-2">
//           {/* Live toggle */}
//           <button
//             onClick={toggleLive}
//             className={cn(
//               'hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all',
//               isLiveEnabled
//                 ? 'bg-[var(--accent-muted)] text-[var(--accent)]'
//                 : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
//             )}
//           >
//             <span className={cn('w-1.5 h-1.5 rounded-full', isLiveEnabled ? 'bg-[var(--accent)] animate-pulse' : 'bg-[var(--text-muted)]')} />
//             {isLiveEnabled ? 'Live' : 'Paused'}
//           </button>

//           {/* Search */}
//           <Link href="/search" className="btn-ghost p-2 rounded-lg">
//             <Search size={18} />
//           </Link>

//           {/* Notifications */}
//           <button className="btn-ghost p-2 rounded-lg relative">
//             <Bell size={18} />
//             <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
//           </button>

//           {/* Theme toggle */}
//           {mounted && (
//             <button
//               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//               className="btn-ghost p-2 rounded-lg"
//               aria-label="Toggle theme"
//             >
//               {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
//             </button>
//           )}

//           {/* Mobile menu */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="lg:hidden btn-ghost p-2 rounded-lg"
//           >
//             {menuOpen ? <X size={18} /> : <Menu size={18} />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile menu */}
//       {menuOpen && (
//         <div className="lg:hidden border-t border-[var(--border)] bg-[var(--bg-card)] animate-slide-up">
//           <div className="max-w-screen-xl mx-auto px-4 py-3 space-y-1">
//             {navLinks.map(({ href, label, icon: Icon }) => (
//               <Link
//                 key={href}
//                 href={href}
//                 onClick={() => setMenuOpen(false)}
//                 className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[var(--bg-hover)]"
//                 style={{ color: 'var(--text-secondary)' }}
//               >
//                 <Icon size={16} />
//                 {label}
//               </Link>
//             ))}
//             <div className="divider my-2" />
//             <div className="grid grid-cols-2 gap-1 pb-2">
//               {categories.slice(0, 8).map((cat:Category) => (
//                 <Link
//                   key={cat.id}
//                   href={`/category/${cat.slug}`}
//                   onClick={() => setMenuOpen(false)}
//                   className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-[var(--bg-hover)]"
//                   style={{ color: 'var(--text-secondary)' }}
//                 >
//                   <span>{cat.icon}</span>
//                   {cat.name}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }