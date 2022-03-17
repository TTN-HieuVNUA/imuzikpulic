import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex } from 'rebass';

import { H2, SelectionBar,TitlePage } from '../components';
import { Section } from '../components/Section';
import { PageBanner } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { PlayAllButton } from '../containers/PlayAllButton';
import { Playlist } from '../containers/Playlist';
import { useCollection, useFetchMoreSongEdges, usePlaylistOrder } from '../hooks';
import { useContentProviderQuery } from '../queries';

export default function ContentProviderPage() {
  const { group = '' } = useParams<{ group: string }>();
  const { orderBy, selectionBarProps } = usePlaylistOrder();
  const baseVariables = { group, orderBy, first: 20 };
  const { data, fetchMore, refetch, loading } = useContentProviderQuery({
    variables: baseVariables,
  });
  const fetchMoreSongs = useFetchMoreSongEdges(
    loading,
    'contentProvider',
    fetchMore,
    data?.contentProvider!,
    baseVariables
  );
  const collection = useCollection(data?.contentProvider?.name ?? '', data?.contentProvider?.songs);
  useEffect(() => {
    const loading_screen = document.getElementById('ipl-progress-indicator')
    loading_screen.classList.remove('available')
    if(!loading)
    {
      setTimeout(() => {
        loading_screen.classList.add('available')
      }, 500)
    }
  },[loading]);
  return (
    <Box>
      <TitlePage title={data?.contentProvider?.name}></TitlePage>
      <Header.Fixed />
      <PageBanner page="nha-cung-cap" slug={group} />
      <Section>
        <H2>{data?.contentProvider?.name}</H2>
      </Section>
      <Section>
        <Flex flexDirection="row" alignItems="center">
          <SelectionBar {...selectionBarProps} flex={1} />
          <PlayAllButton collection={collection} />
        </Flex>
      </Section>
      <Section>
        <Flex flexDirection="column">
          <Playlist
            songs={data?.contentProvider?.songs}
            loading={loading}
            name={data?.contentProvider?.name ?? ''}
            onRefresh={refetch}
            onFetchMore={fetchMoreSongs}
          />
        </Flex>
      </Section>
      <Footer />
    </Box>
  );
}
