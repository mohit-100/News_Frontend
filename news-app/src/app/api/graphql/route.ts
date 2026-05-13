// src/app/api/graphql/route.ts
import { NextRequest, NextResponse } from 'next/server';
 import { mockArticles, mockBreakingNews, mockTrending, mockCategories } from '@/lib/mock-data';

// Simple GraphQL-like resolver for mock data
async function resolveQuery(query: string, variables: Record<string, unknown>) {
 
  // NewAPI  
//   function transformArticle(article: any, index: number) {
//   return {
//     id: String(index + 1),
//     title: article.title,
//     slug: article.title?.toLowerCase().replace(/\s+/g, '-'),
//     excerpt: article.description,
//     content: article.content,
//     coverImage: article.urlToImage,
//     publishedAt: article.publishedAt,
//     updatedAt: article.publishedAt,
//     readingTime: 5,
//     viewCount: Math.floor(Math.random() * 10000),

//     isBreaking: true,
//     isTrending: true,
//     isFeatured: false,

//     sourceUrl: article.url,
//     sourceName: article.source?.name,

//     author: {
//       id: '1',
//       name: article.author || 'Unknown',
//       avatar: '',
//       role: 'Reporter',
//     },

//     category: {
//       id: '1',
//       name: 'General',
//       slug: 'general',
//       color: '#ff0000',
//     },

//     tags: [],
//   };
// }
//NewsAPI




  await new Promise((r) => setTimeout(r, 50)); // Simulate network

  if (query.includes('articles')) {
    const filters = (variables.filters as Record<string, unknown>) || {};
    const page = (variables.page as number) || 1;
    const limit = (variables.limit as number) || 12;
    let filtered = [...mockArticles];

    if (filters.category) filtered = filtered.filter((a) => a.category.slug === filters.category);
    if (filters.search) {
      const q = (filters.search as string).toLowerCase();
      filtered = filtered.filter((a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q));
    }

    const start = (page - 1) * limit;
    return {
      data: {
        articles: {
          articles: filtered.slice(start, start + limit),
          pagination: {
            page,
            limit,
            total: filtered.length,
            hasNextPage: start + limit < filtered.length,
            hasPrevPage: page > 1,
          },
        },
      },
    };
  }

  //Newapi
//  if (query.includes('articles')) {
//   const filters = (variables.filters as Record<string, unknown>) || {};
//   const page = (variables.page as number) || 1;
//   const limit = (variables.limit as number) || 12;

//   const response = await fetch(
//     `https://newsapi.org/v2/top-headlines?country=us&pageSize=${limit}&apiKey=${process.env.NEWS_API_KEY}`
//   );

//   const newsData = await response.json();

//   let filtered = newsData.articles.map(transformArticle);

//   if (filters.category) {
//     filtered = filtered.filter(
//       (a: any) => a.category.slug === filters.category
//     );
//   }

//   if (filters.search) {
//     const q = (filters.search as string).toLowerCase();

//     filtered = filtered.filter(
//       (a: any) =>
//         a.title.toLowerCase().includes(q) ||
//         a.excerpt?.toLowerCase().includes(q)
//     );
//   }

//   const start = (page - 1) * limit;

//   return {
//     data: {
//       articles: {
//         articles: filtered.slice(start, start + limit),

//         pagination: {
//           page,
//           limit,
//           total: filtered.length,
//           hasNextPage: start + limit < filtered.length,
//           hasPrevPage: page > 1,
//         },
//       },
//     },
//   };
// }

//NewAPi


  if (query.includes('trending')) {
    return { data: { trending: mockTrending.slice(0, variables.limit as number || 10) } };
  }


  //NewAPI trending
//   if (query.includes('trending')) {
//   const limit = (variables.limit as number) || 10;

//   const response = await fetch(
//     `https://newsapi.org/v2/top-headlines?country=us&pageSize=${limit}&apiKey=${process.env.NEWS_API_KEY}`
//   );

//   const newsData = await response.json();

//   return {
//     data: {
//       trending: newsData.articles.map(transformArticle),
//     },
//   };
// }
// //NewAPI TRAANING

//   // if (query.includes('breakingNews')) {
//   //   return { data: { breakingNews: mockBreakingNews.slice(0, variables.limit as number || 5) } };
//   // }

//   //NewApi 
//   if (query.includes('breakingNews')) {
//   const limit = (variables.limit as number) || 5;

//   const response = await fetch(
//     `https://newsapi.org/v2/top-headlines?country=us&pageSize=${limit}&apiKey=${process.env.NEWS_API_KEY}`
//   );

//   const newsData = await response.json();

//   return {
//     data: {
//       breakingNews: newsData.articles.map(transformArticle),
//     },
//   };
// }

//NewApi

  if (query.includes('categories')) {
    return { data: { categories: mockCategories } };
  }

  //NewsAPI
//   if (query.includes('categories')) {
//   return {
//     data: {
//       categories: [
//         {
//           id: '1',
//           name: 'General',
//           slug: 'general',
//           color: '#ff0000',
//           icon: 'news',
//           count: 20,
//         },
//       ],
//     },
//   };
// }

 //NewsAPI

  return { data: null, errors: [{ message: 'Unknown query' }] };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, variables = {} } = body;

    if (!query) {
      return NextResponse.json({ errors: [{ message: 'Query is required' }] }, { status: 400 });
    }

    const result = await resolveQuery(query, variables);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { errors: [{ message: 'Internal server error' }] },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'GraphQL API running', version: '1.0.0' });
}
