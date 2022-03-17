import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex } from 'rebass';

import { H2 } from '../components';
import { Section } from '../components/Section';
import { PageBanner } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { PlayAllButton } from '../containers/PlayAllButton';
import { Playlist } from '../containers/Playlist';
import { useCollection, useFetchMoreSongEdges, usePlaylistOrder } from '../hooks';
import { useTopicQuery } from '../queries';

export default function TopicPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { orderBy } = usePlaylistOrder();

  const baseVariables = { slug, orderBy, first: 20 };

  const { data, fetchMore, refetch, loading } = useTopicQuery({
    variables: baseVariables,
  });
  const fetchMoreSongs = useFetchMoreSongEdges(
    loading,
    'topic',
    fetchMore,
    data?.topic!,
    baseVariables
  );
  const collection = useCollection(data?.topic?.name ?? '', data?.topic?.songs);
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
      <PageBanner page="chu-de" slug={slug} />
      <Section>
        <H2>{data?.topic?.name}</H2>
      </Section>
      <Section>
        <Flex flexDirection="row" alignItems="center" justifyContent="center">
          <PlayAllButton collection={collection} />
        </Flex>
      </Section>
      <Section>
        <Flex flexDirection="column">
          <Playlist
            songs={data?.topic?.songs}
            loading={loading}
            name={data?.topic?.name ?? ''}
            onRefresh={refetch}
            onFetchMore={fetchMoreSongs}
          />
        </Flex>
      </Section>
      <Footer />
    </Box>
  );
}
