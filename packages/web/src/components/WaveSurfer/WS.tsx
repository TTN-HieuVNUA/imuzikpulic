import React, { useRef, useEffect, useState, Props } from 'react';
import { Region } from 'wavesurfer.js/src/plugin/regions';
import { useWsPlayer } from './WsProvider';
import { Text } from 'rebass';
import { setErrorMessage, setIsPlaying, setIsReady, setTimeRegions } from './actions';
const WaveSurfer = require("wavesurfer.js");
const Regions = require('wavesurfer.js/dist/plugin/wavesurfer.regions');
WaveSurfer.regions = Regions;
const MIN_DURATION = 30;
function randomRegion(duration: number): number[] {
  let max = duration - MIN_DURATION;
  let min = 0
  let startTime = Math.random() * (max - min) + min;
  return [startTime, startTime + 45]
}

function WSComponent(props: { source?: string }) {
  const waveformRef = useRef();
  const [ws, setWavesurfer] = useState<WaveSurfer | null>(null);
  const wsPlayer = useWsPlayer();
  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'hsl(0,0%,55%, 0.3)',
        progressColor: 'hsl(0,0%,55%, 0.5)',
        backend: 'MediaElement',
        autoCenter: false,
        cursorWidth: 0,
        cursorColor: "#22E26B",
        height: 80,
        normalize: true,
        backgroundColor: '#fff',
        xhr: {
          cache: "default",
          mode: "cors",
          method: "GET",
          credentials: "include",
          headers: [
            { key: "cache-control", value: "no-cache" },
            { key: "pragma", value: "no-cache" }
          ]
        },
        plugins: [
          WaveSurfer.regions.create({
          })
        ]
      });
      if (ws) {
        wsPlayer.dispatch(setErrorMessage(null));
        ws.destroy();
      }
      setWavesurfer(wavesurfer);
      wavesurfer.load(props.source);
      wavesurfer.on('ready', function () {
        let duration = wavesurfer.getDuration();
        if (duration < MIN_DURATION) {
          wsPlayer.dispatch(setErrorMessage(`Thời lượng của bài hát quá ngắn, vui lòng chọn bài nhiều hơn ${MIN_DURATION} giây`));
          wsPlayer.dispatch(setIsReady(false));
          return
        } else {
          wsPlayer.dispatch(setErrorMessage(null));
        }
        let startTime = 10;
        let endTime = 40;
        wsPlayer.handleSetWs(wavesurfer);
        wsPlayer.dispatch(setIsReady(true));
        console.log("Đã load xong dữ liệu")
        wavesurfer.addRegion({
          id: 'region-trim',
          start: Math.floor(startTime),
          end: Math.floor(endTime),
          color: 'hsl(46,98%,57%, 0.3)',
          minLength: 30,
          maxLength: 45,
        });
      });

      wavesurfer.on('play', function () {

        wsPlayer.dispatch(setIsPlaying(true));
      })

      wavesurfer.on('pause', function () {
        wsPlayer.dispatch(setIsPlaying(false));
      })

      /* Update labels */
      let updateLabel = function (region: Region) {
        try {
          let regionEl = document.querySelector('region[data-id="' + region.id + '"]');
          let labelStart = document.querySelector('#' + 'region-trim-label-start');
          let labelStop = document.querySelector('#' + 'region-trim-label-stop');
          let timeStart = document.querySelector('#' + 'region-time-start');
          let timeStop = document.querySelector('#' + 'region-time-stop');
          if (!labelStart) return;
          // @ts-ignore
          labelStart.style.display = 'block';
          // @ts-ignore
          labelStop.style.display = 'block';
          // @ts-ignore
          labelStart.style.left = regionEl.offsetLeft - 15 + 'px';
          // @ts-ignore
          labelStop.style.left = regionEl.offsetLeft - 15 + regionEl.clientWidth + 'px';
          let times = region.element.title.split('-');
          timeStart.innerHTML = times[0]
          timeStop.innerHTML = times[1]
          wsPlayer.dispatch(setTimeRegions((region.start), (region.end)))
        }
        catch (e) {
          console.error(e);
        }
      };
      wavesurfer.on('region-created', updateLabel);
      wavesurfer.on('region-updated', updateLabel);
      wavesurfer.on('error', function (err: Error) {
        console.log("Không load đựoc nhạc");
        console.error(err);
        wsPlayer.dispatch(setErrorMessage("Không thể load được nhạc"));
        wsPlayer.dispatch(setIsReady(false));
      });

    }
    return () => {
    }
  }, [props.source]);

  if (wsPlayer.wsState.errorMessage) {
    return (
      <div className="wavesurfer-label-container" id="waveform">
        {wsPlayer.wsState.errorMessage}
      </div>
    )
  }
  return (
    <>
      <div className="wavesurfer-title"><Text fontSize={3} fontWeight="bold" mb={1}>Mời bạn chọn đoạn nhạc muốn tạo, thời lượng lớn hơn 30s và nhỏ hơn 45s</Text></div>
      <div className="wavesurfer-label-container" id="waveform">
        <div ref={waveformRef} />
        <div className="labels-container">
          <div className="wavesurfer-label" id="region-trim-label-start">
            <span id="region-time-start">00:30</span>
          </div>
          <div className="wavesurfer-label" id="region-trim-label-stop">
            <span id='region-time-stop'>00:43</span>
          </div>
        </div>
      </div>
    </>
  );
}
const WS = React.memo(WSComponent);
export default WS;
