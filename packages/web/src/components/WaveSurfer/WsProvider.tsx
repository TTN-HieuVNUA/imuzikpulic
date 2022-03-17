import React, { Dispatch, PropsWithChildren, SetStateAction, useContext, useReducer } from 'react';
import { CreativeSongInterface } from '../CreativeSong';
import reducer, { initialState, State } from './reducer';
const WaveSurfer = require("wavesurfer.js");
export interface WsControl {
  ws: any,
  wsState: State,
  dispatch: Dispatch<any>,
  handleSetWs: (ws: WaveSurfer) => void,
  handlePlayPause: ()=> void,
  handlePlayRegion: ()=> void,
}
export const WsContext = React.createContext<WsControl | null>(null);

export const useWsPlayer = () => {
  return useContext<WsControl | null>(WsContext);
};

export function WsProvider(props: PropsWithChildren<{ }>) {
  const [ws, setWavesurfer] = React.useState<WaveSurfer | null>(null);
  const [wsState, dispatch] = useReducer((reducer), initialState);

  const handlePlayPause = () => {
    if(!ws) return;
    ws.playPause();
  }

  const handlePlayRegion = () => {
    if(!ws) return;
    let region = Object.values(ws.regions.list)[0];
    // @ts-ignore
    region.play();  }

  const handleSetWs = (ws: WaveSurfer) => {
    setWavesurfer(ws)
  }

  const player : WsControl = {
    ws,
    wsState,
    dispatch,
    handleSetWs,
    handlePlayPause,
    handlePlayRegion,
  }

  return (
    <WsContext.Provider value={player}>
      {props.children}
    </WsContext.Provider>
  )
}
