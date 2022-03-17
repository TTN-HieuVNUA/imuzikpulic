import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { PlaylistSong } from '../../src/components';
import { Box, Flex } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';
import { reactNavigationDecorator } from '../decorators';

storiesOf('PlaylistSong', module)
  .addDecorator(reactNavigationDecorator)
  .add('Dark', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" p={2}>
        <PlaylistSong
          index={5}
          image="https://via.placeholder.com/40"
          title="Shout"
          artist="Nguyen Van A"
          download={12345}
          liked
          onDownloadClick={action('Download')}
          onGiftClick={action('Gift')}
          onLikeClick={action('Like')}
        />
        <Box height={10} />
        <PlaylistSong
          index={5}
          image="https://via.placeholder.com/40"
          title="Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text"
          artist="Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text"
          download={12345}
          isPlaying
          expanded
          showEq
          highlighted
          onDownloadClick={action('Download')}
          onGiftClick={action('Gift')}
          onLikeClick={action('Like')}
        />
        <Box height={10} />
        <PlaylistSong
          index={15}
          image="https://via.placeholder.com/40"
          title="Shout"
          artist="Nguyen Van A"
          liked
          onDownloadClick={action('Download')}
          onGiftClick={action('Gift')}
          onLikeClick={action('Like')}
        />
      </Box>
    </ThemeProvider>
  ))
  .add('Light', () => (
    <ThemeProvider theme={lightTheme}>
      <Box bg="defaultBackground" p={2}>
        <Flex flexDirection="column">
          <PlaylistSong
            index={5}
            image="https://via.placeholder.com/40"
            title="Shout"
            artist="Nguyen Van A"
            download={12345}
            liked
            onDownloadClick={action('Download')}
            onGiftClick={action('Gift')}
            onLikeClick={action('Like')}
          />
          <Box height={10} />
          <PlaylistSong
            index={15}
            image="https://via.placeholder.com/40"
            title="Shout"
            artist="Nguyen Van A"
            download={12345}
            liked
            onDownloadClick={action('Download')}
            onGiftClick={action('Gift')}
            onLikeClick={action('Like')}
          />
          <Box height={10} />
          <PlaylistSong
            image="https://via.placeholder.com/40"
            title="Shout"
            artist="Nguyen Van A"
            download={12345}
            liked
            onDownloadClick={action('Download')}
            onGiftClick={action('Gift')}
            onLikeClick={action('Like')}
          />
        </Flex>
      </Box>
    </ThemeProvider>
  ));
