import { useTheme } from 'emotion-theming';
import * as _ from 'lodash';
import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text } from 'rebass';
import { SongLink } from '../containers';
import { Theme } from '../themes';
import Icon, { IconColor, IconName } from './Icon';

interface BasicSongProps {
  slug?: string | null;
  image?: string | null;
  title: string;
  artist?: { id: string; name?: string | null; slug?: string | null }[];
  download?: number | null;
}

export const Artists = (props: {
  artist?: { id: string; alias?: string | null; slug?: string | null }[];
}) => (
  <>
    {_.flatMap(props.artist ?? [], (a, idx) => [
      ...(idx === 0 ? [] : [' - ']),
      <Link to={`/ca-sy/${a.slug}`} key={a.id}>
        {a.alias}
      </Link>,
    ])}
  </>
);

interface ChartSongProps extends BasicSongProps {
  index?: number;
  liked?: boolean | null;
  compact?: boolean;
  onLikeClick?: () => void;
  onGiftClick?: () => void;
  onDownloadClick?: () => void;
  onPlayClick?: () => void;
  onShareClick?: () => void;
  showShare?: boolean;
}

function formatDownload(d: number) {
  return d > 1000 ? `${Math.floor(d / 1000)}K` : d;
}

const ChartSongAction = (props: {
  icon: IconName;
  iconColor?: IconColor;
  title: string;
  compact?: boolean;
  onClick?: () => void;
}) => {
  const theme = useTheme<Theme>();

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      onClick={props.onClick}
      p={props.compact ? 1 : 3}
      css={{
        cursor: 'pointer',
        '.icon svg path': {
          fill: theme.colors.normalText,
        },
        '&:hover': {
          '.icon svg path': {
            fill: theme.colors.primary,
          },
          '> *': {
            color: `${theme.colors.primary} `,
          },
        },
      }}>
      <Icon name={props.icon} className="icon" color={props.iconColor} size={25} />
      {!props.compact && (
        <Text color="normalText" fontWeight="bold" fontSize={2} mt={1}>
          {props.title}
        </Text>
      )}
    </Flex>
  );
};

export const ChartSong = (props: ChartSongProps) => {
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      css={{
        height: 140,
        '&:hover .actions': {
          visibility: 'visible',
        },
        '.actions': {
          visibility: props.compact ? 'hidden' : 'visible',
        },
      }}>
      {props.index && (
        <Text fontWeight="bold" fontSize={6} ml={2} color="normalText" width={40}>
          {props.index}
        </Text>
      )}
      <Flex flex={1} alignItems={props.compact ? 'flex-start' : 'center'}>
        <Flex
          mx={3}
          css={{
            height: 100,
            width: 100,
            backgroundSize: 'cover',
            backgroundColor: '#C4C4C4',
          }}
          style={{
            backgroundImage: `url(${props.image})`,
          }}
          justifyContent="center"
          alignItems="center"
          onClick={props.onPlayClick}>
          <Icon name="play" color="white" size={45} />
        </Flex>
        <Flex flexDirection="column" mx={3}>
          <SongLink slug={props.slug}>
            <Text color="normalText" fontSize={4} mb={1} fontWeight="bold">
              {props.title}
            </Text>
          </SongLink>
          <Text color="lightText" fontSize={3} mb={1}>
            <Artists artist={props.artist} />
          </Text>
          {/* {!!props.download && ( */}
            <Flex flexDirection="row" alignItems="center">
              <Icon size={10} name="download" />
              <Text color="lightText" fontSize={2} pl="3px">
                {formatDownload(props.download ?? 0)}
              </Text>
            </Flex>
          {/* )} */}
        </Flex>
      </Flex>

      <Flex
        px={3}
        alignItems="flex-end"
        flexDirection={props.compact ? 'column' : 'row'}
        className="actions">
        <ChartSongAction
          icon="download-tune"
          title="Tải nhạc"
          compact={props.compact}
          onClick={props.onDownloadClick}
        />
        {props.showShare && (
          <ChartSongAction
            icon="share"
            title="Chia sẻ"
            compact={props.compact}
            onClick={props.onShareClick}
          />
        )}
        <ChartSongAction
          icon="gift"
          title=" Tặng quà"
          compact={props.compact}
          onClick={props.onGiftClick}
        />
        {/* {!props.showShare && ( */}
          <ChartSongAction
            icon={props.liked ? 'heart-full' : 'heart'}
            title=" Yêu thích"
            compact={props.compact}
            onClick={props.onLikeClick}
          />
        {/* )} */}
      </Flex>
    </Flex>
  );
};

