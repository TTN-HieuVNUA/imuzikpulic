import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { PlaylistSong, Section, usePlayer } from '../components';
import { useModals } from '../hooks/modals';
import { useResponseHandler } from '../hooks/response-handler';
import { ModalBox } from '../platform/ModalBox';
import { LikeSongMutation, useLikeSongMutation } from '../queries';
import { Box, Text } from '../rebass';

export const PlaylistScreen = () => {
  const player = usePlayer();
  const modals = useModals();
  const [likeSong] = useLikeSongMutation();
  const handleLikeSongResult = useResponseHandler<LikeSongMutation>((res) => res.data?.likeSong);
  if (!player) return null;
  const isShowing = Platform.OS === 'web' ? modals?.isVisible('player') : true;
  return (
    <ModalBox heightRatio={0.6}>
      <Section mb={4} mt={1}>
        <Text fontSize={4} fontWeight="bold" my={1}>
          {player.currentCollection?.name}
        </Text>
      </Section>
      <Box flex={1} css={{ borderRadius: 8, overflow: 'hidden' }} pb={2}>
        <ScrollView>
          {(player.currentCollection?.playables ?? []).map((item, idx) => (
            <Box mt={idx && 2} mx={2} key={item.id}>
              <PlaylistSong
                slug={item.slug}
                index={idx + 1}
                artist={item.artist}
                image={item.image}
                title={item.title}
                liked={item.liked}
                isPlaying={player.currentPlayable === item && player.isPlaying}
                animated={isShowing && player.isPlaying}
                showEq={player.currentPlayable === item}
                highlighted={player.currentPlayable === item}
                onLikeClick={() =>
                  likeSong({ variables: { songId: item.id, like: !item.liked } }).then(
                    handleLikeSongResult
                  )
                }
                onPlayClick={() =>
                  player.currentPlayable === item
                    ? player.onPlayClicked()
                    : player.currentCollection &&
                      player.playCollection(player.currentCollection, idx)
                }
                expanded={player.currentPlayable === item}
                hideShare
                showExpandedDownload
                showExpandedGift
              />
            </Box>
          ))}
        </ScrollView>
      </Box>
    </ModalBox>
  );
};
