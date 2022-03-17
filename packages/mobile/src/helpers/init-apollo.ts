import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';
import getConfig from 'next/config';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function create(initialState?: NormalizedCacheObject, ctx?: NextPageContext) {
  const isServerSide = !(process as any).browser;
  const headersProps = isServerSide
    ? {
        headers: ctx && ctx.req && ctx.req.headers && { cookie: ctx.req.headers.cookie },
      }
    : {};
  const { publicRuntimeConfig } = getConfig();
  return new ApolloClient({
    connectToDevTools: !isServerSide,
    ssrMode: isServerSide, // Disables forceFetch on the server (so queries are only run once)
    link: createHttpLink({
      uri: `${
        isServerSide ? publicRuntimeConfig.BACKEND_HOST_SSR : publicRuntimeConfig.BACKEND_HOST
      }/graphql`, // Server URL (must be absolute)
      // credentials: 'include', // Additional fetch() options like `credentials` or `headers`
      fetch,
      ...headersProps,
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(
  initialState?: NormalizedCacheObject,
  ctx?: NextPageContext
): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!(process as any).browser) {
    return create(initialState, ctx);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, ctx);
  }

  return apolloClient;
}
