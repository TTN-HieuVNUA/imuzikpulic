import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Flex } from 'rebass';

import { H2, SelectionBar } from '../components';
import { Section } from '../components/Section';
import { PageBanner } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { PlayAllButton } from '../containers/PlayAllButton';
import { Playlist, PlaylistProps } from '../containers/Playlist';
import { useCollection, useFetchMoreSongEdges, usePlaylistOrder } from '../hooks';
import { useTop100sQuery, useTopicQuery } from '../queries';

interface Top100TopicListProps extends PlaylistProps {
  name: string;
  slug: string;
}

const Top100TopicList = ({ name, slug }: Top100TopicListProps) => {
  const { orderBy } = usePlaylistOrder();
  const baseVariables = { slug, orderBy, first: 20 };
  const { data, fetchMore, refetch, loading } = useTopicQuery({
    variables: baseVariables,
  });
  const fetchMoreSongs = useFetchMoreSongEdges(
    loading,
    'top-100',
    fetchMore,
    data?.topic!,
    baseVariables
  );
  return (
    <>
      <Section>
        <Link to={`/top-100/${slug}`}>
          <H2>{name}</H2>
        </Link>
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
    </>
  );
};

interface Top100TopicProps {
  slug: string;
}

const Top100Topic = ({ slug }: Top100TopicProps) => {
  const { orderBy, selectionBarProps } = usePlaylistOrder();

  const baseVariables = { slug, orderBy, first: 20 };

  const { data, fetchMore, refetch, loading } = useTopicQuery({
    variables: baseVariables,
  });
  const fetchMoreSongs = useFetchMoreSongEdges(
    loading,
    'top-100',
    fetchMore,
    data?.topic!,
    baseVariables
  );
  const collection = useCollection(data?.topic?.name ?? '', data?.topic?.songs);
  return (
    <>
      <Section>
        <H2>{data?.topic?.name}</H2>
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
            songs={data?.topic?.songs}
            loading={loading}
            name={data?.topic?.name ?? ''}
            onRefresh={refetch}
            onFetchMore={fetchMoreSongs}
            softBy={orderBy.downloadNumber? 2:1}
          />
        </Flex>
      </Section>
    </>
  );
};

export default function Top100() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { data,loading } = useTop100sQuery();
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
      <PageBanner page="top-100" slug={slug} />
      {slug === '' ? (
        (data?.top100s.edges ?? []).map((item) => (
          <Top100TopicList key={item.node.id} name={item.node.name} slug={item.node.slug} />
        ))
      ) : (
        <Top100Topic slug={slug} />
      )}
      <Footer />
    </Box>
  );
}
