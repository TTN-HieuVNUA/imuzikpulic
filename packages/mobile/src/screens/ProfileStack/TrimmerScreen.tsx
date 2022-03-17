import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import Trimmer from '../../components/Trimmer';
import { useRoute } from '@react-navigation/native';
import { Box, Text } from '../../rebass';
import { Header, Icon } from '../../components';
import { useGoBack } from '../../platform/go-back';
import { LinearGradient } from 'expo-linear-gradient';
import { ModalBox } from '../../platform/ModalBox';
import { useAlert } from '../../platform/links';
import { GetMyToneCreationDocument, GetMyToneCreationsDocument, useCreateRbtAvailableMutation } from '../../queries';
import { useCreateRbtUnavailableMutation } from '../../queries';
import { ReactNativeFile } from 'apollo-upload-client';

const maxTrimDuration = 45000;
const minimumTrimDuration = 30000;

const initialLeftHandlePosition = 0;
const initialRightHandlePosition = 30000;

function generateRNFile(uri?: string, name?: string) {
  return uri ? new ReactNativeFile({
    uri,
    type: 'audio/mp3',
    name,
  }) : null;
}

export function TrimmerBase(
  props: { url: string; name: string; type: string; id: string; songName: string; singerName: string; composer: string }
) {
  const [totalDurationAudio, setTotalDurationAudio] = useState(254000);
  const soundObj = useRef(new Audio.Sound());
  const [isPlay, setIsPlay] = useState(false);
  const [trimmerLeftHandlePosition, setTrimmerLeftHandlePosition] =
    useState(initialLeftHandlePosition);
  const [trimmerRightHandlePosition, setTrimmerRightHandlePosition] = useState(
    initialRightHandlePosition
  );
  const [scrubberPosition, setScrubberPosition] = useState(0);
  const [createRBT] = useCreateRbtUnavailableMutation();

  const { width, height } = Dimensions.get('window');
  // @ts-ignore
  const onHandleChange = ({ leftPosition, rightPosition }) => {
    setTrimmerLeftHandlePosition(leftPosition);
    setTrimmerRightHandlePosition(rightPosition);
  };

  const onProgress = useCallback(

    (status: AVPlaybackStatus) => {
      if (soundObj) {
        if (status?.isLoaded) {
          setIsPlay(status.isPlaying);
          setScrubberPosition(status.positionMillis);
          if (status.didJustFinish) {
            soundObj.current.setOnPlaybackStatusUpdate(null);
          }
        }
      }
    },
    [soundObj]
  );
  useEffect(() => {
    if (soundObj) {
      soundObj.current.setOnPlaybackStatusUpdate(onProgress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundObj]);

  const doPlay = async () => {
    setIsPlay(true);
    setScrubberPosition(trimmerLeftHandlePosition);
    try {
      await soundObj.current.loadAsync({ uri: props.url }, { isLooping: true, shouldPlay: true });
      await soundObj.current.getStatusAsync().then((e) => {
        if (e.isLoaded) {
          setTotalDurationAudio(e.durationMillis ?? 255000);
        }
      });

      await soundObj.current.setPositionAsync(trimmerLeftHandlePosition);

      await soundObj.current.playAsync();
    } catch (error) {
      console.log(error);
    }
  };
  const doPause = async () => {
    setIsPlay(false);
    setScrubberPosition(trimmerLeftHandlePosition);
    try {
      await soundObj.current.stopAsync();
      await soundObj.current.unloadAsync();
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handleBreak() {
    try {
      await soundObj.current.stopAsync();
      await soundObj.current.unloadAsync();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (scrubberPosition > trimmerRightHandlePosition) {
      setIsPlay(false);
      handleBreak();
    }
  }, [
    scrubberPosition,
    trimmerRightHandlePosition,
    trimmerLeftHandlePosition,
    soundObj,
    handleBreak,
  ]);
  useEffect(() => {
    doPause();
    checkDurationMillis(props.url);
  }, [props.url])

  const checkDurationMillis = async (uri?: any) => {
    await soundObj.current.loadAsync({ uri: uri });
    const result = await soundObj.current.getStatusAsync();
    await soundObj.current.stopAsync();
    await soundObj.current.unloadAsync();
    if (result.isLoaded) {
      // @ts-ignore
      setTotalDurationAudio(result.durationMillis);

    }
  }

  const dismiss = useGoBack();

  const backAndStop = () => {
    dismiss();
    handleBreak();
  };

  const showPopup = useAlert({ type: 'create-rbt' });
  const errorPopup = useAlert({ type: 'cancel1stack' });

  const convertMinsToTime = (time: number) => {
    let minutes = Math.floor(time / 60);
    let s: string | number = time % 60;
    s = s < 10 ? '0' + s : s;
    return `${minutes}:${s}`;
  }

  const [createRbtUnavailable] = useCreateRbtUnavailableMutation();
  const [createRbt, { loading: createLoading }] = useCreateRbtAvailableMutation({
    refetchQueries: [{ query: GetMyToneCreationsDocument }, { query: GetMyToneCreationDocument }]
  });

  const actionRbt = () => {
    handleBreak();
    if (props.songName) {
      const file = generateRNFile(props.url, props.name)
      createRbtUnavailable({
        variables: {
          composer: props.composer,
          singerName: props.singerName,
          songName: props.songName,
          file: file,
          time_start: (trimmerLeftHandlePosition / 1000).toString(),
          time_stop: (trimmerRightHandlePosition / 1000).toString(),
        },
      })
        .then((res) => {
          if (res.data?.createRbtUnavailable.success) {
            showPopup({
              content: res.data.createRbtUnavailable.result?.tone_code ?? '',
            });
          } else {
            errorPopup({ content: res.data?.createRbtUnavailable.message ?? 'Hệ thống bận!' });
          }
        })
        .catch((e) => {
          errorPopup({ content: 'Hệ thống bận!' });
        });
    } else {
      createRbt({
        variables: {
          song_slug: props.id,
          time_start: (trimmerLeftHandlePosition / 1000).toString(),
          time_stop: (trimmerRightHandlePosition / 1000).toString(),
        },
      })
        .then((res) => {
          if (res.data?.createRbtAvailable.success) {
            showPopup({
              content: res.data.createRbtAvailable.result?.tone_code ?? '',
            });
          } else {
            errorPopup({ content: res.data?.createRbtAvailable.message ?? 'Hệ thống bận!' });
          }
        })
        .catch((e) => {
          errorPopup({ content: 'Hệ thống bận!' });
        });

    }
  };

  return (
    <ModalBox>
      <Box bg="defaultBackground" position="relative" flex={1}>
        <Header leftButton="back" title="Chọn đoạn nhạc" leftButtonClick={backAndStop} />
        <Box bg="defaultBackground" flex={1} marginBottom={3} justifyContent="space-between">
          <Text mt={20} mx={3} textAlign="center" fontSize={3} fontWeight="bold" color="normalText">
            {props.songName ? props.songName : props.name}
          </Text>
          {props?.url ? (
            <Box mt={2}>
              <Box alignItems="center" justifyContent="space-around" flexDirection="row" mb={3}>
                <Text fontSize={[3, 4, 5]} fontWeight="bold" color="normalText">
                  {convertMinsToTime(Math.floor(trimmerLeftHandlePosition / 1000))}
                </Text>
                <Text fontSize={[3, 4, 5]} fontWeight="bold" color="normalText">
                  {convertMinsToTime(Math.floor(trimmerRightHandlePosition / 1000))}
                </Text>
              </Box>
              <Trimmer
                // @ts-ignore
                onHandleChange={onHandleChange}
                totalDuration={totalDurationAudio}
                trimmerLeftHandlePosition={trimmerLeftHandlePosition}
                trimmerRightHandlePosition={trimmerRightHandlePosition}
                minimumTrimDuration={minimumTrimDuration}
                maxTrimDuration={maxTrimDuration}
                maximumZoomLevel={5}
                zoomMultiplier={20}
                initialZoomValue={2}
                scaleInOnInit={true}
                tintColor="rgba(56, 239, 125, 125)"
                markerColor="#FCCC26"
                trackBackgroundColor="#262523"
                trackBorderColor="#5a3d5c"
                scrubberColor="#b7e778"
                scrubberPosition={scrubberPosition}
                onLeftHandlePressIn={doPause}
                onRightHandlePressIn={doPause}
                onScrubberPressIn={() => console.log('onScrubberPressIn')}
              />
              <Box alignItems="center" justifyContent="center">
                <Text mt={3}>Thời gian tối đa của nhạc chuông là 45 giây</Text>
                <TouchableOpacity style={{ marginTop: 30 }} onPress={isPlay ? doPause : doPlay}>
                  <LinearGradient
                    colors={['#38EF7D', '#11998E']}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{
                      width: height < 600 ? 70 : 80,
                      height: height < 600 ? 70 : 80,
                      borderRadius: height < 600 ? 35 : 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {isPlay ? (
                      <Icon name="player-pause" size={25} color="white" />
                    ) : (
                      <Icon name="player-play" size={25} color="white" />
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </Box>
            </Box>
          ) : undefined}
          <LinearGradient
            colors={['#38EF7D', '#11998E']}
            start={[0, 0]}
            end={[1, 1]}
            style={{ borderRadius: 12, marginHorizontal: 15, marginVertical: height < 600 ? 5 : 10 }}
          >
            <TouchableOpacity
              style={{
                height: 50,
                flexDirection: 'row',
                width: '100%',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={actionRbt}
              disabled={createLoading}>

              {createLoading ? (
                <Box flex={1} alignItems="center" justifyContent="center">
                  <ActivityIndicator size="large" color="white" />
                </Box>
              ) : (
                <Text fontWeight={700}>LƯU NHẠC CHỜ</Text>
              )}

            </TouchableOpacity>
          </LinearGradient>

        </Box>
      </Box>
    </ModalBox>
  );
}

export default function TrimmerScreen() {
  const route: {
    params?: { type?: string; url?: string; name?: string; id?: string; songName?: string; singerName?: string; composer?: string };
  } = useRoute();
  return (
    <TrimmerBase
      url={route.params?.url ?? ''}
      name={route.params?.name ?? ''}
      type={route.params?.type ?? ''}
      id={route.params?.id ?? ''}
      songName={route.params?.songName ?? ''}
      singerName={route.params?.singerName ?? ''}
      composer={route.params?.composer ?? ''}
    />
  );
}
