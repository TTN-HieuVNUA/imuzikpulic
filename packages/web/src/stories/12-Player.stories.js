import { MockedProvider } from '@apollo/react-testing';
import React, { useEffect } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { Box, Button, Flex } from 'rebass';

import { PlayerProvider, PlayerView, usePlayer, WebAdapter } from '../components/Player';

export default {
  title: 'Player',
};
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
    title:
      'Clarity Clarity Clarity Clarity Clarity Clarity Clarity Clarity Clarity Clarity Clarity Clarity Clarity Clarity Clarity ',
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
    <Flex flexDirection="column" height="80vh" justifyContent="space-between">
      <Flex>
        <Button
          onClick={() => {
            player.playCollection({
              name: 'EDM Collection',
              playables: songs,
            });
          }}>
          Play ALl
        </Button>
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
      </Flex>
      <PlayerView />
    </Flex>
  );
};
export const Default = () => (
  <Box bg="defaultBackground" p={5}>
    <PlayerProvider adapter={WebAdapter}>
      <ToastProvider>
        <MockedProvider>
          <Main />
        </MockedProvider>
      </ToastProvider>
    </PlayerProvider>
  </Box>
);
