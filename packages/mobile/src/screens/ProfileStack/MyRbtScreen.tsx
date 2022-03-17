import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';

import { Header, PlaylistSong } from '../../components';
import Title from '../../platform/Title';
import { useTonePlayer } from '../../platform/tone-player';
import {
  Maybe,
  MyRbtDownloadsDocument,
  RbtDownload,
  RingBackTone,
  SongBaseFragment,
  ToneBaseFragment,
  useDeleteRbtMutation,
  useMyRbtDownloadsQuery,
} from '../../queries';
import { Box } from '../../rebass';

type Download = { __typename?: 'RbtDownload' } & Pick<
  RbtDownload,
  'id' | 'toneCode' | 'toneName' | 'singerName' | 'price' | 'availableDateTime' | 'personID'
> & {
    tone?: Maybe<
      { __typename?: 'RingBackTone' } & Pick<RingBackTone, 'fileUrl' | 'duration' | 'price'> & {
          song?: Maybe<{ __typename?: 'Song' } & SongBaseFragment>;
        } & ToneBaseFragment
    >;
  };

const CollectionItem = (props: {
  idx: number;
  selected: boolean;
  playedCallback?: () => void;
  download: Download;
}) => {
  const { download, selected, idx } = props;
  const [deleteRbt] = useDeleteRbtMutation({
    refetchQueries: [{ query: MyRbtDownloadsDocument }],
  });
  const onDeleteClick = useCallback(() => {
    deleteRbt({
      variables: { rbtCode: download.toneCode, personId: download.id },
    }).then(({ data }) => alert(data?.deleteRbt.message));
  }, [deleteRbt, download.id, download.toneCode]);
  const { audio, isPlaying, remain, duration, onPlayClick } = useTonePlayer(
    download?.tone?.fileUrl ?? '',
    selected,
    props.playedCallback
  );
  return (
    <Box>
      <PlaylistSong
        index={idx}
        slug={download.tone?.song?.slug}
        disableSongLink
        toneCode={download.tone?.toneCode}
        title={download.toneName}
        artist={download.tone?.song?.singers.map((s) => s.alias).join(' - ')}
        download={download.tone?.orderTimes}
        duration={isPlaying ? remain : duration || download.tone?.duration}
        highlighted={selected}
        expanded={selected}
        showDelete
        onDeleteClick={onDeleteClick}
        showInfo
        showExpandedGift
        hideDownload
        hideToneCode
        hideLike
        hideShare
        isPlaying={isPlaying}
        showEq={isPlaying}
        animated={isPlaying}
        onPlayClick={onPlayClick}
      />
      {audio}
    </Box>
  );
};

export const MyRbtScreenBase = () => {
  const { data, loading } = useMyRbtDownloadsQuery();
  const [selectedDownload, setSelectedDownload] = useState<Download | null>(null);
  return (
    <Box bg="defaultBackground" my={4}>
      <Title>Bộ sưu tập nhạc chờ</Title>
      {loading && <ActivityIndicator size="large" color="primary" />}
      {(data?.myRbt?.downloads ?? []).map((download, idx) => (
        <Box my={1} mx={3} key={download.id}>
          <TouchableOpacity
            onPress={() =>
              selectedDownload?.id === download.id
                ? setSelectedDownload(null)
                : setSelectedDownload(download)
            }>
            <CollectionItem
              idx={idx + 1}
              download={download}
              selected={download.id === selectedDownload?.id}
              playedCallback={() => setSelectedDownload(download)}
            />
          </TouchableOpacity>
        </Box>
      ))}
    </Box>
  );
};

const MyRbtScreen = () => {
  return (
    <Box bg="defaultBackground" height="100%">
      <Header leftButton="back" title="Bộ sưu tập nhạc chờ" />
      <ScrollView>
        <MyRbtScreenBase />
      </ScrollView>
    </Box>
  );
};
export default MyRbtScreen;