interface SongProps extends BasicSongProps {
  onPlayClick?: () => void;
}
export const Song = (props: SongProps) => {
  return (
    <Flex flexDirection="column">
      <Flex
        css={{
          height: 150,
          width: '100%',
          backgroundSize: 'cover',
          backgroundColor: '#C4C4C4',
          backgroundPosition: 'center',
          position: 'relative',
        }}
        style={{
          backgroundImage: `url(${props.image})`,
        }}
        justifyContent="center"
        alignItems="center"
        onClick={props.onPlayClick}>
        <Icon name="play" color="white" size={45} />
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          flexDirection="row"
          css={{
            position: 'absolute',
            right: 0,
            top: 0,
            padding: '3px 7px 3px 42px',
            background: 'linear-gradient(270deg, #404040 0%, rgba(196, 196, 196, 0) 97.83%)',
          }}>
          <Icon name="download" size={10} />
          <Text color="white" fontSize={2} pl="3px">
            {formatDownload(props.download ?? 0)}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <SongLink slug={props.slug}>
          <Text
            color="normalText"
            fontSize={4}
            my={1}
            fontWeight="bold"
            css={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}>
            {props.title}
          </Text>
        </SongLink>
        <Text color="lightText" fontSize={3} mb={1}>
          <Artists artist={props.artist} />
        </Text>
      </Flex>
    </Flex>
  );
};

interface SongBigProps extends BasicSongProps {
  genres: { id: string; name?: string | null; slug?: string | null }[];
  liked?: boolean;
  onLikeClick?: () => void;
  onShareClick?: () => void;
  onAddToPlaylistClick?: () => void;
  onPlayNextClick?: () => void;
  onCommentClick?: () => void;
  onPlayClick?: () => void;
}

const Genres = (props: {
  genres: { id: string; name?: string | null; slug?: string | null }[];
}) => (
  <>
    {_.flatMap(props.genres, (g, idx) => [
      ...(idx === 0 ? [] : ['/']),
      <Link to={`/the-loai/${g.slug}`} key={g.id}>
        {g.name}
      </Link>,
    ])}
  </>
);

const SongBigActionItem = (
  props: PropsWithChildren<{ icon: IconName; iconColor?: IconColor; onClick?: () => void }>
) => {
  const theme = useTheme<Theme>();
  return (
    <Flex
      alignItems="center"
      py={3}
      onClick={props.onClick}
      css={{
        cursor: 'pointer',
        '&:hover *': {
          color: theme.colors.primary,
          path: {
            fill: theme.colors.primary,
          },
        },
      }}>
      <Icon name={props.icon} size={16} color={props.iconColor} />
      <Text color="normalText" fontSize={2} ml={1} mr={3} fontWeight="bold">
        {props.children}
      </Text>
    </Flex>
  );
};
export const SongBig = (props: SongBigProps) => {
  return (
    <Flex
      bg="alternativeBackground"
      py={6}
      px={68}
      css={{
        borderRadius: 8,
      }}>
      <Flex
        mr={6}
        css={{
          height: 250,
          width: 250,
          backgroundSize: 'cover',
          backgroundColor: '#C4C4C4',
          boxShadow: '0px 0px 20px #000000',
          borderRadius: 5,
          overflow: 'hidden',
        }}
        style={{
          backgroundImage: `url(${props.image})`,
        }}
        justifyContent="center"
        alignItems="center"
        onClick={props.onPlayClick}>
        <Icon name="play" color="white" size={45} />
      </Flex>
      <Flex flexDirection="column" flex={1}>
        <Flex flexDirection="column" flex={1} justifyContent="center">
          <Text
            color="primary"
            fontSize={5}
            my={1}
            fontWeight="bold"
            css={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}>
            {props.title}
          </Text>
          <Text color="primary" fontSize={3} my={1}>
            <Artists artist={props.artist} />
          </Text>
          <Text color="normalText" fontSize={3} my={1}>
            <Genres genres={props.genres} />
          </Text>
        </Flex>
        <Box
          css={{
            width: '100%',
            height: 1,
            backgroundColor: '#434344',
          }}
        />
        <Flex justifyContent="space-between" mt={5}>
          <SongBigActionItem
            onClick={props.onLikeClick}
            icon={props.liked ? 'heart-full' : 'heart'}>
            Yêu thích
          </SongBigActionItem>
          <SongBigActionItem icon="share" onClick={props.onShareClick}>
            Chia sẻ
          </SongBigActionItem>
          <SongBigActionItem icon="playlist-add" onClick={props.onAddToPlaylistClick}>
            Thêm danh sách phát
          </SongBigActionItem>
          <SongBigActionItem icon="play-next" onClick={props.onPlayNextClick}>
            Phát tiếp theo
          </SongBigActionItem>
          <SongBigActionItem icon="comment" onClick={props.onCommentClick}>
            Bình luận
          </SongBigActionItem>
        </Flex>
      </Flex>
    </Flex>
  );
};

