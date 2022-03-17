import { ApolloLink } from '@apollo/client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  NormalizedCacheObject,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';
import getConfig from 'next/config';

import introspectionResult from '../introspection-result';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionResult,
});

export default function createApolloClient(
  initialState?: NormalizedCacheObject,
  ctx?: NextPageContext
) {
  const isServerSide = !(process as any).browser;
  const headersProps = isServerSide
    ? {
      headers: ctx &&
        ctx.req &&
        ctx.req.headers && { cookie: ctx.req.headers.cookie, X_CHANNEL: 'wap' },
    }
    : { X_CHANNEL: 'wap' };
  const { publicRuntimeConfig } = getConfig();

  const uploadLink = createUploadLink({
    uri: `${process.env.NODE_ENV === 'production'
        ? isServerSide
          ? publicRuntimeConfig.BACKEND_HOST_SSR
          : publicRuntimeConfig.BACKEND_HOST
        : 'http://beta.imuzik.vn'
      }/api-v2/graphql`, // Server URL (must be absolute)
    credentials: 'include',
    fetch,
    ...headersProps,
  });

  return new ApolloClient({
    connectToDevTools: !isServerSide,
    ssrMode: isServerSide, // Disables forceFetch on the server (so queries are only run once)
    // link: createHttpLink({
    //   uri: `${process.env.NODE_ENV === 'production'
    //       ? isServerSide
    //         ? publicRuntimeConfig.BACKEND_HOST_SSR
    //         : publicRuntimeConfig.BACKEND_HOST
    //       : 'http://beta.imuzik.vn'
    //     }/api-v2/graphql`, // Server URL (must be absolute)
    //   credentials: 'include',
    //   fetch,
    //   ...headersProps,
    // }),
    //@ts-ignore
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {}),
  });
}
