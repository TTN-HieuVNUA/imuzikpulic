import _ from 'lodash';
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const PREV_THRESHOLD = 3;

export const PlayerContext = React.createContext<PlayerControl | null>(null);
export const PlayerTimeContext = React.createContext<PlayerTime | null>(null);

export interface Playable {
  id: string;
  slug?: string | null;
  artist: string;
  title: string;
  liked: boolean;
  image?: string | null;
  sources?: string[];
}

export interface Collection {
  id?: string;
  name: string;
  playables: Playable[];
}

export interface PlayerTime {
  isPlaying: boolean;
  isLoading: boolean;
  duration: number | null;
  playedRatio: number | null;
  currentPlayable?: Playable | null;
}

export interface PlayerControl {
  missingPermission: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  duration: number | null;
  currentPlayable?: Playable | null;
  currentCollection?: Collection | null;
  hasNext: boolean;
  hasPrev: boolean;
  onPlayClicked: () => void;
  onPrevClicked: () => void;
  onNextClicked: () => void;
  onSeek: (ratio: number) => void;
  addPlayable: (playable: Playable) => void;
  play: (playable: Playable) => void;
  playCollection: (collection: Collection, startIdx?: number) => void;
  addPlayableNext: (playable: Playable) => void;
  repeat: RepeatType;
  shuffle: boolean;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
}

export const usePlayer = () => {
  const player = useContext<PlayerControl | null>(PlayerContext);
  if (!player) throw new Error('Can not find PlayerContext');
  return player;
};

export const usePlayerTime = () => {
  const playerTime = useContext<PlayerTime | null>(PlayerTimeContext);
  if (!playerTime) throw new Error('Can not fint PlayerTiem Context');
  return playerTime;
};

export interface NativePlayerAdapterControl {
  play: (sources: string[], fromBeginning?: boolean) => void;
  seek: (position: number) => void;
}
type onProgressFunc = (data: {
  currentTime: number;
  duration: number;
  isLoading: boolean;
  isPlaying: boolean;
}) => void;
export type NativePlayerAdapter = React.FC<{
  controlRef: React.MutableRefObject<NativePlayerAdapterControl | null>;
  onProgress?: onProgressFunc;
  notifyMissingPermission: (missing: boolean) => void;
  onEnded: () => void;
}>;

export type RepeatType = false | 'all' | 'one';
const ALL_REPEAT_TYPE: RepeatType[] = [false, 'all', 'one'];

