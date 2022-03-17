import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { Header, PlaylistSong } from '../../components';
import {
  ContentProvider,
  Genre,
  Maybe,
  RingBackTone,
  RingBackToneCreation,
  Song,
  useGetMyToneCreationsQuery,
} from '../../queries';
import { Box, Flex, Button } from '../../rebass';
import { useTonePlayer } from '../../platform/tone-player';
import { useFetchMoreEdges } from '../../hooks';

type RbtCreate = Pick<
  RingBackToneCreation,
  | 'id'
  | 'duration'
  | 'tone_code'
  | 'created_at'
  | 'tone_name'
  | 'type_creation'
  | 'member_id'
  | 'local_file'
  | 'tone_status'
  | 'tone_price'
  | 'singer_name'
> & {
  song?: Maybe<
    { __typename?: 'Song' } & Pick<Song, 'slug' | 'id' | 'name' | 'fileUrl'> & {
        genres: Array<{ __typename?: 'Genre' } & Pick<Genre, 'name'>>;
      }
  >;
  contentProvider?: Maybe<
    { __typename?: 'ContentProvider' } & Pick<ContentProvider, 'name' | 'id'>
  >;
  tone?: Maybe<
    { __typename?: 'RingBackTone' } & Pick<RingBackTone, 'name' | 'fileUrl' | 'orderTimes'>
  >;
};

const CollectionItem = (props: {
  idx: number;
  selected: boolean;
  playedCallback?: () => void;
  songData: RbtCreate;
}) => {
  const { songData, selected, idx } = props;
  const { audio, isPlaying, remain, duration, onPlayClick } = useTonePlayer(
    songData?.tone?.fileUrl ?? '',
    selected,
    props.playedCallback
  );

  return (
    <Box>
      <PlaylistSong
        index={idx}
        slug={songData?.song?.slug}
        disableSongLink
        toneName={songData?.tone_name}
        toneCode={songData?.tone_code}
        title={songData?.song?.name ?? songData.singer_name}
        status={songData?.tone_status}
        download={songData?.tone_status === 2 ? songData?.tone?.orderTimes : 0}
        duration={isPlaying ? remain : duration || songData?.duration}
        highlighted={selected}
        expanded={selected}
        timeCreate={songData?.created_at}
        tone={songData?.tone}
        showInfo
        hideLike
        hideShare
        showExpandedInvited
        hideDownload
        showExpandedGift
        showExpandedDownload
        isPlaying={isPlaying}
        showEq={isPlaying}
        animated={isPlaying}
        onPlayClick={onPlayClick}
      />
      {audio}
    </Box>
  );
};

export const RbtManagerBase = () => {
  const { data, loading, fetchMore } = useGetMyToneCreationsQuery({
    variables: { first: 10 },
  });
  const [selectedDownload, setSelectedDownload] = useState<RbtCreate | null>(null);

  const fetchMoreItem = useFetchMoreEdges(
    loading,
    'getMyToneCreations',
    fetchMore,
    data?.getMyToneCreations
  );

  const hasNextPage = data?.getMyToneCreations?.pageInfo?.hasNextPage;

  return (
    <Box bg="defaultBackground" my={4}>
      {(data?.getMyToneCreations?.edges ?? []).map((songData, idx) => (
        <Box my={1} mx={3} key={idx}>
          <TouchableOpacity
            onPress={() =>
              selectedDownload?.id === songData?.node?.id
                ? setSelectedDownload(null)
                : setSelectedDownload(songData?.node)
            }>
            <CollectionItem
              idx={idx + 1}
              songData={songData?.node}
              selected={songData?.node?.id === selectedDownload?.id}
              playedCallback={() => setSelectedDownload(songData?.node)}
            />
          </TouchableOpacity>
        </Box>
      ))}
      {hasNextPage && (
        <Flex alignItems="center" flexDirection="column" width="100%" pt={1}>
          <Button variant="underline" onPress={fetchMoreItem}>
            Xem thêm
          </Button>
        </Flex>
      )}
    </Box>
  );
};

const RbtManagerScreen = () => {
  return (
    <Box bg="defaultBackground" height="100%">
      <Header leftButton="back" title="Quản lý nhạc chờ" />
      <ScrollView>
        <RbtManagerBase />
      </ScrollView>
    </Box>
  );
};
export default RbtManagerScreen;
