import { fireEvent, render } from '@testing-library/react-native';
import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { act } from 'react-test-renderer';

import {
  NativePlayerAdapter,
  NativePlayerAdapterControl,
  Playable,
  PlayerProvider,
  RepeatType,
  usePlayer,
} from './Provider';

const songs = [
  {
    id: '1',
    title: 'Middle',
    artist: 'Zedd',
    image: 'https://via.placeholder.com/200',
    sources: ['http://imedia.imuzik.com.vn/media2/ringbacktones/601/857/0/0000/0009/537.mp3'],
  },
  {
    id: '2',
    title: 'EDM',
    artist: 'Mua Quat',
    image: 'https://via.placeholder.com/200',
    sources: ['http://goldfirestudios.com/proj/howlerjs/sound.ogg'],
  },
  {
    id: '3',
    title: 'Clarity',
    artist: 'Zedd',
    image: 'https://via.placeholder.com/200',
    sources: ['http://imedia.imuzik.com.vn/media1/ringbacktones/601/636/0/0000/0005/769.mp3'],
  },
];

const Buttons = (props: { playable: Playable; name: string }) => {
  const player = usePlayer();
  return (
    <View>
      <Button
        title=""
        onPress={() => player.addPlayable(props.playable)}
        testID={`add${props.name}`}
      />
      <Button
        title=""
        onPress={() => player.addPlayableNext(props.playable)}
        testID={`addNext${props.name}`}
      />
      <Button title="" onPress={() => player.play(props.playable)} testID={`play${props.name}`} />
    </View>
  );
};

const TestView = (props: { shuffle: boolean; repeat: RepeatType }) => {
  const player = usePlayer();
  useEffect(() => {
    if (player.repeat !== props.repeat) player.toggleRepeat();
    if (player.shuffle !== props.shuffle) player.toggleShuffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.repeat, player.shuffle]);
  return (
    <View>
      <Text testID="text">{player.currentPlayable?.title}</Text>
      <Button testID="next" onPress={() => player.onNextClicked()} title="" />
      <Button testID="play" onPress={() => player.onPlayClicked()} title="" />
      <Button testID="prev" onPress={() => player.onPrevClicked()} title="" />
      <Button
        testID="playCollection"
        onPress={() =>
          player.playCollection({
            name: 'EDM Collection',
            playable: songs,
          })
        }
        title=""
      />
      <Button
        testID="playCollection1"
        onPress={() =>
          player.playCollection(
            {
              name: 'EDM Collection',
              playables: songs,
            },
            1
          )
        }
        title=""
      />
    </View>
  );
};

const controlMock: NativePlayerAdapterControl = {
  play: jest.fn(),
  seek: jest.fn(),
};

