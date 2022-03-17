import React from 'react';
import { SectionList } from 'react-native';

import { Header, NotificationIcon, Section } from '../../components';
import { CardCenterLink, ConditionalGoVipButton, LoadingFooter } from '../../containers';
import { useFetchMoreEdges } from '../../hooks';
import Title from '../../platform/Title';
import { Top100sQuery, useTop100sQuery } from '../../queries';
import { Box } from '../../rebass';

export function Top100sScreenBase() {
  const { data, fetchMore, loading } = useTop100sQuery({ variables: { first: 10 } });

  const fetchMoreItem = useFetchMoreEdges(loading, 'top100s', fetchMore, data?.top100s);
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Title>Top 100</Title>
      <SectionList
        stickySectionHeadersEnabled
        sections={[
          {
            name: 'content',
            data: data?.top100s.edges ?? ([] as Top100sQuery['top100s']['edges']),
            keyExtractor: ({ node }, idx) => node.slug ?? `${idx}`,
            renderItem: ({ item: { node } }) => (
              <Section>
                <Box py={2}>
                  <CardCenterLink
                    image={node.imageUrl}
                    title={node.name}
                    link={{
                      route: '/top-100/[slug]',
                      params: { slug: node.slug },
                    }}
                  />
                </Box>
              </Section>
            ),
          },
        ]}
        renderSectionHeader={() => (
          <Header leftButton="back" title="Top 100" search>
            <ConditionalGoVipButton />
            <NotificationIcon />
          </Header>
        )}
        renderSectionFooter={() => (
          <LoadingFooter hasMore={data?.top100s?.pageInfo.hasNextPage || loading} />
        )}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMoreItem}
      />
    </Box>
  );
}

export default function Top100sScreen() {
  return <Top100sScreenBase />;
}
