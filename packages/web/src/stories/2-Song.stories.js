import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs/react';
import React from 'react';
import { Box } from 'rebass';

import { Song } from '../components/Song';

export default {
  title: 'Song',
  component: Song,
};

export const Default = () => (
  <Box bg="defaultBackground" width={1 / 4} p={5}>
    <Song
      image="https://via.placeholder.com/200"
      title={text('song', 'Shout')}
      artist={text('artist', 'Nguyen Van A')}
      download={12345}
      onPlayClick={action('Play')}
    />
  </Box>
);

export const Long = () => (
  <Box bg="defaultBackground" width={1 / 4} p={5}>
    <Song
      image="https://via.placeholder.com/200"
      title="Really long song name 123456789"
      artist="Really long singer name 12345"
      download={12345}
      onPlayClick={action('Play')}
    />
  </Box>
);
