import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { ChartSong, Section2 } from '../../src/components';
import { Box, Flex } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';
import { reactNavigationDecorator } from '../decorators';

storiesOf('ChartSong', module)
  .addDecorator(reactNavigationDecorator)
  .add('Dark', () => (
    <ThemeProvider theme={darkTheme}>
      <Section2 bg="defaultBackground">
        <ChartSong
          index={5}
          image="https://via.placeholder.com/200"
          title="Shout"
          artist="Nguyen Van A"
          download={12345}
          liked
          onDownloadClick={action('Download')}
          onGiftClick={action('Gift')}
          onLikeClick={action('Like')}
        />
        <Box height={10} />
        <ChartSong
          index={5}
          image="https://via.placeholder.com/200"
          title="Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text"
          artist="Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text"
          download={12345}
          liked
          onDownloadClick={action('Download')}
          onGiftClick={action('Gift')}
          onLikeClick={action('Like')}
        />
        <Box height={10} />
        <ChartSong
          index={5}
          image="https://via.placeholder.com/200"
          title="Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text"
          artist="Long Text Long"
          liked
          onDownloadClick={action('Download')}
          onGiftClick={action('Gift')}
          onLikeClick={action('Like')}
        />
        <Box height={10} />
        <ChartSong
          image="https://via.placeholder.com/200"
          title="Shout"
          artist="Nguyen Van A"
          download={12345}
          liked
          onDownloadClick={action('Download')}
          onGiftClick={action('Gift')}
          onLikeClick={action('Like')}
        />
      </Section2>
    </ThemeProvider>
  ))
  .add('Light', () => (
    <ThemeProvider theme={lightTheme}>
      <Box bg="defaultBackground" p={2}>
        <Flex flexDirection="column">
          <ChartSong
            index={5}
            image="https://via.placeholder.com/200"
            title="Shout"
            artist="Nguyen Van A"
            download={12345}
            liked
            onDownloadClick={action('Download')}
            onGiftClick={action('Gift')}
            onLikeClick={action('Like')}
          />
          <Box height={10} />
          <ChartSong
            index={15}
            image="https://via.placeholder.com/200"
            title="Shout"
            artist="Nguyen Van A"
            download={12345}
            liked
            onDownloadClick={action('Download')}
            onGiftClick={action('Gift')}
            onLikeClick={action('Like')}
          />
          <Box height={10} />
          <ChartSong
            image="https://via.placeholder.com/200"
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
