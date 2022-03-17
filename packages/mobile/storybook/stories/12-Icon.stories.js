import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { Icon, ICON_GRADIENT_1 } from '../../src/components';
import { Box, Flex, Text } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';

const allIcons = [
  'play',
  'download-tune',
  'gift',
  'heart',
  'download',
  'tune',
  'up',
  'search',
  'notification',
  'share',
  'playlist-add',
  'play-next',
  'comment',
  'money',
  'calendar',
  'player-play',
  'player-prev',
  'player-next',
  'player-pause',
  'player-shuffle',
  'player-repeat',
  'caret-down',
  'tunes',
  'album',
  'tune-group',
  'night',
  'home',
  'featured',
  'user',
  'plus',
  'info',
  'cross',
  'address-book',
  'pen',
  'ellipsis-v',
  'round',
  'check',
  'tick',
  'caret-down-bold',
  'car-music',
  'playlist',
  'back',
].map((i) => (
  <Box width={1 / 3} key={i} p={1}>
    <Text>{i}</Text>
    <Flex flexDirection="row" width="100%" justifyContent="space-around">
      <Icon name={i} size={24} />
      <Icon name={i} size={24} color={ICON_GRADIENT_1} />
    </Flex>
  </Box>
));
storiesOf('Icon', module)
  .add('Dark', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" px={3} flexDirection="row" flexWrap="wrap">
        {allIcons}
      </Box>
    </ThemeProvider>
  ))
  .add('Light', () => (
    <ThemeProvider theme={lightTheme}>
      <Box bg="defaultBackground" px={3} flexDirection="row" flexWrap="wrap">
        {allIcons}
      </Box>
    </ThemeProvider>
  ));
