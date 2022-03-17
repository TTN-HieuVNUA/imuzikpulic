import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex } from 'rebass';

import { GridCarousel, H2, SelectionBar, TitlePage } from '../components';
import Avatar from '../components/Avatar';
import { CardCenter, CardLeft, CardTop, FeaturedCard } from '../components/Card';
import Grid from '../components/Grid';
import { Section } from '../components/Section';
import { PageBanner, Playlist } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';

import {
  useArticleListQuery,
  useContentProvidersQuery,
  useGenresQuery,
  useHotTop100Query,
  useHotTopicsQuery,
  useIChartsQuery,
  useRecommendedSongsQuery,
  useSingersQuery,
} from '../queries';

const FeaturedSection = () => {
  const { data,loading } = useArticleListQuery({ variables: { first: 9 } });
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
    <Section>
      <H2>Nổi bật</H2>
      <GridCarousel rows={1} columns={3} showIndicators mx={1}>
        {(data?.articles?.edges ?? []).map(({ node }, idx) => {

          return (
            <Link {...{ to: `/noi-bat/${node.slug}` }} key={idx}>
              <FeaturedCard
                mb={2}
                title={node.title}
                time={new Date(node.published_time)}
                image={node.image_path || ''}
                description={node.description}
              />
            </Link>
          );
        })}
      </GridCarousel>
      <Flex justifyContent="center">
        <Link to="/noi-bat">
          <Button variant="muted">Xem tất cả</Button>
        </Link>
      </Flex>
    </Section>
  );
};
const IChartsSection = () => {
  const { data, loading } = useIChartsQuery({ variables: { first: 10 } });
  const [selectedChartSlug, setSelectedChartSlug] = useState<string>('');
  const charts = data?.iCharts || [];
  const selectedChart = charts.find((chart) => chart.slug === selectedChartSlug);
  useEffect(() => {
    if (!selectedChartSlug && charts.length > 0) {
      setSelectedChartSlug(charts[0].slug);
    }
  }, [charts, selectedChartSlug]);
  return (
    <Section pb={6} pt={3}>
      <Link {...{ to: `/ichart` }} key={1}>
        <H2>Ichart</H2>
      </Link>
      <SelectionBar
        mt={0}
        selectedKey={selectedChartSlug}
        items={charts.map((chart) => ({
          key: chart.slug,
          text: chart.name,
        }))}
        onSelected={(selected) => setSelectedChartSlug(selected.key)}
      />
      <Playlist
        songs={selectedChart?.songs}
        loading={loading}
        name={selectedChart?.name ?? ''}
        columns={2}
      />
      <Flex justifyContent="center">
        <Link to={`/ichart/${selectedChartSlug}`}>
          <Button variant="muted">Xem tất cả</Button>
        </Link>
      </Flex>
    </Section>
  );
};
const RecommendedSongsSection = () => {
  const { data, loading } = useRecommendedSongsQuery({ variables: { first: 8 } });
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
      <Link {...{ to: `/de-xuat` }} key={1}>
        <H2>Đề xuất</H2>
      </Link>
      <Playlist
        songs={data?.recommendedSongs}
        loading={loading}
        name="Đề xuất"
        columns={4}
        mb={0}
      />
      <Flex justifyContent="center">
        <Link to="/de-xuat">
          <Button variant="muted">Xem tất cả</Button>
        </Link>
      </Flex>
    </Box>
  );
};
const ContentProvidersSection = () => {
  const { data,loading } = useContentProvidersQuery({ variables: { first: 6 } });
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
      <Link {...{ to: `/nha-cung-cap` }} key={1}>
        <H2>Nhà cung cấp</H2>
      </Link>
      <Flex flexDirection="column">
        {(data?.contentProviders?.edges ?? []).map(({ node: cp }) => (
          <Box mb={2} key={cp.id}>
            <Link to={`/nha-cung-cap/${cp.group}`}>
              <CardLeft title={cp.name} image={cp.imageUrl} />
            </Link>
          </Box>
        ))}
      </Flex>
      <Flex justifyContent="center">
        <Link to="/nha-cung-cap">
          <Button variant="muted">Xem tất cả</Button>
        </Link>
      </Flex>
    </Box>
  );
};
const TopicsSection = () => {
  const { data,loading } = useHotTopicsQuery();
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
    <Section>
      <Link {...{ to: `/chu-de` }} key={1}>
        <H2>Chủ đề</H2>
      </Link>
      <GridCarousel rows={2} columns={4} showIndicators mx={1}>
        {(data?.hotTopics ?? []).map((topic, idx) => (
          <Link to={`/chu-de/${topic.slug}`} key={topic.slug ?? idx}>
            <CardTop mb={2} title={topic.name} image={topic.imageUrl || ''} />
          </Link>
        ))}
      </GridCarousel>
      <Flex justifyContent="center">
        <Link to="/chu-de">
          <Button variant="muted">Xem tất cả</Button>
        </Link>
      </Flex>
    </Section>
  );
};

