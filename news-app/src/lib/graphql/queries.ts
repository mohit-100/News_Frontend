// src/lib/graphql/queries.ts
import { gql } from '@apollo/client';

export const NEWS_FRAGMENT = gql`
  fragment NewsFields on Article {
    id
    title
    slug
    excerpt
    coverImage
    publishedAt
    updatedAt
    readingTime
    viewCount
    isBreaking
    isTrending
    isFeatured
    author {
      id
      name
      avatar
      role
    }
    category {
      id
      name
      slug
      color
    }
    tags {
      id
      name
      slug
    }
  }
`;

export const GET_ARTICLES = gql`
  ${NEWS_FRAGMENT}
  query GetArticles($filters: ArticleFilters, $page: Int, $limit: Int) {
    articles(filters: $filters, page: $page, limit: $limit) {
      articles {
        ...NewsFields
      }
      pagination {
        page
        limit
        total
        hasNextPage
        hasPrevPage
      }
    }
  }
`;

export const GET_ARTICLE = gql`
  query GetArticle($slug: String!) {
    article(slug: $slug) {
      id
      title
      slug
      excerpt
      content
      coverImage
      publishedAt
      updatedAt
      readingTime
      viewCount
      isBreaking
      isTrending
      sourceUrl
      sourceName
      author {
        id
        name
        avatar
        bio
        role
      }
      category {
        id
        name
        slug
        color
      }
      tags {
        id
        name
        slug
      }
    }
  }
`;

export const GET_TRENDING = gql`
  ${NEWS_FRAGMENT}
  query GetTrending($limit: Int) {
    trending(limit: $limit) {
      ...NewsFields
    }
  }
`;

export const GET_BREAKING_NEWS = gql`
  ${NEWS_FRAGMENT}
  query GetBreakingNews($limit: Int) {
    breakingNews(limit: $limit) {
      ...NewsFields
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      slug
      color
      icon
      count
    }
  }
`;

export const GET_PERSONALIZED_FEED = gql`
  ${NEWS_FRAGMENT}
  query GetPersonalizedFeed($categoryIds: [String!]!, $limit: Int) {
    personalizedFeed(categoryIds: $categoryIds, limit: $limit) {
      ...NewsFields
    }
  }
`;

export const SEARCH_ARTICLES = gql`
  ${NEWS_FRAGMENT}
  query SearchArticles($query: String!, $filters: ArticleFilters, $page: Int, $limit: Int) {
    searchArticles(query: $query, filters: $filters, page: $page, limit: $limit) {
      articles {
        ...NewsFields
      }
      pagination {
        page
        limit
        total
        hasNextPage
        hasPrevPage
      }
    }
  }
`;

// Subscriptions for real-time updates
export const BREAKING_NEWS_SUBSCRIPTION = gql`
  ${NEWS_FRAGMENT}
  subscription OnBreakingNews {
    breakingNews {
      ...NewsFields
    }
  }
`;

export const TRENDING_UPDATED_SUBSCRIPTION = gql`
  ${NEWS_FRAGMENT}
  subscription OnTrendingUpdated {
    trendingUpdated {
      ...NewsFields
    }
  }
`;

export const NEW_ARTICLE_SUBSCRIPTION = gql`
  ${NEWS_FRAGMENT}
  subscription OnNewArticle($categoryIds: [String!]) {
    newArticle(categoryIds: $categoryIds) {
      ...NewsFields
    }
  }
`;
