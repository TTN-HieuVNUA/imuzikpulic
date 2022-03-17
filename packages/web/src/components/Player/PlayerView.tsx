import React, { useCallback, useState } from 'react';
import { Box, Flex, Image, Text } from 'rebass';
import { BackgroundColorProps } from 'styled-system';

import { SongLink } from '../../containers';
import { PlayingList } from '../../containers/PlayingList';
import { useResponseHandler } from '../../hooks';
import { LikeSongMutation, useLikeSongMutation, useNodeQuery } from '../../queries';
import Icon, { IconName } from '../Icon';
import { Section } from '../Section';
import { Artists } from '../Song';
import { usePlayer, usePlayerTime } from './Provider';

const PlayerViewAction = (props: {
  icon: IconName;
  onClick?: () => void;
  active: boolean;
  enabled: boolean;
}) => {
  return (
    <Box
      p={2}
      className={props.enabled ? 'enabled' : ''}
      onClick={props.enabled ? props.onClick : undefined}
      css={{
        '&.enabled:hover': {
          backgroundColor: 'rgba(0,0,0,0.1)',
        },
      }}>
      <Icon
        name={props.icon}
        size={20}
        color={props.active && props.enabled ? 'normalText' : 'lightText'}
      />
    </Box>
  );
};

export const SeekBar = (props: { height?: number; width: number }) => {
  const playerTime = usePlayerTime();
  const player = usePlayer();
  const ref = React.useRef<HTMLDivElement>();
  const onPressSeekBar = useCallback(
    (e: React.MouseEvent) => {
      if (playerTime?.duration) {
        const bound = ref.current.getBoundingClientRect();
        player?.onSeek((e.clientX - bound.left) / props.width);
      }
    },
    [player, playerTime, props.width]
  );
  const height = props.height ?? 4;

  return (
    <Flex pb={2} pt={4} onClick={onPressSeekBar} width={props.width} ref={ref}>
      <Flex css={{ position: 'relative', height: 14 }} alignItems="center" width="100%">
        <Box
          height={height}
          css={{
            borderRadius: height / 2,
            position: 'relative',
          }}
          bg={playerTime?.isLoading ? 'primary' : 'playerSeekBar'}
          className={playerTime?.isLoading ? "play-bar-loading" : ""}
          overflow="hidden"
          my={2}
          width="100%">
          <Box
            height={height}
            css={{ position: 'absolute' }}
            style={{ width: `${(playerTime?.playedRatio ?? 0) * 100}%` }}
            bg={playerTime?.duration ? 'secondary' : 'transparent'}
          />
        </Box>
        <Box
          height={14}
          width={14}
          overflow="hidden"
          css={{
            borderRadius: 7,
            position: 'absolute',
            top: 0,
          }}
          style={{ left: `${(playerTime?.playedRatio ?? 0) * 100}%`, marginLeft: -7 }}
          bg={playerTime?.duration ? 'playerCue' : 'transparent'}
        />
      </Flex>
    </Flex>
  );
};

export const formatSongDuration = (d: number) =>
  `${Math.floor(d / 60)}:${Math.floor(d % 60)
    .toFixed(0)
    .padStart(2, '0')}`;