export const PlayerProvider = (props: PropsWithChildren<{ adapter: NativePlayerAdapter }>) => {
  const Adapter = props.adapter;
  const controlRef = useRef<NativePlayerAdapterControl>(null);
  const [missingPermission, setMissingPermission] = useState(false);
  const [repeat, setRepeat] = useState<RepeatType>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [playedRatio, setPlayedRatio] = useState<null | number>(null);
  const [playedTime, setPlayedTime] = useState<number>(0);
  const [duration, setDuration] = useState<null | number>(null);
  const [playlist, setPlaylist] = useState<Playable[]>([]);
  // const [playNextList, setPlayNextList] = useState<Playable[]>([]);
  const [played, setPlayed] = useState<Playable[]>([]);
  const [added, setAdded] = useState<Playable[]>([]);
  const [currentPlayable, setCurrentPlayable] = useState<Playable | null>(null);
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(null);
  const [shouldPlayNext, setShouldPlayNext] = useState<boolean>(false);
  const [shouldPlayPrev, setShouldPlayPrev] = useState<boolean>(false);
  const onProgress = useCallback<onProgressFunc>((data) => {
    setIsPlaying(data.isPlaying);
    setIsLoading(data.isLoading);
    setPlayedRatio(data.currentTime / data.duration);
    setPlayedTime(data.currentTime);
    setDuration(data.duration);
  }, []);

  const playNext = useCallback(() => {
    // if (repeat === 'one' && currentPlayable) {
    //   controlRef.current?.play(currentPlayable.sources || [], true);
    //   return;
    // }
    if (playlist.length || repeat === 'all') {
      if (currentPlayable) {
        played.unshift(currentPlayable);
        setPlayed(played);
      }

      let newPlaylist = playlist;

      if (!newPlaylist.length) {
        if (shuffle) {
          newPlaylist = added
            .map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
        } else {
          newPlaylist = [...added];
        }
      }
      const current = newPlaylist.shift();
      controlRef.current?.play(current?.sources || [], true);
      setCurrentPlayable(current ?? null);
      if (shuffle) {
        newPlaylist = [...playlist]
          .filter((p) => p !== current)
          .map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);
      }
      setPlaylist(newPlaylist);
    }
  }, [repeat, currentPlayable, playlist, played, shuffle, added]);
  const playPrev = useCallback(() => {
    // if (repeat === 'one' && currentPlayable) {
    //   controlRef.current?.play(currentPlayable.sources || [], true);
    //   return;
    // }
    if (currentPlayable && playedTime > PREV_THRESHOLD) {
      controlRef.current?.play(currentPlayable.sources || [], true);
    } else {
      if (played.length) controlRef.current?.play(played[0].sources || [], true);
      if (currentPlayable) {
        playlist.unshift(currentPlayable);
        setPlaylist(playlist);
      }
      const current = played.shift();
      if (current) {
        setCurrentPlayable(current);
        setPlayed(played);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayable, played, playedTime, playlist, repeat]);
  useEffect(() => {
    if (shouldPlayNext) {
      playNext();
      setShouldPlayNext(false);
    }
  }, [shouldPlayNext, playNext]);
  useEffect(() => {
    if (shouldPlayPrev) {
      playPrev();
      setShouldPlayPrev(false);
    }
  }, [shouldPlayPrev, playPrev]);
  const passedThreshold = playedTime > PREV_THRESHOLD;
  const player = useMemo<PlayerControl>(() => {
    return {
      missingPermission,
      isPlaying,
      isLoading,
      duration,
      currentPlayable,
      currentCollection,

      onPlayClicked() {
        if (currentPlayable) {
          controlRef.current?.play(currentPlayable.sources || []);
        }
      },
      addPlayable(playable) {
        setPlaylist([...playlist, playable]);
        setAdded([...added, playable]);
        if (!playlist.length && !currentPlayable) setShouldPlayNext(true);
      },
      addPlayableNext(playable) {
        setPlaylist([playable, ...playlist]);
        setAdded([...added, playable]);
        if (!playlist.length && !currentPlayable) setShouldPlayNext(true);
      },
      play(playable) {
        setPlaylist([playable]);
        setAdded([playable]);
        setPlayed([]);
        setCurrentPlayable(null);
        setShouldPlayNext(true);
      },
      playCollection(collection, startIdx) {
        setCurrentCollection(collection);
        setPlaylist(collection.playables.slice(startIdx, collection.playables.length));
        setPlayed(collection.playables.slice(0, startIdx).reverse());
        setAdded([...collection.playables]);
        setCurrentPlayable(null);
        setShouldPlayNext(true);
      },
      onNextClicked() {
        setShouldPlayNext(true);
      },
      onPrevClicked() {
        setShouldPlayPrev(true);
      },
      onSeek(ratio) {
        if (duration) {
          controlRef.current?.seek(ratio * duration);
        }
      },
      hasPrev: !!played.length || passedThreshold,
      hasNext: !!playlist.length || !!(repeat === 'all' && added.length),
      repeat,
      shuffle,
      toggleRepeat() {
        const newRepeat =
          ALL_REPEAT_TYPE[(ALL_REPEAT_TYPE.indexOf(repeat) + 1) % ALL_REPEAT_TYPE.length];
        setRepeat(newRepeat);
        return newRepeat;
      },
      toggleShuffle() {
        const newShuffle = !shuffle;
        let newPlaylist: Playable[];
        if (newShuffle) {
          newPlaylist = _(added)
            .filter((p) => p !== currentPlayable)
            .map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)
            .value();
        } else {
          const currentPlayableIdx = added.findIndex((p) => p === currentPlayable);
          newPlaylist = added.filter((p, idx) => idx > currentPlayableIdx);
        }
        setShuffle(newShuffle);
        setPlaylist(newPlaylist);
        return newShuffle;
      },
    };
  }, [
    missingPermission,
    isPlaying,
    isLoading,
    duration,
    currentPlayable,
    currentCollection,
    played.length,
    passedThreshold,
    repeat,
    playlist,
    added,
    shuffle,
  ]);
  const playerTime = useMemo<PlayerTime>(() => {
    return {
      isPlaying,
      isLoading,
      duration,
      currentPlayable,
      playedRatio,
    };
  }, [isPlaying, isLoading, duration, playedRatio, currentPlayable]);
  const onEnd = useCallback(() => {
    if (repeat === 'one' && currentPlayable) {
      controlRef.current?.play(currentPlayable.sources || [], true);
      return;
    } else {
      setShouldPlayNext(true);
      return;
    }
  }, [currentPlayable, repeat]);
  return (
    <PlayerContext.Provider value={player}>
      <PlayerTimeContext.Provider value={playerTime}>
        <Adapter
          controlRef={controlRef}
          onProgress={onProgress}
          onEnded={onEnd}
          notifyMissingPermission={setMissingPermission}
        />
        {props.children}
      </PlayerTimeContext.Provider>
    </PlayerContext.Provider>
  );
};
