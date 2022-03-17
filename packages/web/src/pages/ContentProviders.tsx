import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex } from 'rebass';

import { H2, Section,TitlePage } from '../components';
import { CardBottom } from '../components/Card';
import { PageBanner } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { useFetchMoreEdges } from '../hooks';
import { useContentProvidersQuery } from '../queries';
import { useEffect } from 'react';
export default function ContentProvidersPage() {
  const { data, fetchMore, loading } = useContentProvidersQuery({ variables: { first: 20 } });
  const fetchMoreItem = useFetchMoreEdges(
    loading,
    'contentProviders',
    fetchMore,
    data?.contentProviders
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
      <TitlePage title={'Nhà cung cấp'}></TitlePage>
      <Header.Fixed />
      <PageBanner page="nha-cung-cap" />
      <Section py={4}>
        <H2>Nhà cung cấp</H2>
      </Section>
      <Section py={4}>
        <Flex flexWrap="wrap" mx={-3}>
          {(data?.contentProviders?.edges ?? []).map(({ node: cp }) => (
            <Box width={1 / 2} p={3} key={cp.id}>
              <Link to={`/nha-cung-cap/${cp.group}`}>
                <CardBottom title={cp.name} image={cp.imageUrl} />
              </Link>
            </Box>
          ))}
        </Flex>
        {data?.contentProviders?.pageInfo?.hasNextPage && (
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


