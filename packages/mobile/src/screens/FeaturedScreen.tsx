import { parseISO } from 'date-fns';
import React from 'react';
import { FlatList } from 'react-native';

import { FeaturedCard, Header, NotificationIcon } from '../components';
import { ConditionalGoVipButton, LoadingFooter } from '../containers';
import { useFetchMoreEdges } from '../hooks';
import Title from '../platform/Title';
import { NavLink } from '../platform/links';
import { useArticleListQuery } from '../queries';
import { Box } from '../rebass';

export function FeaturedScreenBase() {
  const { data, loading, fetchMore, refetch } = useArticleListQuery({ variables: { first: 10 } });
  const onFetchMore = useFetchMoreEdges(loading, 'articles', fetchMore, data?.articles);
  return (
    <Box mx={3} flex={1}>
      <Title>Nổi bật</Title>
      <FlatList
        data={data?.articles?.edges ?? []}
        ListFooterComponent={
          <LoadingFooter hasMore={data?.articles?.pageInfo.hasNextPage || loading} />
        }
        initialNumToRender={10}
        onEndReachedThreshold={0.2}
        refreshing={loading}
        onRefresh={refetch}
        onEndReached={onFetchMore}
        keyExtractor={({ node: { id } }) => id}
        renderItem={({ item: { node } }) => (
          <Box key={node.id} my={2}>
            <NavLink {...{ route: '/noi-bat/[slug]', params: { slug: node.slug } }}>
              <FeaturedCard
                time={node.published_time && parseISO(node.published_time)}
                image={node.image_path ?? ''}
                title={node.title ?? ''}
                description={node.description ?? ''}
              />
            </NavLink>
          </Box>
        )}
      />
    </Box>
  );
}

export default function FeaturedScreen() {
  return (
    <Box bg="defaultBackground" position="relative" height="100%">
      <Box height="100%">
        <Header logo search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
        <FeaturedScreenBase />
      </Box>
    </Box>
  );
}
