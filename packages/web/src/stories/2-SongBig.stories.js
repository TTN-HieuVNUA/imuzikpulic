import { action } from '@storybook/addon-actions';
import React from 'react';
import { Box } from 'rebass';

import { SongBig } from '../components/Song';

export default {
  title: 'SongBig',
  component: SongBig,
};

export const Default = () => (
  <Box bg="defaultBackground" p={5}>
    <SongBig
      image="https://via.placeholder.com/250"
      title="Lối Nhỏ"
      artist="Đen ft. Phương Anh Đào"
      genre="Rap/R&B"
      download={12345}
      onPlayClick={action('Play')}
      onLikeClick={action('Like')}
      onShareClick={action('Share')}
      onAddToPlaylistClick={action('AddToPlaylist')}
      onPlayNextClick={action('PlayNext')}
      onCommentClick={action('Comment')}
    />
  </Box>
);

export const Long = () => (
  <Box bg="defaultBackground" p={5}>
    <SongBig
      image="https://via.placeholder.com/250"
      title="Really long songBig name 123456789"
      artist="Really long singer name 12345"
      genre="Rap/R&B"
      download={12345}
      onPlayClick={action('Play')}
      onLikeClick={action('Like')}
      onShareClick={action('Share')}
      onAddToPlaylistClick={action('AddToPlaylist')}
      onPlayNextClick={action('PlayNext')}
      onCommentClick={action('Comment')}
    />
  </Box>
);
