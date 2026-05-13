// src/app/page.tsx
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BreakingTicker } from '@/components/news/BreakingTicker';
import { HomeContent } from './HomeContent';
import { LiveUpdatesBanner } from '@/components/feed/LiveUpdates';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <BreakingTicker />
      <main className="pt-[calc(3.5rem+1.5rem+1px)]">
        <HomeContent />
      </main>
      <Footer />
      <LiveUpdatesBanner />
    </>
  );
}
