import { storiesOf } from '@storybook/react-native';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';

import { FullScreenPlayerView, PlayerProvider, usePlayer, WebAdapter } from '../../src/components';
import { PlayAllButton } from '../../src/containers';
import { Box, Button, Flex } from '../../src/rebass';
import { darkTheme } from '../../src/themes';
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
      <FullScreenPlayerView />
    </Flex>
  );
};

storiesOf('FullScreenPlayer', module)
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
        </PlayerProvider>
      </Box>
    </ThemeProvider>
  ));
