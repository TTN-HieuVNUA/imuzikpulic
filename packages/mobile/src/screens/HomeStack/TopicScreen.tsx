import { useRoute } from '@react-navigation/native';
import React from 'react';

import { Header, NotificationIcon, Section2 } from '../../components';
import { ConditionalGoVipButton, PlayAllButton, Playlist } from '../../containers';
import { useCollection, useFetchMoreSongEdges, usePlaylistOrder } from '../../hooks';
import Title from '../../platform/Title';
import { useTopicQuery } from '../../queries';
import { Box } from '../../rebass';

export function TopicScreenBase({ slug = '' }: { slug?: string }) {
  console.log('slug : ', slug);
  
  const { orderBy } = usePlaylistOrder();
  const baseVariables = { slug, orderBy, first: 10 };

  const { data, fetchMore, refetch, loading } = useTopicQuery({
    variables: baseVariables,
  });
  const fetchMoreSongs = useFetchMoreSongEdges(
    loading,
    'topic',
    fetchMore,
    data?.topic,
    baseVariables
  );
  const collection = useCollection(data?.topic?.name, data?.topic?.songs);
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Title>{data?.topic?.name}</Title>
      <Box bg="defaultBackground">
        <Header leftButton="back" title={data?.topic?.name} search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      <Section2>
        <Box flexDirection="row" alignItems="center" justifyContent="flex-end">
          <PlayAllButton collection={collection} />
        </Box>
      </Section2>
      <Box flex={1}>
        <Playlist
          songs={data?.topic?.songs}
          loading={loading}
          name={data?.topic?.name}
          onRefresh={refetch}
          onFetchMore={fetchMoreSongs}
        />
      </Box>
    </Box>
  );
}

export default function TopicScreen() {
  const route: { params?: { slug?: string } } = useRoute();
  return <TopicScreenBase slug={route.params?.slug ?? ''} />;
}
