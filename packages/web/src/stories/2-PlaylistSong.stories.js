import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs/react';
import React from 'react';
import { Box, Flex } from 'rebass';

import { PlaylistSong } from '../components/Song';

export default {
  title: 'PlaylistSong',
  component: PlaylistSong,
};

export const Default = () => (
  <Flex bg="black" p={5} flexDirection="column">
    <PlaylistSong
      image="https://via.placeholder.com/55"
      title="Lối Nhỏ"
      artist="Đen ft. Phương Anh Đào"
      genre="Rap/R&B"
      download={12345}
      duration={182}
      onPlayClick={action('Play')}
      onDownloadClick={action('Download')}
      onGiftClick={action('Gift')}
      onShareClick={action('Share')}
    />
    <PlaylistSong
      image="https://via.placeholder.com/55"
      title="Lối Nhỏ"
      artist="Đen ft. Phương Anh Đào"
      genre="Rap/R&B"
      isPlaying
      download={12345}
      duration={182}
      onPlayClick={action('Play')}
      onDownloadClick={action('Download')}
      onGiftClick={action('Gift')}
      onShareClick={action('Share')}
    />
    <PlaylistSong
      image="https://via.placeholder.com/55"
      title="Lối Nhỏ"
      artist="Đen ft. Phương Anh Đào"
      genre="Rap/R&B"
      download={12345}
      duration={182}
      onPlayClick={action('Play')}
      onDownloadClick={action('Download')}
      onGiftClick={action('Gift')}
      onShareClick={action('Share')}
    />
  </Flex>
);

export const Long = () => (
  <Box bg="defaultBackground" p={5}>
    <PlaylistSong
      image="https://via.placeholder.com/55"
      title="Really long PlaylistSong name 123456789"
      artist="Really long singer name 12345"
      genre="Rap/R&B"
      duration={number('duration', 12345)}
      onPlayClick={action('Play')}
      onLikeClick={action('Like')}
      onShareClick={action('Share')}
      onAddToPlaylistClick={action('AddToPlaylist')}
      onPlayNextClick={action('PlayNext')}
      onCommentClick={action('Comment')}
    />
  </Box>
);
