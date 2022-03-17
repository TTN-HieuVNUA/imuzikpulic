import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { PaddingProps } from 'styled-system';
import { Footer, H2, Header, NotificationIcon, SelectionBar } from '../../components';
import {
  CardCenterLink,
  CardLeftLink,
  ConditionalGoVipButton,
  PageBanner,
  Playlist,
  ViewAllLink,
} from '../../containers';
import Title from '../../platform/Title';
import {
  useHotGenresQuery,
  useHotTop100Query,
  useHotTopicsQuery,
  useIChartsQuery,
  useRecommendedSongsQuery,
} from '../../queries';
import { Box } from '../../rebass';

const Section = (props: PropsWithChildren<PaddingProps>) => {
  return <Box px={3} {...props} />;
};

const IChartsSection = () => {
  const { data, loading } = useIChartsQuery();
  const [selectedChartSlug, setSelectedChartSlug] = useState<string>('nhac-tre');
  const charts = useMemo(() => data?.iCharts || [], [data?.iCharts]);
  const selectedChart = charts.find((chart) => chart.slug === selectedChartSlug);
  useEffect(() => {
    if (charts.length > 0 && !selectedChart) {
      setSelectedChartSlug(charts[0].slug);
    }
  }, [charts, selectedChart, selectedChartSlug]);
  return (
    <Section>
      <H2 mb={0}>Ichart</H2>
      <SelectionBar
        mt={0}
        selectedKey={selectedChartSlug}
        items={charts.map((chart) => ({
          key: chart.slug,
          text: chart.name,
        }))}
        onSelected={(selected) => setSelectedChartSlug(selected.key)}
      />
      <Box mx={-3}>
        <Playlist
          mx={3}
          isChart
          showIdx
          songs={selectedChart?.songs}
          loading={loading}
          name={selectedChart?.name}
        />
      </Box>
      <ViewAllLink route="/ichart/[slug]" params={{ slug: selectedChartSlug }} />
    </Section>
  );
};
const RecommendedSongsSection = () => {
  const { data, loading } = useRecommendedSongsQuery({ ssr: false });
  return (
    <Section>
      <H2>Đề xuất</H2>
      <Box mx={-3}>
        <Playlist mx={3} isChart songs={data?.recommendedSongs} loading={loading} name="Đề xuất" />
      </Box>
      <ViewAllLink route="/de-xuat" />
    </Section>
  );
};

const TopicsSection = () => {
  const { data, loading } = useHotTopicsQuery({ ssr: false });
  return (
    <Section pb={4}>
      <H2>Chủ đề</H2>
      {loading && <ActivityIndicator size="large" color="primary" />}
      {data?.hotTopics.map((item) => (
        <Box key={item.id} py={2}>
          <CardLeftLink
            image={item.imageUrl}
            title={item.name}
            description={item.description}
            link={{ route: '/chu-de/[slug]', params: { slug: item.slug } }}
          />
        </Box>
      ))}
      <ViewAllLink route="/chu-de" />
    </Section>
  );
};

const Top100Section = () => {
  const { data, loading } = useHotTop100Query({ ssr: false });
  return (
    <Section pb={4}>
      <H2>Top 100</H2>
      {loading && <ActivityIndicator size="large" color="primary" />}
      {data?.hotTop100.map((item) => (
        <Box key={item.id} py={2}>
          <CardCenterLink
            image={item.imageUrl}
            title={item.name}
            link={{ route: '/top-100/[slug]', params: { slug: item.slug } }}
          />
        </Box>
      ))}
      <ViewAllLink route="/top-100" />
    </Section>
  );
};

const GenresSection = () => {
  const { data, loading } = useHotGenresQuery({ ssr: false });
  return (
    <Section>
      <H2>Thể loại</H2>
      {loading && <ActivityIndicator size="large" color="primary" />}
      {data?.hotGenres.map((item) => (
        <Box key={item.id} py={2}>
          <CardCenterLink
            image={item.imageUrl}
            title={item.name}
            link={{ route: '/the-loai/[slug]', params: { slug: item.slug } }}
          />
        </Box>
      ))}
      <ViewAllLink route="/kham-pha" />
    </Section>
  );
};

export const HomeScreenBase = () => {
  return (
    <Box bg="defaultBackground" position="relative">
      <Title>Một thế giới âm nhạc</Title>
      <PageBanner page="trang-chu" />
      <IChartsSection />
      <RecommendedSongsSection />
      <Top100Section />
      <GenresSection />
      <TopicsSection />
      <Footer />
    </Box>
  );
};

const HomeScreen = () => {
  return (
    <Box bg="defaultBackground" position="relative" height="100%">
      <Box height="100%">
        <Header logo search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
        <ScrollView>
          <HomeScreenBase />
        </ScrollView>
      </Box>
    </Box>
  );
};
export default HomeScreen;
