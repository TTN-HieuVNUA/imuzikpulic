import _ from 'lodash';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { useShareSong } from '../../hooks';
import { NavLink, useAlert, useNavigationLink } from '../../platform/links';
import { Box, Flex, Text } from '../../rebass';
import { Separator } from '../separator';
import { Icon, ICON_GRADIENT_1, IconName } from '../svg-icon';
import { SeekBar } from './PlayerView';
import { usePlayer, usePlayerTime } from './Provider';
import { useMeQuery } from '../../queries';
import { AnimatedEq } from '../Animation';

const MainAction = React.memo(
  (props: { icon: IconName; onPress?: () => void; enabled: boolean; small?: boolean }) => {
    return (
      <Flex px={4} py={1}>
        <TouchableOpacity
          onPress={props.enabled ? props.onPress : undefined}
          disabled={!props.enabled}>
          <Flex flexDirection="column" alignItems="center">
            <Icon
              name={props.icon}
              size={props.small ? 30 : 40}
              color={props.enabled ? 'normalText' : 'lightText'}
            />
          </Flex>
        </TouchableOpacity>
      </Flex>
    );
  }
);

const SmallAction = React.memo(
  (props: { icon: IconName; onPress?: () => void; active?: boolean; disabled?: boolean }) => {
    return (
      <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <Flex flexDirection="column" alignItems="center" p={2}>
          <Icon name={props.icon} size={20} color={props.active ? ICON_GRADIENT_1 : 'normalText'} />
        </Flex>
      </TouchableOpacity>
    );
  }
);

export const formatSongDuration = (d: number) =>
  _.isNumber(d)
    ? `${Math.floor(d / 60) || 0}:${(Math.floor(d % 60) || 0).toFixed(0).padStart(2, '0')}`
    : '--:--';

const CurrentTime = () => {
  const playerTime = usePlayerTime();
  return (
    <Box width="100%" px={2} flexDirection="row" justifyContent="space-between" mb={-1}>
      <Text fontSize={1} color="lightText">
        {formatSongDuration((playerTime.duration ?? 0) * (playerTime.playedRatio ?? 0))}
      </Text>
      <Text fontSize={1} color="lightText">
        {formatSongDuration(playerTime.duration ?? 0)}
      </Text>
    </Box>
  );
};

export const FullScreenPlayerView = (props: {
  liked: boolean;
  onLike?: () => void;
  showing: boolean;
  showEq?: boolean;
  animated?: boolean;
}) => {
  const player = usePlayer();
  const slug = player.currentPlayable?.slug;
  const showGift = useNavigationLink('rbt', { type: 'gift', songSlug: slug });
  const shareAction = useNavigationLink('popup', {
    title: 'Chia sẻ',
    type: 'share',
    songSlug: slug,
  });
  const share = useShareSong(player.currentPlayable?.slug, shareAction);
  const { data: meData } = useMeQuery();
  const showPopupLogin = useAlert({ type: 'requireLogin' });
  const requireLogin = () => {
    showPopupLogin({ content: 'Vui lòng đăng nhập để sử dụng!' });
  };
  if (!player) return null;
  return (
    <Box width="100%" alignItems="center" py={1}>
      <NavLink route={slug ? `/bai-hat/[slug]` : '#'} params={{ slug }}>
        <Box alignItems="center">
          <Box
            borderRadius={8}
            overflow="hidden"
            mb={3}
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.25)"
            position="relative"
            width={240}
            height={240}>
            {player.currentPlayable?.image && (
              <Image
                style={{ width: '100%', height: '100%' }}
                source={{ uri: player.currentPlayable.image }}
              />
            )}
            <Box
              position="absolute"
              width={240}
              height={240}
              alignItems="center"
              justifyContent="center">
              {props.showEq && (
                <Flex ml={1} mr={1} width={100} alignItems="center">
                  <AnimatedEq size={75} animated={props.animated} />
                </Flex>
              )}
            </Box>
          </Box>
          <Text fontSize={3} fontWeight="bold" mb={1}>
            {player.currentPlayable?.title}
          </Text>
          <Text fontSize={2} color="primary">
            {player.currentPlayable?.artist}
          </Text>
        </Box>
      </NavLink>
      <Flex
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        py={1}
        width="100%">
        <SmallAction
          icon={props.liked ? 'heartlove' : 'heart'}
          active={props.liked}
          onPress={props.onLike}
        />
        <SmallAction icon="share" onPress={share} />
        <SmallAction icon="gift" onPress={meData?.me ? showGift : requireLogin} />
        <SmallAction
          icon={player.repeat === 'one' ? 'player-repeat-one' : 'player-repeat'}
          active={!!player.repeat}
          onPress={player.toggleRepeat}
        />
        <SmallAction icon="player-shuffle" active={player.shuffle} onPress={player.toggleShuffle} />
      </Flex>
      <Separator />
      <Flex flexDirection="row" justifyContent="space-around" alignItems="center" pt={4} pb={3}>
        <MainAction
          icon="player-prev"
          small
          onPress={player.onPrevClicked}
          enabled={player.hasPrev}
        />
        {player.isPlaying ? (
          <MainAction
            icon="player-pause"
            onPress={player.onPlayClicked}
            enabled={!!player.currentPlayable}
          />
        ) : (
          <MainAction
            icon="player-play"
            onPress={player.onPlayClicked}
            enabled={player.hasNext || !!player.currentPlayable}
          />
        )}
        <MainAction
          icon="player-next"
          onPress={player.onNextClicked}
          enabled={player.hasNext}
          small
        />
      </Flex>
      {props.showing && (
        <Box width="100%">
          <CurrentTime />
          <Box width="100%" px={2}>
            <SeekBar height={4} />
          </Box>
        </Box>
      )}
    </Box>
  );
};
