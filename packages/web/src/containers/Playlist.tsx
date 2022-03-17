import _ from 'lodash';
import React, { useMemo, useState } from 'react';
import { Box, Button, Flex } from 'rebass';
import { MarginProps } from 'styled-system';

import { Separator } from '../components';
import { usePlayer } from '../components/Player';
import { ChartSong, Song } from '../components/Song';
import { useCollection, useDownloadHandler, useGiftHandler, useResponseHandler } from '../hooks';
import {
  LikeSongMutation,
  SongBaseFragment,
  Song as SongProps,
  SongConnectionBaseFragment,
  useLikeSongMutation,
} from '../queries';
import Download from './Download';
import Gift from './Gift';
import Share from './Share';

export const LoadingFooter = (props: { hasMore?: boolean }) => {
  return props.hasMore ? (
    <Flex alignItems="center" pt={3} pb={4}>
      {/* <ActivityIndicator /> */}
    </Flex>
  ) : (
    <Flex alignItems="center" pb={2} />
  );
};

export interface PlaylistProps extends MarginProps {
  name: string;
  songs?: { edges: { node: SongBaseFragment }[] } & SongConnectionBaseFragment;
  loading?: boolean;
  onRefresh?: () => void;
  onFetchMore?: () => void;
  isChart?: boolean;
  hideIdx?: boolean;
  columns?: number;
  showShare?: boolean;
  softBy?: 1|2; //1 Order by new, 2 Order by download number
}

function useCallbacks<T>(
  list: T[],
  keyFunc: (item: T) => string,
  factory: (item: T, idx: number) => () => void,
  input: React.DependencyList
) {
  return useMemo(
    () =>
      _.fromPairs(_.map(list ?? [], (item: T, idx: number) => [keyFunc(item), factory(item, idx)])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list, factory, keyFunc, ...input]
  );
}

export const Playlist = ({
  name,
  songs,
  loading,
  onRefresh,
  onFetchMore,
  isChart,
  hideIdx,
  columns = 1,
  showShare = true,
  softBy,
  ...marginProps
}: PlaylistProps) => {
  if(softBy==2)
  songs?.edges.sort((firstItem:any, secondItem:any) => secondItem.node.downloadNumber - firstItem.node.downloadNumber );
  const { giftClick, showModalGift, setShowModalGift } = useGiftHandler();
  const { downloadClick, showModalDownload, setShowModalDownload } = useDownloadHandler();
  const player = usePlayer();
  const collection = useCollection(name, songs);
  const [likeSong] = useLikeSongMutation();
  const handleLikeSongResult = useResponseHandler<LikeSongMutation>((res) => res.data?.likeSong);
  const onPlayClick = useCallbacks(
    songs?.edges ?? [],
    (e) => e.node.id,
    ({ node: song }, idx) => () => {
      if (player?.currentPlayable?.sources?.[0] === song.fileUrl) {
        player?.onPlayClicked();
      }
      else {
        player?.playCollection(collection, idx);
      }
    },
    [player, collection]
  );
  const onLikeClick = useCallbacks(
    songs?.edges ?? [],
    (e) => e.node.id,
    ({ node: song }) => () => {
      likeSong({ variables: { songId: song.id, like: !song.liked } }).then(handleLikeSongResult);
    },
    [likeSong]
  );
  function onDownloadClick(song: SongBaseFragment) {
    setSelectedSong(song);
    downloadClick();
  }
  function onGiftClick(song: SongBaseFragment) {
    setSelectedSong(song);
    giftClick();
  }
  function onShareClick(song: SongBaseFragment) {
    setSelectedSong(song);
    setOpenShare(true);
  }
  const [selectedSong, setSelectedSong] = useState<SongBaseFragment | null>();
  const [modalShare, setOpenShare] = useState(false);
  return (
    <Flex flexDirection="row" flexWrap="wrap" mb={50} mx={-3} {...marginProps}>
      {(songs?.edges ?? []).map(({ node: song }, idx) => (
        <Box key={song.id} width={1 / columns}>
          {columns <= 2 ? (
            <Box px={3}>
              <ChartSong
                slug={song.slug}
                image={song.imageUrl}
                title={song.name}
                artist={song.singers}
                download={song.downloadNumber}
                liked={song.liked}
                onPlayClick={onPlayClick[song.id]}
                onLikeClick={onLikeClick[song.id]}
                compact={columns === 2}
                onDownloadClick={() => onDownloadClick(song)}
                onGiftClick={() => onGiftClick(song)}
                onShareClick={() => onShareClick(song)}
                showShare={showShare}
                {...(!hideIdx && { index: idx + 1 })}
              />
              <Separator />
            </Box>
          ) : (
            <Box px={3} pt={0} pb={4}>
              <Song
                slug={song.slug}
                image={song.imageUrl}
                title={song.name}
                artist={song.singers}
                download={song.downloadNumber}
                onPlayClick={onPlayClick[song.id]}
              />
            </Box>
          )}
        </Box>
      ))}
      <Share
        isOpen={modalShare}
        onClose={() => setOpenShare(false)}
        slug={selectedSong?.slug ?? ''}
      />
      <Download
        isOpen={showModalDownload}
        onClose={() => setShowModalDownload(false)}
        name={selectedSong?.name}
        toneCode={(selectedSong as SongProps)?.toneFromList?.toneCode}
        singer={selectedSong?.singers.map((s) => s.alias).join(' - ')}
      />
      <Gift
        isOpen={showModalGift}
        onClose={() => setShowModalGift(false)}
        name={selectedSong?.name}
        toneCode={(selectedSong as SongProps)?.toneFromList?.toneCode}
      />
      {songs?.pageInfo?.hasNextPage && onFetchMore && (
        <Flex alignItems="center" flexDirection="column" width="100%" pt={5}>
          <Button variant="muted" onClick={onFetchMore}>
            Xem THÊM
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