export const GenresSection = () => {
  const { data,loading } = useGenresQuery({ variables: { first: 13 } });
  // TODO: hot genres?
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
    <Section py={4}>
      <Link {...{ to: `/the-loai` }} key={1}>
        <H2>Thể loại</H2>
      </Link>
      <Grid
        data={(data?.genres?.edges ?? []).map(({ node: genre }) => ({
          id: genre.id,
          title: genre.name,
          description: genre.description!,
          image: genre.imageUrl,
          slug: genre.slug,
        }))}
      />
      <Flex justifyContent="center">
        <Link to="/the-loai">
          <Button variant="muted">Xem tất cả</Button>
        </Link>
      </Flex>
    </Section>
  );
};
export const SingersSection = () => {
  const { data,loading } = useSingersQuery({ variables: { first: 12 } });
  // TODO: hot singers?
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
    <Section py={4}>
      <Link {...{ to: `/ca-sy` }} key={1}>
        <H2>Ca sĩ</H2>
      </Link>
      <GridCarousel columns={6} showIndicators={false}>
        {(data?.singers?.edges ?? []).map(({ node: singer }) => (
          <Link to={`/ca-sy/${singer.slug}`} key={singer.id}>
            <Avatar name={singer.alias ?? ''} image={singer.imageUrl || ''} />
          </Link>
        ))}
      </GridCarousel>
      <Flex justifyContent="center">
        <Link to="/ca-sy">
          <Button variant="muted">Xem tất cả</Button>
        </Link>
      </Flex>
    </Section>
  );
};

const Top100Section = () => {
  const { data,loading } = useHotTop100Query();
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
    <Section py={4}>
      <Link {...{ to: `/top-100` }} key={1}>
        <H2>Top 100</H2>
      </Link>
      <GridCarousel columns={4} showIndicators={false} mx={3}>
        {(data?.hotTop100 ?? []).map((item) => (
          <Link to={`/top-100/${item.slug}`} key={item.id}>
            <CardCenter title={item.name} image={item.imageUrl} />
          </Link>
        ))}
      </GridCarousel>
      <Flex justifyContent="center">
        <Link to="/top-100">
          <Button variant="muted">Xem tất cả</Button>
        </Link>
      </Flex>
    </Section>
  );
};

export default function HomePage() {
  return (
    <Box>
      <TitlePage title={'Một thế giới âm nhạc'}></TitlePage>
      <Header.Fixed />
      <PageBanner page="trang-chu" />
      <FeaturedSection />
      <TopicsSection />
      <IChartsSection />
      <Section bg="alternativeBackground" py={4}>
        <Flex mx={-4}>
          <Box width={2 / 3} px={4}>
            <RecommendedSongsSection />
          </Box>
          <Box width={1 / 3} px={4}>
            <ContentProvidersSection />
          </Box>
        </Flex>
      </Section>
      <Top100Section />
      <GenresSection />
      <SingersSection />
      <Footer />
    </Box>
  );
}
