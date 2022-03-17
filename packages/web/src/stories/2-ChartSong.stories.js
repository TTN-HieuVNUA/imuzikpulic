import { action } from '@storybook/addon-actions';
import React from 'react';
import { Box } from 'rebass';

import { ChartSong } from '../components/Song';

export default {
  title: 'ChartSong',
  component: ChartSong,
};

export const Full = () => (
  <Box bg="defaultBackground">
    <ChartSong
      index={5}
      image="https://via.placeholder.com/200"
      title="Shout"
      artist="Nguyen Van A"
      download={12345}
      liked={true}
      onDownloadClick={action('Download')}
      onGiftClick={action('Gift')}
      onLikeClick={action('Like')}
    />
  </Box>
);
export const Compact = () => (
  <Box bg="defaultBackground">
    <ChartSong
      index={5}
      image="https://via.placeholder.com/200"
      title="Shout"
      artist="Nguyen Van A"
      download={12345}
      liked={true}
      compact
      onDownloadClick={action('Download')}
      onGiftClick={action('Gift')}
      onLikeClick={action('Like')}
    />
  </Box>
);
