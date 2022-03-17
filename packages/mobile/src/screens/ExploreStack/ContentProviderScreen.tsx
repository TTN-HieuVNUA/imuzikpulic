import { useRoute } from '@react-navigation/native';
import React from 'react';

import { Header, NotificationIcon, Section2, SelectionBar } from '../../components';
import { ConditionalGoVipButton, PlayAllButton, Playlist } from '../../containers';
import { useCollection, useFetchMoreSongEdges, usePlaylistOrder } from '../../hooks';
import Title from '../../platform/Title';
import { useContentProviderQuery } from '../../queries';
import { Box } from '../../rebass';

export function ContentProviderScreenBase({ group }: { group: string }) {
  const { orderBy, selectionBarProps } = usePlaylistOrder();
  const baseVariables = { group, orderBy, first: 10 };
  const { data, fetchMore, refetch, loading } = useContentProviderQuery({
    variables: baseVariables,
  });
  const fetchMoreSongs = useFetchMoreSongEdges(
    loading,
    'contentProvider',
    fetchMore,
    data?.contentProvider,
    baseVariables
  );
  const collection = useCollection(data?.contentProvider?.name, data?.contentProvider?.songs);

  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Title>{data?.contentProvider?.name}</Title>
      <Box bg="defaultBackground">
        <Header leftButton="back" title={data?.contentProvider?.name} search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      <Section2>
        <Box flexDirection="row" alignItems="center">
          <SelectionBar {...selectionBarProps} flex={1} />
          {data?.contentProvider?.songs?.totalCount !== 0 ? (
            <PlayAllButton collection={collection} />
          ) : null}
        </Box>
      </Section2>
      <Box flex={1}>
        <Playlist
          key={selectionBarProps.selectedKey}
          songs={data?.contentProvider?.songs}
          loading={loading}
          name={data?.contentProvider?.name ?? ''}
          onRefresh={refetch}
          onFetchMore={fetchMoreSongs}
        />
      </Box>
    </Box>
  );
}

export default function ContentProviderScreen() {
  const route: { params?: { group?: string } } = useRoute();
  return <ContentProviderScreenBase group={route.params?.group ?? ''} />;
}
