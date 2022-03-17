import React from 'react';

import { Header, NotificationIcon } from '../../components';
import { ConditionalGoVipButton, Playlist } from '../../containers';
import { useFetchMoreEdges } from '../../hooks';
import Title from '../../platform/Title';
import { useRecommendedSongsQuery } from '../../queries';
import { Box } from '../../rebass';

export function RecommendedScreenBase() {
  const { data, fetchMore, refetch, loading } = useRecommendedSongsQuery({
    variables: { first: 10 },
  });
  const fetchMoreItem = useFetchMoreEdges(
    loading,
    'recommendedSongs',
    fetchMore,
    data?.recommendedSongs
  );
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Box bg="defaultBackground">
        <Title>Đề xuất</Title>
        <Header leftButton="back" title="Đề xuất" search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      <Box flex={1}>
        <Playlist
          isChart
          songs={data?.recommendedSongs}
          loading={loading}
          name="Đề xuất"
          onRefresh={refetch}
          onFetchMore={fetchMoreItem}
        />
      </Box>
    </Box>
  );
}

export default function RecommendedScreen() {
  return <RecommendedScreenBase />;
}
