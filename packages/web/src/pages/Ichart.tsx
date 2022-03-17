import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Flex } from 'rebass';

import { H2, SelectionBar, SelectionBarItem } from '../components';
import { Section } from '../components/Section';
import { PageBanner } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { Playlist } from '../containers/Playlist';
import { useFetchMoreSongEdges } from '../hooks';
import { useIChartQuery } from '../queries';
export default function IChartPage() {
  const params = useParams<{ slug: string }>();
  const [slug, setSlug] = useState(params.slug ?? '');
  const baseVariables = { slug, first: 20 };
  const { data, fetchMore, refetch, loading } = useIChartQuery({
    variables: baseVariables,
  });
  useEffect(() => {
    setSlug(params.slug ?? data?.iCharts[0]?.slug ?? '');
  }, [data, slug, params]);
  const fetchMoreSongs = useFetchMoreSongEdges(
    loading,
    'iChart',
    fetchMore,
    data?.iChart!,
    baseVariables
  );
  const tabs = data?.iCharts?.map((chart) => ({ key: chart.slug, text: chart.name })) || [];
  let history = useHistory();
  const onSelected = useCallback(
    (item: SelectionBarItem<string>) => {
      history.push(`/ichart/${item.key}`);
    },
    [history]
  );
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
      <PageBanner page="ichart" />
      <Section>
        <H2>Ichart</H2>
      </Section>
      <Section>
        <Flex flexDirection="row" alignItems="center">
          <SelectionBar selectedKey={slug} items={tabs} onSelected={onSelected} flex={1} />
        </Flex>
      </Section>
      <Section>
        <Flex flexDirection="column">
          <Playlist
            songs={data?.iChart?.songs}
            loading={loading}
            name={data?.iChart?.name ?? ''}
            onRefresh={refetch}
            onFetchMore={fetchMoreSongs}
          />
        </Flex>
      </Section>
      <Footer />
      
    </Box>
  );
}
