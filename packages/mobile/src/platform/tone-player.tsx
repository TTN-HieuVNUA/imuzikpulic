import React, { useCallback, useEffect, useRef, useState } from 'react';

import { usePlayer } from '../components/Player';

export const useTonePlayer = (fileUrl: string, selected: boolean, playedCallback?: () => void) => {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [remain, setRemain] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const onAudioUpdate = useCallback(() => {
    setIsPlaying(!audioRef.current?.paused);
    setDuration(audioRef.current?.duration ?? 0);
    setRemain((audioRef.current?.duration ?? 0) - (audioRef.current?.currentTime ?? 0));
  }, []);
  useEffect(() => {
    if ((!selected || player.isPlaying) && !audioRef.current?.paused) {
      const timeout = setTimeout(() => {
        audioRef.current?.pause();
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [player, selected]);
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => onAudioUpdate(), 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, onAudioUpdate]);
  const onPlayClick = useCallback(() => {
    if (audioRef.current?.paused) {
      if (player.isPlaying) {
        player.onPlayClicked();
      }
      audioRef.current.currentTime = 0;
      audioRef.current?.play();
      playedCallback?.();
    } else {
      audioRef.current?.pause();
    }
  }, [playedCallback, player]);
  return {
    isPlaying,
    remain,
    duration,
    onPlayClick,
    audio: (
      <audio
        // controls
        preload="none"
        ref={audioRef}
        onEnded={onAudioUpdate}
        onPlay={onAudioUpdate}
        onPause={onAudioUpdate}
        onLoadedMetadata={onAudioUpdate}>
        <source src={fileUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    ),
  };
};
