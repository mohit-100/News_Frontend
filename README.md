# PulseNews — Real-Time News Frontend

A production-ready modern news platform built with Next.js 14, GraphQL, Apollo Client, and real-time subscriptions.

## ✨ Features

- Real-time breaking news updates
- GraphQL API integration
- Infinite scrolling news feed
- Personalized article recommendations
- Full-text search with live suggestions
- Dark / light theme support
- Responsive editorial UI
- Saved articles & category following
- WebSocket subscriptions for live updates

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| Next.js 14 | App Router, SSR, Image Optimization |
| TypeScript | Type Safety |
| Apollo Client | GraphQL Client + Caching |
| Zustand | Global State Management |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| next-themes | Theme Management |
| react-hot-toast | Notifications |
| date-fns | Date Formatting |

---

# 📁 Project Structure

```bash
src/
├── app/
│   ├── page.tsx
│   ├── HomeContent.tsx
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── api/graphql/route.ts
│   │
│   ├── news/
│   │   ├── page.tsx
│   │   ├── NewsListContent.tsx
│   │   ├── saved/page.tsx
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── ArticleDetailContent.tsx
│   │
│   ├── category/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   │
│   └── search/page.tsx
│
├── components/
│   ├── layout/
│   ├── news/
│   ├── feed/
│   ├── search/
│   └── ui/
│
├── lib/
│   ├── graphql/
│   ├── hooks/
│   ├── utils/
│   └── mock-data.ts
│
├── store/
│   └── news-store.ts
│
└── types/
    └── index.ts
```

---

# 🚀 Getting Started

## Prerequisites

- Node.js 18+
- npm / yarn / pnpm

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd news-app
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

```bash
cp .env.example .env.local
```

Update `.env.local`:

```env
NEXT_PUBLIC_GRAPHQL_URL=
NEXT_PUBLIC_GRAPHQL_WS_URL=
```

### Start development server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

# 🔥 Core Features

## 📰 Home Feed

- Featured hero section
- Breaking news ticker
- Trending sidebar
- Personalized recommendations
- Real-time updates

## 🔎 Search & Filtering

- Debounced search
- Live search suggestions
- Category filtering
- URL-based filters
- Trending search support

## ⚡ Real-Time Updates

- GraphQL subscriptions
- WebSocket integration
- Live notifications
- Auto-refreshing feeds
- Pause/resume live mode

## 📱 Responsive UI

- Mobile-first design
- Editorial typography
- Dark/light themes
- Smooth animations
- Skeleton loading states

---

# 🔌 GraphQL Integration

Update:

```ts
lib/graphql/apollo-client.ts
```

```ts
const GRAPHQL_HTTP_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL;

const GRAPHQL_WS_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_WS_URL;
```

---

# 📦 Example GraphQL Schema

```graphql
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
}
```

---

# ⚙️ Performance Optimizations

- Apollo cache policies
- Infinite scroll
- IntersectionObserver
- Next.js image optimization
- Debounced inputs
- Zustand persistence
- CSS-only animations

---

# 🚢 Deployment

## Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
npx vercel --prod
```

Add your environment variables in the Vercel dashboard.

---

# 📸 Screenshots

Add screenshots or GIF demos here.

---

# 📄 License

MIT License

---

# 👨‍💻 Author

Built with Next.js, GraphQL, and modern frontend tooling.