const MockAdapter: NativePlayerAdapter = (props) => {
  // const player = usePlayer();
  useEffect(() => {
    props.controlRef.current = {
      play(sources, fromBeginning) {
        controlMock.play(sources, fromBeginning);
        if (fromBeginning) {
          props.onProgress?.({ currentTime: 0, duration: 20, isPlaying: true, isLoading: false });
        }
      },
      seek() {},
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <Button
        testID="fewSec"
        onPress={() =>
          props.onProgress?.({
            currentTime: 5,
            duration: 10,
            isPlaying: true,
            isLoading: false,
          })
        }
        title=""
      />
      <Button
        testID="started"
        onPress={() =>
          props.onProgress?.({
            currentTime: 0,
            duration: 10,
            isPlaying: true,
            isLoading: false,
          })
        }
        title=""
      />
      <Button testID="ended" onPress={() => props.onEnded()} title="" />
    </View>
  );
};

const renderPlayer = (repeat: RepeatType = false, shuffle: boolean = false) => {
  const { getByTestId } = render(
    <PlayerProvider adapter={MockAdapter}>
      <Buttons playable={songs[0]} name="0" />
      <Buttons playable={songs[1]} name="1" />
      <Buttons playable={songs[2]} name="2" />
      <TestView repeat={repeat} shuffle={shuffle} />
    </PlayerProvider>
  );
  return {
    addSong(i: number) {
      act(() => {
        fireEvent.press(getByTestId(`add${i}`));
      });
    },
    play(i: number) {
      act(() => {
        fireEvent.press(getByTestId(`play${i}`));
      });
    },
    playCollection() {
      act(() => {
        fireEvent.press(getByTestId(`playCollection`));
      });
    },
    playCollectionFromSecond() {
      act(() => {
        fireEvent.press(getByTestId(`playCollection1`));
      });
    },
    addSongNext(i: number) {
      act(() => {
        fireEvent.press(getByTestId(`addNext${i}`));
      });
    },
    currentSongTitle() {
      return getByTestId('text').children[0];
    },
    next() {
      act(() => {
        fireEvent.press(getByTestId(`next`));
      });
    },
    prev() {
      act(() => {
        fireEvent.press(getByTestId(`prev`));
      });
    },
    clickPlay() {
      act(() => {
        fireEvent.press(getByTestId(`play`));
      });
    },
    seekFewSec() {
      act(() => {
        fireEvent.press(getByTestId(`fewSec`));
      });
    },
    started() {
      act(() => {
        fireEvent.press(getByTestId(`started`));
      });
    },
    ended() {
      act(() => {
        fireEvent.press(getByTestId(`ended`));
      });
    },
  };
};

describe('Player', () => {
  it('should notify adapter when play is clicked', async () => {
    const { addSong, addSongNext, currentSongTitle, clickPlay } = renderPlayer();
    clickPlay();
    expect(controlMock.play).not.toBeCalled();
    addSongNext(1);
    addSong(2);
    expect(currentSongTitle()).toEqual(songs[1].title);
    clickPlay();
    expect(controlMock.play).toBeCalled();
  });
  it('should not raise error when hit prev while playlist is empty', async () => {
    const { prev } = renderPlayer();
    prev();
  });
  it('should be able to add next even when playlist is empty', async () => {
    const { addSong, addSongNext, currentSongTitle, next } = renderPlayer();
    addSongNext(1);
    addSong(2);
    expect(currentSongTitle()).toEqual(songs[1].title);
    next();
    expect(currentSongTitle()).toEqual(songs[2].title);
  });
  it('should add song to end of playlist', async () => {
    const { addSong, currentSongTitle, next } = renderPlayer();
    addSong(1);
    addSong(2);
    expect(currentSongTitle()).toEqual(songs[1].title);
    next();
    expect(currentSongTitle()).toEqual(songs[2].title);
  });
  it('should add song next to the beginning of the playlist', async () => {
    const { addSong, addSongNext, currentSongTitle, next } = renderPlayer();
    addSong(1);
    addSong(2);
    addSongNext(0);
    expect(currentSongTitle()).toEqual(songs[1].title);
    next();
    expect(currentSongTitle()).toEqual(songs[0].title);
  });
  it('should be able to start collection from second song', async () => {
    const { currentSongTitle, next, playCollectionFromSecond } = renderPlayer('all');
    playCollectionFromSecond();
    expect(currentSongTitle()).toEqual(songs[1].title);
    next();
    expect(currentSongTitle()).toEqual(songs[2].title);
    next();
    expect(currentSongTitle()).toEqual(songs[0].title);
  });
  describe('prev', () => {
    it('should go to previous song if song has just started', async () => {
      const { addSong, currentSongTitle, next, prev } = renderPlayer();
      addSong(0);
      addSong(1);
      addSong(2);
      next();
      expect(currentSongTitle()).toEqual(songs[1].title);
      // started();
      prev();
      expect(currentSongTitle()).toEqual(songs[0].title);
    });
    it('should go to beginning of the song if song a few seconds have passed', async () => {
      const { addSong, currentSongTitle, seekFewSec, next, prev } = renderPlayer();
      addSong(0);
      addSong(1);
      addSong(2);
      next();
      expect(currentSongTitle()).toEqual(songs[1].title);
      seekFewSec();
      prev();
      expect(currentSongTitle()).toEqual(songs[1].title);
    });
  });
  describe('repeat all', () => {
    it('should go back to first song at the end of playlist', async () => {
      const { addSong, currentSongTitle, next } = renderPlayer('all');
      addSong(0);
      addSong(1);
      addSong(2);
      expect(currentSongTitle()).toEqual(songs[0].title);
      next();
      expect(currentSongTitle()).toEqual(songs[1].title);
      next();
      expect(currentSongTitle()).toEqual(songs[2].title);
      next();
      expect(currentSongTitle()).toEqual(songs[0].title);
    });
    it('should repeat collection', async () => {
      const { currentSongTitle, next, playCollection } = renderPlayer('all');
      playCollection();
      expect(currentSongTitle()).toEqual(songs[0].title);
      next();
      expect(currentSongTitle()).toEqual(songs[1].title);
      next();
      expect(currentSongTitle()).toEqual(songs[2].title);
      next();
      expect(currentSongTitle()).toEqual(songs[0].title);
    });
  });
  describe('shuffle', () => {
    it('should shuffle song', async () => {
      const { addSong, currentSongTitle, next } = renderPlayer('all', true);
      addSong(0);
      addSong(1);
      addSong(2);
      expect(currentSongTitle()).toEqual(songs[0].title);
      next();
      expect(currentSongTitle()).toEqual(songs[1].title);
      next();
      expect(currentSongTitle()).toEqual(songs[2].title);
      let shuffled = false;
      for (let i = 0; i < 100; ++i) {
        songs.forEach((song) => {
          next();
          shuffled = shuffled || currentSongTitle() !== song.title;
        });
        if (shuffled) break;
      }
      expect(shuffled).toBeTruthy();
    });
  });
  describe('repeat one', () => {
    it('should go repeat one song regardless of playlist size', async () => {
      const { addSong, ended, currentSongTitle, next, prev } = renderPlayer('one');
      addSong(0);
      addSong(1);
      addSong(2);
      expect(currentSongTitle()).toEqual(songs[0].title);
      next();
      expect(currentSongTitle()).toEqual(songs[0].title);
      ended();
      expect(currentSongTitle()).toEqual(songs[0].title);
      // started();
      prev();
      expect(currentSongTitle()).toEqual(songs[0].title);
    });
  });
  describe('play', () => {
    it('should clear all added song', async () => {
      const { addSong, currentSongTitle, next, play, prev, ended } = renderPlayer();
      addSong(0);
      addSong(1);
      expect(currentSongTitle()).toEqual(songs[0].title);
      next();
      play(2);
      expect(currentSongTitle()).toEqual(songs[2].title);
      next();
      expect(currentSongTitle()).toEqual(songs[2].title);
      ended();
      expect(currentSongTitle()).toEqual(songs[2].title);
      prev();
      expect(currentSongTitle()).toEqual(songs[2].title);
    });
  });
});
