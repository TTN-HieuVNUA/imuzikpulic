import { useRoute } from '@react-navigation/native';
import React, { PropsWithChildren, useCallback, useState } from 'react';
import { FlexProps, MarginProps } from 'styled-system';

import { Header, NotificationIcon, SelectionBar, SelectionBarItem } from '../../components';
import { ConditionalGoVipButton, Playlist } from '../../containers';
import { useFetchMoreSongEdges } from '../../hooks';
import Title from '../../platform/Title';
import { useIChartQuery, useIChartsQuery } from '../../queries';
import { Box } from '../../rebass';

const Section = (props: PropsWithChildren<MarginProps & FlexProps>) => {
  return <Box px={2} {...props} />;
};

export default function IChartScreen() {
  const route: { params?: { slug?: string } } = useRoute();
  const [slug, setSlug] = useState(route.params?.slug ?? '');
  const { data } = useIChartsQuery();

  const tabs = data?.iCharts?.map((chart) => ({ key: chart.slug, text: chart.name })) || [];
  const onSelected = useCallback((item: SelectionBarItem<string>) => {
    setSlug(item.key);
  }, []);
  return (
    <Box height="100%">
      <Box bg="defaultBackground">
        <Header leftButton="back" title="Ichart" search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      <Section>
        <Box flexDirection="row" alignItems="center">
          <SelectionBar selectedKey={slug} items={tabs} onSelected={onSelected} flex={1} />
        </Box>
      </Section>
      <Box flex={1}>
        <IChartScreenBase slug={slug} />
      </Box>
    </Box>
  );
}

export function IChartScreenBase({ slug = '' }: { slug?: string }) {
  const baseVariables = { slug, first: 10 };

  const { data, fetchMore, refetch, loading } = useIChartQuery({
    variables: baseVariables,
  });
  const fetchMoreSongs = useFetchMoreSongEdges(
    loading,
    'iChart',
    fetchMore,
    data?.iChart,
    baseVariables
  );
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Title>{`Ichart - ${data?.iChart?.name}`}</Title>
      <Box flex={1}>
        <Playlist
          key={slug}
          isChart
          showIdx
          songs={data?.iChart?.songs}
          loading={loading}
          name={data?.iChart?.name ?? ''}
          onRefresh={refetch}
          onFetchMore={fetchMoreSongs}
        />
      </Box>
    </Box>
  );
}
