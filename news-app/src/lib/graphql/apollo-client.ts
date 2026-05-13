// src/lib/graphql/apollo-client.ts

import { ApolloClient, InMemoryCache, split, HttpLink, from } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { createClient } from 'graphql-ws';

// const GRAPHQL_HTTP_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://api.example-news.com/graphql';

const GRAPHQL_HTTP_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  '/api/graphql';

  const GRAPHQL_WS_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_WS_URL ||
  'ws://localhost:3000/api/graphql';

// const GRAPHQL_WS_URL = process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || 'wss://api.example-news.com/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Operation: ${operation.operationName}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

let wsLink: GraphQLWsLink | null = null;

if (typeof window !== 'undefined') {
  wsLink = new GraphQLWsLink(
    createClient({
      url: GRAPHQL_WS_URL,
      connectionParams: () => ({
        authorization: typeof window !== 'undefined' ? localStorage.getItem('authToken') : null,
      }),
      retryAttempts: 5,
      shouldRetry: () => true,
    })
  );
}

const splitLink = wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      from([errorLink, httpLink])
    )
  : from([errorLink, httpLink]);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          articles: {
            keyArgs: ['filters'],
            merge(existing, incoming, { args }) {
              const page = args?.page ?? 1;
              if (page === 1) return incoming;
              return {
                ...incoming,
                articles: [...(existing?.articles ?? []), ...(incoming?.articles ?? [])],
              };
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});
