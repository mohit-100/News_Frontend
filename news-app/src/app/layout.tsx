// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import Provider from '@/providers/ApolloProvider';
 import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'PulseNews — Real-Time Global News',
    template: '%s | PulseNews',
  },
  description: 'Stay informed with real-time breaking news, trending stories, and in-depth analysis from around the world.',
  keywords: ['news', 'breaking news', 'world news', 'real-time updates', 'trending'],
  authors: [{ name: 'PulseNews Editorial Team' }],
  openGraph: {
    type: 'website',
    siteName: 'PulseNews',
    title: 'PulseNews — Real-Time Global News',
    description: 'Breaking news, trending stories, and live updates from around the world.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PulseNews',
    description: 'Real-time global news coverage.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f6' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0e0c' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>

         <Provider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-source-sans)',
                fontSize: '14px',
              },
              duration: 4000,
            }}
          />
        </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
