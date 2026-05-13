// src/components/layout/Footer.tsx
import Link from 'next/link';

export function Footer() {
  const sections = [
    {
      title: 'News',
      links: [
        { href: '/news', label: 'Latest News' },
        { href: '/news?sort=trending', label: 'Trending' },
        { href: '/news?sort=popular', label: 'Most Read' },
        { href: '/news/saved', label: 'Saved Articles' },
      ],
    },
    {
      title: 'Categories',
      links: [
        { href: '/category/world', label: 'World' },
        { href: '/category/politics', label: 'Politics' },
        { href: '/category/technology', label: 'Technology' },
        { href: '/category/business', label: 'Business' },
        { href: '/category/science', label: 'Science' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About Us' },
        { href: '/careers', label: 'Careers' },
        { href: '/advertise', label: 'Advertise' },
        { href: '/contact', label: 'Contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/cookies', label: 'Cookie Policy' },
      ],
    },
  ];

  return (
    <footer className="border-t border-[var(--border)] mt-16" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                <span className="text-white font-black text-lg" style={{ fontFamily: 'var(--font-playfair)' }}>P</span>
              </div>
              <span className="font-black text-xl" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
                Pulse<span style={{ color: 'var(--accent)' }}>News</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Real-time global news coverage, breaking stories, and in-depth analysis around the clock.
            </p>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-sm mb-3 uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-muted)' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
          <p>© {new Date().getFullYear()} PulseNews. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
