PulseNews — Real-Time News Frontend
A production-ready Next.js 14 news platform with real-time updates, GraphQL API integration, infinite scroll, personalized feeds, and a polished editorial UI.

🏗️ Project Structure
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home page
│   ├── HomeContent.tsx           # Home page client component
│   ├── layout.tsx                # Root layout with providers
│   ├── globals.css               # Global styles + CSS variables
│   ├── api/
│   │   └── graphql/route.ts      # Mock GraphQL API route
│   ├── news/
│   │   ├── page.tsx              # News listing page
│   │   ├── NewsListContent.tsx   # News list client component
│   │   ├── saved/page.tsx        # Saved articles page
│   │   └── [slug]/
│   │       ├── page.tsx          # Article detail page
│   │       └── ArticleDetailContent.tsx
│   ├── category/
│   │   ├── page.tsx              # Categories browser
│   │   └── [slug]/page.tsx       # Category detail page
│   └── search/
│       └── page.tsx              # Search page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Responsive navigation with mega menu
│   │   └── Footer.tsx            # Site footer
│   ├── news/
│   │   ├── ArticleCard.tsx       # 4 variants: default, featured, compact, horizontal
│   │   ├── BreakingTicker.tsx    # Animated breaking news ticker
│   │   └── FilterBar.tsx         # Category + sort filters
│   ├── feed/
│   │   ├── TrendingSidebar.tsx   # Trending articles + newsletter CTA
│   │   └── LiveUpdates.tsx       # Real-time live update notifications
│   ├── search/
│   │   └── SearchBar.tsx         # Full-page and inline search with suggestions
│   └── ui/
│       ├── Skeleton.tsx          # Skeleton loading states
│       └── ReadingProgress.tsx   # Article reading progress bar
│
├── lib/
│   ├── graphql/
│   │   ├── queries.ts            # All GraphQL queries, mutations, subscriptions
│   │   └── apollo-client.ts      # Apollo Client with WebSocket support
│   ├── hooks/
│   │   └── useNews.ts            # Custom hooks: useArticles, useArticle, useTrending, etc.
│   ├── utils/
│   │   └── index.ts              # Utility functions
│   └── mock-data.ts              # Development mock data
│
├── store/
│   └── news-store.ts             # Zustand store (filters, preferences, live updates)
│
└── types/
    └── index.ts                  # TypeScript interfaces
🚀 Getting Started
Prerequisites
Node.js 18+
npm / yarn / pnpm
Installation
# Clone the repository
git clone <repo-url>
cd news-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your GraphQL API URLs

# Start development server
npm run dev
Open http://localhost:3000

✅ Requirements Fulfilled
1. Responsive Pages
Home — Featured hero, article grid, trending sidebar, live feed
News Listing — Infinite scroll, filter bar, category filters
Article Detail — Full article with reading progress, author bio, related articles
Category Pages — Category hero, follow/unfollow, filtered articles
Search Page — Full-page search with suggestions and filters
Saved Articles — Bookmarked articles collection
2. GraphQL API Integration
Apollo Client with HTTP and WebSocket links (apollo-client.ts)
Complete query/mutation/subscription definitions (queries.ts)
Mock GraphQL API route at /api/graphql for development
Fragment-based queries with NEWS_FRAGMENT
Error handling and cache policies
3. Live News Updates
Breaking News Ticker — Animated scrolling headline bar
Live Update Notifications — Bottom-left toast cards with real-time articles
Live Feed Section — Auto-refreshing article list
WebSocket Subscriptions — BREAKING_NEWS_SUBSCRIPTION, NEW_ARTICLE_SUBSCRIPTION
Live Toggle — Users can pause/resume live updates
4. Search & Filtering
SearchBar — Inline and full-page modes with debounced search
Live Suggestions — Dropdown results while typing
FilterBar — Sort by latest/trending/popular + category filters
URL-based Filters — Shareable filtered views
5. Feed Sections
Trending Now — Numbered trending list with live shuffle
Breaking News — Ticker + highlighted cards with badge
Personalized Feed — Based on followed categories (persisted with Zustand)
Live Feed — Color-coded real-time article stream
6. Performance Optimizations
cache-and-network Apollo fetch policy
Infinite scroll with IntersectionObserver
Image optimization with Next.js <Image>
Skeleton loading states throughout
Debounced search inputs
CSS-only animations
Zustand persistence for preferences
7. UI/UX
Typography — Playfair Display (editorial) + Source Sans 3 (body)
Design tokens — Full CSS variable system for light/dark themes
Dark mode — System-aware + manual toggle
Reading progress — Fixed progress bar on article pages
Micro-interactions — Hover states, transitions, transforms
Mobile-first — Responsive grid, mobile navigation menu
Accessibility — Focus styles, ARIA labels, semantic HTML
🔌 Connecting to Your GraphQL Backend
Replace the mock client in lib/graphql/apollo-client.ts:

const GRAPHQL_HTTP_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
const GRAPHQL_WS_URL = process.env.NEXT_PUBLIC_GRAPHQL_WS_URL;
The queries in lib/graphql/queries.ts expect this schema:

type Article {
  id: ID!
  title: String!
  slug: String!
  excerpt: String!
  content: String!
  coverImage: String!
  publishedAt: String!
  updatedAt: String!
  readingTime: Int!
  viewCount: Int!
  isBreaking: Boolean
  isTrending: Boolean
  isFeatured: Boolean
  author: Author!
  category: Category!
  tags: [Tag!]!
}
Replace the hooks in lib/hooks/useNews.ts to use Apollo's useQuery/useSubscription.

🛠️ Tech Stack
Technology	Purpose
Next.js 14	App Router, SSR, Image optimization
TypeScript	Type safety
Apollo Client	GraphQL + WebSocket subscriptions
Zustand	State management with persistence
Framer Motion	Animations
Tailwind CSS	Utility-first styling
next-themes	Dark/light mode
react-hot-toast	Toast notifications
date-fns	Date formatting
lucide-react	Icons
🚢 Deployment
# Build for production
npm run build

# Start production server
npm start
Deploy to Vercel:

npx vercel --prod
Make sure to add environment variables in your Vercel project settings.
