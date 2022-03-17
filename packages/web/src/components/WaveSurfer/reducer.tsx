import { SET_CURRENT_SONG, SET_ERROR_MASSAGE, SET_IS_PLAYING, SET_IS_READY, SET_TIME_REGIONS } from './constants';
import { CreativeSongInterface } from '../CreativeSong';

export interface State {
  currentSong: CreativeSongInterface | null,
  isPlayIng: boolean,
  isReady: boolean,
  timeRegions: [number, number],
  errorMessage: string | null
}

const initialState : State = {
  currentSong: null,
  isPlayIng: false,
  isReady: false,
  timeRegions: [0, 0],
  errorMessage: null
}
function reducer(state: State, action: any) {
  switch(action.type) {
    case SET_CURRENT_SONG:
      return {
        ...state,
        //payload in action
        currentSong: action.currentSong
      }
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlayIng: action.isPlaying
      }
    case SET_IS_READY:
      return {
        ...state,
        isReady: action.isReady
      }
    case SET_TIME_REGIONS:
      return {
        ...state,
        timeRegions: action.timeRegions
      }
    case SET_ERROR_MASSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage
      }
    default:
      return state
  }
}

export {initialState};
export default reducer;
