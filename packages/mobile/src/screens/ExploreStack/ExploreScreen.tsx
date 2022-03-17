import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';

import { Header, NotificationIcon, Section, SelectionBar } from '../../components';
import {
  AvatarLink,
  CardCenterLink,
  ConditionalGoVipButton,
  ExploreTabKey,
  exploreTabs,
  PageBanner,
} from '../../containers';
import { useFetchMoreEdges } from '../../hooks';
import Title from '../../platform/Title';
import { useContentProvidersQuery, useGenresQuery, useSingersQuery } from '../../queries';
import { Box, Button, Flex } from '../../rebass';
import { ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';

export const SingersSection = () => {
  const { data, fetchMore, loading } = useSingersQuery({ variables: { first: 10 } });
  const fetchMoreItem = useFetchMoreEdges(loading, 'singers', fetchMore, data?.singers);

  return (
    <ScrollView>
      <Title>Ca sỹ</Title>
      {loading && <ActivityIndicator size="large" color="primary" />}
      <Flex flexWrap="wrap" flexDirection="row">
        {(data?.singers?.edges || []).map(({ node: singer }, idx) => (
          <Box width={1 / 2} key={singer.slug ?? idx} py={2}>
            <AvatarLink
              image={singer.imageUrl}
              name={singer.alias}
              link={{
                route: '/ca-sy/[slug]',
                params: { slug: singer.slug },
              }}
            />
          </Box>
        ))}
      </Flex>
      {data?.singers?.pageInfo.hasNextPage && (
        <Button my={3} variant="underline" onPress={fetchMoreItem} disabled={loading}>
          Xem thêm
        </Button>
      )}
    </ScrollView>
  );
};
export function ContentProvidersSection() {
  const { data, fetchMore, loading } = useContentProvidersQuery({ variables: { first: 10 } });
  const fetchMoreItem = useFetchMoreEdges(
    loading,
    'contentProviders',
    fetchMore,
    data?.contentProviders
  );

  return (
    <ScrollView>
      <Title>Nhà cung cấp</Title>
      {loading && <ActivityIndicator size="large" color="primary" />}
      {(data?.contentProviders.edges ?? []).map(({ node }) => (
        <Section key={node.id}>
          <Box key={node.id} py={2}>
            <CardCenterLink
              image={node.imageUrl}
              title={node.name}
              link={{ route: '/nha-cung-cap/[group]', params: { group: node.group } }}
            />
          </Box>
        </Section>
      ))}
      {data?.contentProviders?.pageInfo.hasNextPage && (
        <Button my={3} variant="underline" onPress={fetchMoreItem} disabled={loading}>
          Xem thêm
        </Button>
      )}
    </ScrollView>
  );
}

export function GenresSection() {
  const { data, fetchMore, loading } = useGenresQuery({ variables: { first: 10 } });
  const fetchMoreItem = useFetchMoreEdges(loading, 'genres', fetchMore, data?.genres);

  return (
    <>
      <Title>Thể loại</Title>
      {loading && <ActivityIndicator size="large" color="primary" />}
      {(data?.genres.edges ?? []).map(({ node }) => (
        <Section key={node.id}>
          <Box py={2}>
            <CardCenterLink
              image={node.imageUrl}
              title={node.name}
              link={{
                route: '/the-loai/[slug]',
                params: { slug: node.slug },
              }}
            />
          </Box>
        </Section>
      ))}
      {data?.genres?.pageInfo.hasNextPage && (
        <Button my={3} variant="underline" onPress={fetchMoreItem} disabled={loading}>
          Xem thêm
        </Button>
      )}
    </>
  );
}
export function ExploreScreenBase({ tab }: { tab: ExploreTabKey }) {
  const [currentTab, setCurrentTab] = useState<ExploreTabKey>(tab);

  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Box>
        <PageBanner page={tab} />
      </Box>
      <Section>
        <SelectionBar<ExploreTabKey>
          selectedKey={currentTab}
          items={exploreTabs}
          onSelected={({ key }) => setCurrentTab(key)}
        />
      </Section>
      {currentTab === 'ca-sy' ? (
        <SingersSection />
      ) : currentTab === 'nha-cung-cap' ? (
        <ContentProvidersSection />
      ) : currentTab === 'the-loai' ? (
        <GenresSection />
      ) : null}
    </Box>
  );
}

export default function ExploreScreen() {
  const route = useRoute();
  return (
    <SafeAreaView>
      <Box height="100%" position="relative">
        <Box position="absolute" top={0} left={0} right={0} zIndex={100}>
          <Header logo search>
            <ConditionalGoVipButton />
            <NotificationIcon />
          </Header>
        </Box>
        <ScrollView>
          <ExploreScreenBase tab={route.name.split('/')[1] as ExploreTabKey} />
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
