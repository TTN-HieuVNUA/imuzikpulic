import React from 'react';
import { Platform, ScrollView } from 'react-native';

import { FullScreenPlayerView, Header, HeaderIconButton, usePlayer } from '../components';
import { likeSongUpdate } from '../containers';
import { ConditionalGoVipButton } from '../containers/buttons';
import { useModals } from '../hooks';
import { ModalBox } from '../platform/ModalBox';
import { useGoBack } from '../platform/go-back';
import { useAlert, useNavigationLink } from '../platform/links';
import { useLikeSongMutation, useMeQuery, useNodeQuery } from '../queries';
import { Box } from '../rebass';
import { SongRbtSection } from './HomeStack/SongScreen';

export const PlayerScreen = () => {
  const player = usePlayer();
  const { data } = useNodeQuery({ variables: { id: player.currentPlayable?.id ?? '' } });
  const song = data?.node?.__typename === 'Song' ? data.node : null;
  const [likeSong] = useLikeSongMutation();
  // const { currentPlayable } = player;
  const modals = useModals();
  const { data: meData } = useMeQuery();
  const dismiss = useGoBack();
  const showPopupLogin = useAlert({ type: 'requireLogin' });
  const requireLogin = () => {
    showPopupLogin({ content: 'Vui lòng đăng nhập để sử dụng!' });
  };
  const showPlaylist = useNavigationLink('playlist');
  const isShowing = Platform.OS === 'web' ? modals?.isVisible('player') : true;
  return (
    <ModalBox>
      <Box width={1}>
        <Header leftButton="dismiss" leftButtonClick={dismiss}>
          <ConditionalGoVipButton />
          <HeaderIconButton icon="playlist" onPress={showPlaylist} />
        </Header>
      </Box>
      <Box flex={1}>
        <ScrollView>
          <FullScreenPlayerView
            showing={!!isShowing}
            liked={!!song?.liked}
            onLike={
              meData?.me
                ? song
                  ? () =>
                      likeSong({
                        variables: { songId: song.id, like: !song.liked },
                        update: likeSongUpdate(song),
                      })
                  : undefined
                : requireLogin
            }
            showEq={player.currentPlayable?.sources?.[0] === song?.fileUrl}
            animated={player.isPlaying}
          />
          {song && <SongRbtSection song={song} tones={song.tones} />}
        </ScrollView>
      </Box>
    </ModalBox>
  );
};
