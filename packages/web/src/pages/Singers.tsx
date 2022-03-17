import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex } from 'rebass';

import { H2, Section } from '../components';
import Avatar from '../components/Avatar';
import { PageBanner } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { useFetchMoreEdges } from '../hooks';
import { useSingersQuery } from '../queries';

export default function SingersPage() {
  const { data, fetchMore, loading } = useSingersQuery({ variables: { first: 36 } });
  const fetchMoreItem = useFetchMoreEdges(loading, 'singers', fetchMore, data?.singers);
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
      <PageBanner page="ca-sy" />
      <Section py={4}>
        <H2>Ca sĩ</H2>
      </Section>
      <Section py={4}>
        <Flex flexWrap="wrap" mx={-3}>
          {(data?.singers.edges ?? []).map(({ node: singer }) => (
            <Box width={1 / 6} p={3} key={singer.id}>
              <Link to={`/ca-sy/${singer.slug}`}>
                <Avatar name={singer.alias ?? ''} image={singer.imageUrl || ''} />
              </Link>
            </Box>
          ))}
        </Flex>
        {data?.singers?.pageInfo?.hasNextPage && (
          <Flex alignItems="center" flexDirection="column" width="100%" pt={5}>
            <Button variant="muted" onClick={fetchMoreItem}>
              Xem THÊM
            </Button>
          </Flex>
        )}
      </Section>
      <Footer />
    </Box>
  );
}
