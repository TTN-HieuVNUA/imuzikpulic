import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex } from 'rebass';

import { H2, Section } from '../components';
import { CardCenter } from '../components/Card';
import { PageBanner } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { useFetchMoreEdges } from '../hooks';
import { useTop100sQuery } from '../queries';

export default function Top100sPage() {
  const { data, loading, fetchMore } = useTop100sQuery({ variables: { first: 8 } });
  const fetchMoreItem = useFetchMoreEdges(loading, 'top100s', fetchMore, data?.top100s);
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
      <PageBanner page="chu-de" />
      <Section py={4}>
        <H2>Chủ đề</H2>
      </Section>
      <Section py={4}>
        <Flex flexWrap="wrap" mx={-3}>
          {(data?.top100s.edges ?? []).map(({ node }, idx) => (
            <Box width={1 / 4} p={3} key={node.id}>
              <Link to={`/top-100/${node.slug}`} key={node.id}>
                <CardCenter title={node.name} image={node.imageUrl} />
              </Link>
            </Box>
          ))}

        </Flex>
        {data?.top100s?.pageInfo?.hasNextPage && (
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
