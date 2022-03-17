import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex } from 'rebass';

import { H2, SelectionBar } from '../components';
import { Section } from '../components/Section';
import { PageBanner } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { PlayAllButton } from '../containers/PlayAllButton';
import { Playlist } from '../containers/Playlist';
import { useCollection, useFetchMoreSongEdges, usePlaylistOrder } from '../hooks';
import { useGenreQuery } from '../queries';

export default function GenrePage() {
  const { slug = '' } = useParams();
  const { orderBy, selectionBarProps } = usePlaylistOrder();
  const baseVariables = { slug, orderBy, first: 20 };
  const { data, fetchMore, refetch, loading } = useGenreQuery({
    variables: baseVariables,
  });
  const fetchMoreSongs = useFetchMoreSongEdges(
    loading,
    'genre',
    fetchMore,
    data?.genre!,
    baseVariables
  );
  const collection = useCollection(data?.genre?.name ?? '', data?.genre?.songs);
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
      <Header.Fixed />
      <PageBanner page="the-loai" slug={slug} />
      <Section>
        <H2>{data?.genre?.name}</H2>
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
            songs={data?.genre?.songs}
            loading={loading}
            name={data?.genre?.name ?? ''}
            onRefresh={refetch}
            onFetchMore={fetchMoreSongs}
          />
        </Flex>
      </Section>
      <Footer />
    </Box>
  );
}
