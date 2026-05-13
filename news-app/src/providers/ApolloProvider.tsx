 'use client';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from '@apollo/client';

// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

// import { getMainDefinition } from '@apollo/client/utilities';





const GRAPHQL_HTTP_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  '/api/graphql';


const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}



// 'use client';

// import { ApolloProvider } from '@apollo/client';
// import { apolloClient } from '@/lib/graphql/apollo-client';

// export default function Provider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ApolloProvider client={apolloClient}>
//       {children}
//     </ApolloProvider>
//   );
// }