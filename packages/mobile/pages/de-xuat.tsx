import { NextPageContext } from 'next';
import React from 'react';

import { Header, NotificationIcon } from '../src/components';
import { ConditionalGoVipButton, Playlist } from '../src/containers';
import { withApollo } from '../src/helpers/apollo';
import { useFetchMoreEdges } from '../src/hooks';
import { useRecommendedSongsQuery } from '../src/queries';
import { Box } from '../src/rebass';

function RecommendedSongsPage() {
  const { data, fetchMore, refetch, loading } = useRecommendedSongsQuery();
  const fetchMoreItem = useFetchMoreEdges(
    loading,
    'recommendedSongs',
    fetchMore,
    data?.recommendedSongs
  );
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Box bg="defaultBackground">
        <Header leftButton="back" title="Đề xuất" search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      <Box flex={1}>
        <Playlist
          isChart
          songs={data?.recommendedSongs}
          loading={loading}
          name="Đề xuất"
          onRefresh={refetch}
          onFetchMore={fetchMoreItem}
        />
      </Box>
    </Box>
  );
}

RecommendedSongsPage.getInitialProps = ({ req, query }: NextPageContext) => {
  return { url: req?.url, ...query };
};

export default withApollo({ ssr: true })(RecommendedSongsPage);
