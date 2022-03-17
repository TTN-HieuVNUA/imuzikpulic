import React from 'react';

import { Header, NotificationIcon, Section2 } from '../../components';
import { ConditionalGoVipButton, PlayAllButton, Playlist } from '../../containers';
import { useCollection, useFetchMoreEdges } from '../../hooks';
import Title from '../../platform/Title';
import { useLikedSongQuery } from '../../queries';
import { Box } from '../../rebass';

const TITLE = 'My Playlist';

export function MyPlaylistScreenBase() {
  const { data, fetchMore, refetch, loading } = useLikedSongQuery({
    variables: { first: 10 },
  });
  const fetchMoreSongs = useFetchMoreEdges(loading, 'likedSongs', fetchMore, data?.likedSongs);
  const collection = useCollection(TITLE, data?.likedSongs);
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Title>My Playlist</Title>
      <Box bg="defaultBackground">
        <Header leftButton="back" title="My Playlist" search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      <Section2 mb={2}>
        <Box flexDirection="row" alignItems="center" justifyContent="flex-end">
          <PlayAllButton collection={collection} />
        </Box>
      </Section2>
      <Box flex={1}>
        <Playlist
          songs={data?.likedSongs}
          loading={loading}
          name={TITLE}
          onRefresh={refetch}
          onFetchMore={fetchMoreSongs}
        />
      </Box>
    </Box>
  );
}
export default function MyPlaylistScreen() {
  return <MyPlaylistScreenBase />;
}
