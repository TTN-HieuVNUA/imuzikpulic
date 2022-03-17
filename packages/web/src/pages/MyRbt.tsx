import React, { useCallback, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Box, Flex, Text } from 'rebass';

import { Artists, Separator } from '../components';
import Icon, { ICON_GRADIENT_1 } from '../components/Icon';
import { formatSongDuration } from '../components/Player';
import { Rbt } from '../components/Rbt';
import { useTonePlayer } from '../hooks';
import {
  Genre,
  Maybe,
  MyRbtDownloadsDocument,
  RbtDownload,
  RingBackTone,
  SongBaseFragment,
  ToneBaseFragment,
  useDeleteRbtMutation,
  useMyRbtDownloadsWithGenresQuery,
} from '../queries';
import { PersonalSplitView } from './PersonalInfo';

const CollectionItem = (props: {
  selected: boolean;
  playedCallback?: () => void;
  download: Pick<
    RbtDownload,
    'id' | 'toneCode' | 'toneName' | 'singerName' | 'price' | 'availableDateTime' | 'personID'
  > & {
    tone?: Maybe<
      { __typename?: 'RingBackTone' } & Pick<RingBackTone, 'fileUrl' | 'duration' | 'price'> & {
          song?: Maybe<
            { __typename?: 'Song' } & {
              genres: Array<{ __typename?: 'Genre' } & Pick<Genre, 'id' | 'slug' | 'name'>>;
            } & SongBaseFragment
          >;
        } & ToneBaseFragment
    >;
  };
}) => {
  const { addToast } = useToasts();
  const { download, selected } = props;
  const [deleteRbt] = useDeleteRbtMutation({
    refetchQueries: [{ query: MyRbtDownloadsDocument }],
  });
  const [showInfo, setShowInfo] = useState(false);
  const onDeleteClick = useCallback(() => {
    deleteRbt({
      variables: { rbtCode: download.toneCode, personId: download.id },
    }).then(({ data }) => {
      addToast(data?.deleteRbt.success?"Thực hiện thành công !":"Lỗi không xác định !", {
        appearance: data?.deleteRbt.success ? 'success' : 'error',
        autoDismiss: true,
      });
      
    });
  }, [deleteRbt, download.id, download.toneCode]);
  const { audio, isPlaying, remain, duration, onPlayClick } = useTonePlayer(
    download?.tone?.fileUrl ?? '',
    selected,
    props.playedCallback
  );
  return (
    <Box>
      <Flex flexDirection="row" alignItems="center" my={2}>
        <Flex flexDirection="column" flex={1} ml={2}>
          <Text fontSize={2} fontWeight="bold" mb={1} color="normalText">
            {download.tone?.song?.name || download.toneName}
          </Text>
          <Text fontSize={2} color="lightText">
            {download.tone?.song ? (
              <Artists artist={download.tone.song.singers} />
            ) : (
              download.singerName
            )}
          </Text>
        </Flex>
        <Box onClick={onPlayClick}>
          <Icon name={isPlaying ? 'player-pause' : 'player-play'} size={20} />
        </Box>
        <Text color="lightText" fontSize={2} px={3}>
          {duration
            ? formatSongDuration(isPlaying ? remain : (duration || download.tone?.duration) ?? 0)
            : ''}
        </Text>
        <Flex
          css={{ cursor: 'pointer' }}
          px={3}
          alignItems="center"
          onClick={() => setShowInfo(!showInfo)}>
          <Icon name="info" color={ICON_GRADIENT_1} size={16} />
          <Text ml={2} fontWeight="bold" fontSize={2} color="normalText">
            Thông tin
          </Text>
        </Flex>
        <Flex css={{ cursor: 'pointer' }} px={3} alignItems="center">
          <Icon name="gift" color={ICON_GRADIENT_1} size={16} />
          <Text ml={2} fontWeight="bold" fontSize={2} color="normalText">
            Tặng quà
          </Text>
        </Flex>
        <Flex css={{ cursor: 'pointer' }} px={3} alignItems="center" onClick={onDeleteClick}>
          <Icon name="cross" color="red" size={16} />
          <Text ml={2} fontWeight="bold" fontSize={2} color="normalText">
            Xóa
          </Text>
        </Flex>
      </Flex>
      {showInfo && (
        <Flex bg="defaultBackground" px={5} py={4} mb={3}>
          <Rbt
            song={{
              image: download.tone?.song?.imageUrl ?? '',
              title: (download.tone?.song?.name || download.toneName) ?? '',
              artist: (download.tone?.song?.singers ?? []).map((s) => s.alias).join(' - '),
            }}
            code={download.toneCode}
            cp={download.tone?.contentProvider?.name ?? ''}
            genre={(download.tone?.song?.genres ?? []).map((g) => g.name).join('/')}
            price={download.tone?.price}
            expiry={30}
            purchased="20/09/2019"
            download={download.tone?.orderTimes}
          />
        </Flex>
      )}
      {audio}
    </Box>
  );
};
export default function MyRbtPage() {
  const { data,loading } = useMyRbtDownloadsWithGenresQuery();
  const [selectedDownload, setSelectedDownload] = useState<Pick<
    RbtDownload,
    'id' | 'toneCode' | 'toneName' | 'singerName' | 'price' | 'availableDateTime' | 'personID'
  > | null>(null);
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
    <PersonalSplitView title="Bộ sưu tập nhạc chờ">
      <Box mx={5} my={4}>
        {(data?.myRbt?.downloads ?? []).map((download, idx) => (
          <Box key={download.id}>
            <CollectionItem
              download={download}
              selected={download.id === selectedDownload?.id}
              playedCallback={() => setSelectedDownload(download)}
            />
            <Separator />
          </Box>
        ))}
      </Box>
    </PersonalSplitView>
  );
}
