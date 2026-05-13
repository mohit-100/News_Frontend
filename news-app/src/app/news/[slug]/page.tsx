// src/app/news/[slug]/page.tsx
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleDetailContent } from './ArticleDetailContent';
import { ReadingProgress } from '@/components/ui/ReadingProgress';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Article: ${params.slug.replace(/-/g, ' ')}`,
    description: 'Read the full article on PulseNews',
  };
}

export default function ArticlePage({ params }: Props) {
  return (
    <>
      <ReadingProgress />
      <Navbar />
      <main className="pt-14">
        <ArticleDetailContent slug={params.slug} />
      </main>
      <Footer />
    </>
  );
}
