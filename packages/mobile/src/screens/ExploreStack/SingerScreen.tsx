import { useRoute } from '@react-navigation/native';
import React from 'react';

import { Header, NotificationIcon, Section2, SelectionBar } from '../../components';
import { ConditionalGoVipButton, PlayAllButton, Playlist } from '../../containers';
import { useCollection, useFetchMoreSongEdges, usePlaylistOrder } from '../../hooks';
import Title from '../../platform/Title';
import { useSingerQuery } from '../../queries';
import { Box } from '../../rebass';

export function SingerScreenBase({ slug = '' }: { slug?: string }) {
  const { orderBy, selectionBarProps } = usePlaylistOrder();

  const baseVariables = { slug, orderBy, first: 10 };

  const { data, fetchMore, refetch, loading } = useSingerQuery({
    variables: baseVariables,
  });
  const fetchMoreSongs = useFetchMoreSongEdges(
    loading,
    'singer',
    fetchMore,
    data?.singer,
    baseVariables
  );
  const collection = useCollection(data?.singer?.alias ?? '', data?.singer?.songs);
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Title>{data?.singer?.alias}</Title>
      <Box bg="defaultBackground">
        <Header leftButton="back" title={data?.singer?.alias} search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      <Section2>
        <Box flexDirection="row" alignItems="center">
          <SelectionBar {...selectionBarProps} flex={1} />
          {data?.singer?.songs?.totalCount !== 0 ? <PlayAllButton collection={collection} /> : null}
        </Box>
      </Section2>
      <Box flex={1}>
        <Playlist
          key={slug + selectionBarProps.selectedKey}
          songs={data?.singer?.songs}
          loading={loading}
          name={data?.singer?.alias}
          onRefresh={refetch}
          onFetchMore={fetchMoreSongs}
        />
      </Box>
    </Box>
  );
}
export default function SingerScreen() {
  const route: { params?: { slug?: string } } = useRoute();
  return <SingerScreenBase slug={route.params?.slug ?? ''} />;
}
