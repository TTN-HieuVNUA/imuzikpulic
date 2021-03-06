import { useTheme } from 'emotion-theming';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Text } from 'rebass';
import { Section } from '../components';
import { Theme } from '../themes';
import ReactDOM from 'react-dom';
import jsmediatags from 'jsmediatags';
import { useCreateRbtUnavailableMutation, useMeQuery } from '../queries';
import { useToasts } from 'react-toast-notifications';
import { useLoginContext } from './Login';
import { CreativeSong } from '../components/CreativeSong';
import WS from '../components/WaveSurfer/WS';
import Alert from './Alert';
import { TagType } from 'jsmediatags/types';
import { useWsPlayer } from '../components/WaveSurfer/WsProvider';
import { useHistory } from "react-router-dom";

const
  enum StatusProgress {
  creating,
  pending,
  created,
}

type FileApi = {
  file: File,
  songName: String,
  singerName: String,
  artirstName: String
}

const CreativeUnavailable = ({ setType }: any) => {
  const imgDefaultMusic = '../../public/imgs/logo.png';
  let regex_songName = /^[a-zA-Z0-9| _]+$/;
  let regex_singerName_artisrtName = /^[a-zA-Z| _]+$/;
  const router = useHistory();
  const [status, setStatus] = useState<StatusProgress>(0);
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);

  const [checkValidateV, setCheckValidateV] = useState<boolean>(false);


  const [createRbt] = useCreateRbtUnavailableMutation();
  const { addToast } = useToasts();
  const { data: meData } = useMeQuery();
  const { showLogin } = useLoginContext();
  const wsPlayer = useWsPlayer();

  const [checkRender, setCheckRender] = useState(false);

  const loading_screen = document.getElementById('ipl-progress-indicator');

  const [uploadFile, setUploadFile] = useState<File>(null);
  const [uploadFileUrl, setUploadFileUrl] = useState(null);
  const [imageMp3Url, setImageMp3Url] = useState(null);


  const [FileUploadObj, setFileUploadObj] = useState<FileApi>({
    file: uploadFile,
    songName: null,
    singerName: null,
    artirstName: null
  });

  const [tags, setTags] = useState<TagType>({ type: '', tags: {} });

  useEffect(() => {
    if (status !== StatusProgress.pending) {
      loading_screen.classList.add('available');
    }
  }, [status]);


  useEffect(() => {
    setFileUploadObj({ ...FileUploadObj, file: uploadFile });

    if (uploadFile === null || uploadFile === undefined) {
      return
    } else {
      jsmediatags.read(uploadFile, {
        onSuccess: (tags) => {
          setTags(tags);
          setUploadFileUrl(window.URL.createObjectURL(uploadFile));
          var image = tags.tags.picture;
          if (image) {
            var base64String = "";
            for (var i = 0; i < image.data.length; i++) {
              base64String += String.fromCharCode(image.data[i]);
            }
            var base64 = "data:image/jpeg;base64," +
              window.btoa(base64String);
            setImageMp3Url(base64);
          }
        },
        onError: () => { },
      });
    }
  }, [uploadFile]);
  const onAlertValidateSongName = (e: any) => {
    if (!FileUploadObj.songName || !regex_songName.test(FileUploadObj.songName.trim().toString()) || FileUploadObj.songName.trim().length < 6) {
      addToast('T??n b??i h??t cho ph??p nh???p k?? t??? ch??? v?? s???, ????? d??i 6-100 k?? t???. Kh??ng cho ph??p nh???p ti???ng vi???t c?? d???u', {
        appearance: 'error',
        autoDismiss: true,
      });
      return
    }
  }
  const onAlertValidateSingerName = (e: any) => {
    if (!FileUploadObj.singerName || !regex_singerName_artisrtName.test(FileUploadObj.singerName.trim().toString()) || FileUploadObj.singerName.trim().length < 6) {
      addToast('T??n ca s?? cho ph??p nh???p k?? t??? ch???, ????? d??i 6-100 k?? t???. Kh??ng cho ph??p nh???p ti???ng vi???t c?? d???u', {
        appearance: 'error',
        autoDismiss: true,
      });
      return
    }
  }
  const onAlertValidateArtirstName = (e: any) => {
    if (!FileUploadObj.artirstName || !regex_singerName_artisrtName.test(FileUploadObj.artirstName.trim().toString()) || FileUploadObj.artirstName.trim().length < 6) {
      addToast('T??n nh???c s?? cho ph??p nh???p k?? t??? ch???, ????? d??i 6-100 k?? t???. Kh??ng cho ph??p nh???p ti???ng vi???t c?? d???u', {
        appearance: 'error',
        autoDismiss: true,
      });
      return
    }
  }

  function checkValidate(): boolean {
    let check = true;
    if (FileUploadObj.file &&
      FileUploadObj.songName &&
      FileUploadObj.singerName &&
      FileUploadObj.artirstName) {
      if (!regex_songName.test(FileUploadObj.songName.trim().toString()) || FileUploadObj.songName.trim().length < 6) {
        check = false;
      } else
        if (!regex_singerName_artisrtName.test(FileUploadObj.singerName.trim().toString()) || FileUploadObj.singerName.trim().length < 6) {
          check = false;
        } else
          if (!regex_singerName_artisrtName.test(FileUploadObj.artirstName.trim().toString()) || FileUploadObj.artirstName.trim().length < 6) {
            check = false;
          } else {
            check = true;
          }
    } else {
      check = false;
    }
    return check;
  }

  useEffect(() => {
    console.log("checkVL", checkValidate());
    setCheckValidateV(checkValidate());
  }, [FileUploadObj]);

  const handleCreateCreative = () => {
    if (!meData?.me) {
      return showLogin?.();
    }
    if (!wsPlayer.wsState.isReady) return;
    createRbt({
      variables: {
        composer: FileUploadObj.artirstName.toString(),
        singerName: FileUploadObj.singerName.toString(),
        songName: FileUploadObj.songName.toString(),
        file: FileUploadObj.file,
        time_start: wsPlayer.wsState.timeRegions[0].toString(),
        time_stop: wsPlayer.wsState.timeRegions[1].toString(),
      },
    })
      .then(res => {
        // Return data from create
        const data = res.data.createRbtUnavailable;
        // console.log('res', res)
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
        // console.log(e);
        addToast('H??? th???ng b???n!', {
          appearance: 'error',
          autoDismiss: true,
        });
        setStatus(StatusProgress.creating);
      });
    loading_screen.classList.remove('available');
    setStatus(StatusProgress.pending);
  };

  const formatBytes = (bytes: number, decimals = 2): number => {
    if (bytes === 0) return 0;

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    if (sizes[i] == 'KB') return parseFloat(((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]) / 1024

    return (
      parseFloat(((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i])
    );
  }

  const onChangeFile = (files: FileList) => {
    let audio = new Audio(URL.createObjectURL(files[0]));
    audio.addEventListener('loadedmetadata', (e: any) => {
      // console.log('size', formatBytes(files[0].size));
      console.log('kbps c???a b??i h??t: ', Math.ceil(Math.round((files[0].size / 128) / e.target.duration) / 16) * 16);

      if (e.target.duration < 30) {
        addToast('Th???i l?????ng c???a b??i h??t qu?? ng???n, vui l??ng ch???n b??i nhi???u h??n 30 gi??y', {
          appearance: 'error',
          autoDismiss: true,
        });
        return;
      } else if (formatBytes(files[0].size) > 5) {
        addToast('B??i h??t ????ng t???i c?? dung l?????ng t???i ??a 5MB', {
          appearance: 'error',
          autoDismiss: true,
        });
        return;
      } else if (Math.ceil(Math.round((files[0].size / 128) / e.target.duration) / 16) * 16 > 128) {
        addToast('Ch??? t???i l??n file nh???c < 128kpbs', {
          appearance: 'error',
          autoDismiss: true,
        });
        return;
      } else {
        // console.log(files[0]);
        setUploadFile(files[0]);
      }
    });
  };

  const OnDeleteInformation = () => {
    setUploadFile(null);
    setUploadFileUrl(null);
    FileUploadObj.songName = null;
    FileUploadObj.singerName = null;
    FileUploadObj.artirstName = null;
    setType(null);
  }
  const OnAcceptInfo = () => {
    setFileUploadObj({ ...FileUploadObj, songName: FileUploadObj.songName.trim(), singerName: FileUploadObj.singerName.trim(), artirstName: FileUploadObj.artirstName.trim() })
    console.log('FileUploadObj', FileUploadObj);
    if (FileUploadObj.file &&
      FileUploadObj.songName &&
      FileUploadObj.singerName &&
      FileUploadObj.artirstName) {
      document.getElementById('info-create-a-song-unvaiable').hidden = true;
      setCheckRender(true);
    } else {
      return;
    }

  }
  const onAccept = () => {
    setIsOpenAlert(false)
  }

  const onChangeGetSongNameValue = (event: any) => {
    setFileUploadObj({ ...FileUploadObj, songName: event.target.value });
    checkValidate();
  }

  const onChangeGetSingerNameValue = (event: any) => {
    setFileUploadObj({ ...FileUploadObj, singerName: event.target.value });
    checkValidate();
  }

  const onChangeGetArtirstNameValue = (event: any) => {
    setFileUploadObj({ ...FileUploadObj, artirstName: event.target.value });
    checkValidate();
  }

  const songName = (songName: string): string => {
    let SongName = songName;
    if (songName.length > 58) {
      SongName = songName.slice(0, 58) + "...";
    }
    return SongName;
  }

  const theme = useTheme<Theme>();
  return (
    <Section>
      <Box height={566}>
        <Text color={'primary'} fontSize={5} mb={45}>
          T???o nh???c ch??? m???i t??? b??i h??t ch??a c?? tr??n Imuzik
        </Text>

        <Box id="info-create-a-song-unvaiable">
          <Box
            style={{ display: 'flex', alignItems: 'baseline', marginBottom: '20px' }}
            id="label-uploadFile"
          >
            <Text color="#979797" fontSize={3}>
              Upload b??i h??t b???n mu???n t???o nh???c ch??? (?????nh d???ng mp3, 128kbps)
            </Text>
            <input
              id="load-mp3"
              type={'file'}
              accept={'.mp3'}
              onChange={(event) => onChangeFile(event.target.files)}
              hidden
            />
            <Button
              variant={'outline'}
              css={{ height: 38, fontSize: theme.fontSizes[3], padding: 0, marginLeft: 20 }}>
              <label
                htmlFor="load-mp3"
                style={{
                  padding: '8px 16px',
                }}>
                T???i nh???c l??n
              </label>
            </Button>
          </Box>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ width: '1000px', padding: '7px', marginBottom: '20px', color: `${theme.colors.normalText}` }}>
              T??n b??i h??t <span style={{ color: 'red' }}>*</span></label><br />
            <input style={{ width: '1000px', height: '50px', borderRadius: '8px', outline: 'none', border: `1px solid ${theme.buttons.outline}` }}
              type='text'
              minLength={6}
              maxLength={100}
              onChange={(event) => onChangeGetSongNameValue(event)}
              onBlur={(e) => { onAlertValidateSongName(e) }}
            />

          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ width: '1000px', padding: '7px', marginBottom: '20px', color: `${theme.colors.normalText}` }}>
              T??n ca s?? <span style={{ color: 'red' }}>*</span>
            </label><br />
            <input style={{ width: '1000px', height: '50px', borderRadius: '8px', outline: 'none', border: `1px solid ${theme.buttons.outline}` }}
              type='text'
              minLength={6}
              maxLength={100}
              onChange={(event) => onChangeGetSingerNameValue(event)}
              onBlur={(e) => { onAlertValidateSingerName(e) }}
            />

          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ width: '1000px', padding: '7px', marginBottom: '20px', color: `${theme.colors.normalText}` }}>
              T??n t??c gi??? <span style={{ color: 'red' }}>*</span></label><br />
            <input style={{ width: '1000px', height: '50px', borderRadius: '8px', outline: 'none', border: `1px solid ${theme.buttons.outline}` }}
              type='text'
              minLength={6}
              maxLength={100}
              onChange={(event) => onChangeGetArtirstNameValue(event)}
              onBlur={(e) => { onAlertValidateArtirstName(e) }}
            />
          </div>
          <div>
            <button style={{
              width: '60px',
              height: '40px',
              border: '1px solid #FDCC26',
              borderRadius: '6px',
              marginRight: '10px',
              backgroundColor: '#262523',
              color: '#fff'
            }}
              onClick={() => OnDeleteInformation()}
            >
              H???y
            </button>

            <button
              style={{
                width: '100px',
                height: '40px',
                border: '1px solid #FDCC26',
                borderRadius: '6px',
                backgroundColor: '#FDCC26',
                opacity: checkValidateV ? '100%' : '30%',
                color: 'black',
              }}
              onClick={() => OnAcceptInfo()}
              disabled={!checkValidateV}
            >
              X??c nh???n
            </button>
          </div>
        </Box>

        {(status === StatusProgress.creating || status === StatusProgress.pending) && (
          <>
            {checkRender &&
              <Box>
                <Box
                  css={{
                    width: '100%',
                    maxWidth: '700px',
                    marginTop: '65px',
                    marginBottom: '20px'
                  }}>
                  <CreativeSong
                    image={` ${imageMp3Url ? imageMp3Url : imgDefaultMusic}`}
                    title={`${FileUploadObj.songName ? FileUploadObj.songName : 'unknown'}`}
                    singers={[{
                      id: null,
                      alias: `${FileUploadObj.singerName ? FileUploadObj.singerName : 'unknown'}`,
                      slug: `${FileUploadObj.artirstName ? FileUploadObj.artirstName : 'unknown'}`
                    }]}
                    isPlay={wsPlayer.wsState.isPlayIng}
                    onClick={() => wsPlayer.wsState.isReady && wsPlayer.handlePlayPause()}
                  />
                </Box>
                <Box backgroundColor={theme.colors.backgroundWs} overflow='display'>

                  {/*Ws Player*/}
                  <Box>
                    {uploadFileUrl &&
                      <WS
                        source={uploadFileUrl} />
                    }

                  </Box>
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
                        css={{ height: 38, fontSize: theme.fontSizes[3] }}
                        variant='primary'
                        onClick={() => wsPlayer.handlePlayRegion()}
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
                        variant='outline'
                        css={{ height: 38, fontSize: theme.fontSizes[3] }}
                        onClick={() => handleCreateCreative()}
                      >
                        T???o nh???c ch???
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            }

          </>
        )}
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
            Y??u c???u t???o nh???c ch??? b??i h??t {FileUploadObj.songName ? songName(FileUploadObj.songName.toString()) : "unknow"} ???? ???????c ti???p nh???n. Vui l??ng ch??? h??? th???ng ph?? duy???t trong 3 ng??y l??m vi???c.
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
};

export default CreativeUnavailable;
