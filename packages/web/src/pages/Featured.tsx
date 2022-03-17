import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex } from 'rebass';
import { H2, Section } from '../components';
import { FeaturedCard } from '../components/Card';
import { PageBanner } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { useFetchMoreEdges } from '../hooks';
import { useArticleListQuery } from '../queries';

export default function FeaturedPage() {
  //const { data, fetchMore, loading } = useFeaturedListQuery({ variables: { first: 9 } });
  const { data, loading, fetchMore } = useArticleListQuery({ variables: { first: 9 } });
  //const fetchMoreItem = useFetchMoreEdges(loading, 'featuredList', fetchMore, data?.featuredList);
  const fetchMoreItem = useFetchMoreEdges(loading, 'articles', fetchMore, data?.articles);
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
      <PageBanner page="noi-bat" />
      <Section py={4}>
        <H2>Nổi bật</H2>
      </Section>
      <Section py={4}>
        <Flex flexWrap="wrap" mx={-3}>
          {(data?.articles?.edges ?? []).map(({ node }, idx) => {

            return (
              <Box width={1 / 3} p={3} key={node.id ?? idx}>
                <Link {...{ to: `/noi-bat/${node.slug}` }}>
                  <FeaturedCard
                    mb={2}
                    title={node.title}
                    time={new Date(node.published_time)}
                    image={node.image_path || ''}
                    description={node.description}
                  />
                </Link>
              </Box>
            );
          })}
        </Flex>
        {data?.articles?.pageInfo?.hasNextPage && (
          <Flex alignItems="center" flexDirection="column" width="100%" pt={5}>
            <Button variant="muted" onClick={fetchMoreItem}>
              Xem thêm
            </Button>
          </Flex>
        )}
      </Section>
      <Footer />
    </Box>
  );
}
