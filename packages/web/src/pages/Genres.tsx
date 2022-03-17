import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Text } from 'rebass';

import { H2, Section } from '../components';
import { PageBanner } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { useFetchMoreEdges } from '../hooks';
import { useGenresQuery } from '../queries';

export default function GenresPage() {
  const { data, loading, fetchMore } = useGenresQuery({ variables: { first: 10 } });
  const fetchMoreItem = useFetchMoreEdges(loading, 'genres', fetchMore, data?.genres);
  const CELL_HEIGHT = 155;
  const COL_COUNT = 5;
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
      <PageBanner page="the-loai" />
      <Section py={4}>
        <H2>Thể loại</H2>
      </Section>
      <Section py={4}>
        <Flex flexWrap="wrap" mx={-3}>
          {(data?.genres?.edges ?? []).map(({ node }, idx) => {

            return (
              <Box
                width={1 / COL_COUNT}
                height={CELL_HEIGHT}
                style={{ backgroundImage: `url(${node?.imageUrl})` }}
                css={{
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}>
                <Link to={`/the-loai/${node.slug}`}>
                  <Flex
                    css={{
                      background: 'linear-gradient(180deg, rgba(108, 108, 108, 0) 40%, rgba(0,0,0,0.9) 100%)',
                      '&:hover': {
                        borderBottom: '7px #FDCC26 solid',
                        '.text': {
                          paddingBottom: 8,
                        },
                      },
                    }}
                    width="100%"
                    height="100%"
                    justifyContent="flex-end"
                    flexDirection="column">
                    <Text fontSize={3} fontWeight="bold" color="white" px={4} py={3} className="text">
                      {node.name}
                    </Text>
                  </Flex>
                </Link>
              </Box>
            );
          })}
        </Flex>
        {data?.genres?.pageInfo?.hasNextPage && (
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
