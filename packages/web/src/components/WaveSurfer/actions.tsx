import { SET_CURRENT_SONG, SET_ERROR_MASSAGE, SET_IS_PLAYING, SET_IS_READY, SET_TIME_REGIONS } from './constants';

export const setCurrentSong = (currentSong: any) => ({
  type: SET_CURRENT_SONG,
  //Payload
  currentSong: currentSong,
})
export const setIsPlaying = (isPlaying: boolean) => ({
  type: SET_IS_PLAYING,
  //Payload
  isPlaying: isPlaying,
})

export const setIsReady = (isReady: boolean) => ({
  type: SET_IS_READY,
  //Payload
  isReady: isReady,
})

export const setTimeRegions = (startTime: number, endTime: number) => ({
  type: SET_TIME_REGIONS,
  //Payload
  timeRegions: [startTime, endTime],
})

export const setErrorMessage = (errorMessage: string) => ({
  type: SET_ERROR_MASSAGE,
  //Payload
  errorMessage: errorMessage,
})
