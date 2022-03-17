import { storiesOf } from '@storybook/react-native';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';

import {
  H2,
  MobileAdapter,
  PlayerProvider,
  PlayerView,
  PlayerViewPadding,
  usePlayer,
  WebAdapter,
} from '../../src/components';
import { PlayAllButton } from '../../src/containers';
import { Box, Button, Flex } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';
import { reactNavigationDecorator } from '../decorators';

const songs = [
  {
    title: 'Middle',
    artist: 'Zedd',
    image: 'https://via.placeholder.com/200',
    sources: ['http://imedia.imuzik.com.vn/media2/ringbacktones/601/857/0/0000/0009/537.mp3'],
  },
  {
    title: 'EDM',
    artist: 'Mua Quat',
    image: 'https://via.placeholder.com/200',
    sources: ['http://goldfirestudios.com/proj/howlerjs/sound.ogg'],
  },
  {
    title: 'Clarity',
    artist: 'Zedd',
    image: 'https://via.placeholder.com/200',
    sources: ['http://imedia.imuzik.com.vn/media1/ringbacktones/601/636/0/0000/0005/769.mp3'],
  },
];

const Main = (props) => {
  const player = usePlayer();
  useEffect(() => {
    if (props.playCollection) {
      player.playCollection({
        name: 'EDM Collection',
        playables: songs,
      });
    }
  }, [props.playCollection]);
  return (
    <Flex>
      <PlayAllButton
        collection={{
          name: 'EDM Collection',
          playables: songs,
        }}
      />
      <Button
        p={3}
        onClick={() => {
          player.play(songs[0]);
        }}>
        playMiddle
      </Button>
      <Button
        p={3}
        onClick={() => {
          player.addPlayable(songs[0]);
        }}>
        add Middle
      </Button>
      <Button
        p={3}
        onClick={() => {
          player.addPlayableNext(songs[0]);
        }}>
        add Middle next
      </Button>
      <Button
        p={3}
        onClick={() => {
          player.addPlayable(songs[1]);
        }}>
        add EDM
      </Button>
      <Button
        p={3}
        onClick={() => {
          player.addPlayableNext(songs[1]);
        }}>
        add EDM next
      </Button>
      <Button
        p={3}
        onClick={() => {
          player.addPlayable(songs[2]);
        }}>
        addClarity
      </Button>
      <Button
        p={3}
        onClick={() => {
          player.addPlayableNext(songs[2]);
        }}>
        add Clarity next
      </Button>
      <PlayerView />
    </Flex>
  );
};

storiesOf('Player', module)
  .addDecorator(reactNavigationDecorator)
  .add('Dark', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" pt={3}>
        <PlayerProvider adapter={WebAdapter}>
          <Main />
        </PlayerProvider>
      </Box>
    </ThemeProvider>
  ))

  .add('DarkAutoPlay', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" pt={3}>
        <PlayerProvider adapter={WebAdapter}>
          <Main playCollection />
          <PlayerViewPadding />
        </PlayerProvider>
      </Box>
    </ThemeProvider>
  ))
  .add('DarkAutoPlay Mobile', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" pt={3}>
        <PlayerProvider adapter={MobileAdapter}>
          <Main playCollection />
          <PlayerViewPadding />
        </PlayerProvider>
      </Box>
    </ThemeProvider>
  ))
  // .add('WapTabBar', () => (
  //   <ThemeProvider theme={darkTheme}>
  //     <Box bg="defaultBackground" pt={3}>
  //       <PlayerProvider adapter={WebAdapter}>
  //         <Main playCollection />
  //         <WapTabBar url="/" />
  //         <WapTabBar.Padding />>
  //       </PlayerProvider>
  //     </Box>
  //   </ThemeProvider>
  // ))
  .add('Light', () => (
    <ThemeProvider theme={lightTheme}>
      <Box bg="defaultBackground" pt={3}>
        <H2>Ichart</H2>
      </Box>
    </ThemeProvider>
  ));
