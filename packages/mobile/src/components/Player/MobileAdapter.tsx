import { Audio, AVPlaybackStatus } from 'expo-av';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';

import { NativePlayerAdapter } from './Provider';

Audio.setAudioModeAsync({
  staysActiveInBackground: true,
  allowsRecordingIOS: false,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  playThroughEarpieceAndroid: false,
});

export const MobileAdapter: NativePlayerAdapter = (props) => {
  const [sources, setSources] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNewSound, setNewSound] = useState<boolean>(false);
  const soundRef = useRef<Audio.Sound>(new Audio.Sound()).current;
  const [duration, setDuration] = useState<number>(0);
  const locked = useRef<boolean>(false);
  const sourceRef = useRef<any>(null);
  const onProgress = useCallback(
    (status: AVPlaybackStatus) => {
      if (isNewSound) {
        if (props.onProgress) {
          if (status?.isLoaded) {
            setDuration((status.durationMillis ?? 0) / 1000);
            setIsPlaying(status.isPlaying);
            props.onProgress({
              currentTime: status.positionMillis / 1000,
              duration: (status.durationMillis ?? 0) / 1000,
              isPlaying: status.isPlaying,
              isLoading: status.isBuffering,
            });
            if (status.didJustFinish) {
              soundRef.setOnPlaybackStatusUpdate(null);
              props.onEnded();
            }
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onProgress, props.onEnded, isNewSound]
  );
  useEffect(() => {
    if (isNewSound) {
      soundRef.setOnPlaybackStatusUpdate(onProgress);
      if (duration) {
        const screenWidth = Math.round(Dimensions.get('window').width) || 500;
        const interval = Math.max(
          1000,
          (duration * 1000) / screenWidth / 2 // Bao lau de progress bar tang len 1 pixel
        );
        soundRef.setProgressUpdateIntervalAsync(interval);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onProgress, duration, isNewSound]);
  useEffect(() => {
    props.controlRef.current = {
      play: async (newSources, fromBeginning) => {
        if (sources.length && sources[0] === newSources[0]) {
          if (!locked.current) {
            if (isNewSound) {
              if (fromBeginning) {
                soundRef.setPositionAsync(0);
                setDuration(0);
              }
              if (fromBeginning || !isPlaying) {
                try {
                  locked.current = true;
                  await soundRef.playAsync();
                  props.notifyMissingPermission(false);
                } catch (e) {
                  console.debug(e);
                  props.notifyMissingPermission(true);
                } finally {
                  setTimeout(() => {
                    locked.current = false;
                  }, 200);
                }
              } else {
                await soundRef.pauseAsync();
              }
            }
          } else {
            console.warn(
              'Locked due to potentially double triggered onPress https://github.com/necolas/react-native-web/issues/1571'
            );
          }
        } else {
          setSources(newSources);
          sourceRef.current = newSources[0];
          if (isNewSound) {
            await soundRef.stopAsync();
            await soundRef.setOnPlaybackStatusUpdate(null);
            await soundRef.unloadAsync();
            await soundRef.loadAsync(
              { uri: sourceRef.current },
              { shouldPlay: false, volume: 1.0 },
              false
            );
          } else {
            await soundRef.loadAsync(
              { uri: sourceRef.current },
              { shouldPlay: false, volume: 1.0 },
              false
            );
            setNewSound(true);
          }
          setDuration(0);
          setIsPlaying(false);
          if (props.onProgress) {
            props.onProgress({
              currentTime: 0,
              duration: 0,
              isPlaying: false,
              isLoading: true,
            });
          }
          try {
            locked.current = true;
            await soundRef.playAsync();
            props.notifyMissingPermission(false);
          } catch (e) {
            console.debug(e);
            props.notifyMissingPermission(true);
          } finally {
            setTimeout(() => {
              locked.current = false;
            }, 200);
          }
        }
      },
      seek(position) {
        if (soundRef) {
          soundRef.setPositionAsync(position * 1000);
        }
      },
    };
    return () => {
      props.controlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources, props.onEnded, onProgress, isNewSound, isPlaying]);
  return null;
};
