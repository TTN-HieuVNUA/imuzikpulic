import { useRoute } from '@react-navigation/native';
import React, { PropsWithChildren } from 'react';
import { FlexProps, MarginProps } from 'styled-system';

import { Header, NotificationIcon, SelectionBar } from '../../components';
import { ConditionalGoVipButton, PlayAllButton, Playlist } from '../../containers';
import { useCollection, useFetchMoreSongEdges, usePlaylistOrder } from '../../hooks';
import Title from '../../platform/Title';
import { useGenreQuery } from '../../queries';
import { Box } from '../../rebass';

const Section = (props: PropsWithChildren<MarginProps & FlexProps>) => {
  return <Box px={2} {...props} />;
};

export function GenreScreenBase({ slug = '' }: { slug?: string }) {
  const { orderBy, selectionBarProps } = usePlaylistOrder();
  const baseVariables = { slug, orderBy, first: 10 };
  const { data, fetchMore, refetch, loading } = useGenreQuery({
    variables: baseVariables,
  });
  const fetchMoreSongs = useFetchMoreSongEdges(
    loading,
    'genre',
    fetchMore,
    data?.genre,
    baseVariables
  );
  const collection = useCollection(data?.genre?.name ?? '', data?.genre?.songs);
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Title>{data?.genre?.name}</Title>
      <Box bg="defaultBackground">
        <Header leftButton="back" title={data?.genre?.name} search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      <Section>
        <Box flexDirection="row" alignItems="center">
          <SelectionBar {...selectionBarProps} flex={1} />
          {data?.genre?.songs?.totalCount !== 0 ? <PlayAllButton collection={collection} /> : null}
        </Box>
      </Section>
      <Box flex={1}>
        <Playlist
          key={selectionBarProps.selectedKey}
          songs={data?.genre?.songs}
          loading={loading}
          name={data?.genre?.name ?? ''}
          onRefresh={refetch}
          onFetchMore={fetchMoreSongs}
        />
      </Box>
    </Box>
  );
}

export default function GenreScreen() {
  const route: { params?: { slug?: string } } = useRoute();
  return <GenreScreenBase slug={route.params?.slug} />;
}
