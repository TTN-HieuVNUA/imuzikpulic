import { Audio, AVPlaybackStatus } from 'expo-av';
import { useCallback, useEffect, useState } from 'react';

import { usePlayer } from '../components/Player';

export const useTonePlayer = (fileUrl: string, selected: boolean, playedCallback?: () => void) => {
  const player = usePlayer();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [remain, setRemain] = useState(0);
  const [duration, setDuration] = useState(0);
  const onAudioUpdate = useCallback((status: AVPlaybackStatus) => {
    if (status?.isLoaded) {
      setIsPlaying(status.isPlaying);
      setDuration((status.durationMillis ?? 0) / 1000);
      setRemain(((status.durationMillis ?? 0) - (status.positionMillis ?? 0)) / 1000);
    }
  }, []);
  useEffect(() => {
    if ((!selected || player.isPlaying) && isPlaying) {
      const timeout = setTimeout(() => {
        sound?.pauseAsync();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [player, selected, isPlaying, sound]);
  useEffect(() => {
    return () => {
      if (sound) {
        sound.setOnPlaybackStatusUpdate(null);
        sound.stopAsync();
      }
    };
  }, [sound]);
  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(onAudioUpdate);
    }
  }, [sound, onAudioUpdate]);
  const onPlayClick = useCallback(async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        if (player.isPlaying) {
          player.onPlayClicked();
        }
        await sound.setPositionAsync(0);
        await sound.playAsync();
        if (playedCallback) playedCallback();
      }
    } else {
      const audio = await Audio.Sound.createAsync({ uri: fileUrl });
      setSound(audio.sound);
      await audio.sound.playAsync();
      if (player.isPlaying) {
        player.onPlayClicked();
      }
    }
  }, [sound, isPlaying, player, playedCallback, fileUrl]);
  return {
    isPlaying,
    remain,
    duration,
    onPlayClick,
    audio: null,
  };
};
