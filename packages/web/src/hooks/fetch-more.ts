/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';

const fetchMoreItem = <
  DD extends { edges: E[]; pageInfo: { hasNextPage?: boolean | null; endCursor?: string | null } },
  E
>(
  loading: boolean,
  listName: string,
  fetchMore: (arg0: {
    variables: { after: string | undefined };
    updateQuery: (previousResult: any, { fetchMoreResult }: { fetchMoreResult: any }) => any;
  }) => any,
  list: DD
) =>
  !loading &&
  list?.pageInfo.hasNextPage &&
  fetchMore({
    variables: {
      after: list?.pageInfo.endCursor ?? undefined,
    },
    updateQuery: (
      previousResult: { [x: string]: { edges: any; pageInfo: any } },
      { fetchMoreResult }: any
    ) => {
      const newEdges = fetchMoreResult[listName].edges;
      const pageInfo = fetchMoreResult[listName].pageInfo;
      return newEdges.length &&
        list?.pageInfo.endCursor === previousResult[listName].pageInfo.endCursor
        ? {
            [listName]: {
              ...previousResult[listName],
              edges: [...previousResult[listName].edges, ...newEdges],
              pageInfo,
            },
          }
        : previousResult;
    },
  });

export const useFetchMoreEdges = <
  DD extends { edges: E[]; pageInfo: { hasNextPage?: boolean | null; endCursor?: string | null } },
  E
>(
  loading: boolean,
  listName: string,
  fetchMore: any,
  list?: DD | null
) =>
  useCallback(() => {
    if (list) {
      fetchMoreItem(loading, listName, fetchMore, list);
    }
  }, [loading, listName, fetchMore, list]);

const fetchMoreSongs = <
  DD extends {
    songs?: { edges: E[]; pageInfo: { hasNextPage?: boolean | null; endCursor?: string | null } };
  },
  E,
  V
>(
  loading: boolean,
  listName: string,
  fetchMore: (arg0: {
    variables: { after: string | undefined } & V;
    updateQuery: (previousResult: any, { fetchMoreResult }: { fetchMoreResult: any }) => any;
  }) => any,
  list: DD,
  baseArguments: V
) =>
  !loading &&
  list?.songs?.pageInfo.hasNextPage &&
  fetchMore({
    variables: {
      after: list?.songs.pageInfo.endCursor ?? undefined,
      ...baseArguments,
    },
    updateQuery: (
      previousResult: { [x: string]: { songs: { edges: any; pageInfo: any } } },
      { fetchMoreResult }: any
    ) => {
      const newEdges = fetchMoreResult[listName].songs.edges;
      const pageInfo = fetchMoreResult[listName].songs.pageInfo;
      return newEdges.length &&
        list?.songs?.pageInfo.endCursor === previousResult?.[listName].songs.pageInfo.endCursor
        ? {
            [listName]: {
              ...previousResult[listName],
              songs: {
                ...previousResult[listName].songs,
                edges: [...previousResult[listName].songs.edges, ...newEdges],
                pageInfo,
              },
            },
          }
        : previousResult;
    },
  });

export const useFetchMoreSongEdges = <
  DD extends {
    songs?: { edges: E[]; pageInfo: { hasNextPage?: boolean | null; endCursor?: string | null } };
  },
  E,
  V
>(
  loading: boolean,
  listName: string,
  fetchMore: any,
  list: DD | null | undefined,
  baseArguments: V
) =>
  useCallback(() => {
    if (list) {
      fetchMoreSongs(loading, listName, fetchMore, list, baseArguments);
    }
  }, [loading, listName, fetchMore, list, baseArguments]);
