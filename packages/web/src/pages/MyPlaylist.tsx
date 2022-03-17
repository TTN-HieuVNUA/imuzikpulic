import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import { useFetchMoreEdges } from '../hooks';
import { Playlist } from '../containers/Playlist';
import { useLikedSongQuery } from '../queries';
import { PersonalSplitView } from './PersonalInfo';

const MyPlaylistPage = () => {
  const { data, fetchMore, refetch, loading } = useLikedSongQuery({
    variables: { first: 20 },
  });
  const fetchMoreSongs = useFetchMoreEdges(loading, 'likedSongs', fetchMore, data?.likedSongs!);
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
    <PersonalSplitView title="My playlist">
      <Flex flexDirection="column">
        <Playlist
          showShare
          hideIdx={true}
          songs={data?.likedSongs}
          loading={loading}
          name="Đề xuất"
          onRefresh={refetch}
          onFetchMore={fetchMoreSongs}
        />
      </Flex>
    </PersonalSplitView>
  );
};

export default MyPlaylistPage;
