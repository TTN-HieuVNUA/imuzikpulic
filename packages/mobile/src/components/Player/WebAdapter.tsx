import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';

import { NativePlayerAdapter } from './Provider';

const READY_STATE = {
  HAVE_ENOUGH_DATA: 4,
  HAVE_FUTURE_DATA: 3,
};

export const WebAdapter: NativePlayerAdapter = (props) => {
  const [sources, setSources] = useState<string[]>([
    'http://imedia.imuzik.com.vn/media1/ringbacktones/601/636/0/0000/0005/769.mp3',
  ]);
  const [playing, setPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const locked = useRef<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);
  const onProgress = useCallback(() => {
    if (audioRef.current && props.onProgress) {
      setPlaying(!audioRef.current.paused);
      setDuration(audioRef.current.duration);
      props.onProgress({
        currentTime: audioRef.current.currentTime,
        duration: audioRef.current.duration,
        isPlaying: !audioRef.current.paused,
        isLoading: ![READY_STATE.HAVE_ENOUGH_DATA, READY_STATE.HAVE_FUTURE_DATA].includes(
          audioRef.current?.readyState
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onProgress, audioRef.current]);
  const screenWidth = Math.round(Dimensions.get('window').width) || 500;
  useEffect(() => {
    if (playing && duration) {
      const interval = setInterval(
        onProgress,
        // 1000
        Math.max(
          1000,
          (duration * 1000) / screenWidth / 2 // Bao lau de progress bar tang len 1 pixel
        )
      );
      return () => {
        clearInterval(interval);
      };
    } else {
      onProgress();
    }
  }, [onProgress, playing, duration, screenWidth]);
  useEffect(() => {
    props.controlRef.current = {
      play: async (newSources, fromBeginning) => {
        if (audioRef.current && sourceRef.current) {
          if (sources.length && sources[0] === newSources[0]) {
            if (!locked.current) {
              if (fromBeginning) audioRef.current.currentTime = 0;
              if (fromBeginning || audioRef.current.paused) {
                try {
                  locked.current = true;
                  await audioRef.current.play();
                  props.notifyMissingPermission(false);
                } catch (e) {
                  console.debug(e);
                  // alert(e);
                  props.notifyMissingPermission(true);
                  // Alway fail for the first time on iOS
                } finally {
                  setTimeout(() => {
                    locked.current = false;
                  }, 200);
                }
              } else {
                audioRef.current.pause();
              }
            } else {
              console.warn(
                'Locked due to potentially double triggered onPress https://github.com/necolas/react-native-web/issues/1571'
              );
            }
          } else {
            setSources(newSources);
            sourceRef.current.src = newSources[0];
            audioRef.current.load();
            try {
              locked.current = true;
              await audioRef.current.play();
              props.notifyMissingPermission(false);
            } catch (e) {
              console.debug(e);
              // alert(e);
              props.notifyMissingPermission(true);
              // Alway fail for the first time on iOS
            } finally {
              setTimeout(() => {
                locked.current = false;
              }, 200);
            }
          }
        }
      },
      seek(position) {
        if (audioRef.current) {
          audioRef.current.currentTime = position;
        }
      },
    };
    return () => {
      props.controlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources, props.onEnded, onProgress]);
  return (
    // <ReactHowler
    //   src="http://goldfirestudios.com/proj/howlerjs/sound.ogg"
    //   playing={true}
    // />
    <audio
      autoPlay
      ref={audioRef}
      onEnded={props.onEnded}
      onPlay={onProgress}
      onPause={onProgress}
      onLoadedMetadata={onProgress}
      onSeeking={onProgress}
      onSeeked={onProgress}>
      <source ref={sourceRef} src="" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};
