import { MutationOptions } from '@apollo/react-hooks';
import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { MarginProps } from 'styled-system';

import { ChartSong, PlaylistSong, Separator, usePlayer } from '../components';
import { useCollection } from '../hooks';
import {
  LikedSongDocument,
  LikedSongQuery,
  LikeSongMutation,
  Maybe,
  SongBaseFragment,
  SongConnectionBaseFragment,
  ToneBaseFragment,
  useLikeSongMutation,
} from '../queries';
import { Box, Flex } from '../rebass';

export const likeSongUpdate = (
  song: SongBaseFragment
): MutationOptions<LikeSongMutation>['update'] => (cache, { data: mutationData }) => {
  const data = cache.readQuery<LikedSongQuery>({
    query: LikedSongDocument,
    variables: { first: 10 },
  });
  if (data?.likedSongs && mutationData?.likeSong.success) {
    cache.writeQuery({
      query: LikedSongDocument,
      variables: { first: 10 },
      data: {
        ...data,
        likedSongs: {
          ...data.likedSongs,
          edges: !song.liked
            ? [{ node: { ...song, ...mutationData.likeSong.result } }, ...data.likedSongs.edges]
            : data.likedSongs.edges.filter((e) => e.node.id !== song.id),
        },
      },
    });
  }
};
export const LoadingFooter = (props: { hasMore?: boolean }) => {
  return props.hasMore ? (
    <Flex alignItems="center" pt={3} pb={4}>
      <ActivityIndicator size="large" color="primary" />
    </Flex>
  ) : (
    <Flex alignItems="center">
      <SafeAreaView />
    </Flex>
  );
};

type Song = { __typename?: 'Song' } & {
  toneFromList?: Maybe<{ __typename?: 'RingBackTone' } & ToneBaseFragment>;
} & SongBaseFragment;

export interface PlaylistProps extends MarginProps {
  name?: string | null;
  songs?: {
    edges: ({ __typename?: 'SongEdge' } & {
      node: Song;
    })[];
  } & SongConnectionBaseFragment;
  loading?: boolean;
  onRefresh?: () => void;
  onFetchMore?: () => void;
  isChart?: boolean;
  showIdx?: boolean;
}

function useCallbacks<T>(
  list: T[] | undefined,
  keyFunc: (item: T) => string,
  factory: (item: T, idx: number) => () => void,
  input: any[]
) {
  return useMemo(
    () =>
      _.fromPairs(_.map(list ?? [], (item: T, idx: number) => [keyFunc(item), factory(item, idx)])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list, ...input]
  );
}

export const Playlist = ({
  name,
  songs,
  loading,
  onRefresh,
  onFetchMore,
  isChart,
  showIdx,
  ...marginProps
}: PlaylistProps) => {
  const player = usePlayer();
  const [selectedSong, setSelectedSong] = useState<string | null>();
  const collection = useCollection(name, songs);
  const [likeSong] = useLikeSongMutation();
  const onPlayClick = useCallbacks(
    songs?.edges,
    (e) => e.node.id,
    ({ node: song }, idx) => () => {
      if (player.currentPlayable?.sources?.[0] === song.fileUrl) player.onPlayClicked();
      else {
        player.playCollection(collection, idx);
        setSelectedSong(song.id);
      }
    },
    [player, collection]
  );
  // FIXME: working not so well on long list
  const onImageClick = useCallbacks(
    songs?.edges,
    (e) => e.node.id,
    ({ node: song }) => () => {
      setSelectedSong(song.id === selectedSong ? null : song.id);
    },
    [selectedSong]
  );
  const onLikeClick = useCallbacks(
    songs?.edges,
    (e) => e.node.id,
    ({ node: song }) => () => {
      likeSong({
        variables: { songId: song.id, like: !song.liked },
        update: likeSongUpdate(song),
      });
    },
    [likeSong]
  );
  const renderItem = useCallback(
    ({ item: { node: song }, index: idx }: { item: { node: Song }; index: number }) => {
      return isChart ? (
        <Box mx={2} {...marginProps} key={song.id}>
          <Separator />
          <Box py={2}>
            <ChartSong
              index={showIdx ? idx + 1 : undefined}
              slug={song.slug}
              image={song.imageUrl}
              title={song.name}
              showEq={player.currentPlayable?.sources?.[0] === song.fileUrl}
              animated={player.isPlaying}
              artist={song.singers.map((s) => s.alias).join(' - ')}
              download={song?.toneFromList?.orderTimes}
              liked={song.liked}
              onPlayClick={onPlayClick[song.id]}
            />
          </Box>
        </Box>
      ) : (
        <Box my={1} mx={2} {...marginProps} key={song.id}>
          <PlaylistSong
            index={idx + 1}
            slug={song.slug}
            image={song.imageUrl}
            title={song.name}
            tone
            artist={song.singers.map((s) => s.alias).join(' - ')}
            download={song?.toneFromList?.orderTimes}
            liked={song.liked}
            isPlaying={player.currentPlayable?.sources?.[0] === song.fileUrl && player.isPlaying}
            showEq={player.currentPlayable?.sources?.[0] === song.fileUrl}
            animated={player.isPlaying}
            expanded={selectedSong === song.id}
            highlighted={selectedSong === song.id}
            onPlayClick={onPlayClick[song.id]}
            onImageClick={onImageClick[song.id]}
            onLikeClick={onLikeClick[song.id]}
            showExpandedGift
          />
        </Box>
      );
    },
    [
      isChart,
      marginProps,
      showIdx,
      onPlayClick,
      player.currentPlayable?.sources,
      player.isPlaying,
      selectedSong,
      onImageClick,
      onLikeClick,
    ]
  );
  if (loading)
    return (
      <Box m={3}>
        <ActivityIndicator size="large" color="primary" />
      </Box>
    );

  return onFetchMore ? (
    <FlatList
      data={songs?.edges}
      ListFooterComponent={<LoadingFooter hasMore={songs?.pageInfo.hasNextPage || loading} />}
      initialNumToRender={10}
      onEndReachedThreshold={0.2}
      refreshing={loading}
      onRefresh={onRefresh}
      onEndReached={onFetchMore}
      keyExtractor={({ node: { id } }) => id}
      renderItem={renderItem}
    />
  ) : (
    <Box>{(songs?.edges ?? []).map((item, index) => renderItem({ item, index }))}</Box>
  );
};
