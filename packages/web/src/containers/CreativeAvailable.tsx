import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from 'rebass';

import { Section } from '../components';
import { Theme } from '../themes';
import WS from '../components/WaveSurfer/WS';
import { useWsPlayer } from '../components/WaveSurfer/WsProvider';
import { useTheme } from 'emotion-theming';
import { SearchCreativeAvailable } from '../components/SeachCreativeAvailable';
import { CreativeSong, CreativeSongInterface } from '../components/CreativeSong';
import { setCurrentSong, setErrorMessage, setIsPlaying, setIsReady } from '../components/WaveSurfer/actions';
import {
  useCreateRbtAvailableMutation, useMeQuery,
} from '../queries';
import { useToasts } from 'react-toast-notifications';
import { useLoginContext } from './Login';
import Alert from './Alert';

enum StatusProgress {
  creating,
  pending,
  created
}


export default function CreativeAvailable() {
  const theme = useTheme<Theme>();
  const wsPlayer = useWsPlayer();
  const [status, setStatus] = useState<StatusProgress>(0);
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
  const [createRbt] = useCreateRbtAvailableMutation();
  const { addToast } = useToasts();
  const { data: meData } = useMeQuery();
  const { showLogin } = useLoginContext();

  const onAccept = () => {
    setIsOpenAlert(false)
  }

  const loading_screen = document.getElementById('ipl-progress-indicator');
  useEffect(() => {
    if (status !== StatusProgress.pending) {
      loading_screen.classList.add('available');
    }
  }, [status]);

  let handleChooseSong = useCallback((song: CreativeSongInterface) => {
    if (song?.slug !== wsPlayer.wsState.currentSong?.slug) {
      wsPlayer.dispatch(setIsPlaying(false));
      wsPlayer.dispatch(setErrorMessage(null));
      wsPlayer.dispatch(setIsReady(false));
      //Todo: check link
      wsPlayer.dispatch(setCurrentSong({ ...song, fileUrl: song.fileUrl }));
    }
  }, [wsPlayer.wsState.currentSong?.slug]);
  const handleCreateCreative = () => {
    if (!meData?.me) {
      return showLogin?.();
    }
    if (!wsPlayer.wsState.isReady) return;
    createRbt({
      variables: {
        song_slug: wsPlayer.wsState.currentSong.slug,
        time_start: wsPlayer.wsState.timeRegions[0].toString(),
        time_stop: wsPlayer.wsState.timeRegions[1].toString(),
      },
    })
      .then(res => {
        // Return data from create
        const data = res.data.createRbtAvailable;
        console.log('res', res)
        if (!data.success) {
          addToast(data.message, {
            appearance: 'error',
            autoDismiss: true,
          });
          setStatus(StatusProgress.creating);
          return;
        }
        setIsOpenAlert(true);
        setStatus(StatusProgress.creating);
      })
      .catch(e => {
        console.log(e);
        addToast('H??? th???ng b???n!', {
          appearance: 'error',
          autoDismiss: true,
        });
        setStatus(StatusProgress.creating);
      });
    loading_screen.classList.remove('available');
    setStatus(StatusProgress.pending);
  };



  return (
    <Section>
      <Box
        height={566}
      >
        <Text color={'primary'} fontSize={5} mb={45}>T???o nh???c ch??? m???i t??? b??i h??t c?? s???n tr??n h??? th???ng</Text>

        {/*Creating RBT Creative*/}
        {(status === StatusProgress.creating || status === StatusProgress.pending) &&
          <>
            <SearchCreativeAvailable onChooseSong={handleChooseSong} />

            {/*Current song*/}
            {wsPlayer.wsState.currentSong &&
              <Box>
                <Box
                  css={{
                    width: '100%',
                    maxWidth: '700px',
                  }}>
                  <CreativeSong
                    image={wsPlayer.wsState.currentSong.image}
                    title={wsPlayer.wsState.currentSong.title}
                    singers={wsPlayer.wsState.currentSong.singers}
                    isPlay={wsPlayer.wsState.isPlayIng}
                    onClick={() => wsPlayer.wsState.isReady && wsPlayer.handlePlayPause()}
                  />
                  {/* <h1>{JSON.stringify(wsPlayer.wsState.currentSong)}</h1> */}
                </Box>
                {/*Ws Player*/}
                <Box backgroundColor={theme.colors.backgroundWs} overflow='display'>
                  <Box>
                    <WS
                      source={wsPlayer.wsState.currentSong.fileUrl} />
                  </Box>
                  {wsPlayer.wsState.isReady ?
                    <Flex
                      flexDirection='row'
                      flexWrap='wrap'
                      pb={7}
                      pt={3}
                    >
                      <Flex
                        flex={1 / 2}
                        justifyContent='flex-end'
                      >
                        <Button
                          mr={3}
                          onClick={() => wsPlayer.handlePlayRegion()}
                          css={{ height: 38, fontSize: theme.fontSizes[3] }}
                          variant='primary'
                        >
                          Nghe th???
                        </Button>
                      </Flex>
                      <Flex
                        flex={1 / 2}
                        justifyContent='flex-start'
                      >
                        <Button
                          ml={3}
                          onClick={handleCreateCreative}
                          variant='outline'
                          css={{ height: 38, fontSize: theme.fontSizes[3] }}
                        >
                          T???o nh???c ch???
                        </Button>
                      </Flex>
                    </Flex>
                    :
                    null
                  }
                </Box>
              </Box>
            }
          </>
        }
      </Box>
      <Alert isOpen={isOpenAlert} onAccept={onAccept} onClickOutSite={onAccept} title="Th??ng b??o">
        <Box
          maxWidth={600}
        >
          <Text
            color="white"
            fontSize="18px"
            lineHeight="22px"
            fontWeight="bold"
            textAlign="center">
            Y??u c???u t???o nh???c ch??? b??i h??t {wsPlayer.wsState.currentSong?.title} ???? ???????c ti???p nh???n. Vui l??ng ch??? h??? th???ng ph?? duy???t trong 24 gi???.
            <Text
              color="white"
              fontSize="18px"
              lineHeight="22px"
              fontWeight="bold"
              mt={2}
              textAlign="center">
              Ki???m tra tr???ng th??i b??i h??t nh???c ch??? <span>
                <a className="text-underline"
                  href="/ca-nhan/nhac-cho-sang-tao">
                  t???i ????y.
                </a>
              </span>
            </Text>

          </Text>
        </Box>
      </Alert>
    </Section>


  );
}