export interface PlaylistSongProps extends BasicSongProps {
  duration?: number | null;
  isPlaying?: boolean;
  onShareClick?: () => void;
  onGiftClick?: () => void;
  onDownloadClick?: () => void;
  onPlayClick?: () => void;
}
const PlaylistSongAction = (props: { icon: IconName; title: string; onClick?: () => void }) => {
  const theme = useTheme<Theme>();

  return (
    <Flex
      alignItems="center"
      px={3}
      onClick={props.onClick}
      css={{
        cursor: 'pointer',
        '.icon svg path': {
          fill: 'url(#paint0_linear)',
        },
        '&:hover': {
          '.icon svg path': {
            fill: theme.colors.primary,
          },
          '> *': {
            color: `${theme.colors.primary} `,
          },
        },
      }}>
      <Icon name={props.icon} className="icon" size={15} />
      <Text color="normalText" fontWeight="bold" fontSize={2} ml={2}>
        {props.title}
      </Text>
    </Flex>
  );
};

const formatDuration = (d: number) =>
  `${Math.floor(d / 60)
    .toFixed(0)
    .padStart(2, '0')}:${(d % 60).toFixed(0).padStart(2, '0')}`;

export const PlaylistSong = (props: PlaylistSongProps) => {
  return (
    <Flex
      py={3}
      px={3}
      css={{
        '&:hover': {
          background: '#161615',
        },
      }}>
      <Flex
        mr={5}
        css={{
          height: 55,
          width: 55,
          backgroundSize: 'cover',
          backgroundColor: '#C4C4C4',
        }}
        style={{
          backgroundImage: `url(${props.image})`,
        }}
        justifyContent="center"
        alignItems="center"
        onClick={props.onPlayClick}>
        <Icon name={props.isPlaying ? 'player-pause' : 'player-play'} size={24} />
      </Flex>
      <Flex flexDirection="column" flex={1} justifyContent="center">
        <Text
          color="normalText"
          fontSize={3}
          fontWeight="bold"
          css={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}>
          {props.title}
        </Text>
        <Text color="lightText" fontSize={2}>
          <Artists artist={props.artist} />
        </Text>
      </Flex>
      <Flex flexDirection="column" justifyContent="center">
        <Text color="lightText" fontSize={3} px={5}>
          {props.duration && formatDuration(props.duration)}
        </Text>
      </Flex>
      <Flex>
        <PlaylistSongAction icon="download-tune" title="Cài đặt" onClick={props.onDownloadClick} />
        <PlaylistSongAction icon="gift" title="Tặng quà" onClick={props.onGiftClick} />
        <PlaylistSongAction icon="share" title="Chia sẻ" onClick={props.onShareClick} />
      </Flex>
    </Flex>
  );
};