const CurrentTime = () => {
  const playerTime = usePlayerTime();
  return (
    <Flex width="100%" flexDirection="row" justifyContent="space-between" mb={-1}>
      <Text fontSize={2} color="lightText">
        {(playerTime?.duration ?? 0) > 0 ? (formatSongDuration((playerTime?.duration ?? 0) * (playerTime?.playedRatio ?? 0))) : '0:00'}
      </Text>
      <Text fontSize={2} color="lightText">
        {(playerTime?.duration ?? 0) > 0 ? formatSongDuration(playerTime?.duration) : '0:00'}
      </Text>
    </Flex>
  );
};
export const PlayerView = (props: {
  onPlaylistClick?: () => void;
  onGiftClick?: () => void;
  onShareClick?: () => void;
}) => {
  const player = usePlayer();
  const [showPlaylist, setShowPlaylist] = useState(false);
  const togglePlaylist = useCallback(() => {
    setShowPlaylist(!showPlaylist);
  }, [showPlaylist]);
  const { data } = useNodeQuery({ variables: { id: player?.currentPlayable?.id ?? '' } });
  const song = data?.node?.__typename === 'Song' ? data.node : null;
  const [likeSong] = useLikeSongMutation();
  const handleLikeSongRes = useResponseHandler<LikeSongMutation>((res) => res.data?.likeSong);
  const toggleLike = useCallback(() => {
    if (song) {
      likeSong({ variables: { songId: song.id, like: !song.liked } }).then(handleLikeSongRes);
    }
  }, [handleLikeSongRes, likeSong, song]);

  if (!(player?.hasNext || player?.hasPrev || player?.currentPlayable)) return null;
  const height = 70;
  return (
    <Box css={{ position: 'relative' }} width="100%">
      <Box
        css={{
          position: 'absolute',
          bottom: showPlaylist ? height : '-100vh',
          right: 0,
          left: 0,
          transition: 'bottom ease-in 500ms',
        }}>
        <Section>
          <PlayingList close={() => setShowPlaylist(false)} />
        </Section>
      </Box>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        bg="playerBackground"
        height={height}
        css={{ position: 'relative' }}>
        <Flex alignItems="center" flexDirection="row" mr={2}>
          <PlayerViewAction
            icon="player-prev"
            active
            onClick={player.onPrevClicked}
            enabled={player.hasPrev}
          />
          {player.isPlaying ? (
            <PlayerViewAction
              active
              icon="player-pause"
              onClick={player.onPlayClicked}
              enabled={!!player.currentPlayable}
            />
          ) : (
            <PlayerViewAction
              active
              icon="player-play"
              onClick={player.onPlayClicked}
              enabled={player.hasNext || !!player.currentPlayable}
            />
          )}
          <PlayerViewAction
            active
            icon="player-next"
            onClick={player.onNextClicked}
            enabled={player.hasNext}
          />
          <PlayerViewAction
            active={!!player.repeat}
            icon={player.repeat === 'one' ? 'player-repeat-one' : 'player-repeat'}
            onClick={player.toggleRepeat}
            enabled
          />
          <PlayerViewAction
            active={player.shuffle}
            icon="player-shuffle"
            onClick={player.toggleShuffle}
            enabled
          />
        </Flex>
        <Box css={{ position: 'relative' }}>
          <Box css={{ position: 'absolute', bottom: 34, left: 0, right: 0 }}>
            <CurrentTime />
          </Box>
          <SeekBar width={325} />
        </Box>
        <Flex flex={1} alignItems="center" flexDirection="row" ml={7}>
          <Flex
            bg="#C4C4C4"
            overflow="hidden"
            // position="relative"
            // borderRadius={20}
            justifyContent="center"
            alignItems="center">
            <Image src={player.currentPlayable?.image ?? ''} width={48} height={48} />
          </Flex>
          <Flex flexDirection="column" ml={2} flex={1}>
            <Text
              color="normalText"
              fontWeight="bold"
              fontSize={2}
              css={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}>
              {song ? (
                <SongLink slug={song.slug}>{song.name}</SongLink>
              ) : (
                player.currentPlayable?.title
              )}
            </Text>
            <Text
              color="lightText"
              fontSize={1}
              css={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}>
              {song ? <Artists artist={song.singers} /> : player.currentPlayable?.artist}
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems="center" flexDirection="row" mr={2}>
          <PlayerViewAction icon="share" active onClick={props.onShareClick} enabled />
          <PlayerViewAction icon="gift" active onClick={props.onGiftClick} enabled />
          <PlayerViewAction
            icon={song?.liked ? 'heart-full' : 'heart'}
            active
            onClick={toggleLike}
            enabled
          />
          <PlayerViewAction icon="playlist" active enabled onClick={togglePlaylist} />
        </Flex>
      </Flex>
    </Box>
  );
};

export const PlayerViewPadding = (props: BackgroundColorProps) => {
  const player = usePlayer();
  if (!(player?.hasNext || player?.hasPrev || player?.currentPlayable)) return null;
  return <Box height={70} {...props} />;
};
