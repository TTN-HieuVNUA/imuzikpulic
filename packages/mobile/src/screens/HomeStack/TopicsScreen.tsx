import React from 'react';
import { SectionList } from 'react-native';

import { Header, NotificationIcon, Section } from '../../components';
import { CardLeftLink, ConditionalGoVipButton, LoadingFooter } from '../../containers';
import { useFetchMoreEdges } from '../../hooks';
import Title from '../../platform/Title';
import { useTopicsQuery } from '../../queries';
import { Box } from '../../rebass';

export function TopicsScreenBase() {
  const { data, fetchMore, loading } = useTopicsQuery({ variables: { first: 100 } });

  const fetchMoreItem = useFetchMoreEdges(loading, 'topics', fetchMore, data?.topics);
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Title>Chủ đề</Title>
      <SectionList
        stickySectionHeadersEnabled
        sections={[
          {
            name: 'content',
            data: data?.topics.edges ?? [],
            keyExtractor: ({ node }, idx) => node.slug ?? `${idx}`,
            renderItem: ({ item: { node } }) => (
              <Section>
                <Box py={2}>
                  <CardLeftLink
                    image={node.imageUrl}
                    title={node.name}
                    description={node.description}
                    link={{
                      route: '/chu-de/[slug]',
                      params: { slug: node.slug },
                    }}
                  />
                </Box>
              </Section>
            ),
          },
        ]}
        renderSectionHeader={() => (
          <Header leftButton="back" title="Chủ đề" search>
            <ConditionalGoVipButton />
            <NotificationIcon />
          </Header>
        )}
        renderSectionFooter={() => (
          <LoadingFooter hasMore={data?.topics?.pageInfo.hasNextPage || loading} />
        )}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMoreItem}
      />
    </Box>
  );
}

export default function TopicsScreen() {
  return <TopicsScreenBase />;
}
