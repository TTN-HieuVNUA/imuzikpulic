import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Dimensions, View, StyleSheet, Image } from 'react-native';
import { Box, Text, Flex, Button } from '../../rebass';
import { AnimatedEq, HeaderClose, InputWithButton, } from '../../components';
import { Icon, ICON_GRADIENT_1, IconName } from '../../components/svg-icon';
import * as DocumentPicker from 'expo-document-picker';
import { NavLink } from '../../platform/links';
import { useAlert } from '../../platform/links';

import { Audio } from 'expo-av';
import CircularProgress from '../../components/circularProgress/index';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function CreateRbtFromDevice() {
    const [doc, setDoc] = useState({ name: '', size: '', uri: '' });
    const [isPlay, setIsPlay] = useState(false);
    const soundObj = useRef(new Audio.Sound());
    const [isChooseAudio, setIsChooseAudio] = useState(false);
    const [errorSongName, setErrorSongName] = useState('')
    const [errorSingerName, setErrorSingerName] = useState('')
    const [errorComposer, setErrorComposer] = useState('')
    const [data, setData] = React.useState({
        songName: '',
        singerName: '',
        composer: '',
        check_textInputChange: false,
        isValidsongName: false,
        isValidsingerName: false,
        isValidcomposer: false,
    });

    const errorPopup = useAlert({ type: 'cancel1stack' });
    const createPopup = useAlert({ type: 'create-rbt' });
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setData({
                    ...data,
                    songName: '',
                    singerName: '',
                    composer: '',
                    check_textInputChange: false,
                    isValidsongName: false,
                    isValidsingerName: false,
                    isValidcomposer: false,
                });
                doPause()
            };
        }, [])
    );

    useEffect(() => {
        const countTimer = setInterval(() => {
            setIsChooseAudio(false);
        }, 3005);
        return function cleanup() {
            clearInterval(countTimer);
        };
    });

    const pickDocument = async () => {
        doPause();
        await DocumentPicker.getDocumentAsync({
            type: 'audio/*',
            copyToCacheDirectory: true,
        }).then((response: { type?: any; name?: any; size?: any; uri?: any }) => {
            if (response.type === 'success') {
                let { name, size, uri, type } = response;
                if (formatBytes(size) > 5) {
                    errorPopup({ content: 'Bài hát đăng tải có dung lượng tối đa 5MB!' ?? 'Hệ thống bận!' });
                } else {
                    let nameParts = name.split('.');
                    let fileType = nameParts[nameParts.length - 1];
                    if (fileType !== 'mp3') {
                        errorPopup({ content: `Bài hát phải có định dạng Mp3` ?? 'Hệ thống bận!' });
                    } else {
                        checkDurationMillis(fileType, name, size, uri);
                    }
                }
            }
        });
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

    const checkDurationMillis = async (type?: any, name?: any, size?: any, uri?: any) => {
        await soundObj.current.loadAsync({ uri: uri }, { isLooping: true, shouldPlay: true });
        const result = await soundObj.current.getStatusAsync();
        await soundObj.current.stopAsync();
        await soundObj.current.unloadAsync();
        if (result.isLoaded) {
            if (result.durationMillis) {
                const minute = Math.floor((result.durationMillis) / 60000) * 60;
                const second = (result.durationMillis % 60000 / 1000);
                const totalSecond = minute + second;

                const kbit = size / 128;//calculate bytes to kbit
                const kbps = Math.ceil(Math.round(kbit / totalSecond) / 16) * 16;

                if (totalSecond < 30) {
                    errorPopup({ content: 'Thời lượng của bài hát quá ngắn, vui lòng chọn bài nhiều hơn 30 giây' });
                } else if (kbps <= 128) {
                    let fileToUpload = {
                        name: name,
                        size: size,
                        uri: uri,
                        type: 'application/' + type,
                    };
                    setDoc(fileToUpload);
                    setIsChooseAudio(true);
                } else {
                    errorPopup({ content: 'Chỉ tải lên file nhạc < 128kbps' });
                }
            }
        }
    }

    const doPlay = async () => {
        setIsPlay(true)
        try {
            await soundObj.current.loadAsync({ uri: doc.uri }, { isLooping: true, shouldPlay: true });
            await soundObj.current.playAsync();
        } catch (error) {
            console.log(error);
        }
    }

    const doPause = async () => {
        setIsPlay(false);
        try {
            await soundObj.current.stopAsync();
            await soundObj.current.unloadAsync();
        } catch (error) {
            console.log(error);
        }
    };

    const ChartSongAction = (props: { icon: IconName; onPress?: () => void }) => {
        return (
            <TouchableOpacity onPress={props.onPress}>
                <Flex flexDirection="column" alignItems="center" p={2}>
                    <Icon name={props.icon} size={20} />
                </Flex>
            </TouchableOpacity>
        );
    };

    const textInputChangesongName = (val?: any) => {
        const specialChars = /^[a-zA-Z0-9| _]+$/;
        if (val.trim().length >= 6 && val.trim().length <= 100 && specialChars.test(val)) {
            setErrorSongName('')
            setData({
                ...data,
                songName: val,
                isValidsongName: true
            });
        } else if (val.trim().length === 0) {
            setErrorSongName('')
            setData({
                ...data,
                songName: val,
                isValidsongName: false
            });
        } else {
            setErrorSongName('Tên bài hát cho phép nhập kí tự chữ và số.độ dài 6-100 ký tự. Không cho phép nhập tiếng việt có dấu')
            setData({
                ...data,
                songName: val,
                isValidsongName: false
            });
        }
    }

    const textInputChangesingerName = (val?: any) => {
        const specialChars = /^[a-zA-Z| _]+$/;
        if (val.trim().length >= 6 && val.trim().length <= 255 && specialChars.test(val)) {
            setErrorSingerName('')
            setData({
                ...data,
                singerName: val,
                isValidsingerName: true
            });
        } else if (val.trim().length === 0) {
            setErrorSingerName('')
            setData({
                ...data,
                singerName: val,
                isValidsingerName: false
            });
        } else {
            setErrorSingerName('Tên ca sĩ cho phép nhập kí tự chữ.độ dài 6-100 ký tự. Không cho phép nhập tiếng việt có dấu')
            setData({
                ...data,
                singerName: val,
                isValidsingerName: false
            });
        }
    }

    const textInputChangecomposer = (val?: any) => {
        const specialChars = /^[a-zA-Z| _]+$/;
        if (val.trim().length >= 6 && val.trim().length <= 255 && specialChars.test(val)) {
            setErrorComposer('')
            setData({
                ...data,
                composer: val,
                isValidcomposer: true
            });
        } else if (val.trim().length === 0) {
            setErrorComposer('')
            setData({
                ...data,
                composer: val,
                isValidcomposer: true
            });
        } else {
            setErrorComposer('Tên nhạc sĩ cho phép nhập kí tự chữ.độ dài 6-100 ký tự. Không cho phép nhập tiếng việt có dấu')
            setData({
                ...data,
                composer: val,
                isValidcomposer: false
            });
        }
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            bounces={false}
            showsVerticalScrollIndicator={false}>
            <Box bg="defaultBackground" position="relative" height={Dimensions.get('window').height}>
                <Flex flexDirection="row" justifyContent="flex-end">
                    <HeaderClose />
                </Flex>
                <Flex flexDirection="row" alignItems="center" mx={2}>
                    <Icon name="file-upload" size={50} color={ICON_GRADIENT_1} />
                    <Text ml={2} fontSize={20} fontWeight="bold" >
                        Tạo nhạc chờ {'\n'}từ Đăng tải bài hát
                    </Text>
                </Flex>
                <Flex mx={2}>
                    <Text fontSize={14} mt={2} fontWeight="bold" >
                        Upload bài hát bạn muốn tạo nhạc chờ {'\n'}(định dạng mp3, 128kbps)
                    </Text>

                    <Button variant="secondary1" size={'largest'} mt={2} onPress={pickDocument}>
                        CHỌN BÀI HÁT
                    </Button>

                    {doc?.uri ? (
                        <Flex
                            borderRadius={8}
                            bg="rgba(0, 0, 0, 0.4)"
                            css={{
                                overflow: 'hidden',
                            }}
                            mt={2}>
                            <Flex
                                borderRadius={8}
                                flexDirection="row"
                                alignItems="center"
                                px={3}
                                height={64}
                                pl={0}
                                css={{
                                    height: 80,
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}
                            >
                                {!isChooseAudio ? (
                                    <Flex ml={1} mr={1} width={25} alignItems="center">
                                        <AnimatedEq size={14} animated={isPlay} />
                                    </Flex>
                                ) : (
                                    <Box ml={1} mr={1} width={25} alignItems="center">
                                        <Text fontSize={2} color="lightText">

                                        </Text>
                                    </Box>
                                )}

                                <Flex flex={1} alignItems="center" flexDirection="row">
                                    <Flex
                                        borderRadius={20}
                                        justifyContent="center"
                                        alignItems="center"
                                        mr={3}>
                                        <Logo />
                                    </Flex>
                                    <Flex flex={4}>
                                        <Text
                                            fontSize={14}
                                            width={0.95}
                                            numberOfLines={1}
                                            fontWeight={700}
                                        // color="#FFFFFF"
                                        >
                                            {doc.name}
                                        </Text>
                                        <Text fontSize={[2, 3, 4]} color="#B2B2B2">
                                            Không tên
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex alignItems="center">
                                    {isChooseAudio ? (
                                        <View style={{
                                            paddingRight: -25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: 40,
                                            width: 40,
                                        }}>
                                            <CircularProgress
                                                radius={62}
                                                value={100}
                                                fontSize={8}
                                                valueSuffix={'%'}
                                                inActiveStrokeColor={'#2ecc71'}
                                                inActiveStrokeOpacity={0.1}
                                                inActiveStrokeWidth={100}
                                                activeStrokeColor={'#ecf0f1'}
                                                duration={3000}
                                                textColor={'#ecf0f1'}
                                                subtitleColor={'#ecf0f1'}
                                                textStyle={{ right: -22, top: -25 }}
                                            />
                                        </View>
                                    ) : (
                                        <ChartSongAction
                                            icon={isPlay ? 'player-pause' : 'player-play'}
                                            onPress={isPlay ? doPause : doPlay}
                                        />
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>

                    ) : undefined}
                </Flex>

                <Flex flex={1} mx={2} mt={2}>
                    <Flex
                        flexDirection="row"
                        alignItems="center"
                        borderBottomColor="tabBar">
                        <InputWithButton
                            maxLength={100}
                            gradient
                            border={false}
                            value={data.songName}
                            onChangeText={(val) => textInputChangesongName(val)}
                            placeholder="Tên bài hát *"
                            placeholderTextColor="#848484"
                            flex={1}
                        />

                    </Flex>
                    {errorSongName ? (
                        <Text fontSize={12} mt={1} color='red'>
                            {errorSongName}
                        </Text>
                    ) : undefined}

                    <Flex
                        mt={2}
                        flexDirection="row"
                        alignItems="center"
                        borderBottomColor="tabBar">
                        <InputWithButton
                            maxLength={254}
                            gradient
                            border={false}
                            value={data.singerName}
                            onChangeText={(val) => textInputChangesingerName(val)}
                            placeholder="Tên ca sỹ *"
                            placeholderTextColor="#848484"
                            flex={1}
                        />
                    </Flex>
                    {errorSingerName ? (
                        <Text fontSize={12} mt={1} color='red'>
                            {errorSingerName}
                        </Text>
                    ) : undefined}
                    <Flex
                        mt={2}
                        flexDirection="row"
                        alignItems="center"
                        borderBottomColor="tabBar">
                        <InputWithButton
                            maxLength={254}
                            gradient
                            border={false}
                            value={data.composer}
                            onChangeText={(val) => textInputChangecomposer(val)}
                            placeholder="Tên nhạc sỹ *"
                            placeholderTextColor="#848484"
                            flex={1}
                        />
                    </Flex>
                    {errorComposer ? (
                        <Text fontSize={12} mt={1} color='red'>
                            {errorComposer}
                        </Text>
                    ) : undefined}
                </Flex>
                <Flex mx={2} style={{ marginBottom: 10 }}>
                    {
                        !doc?.uri || !data.isValidsongName || !data.isValidsingerName || !data.isValidcomposer ? (
                            <Flex
                                borderRadius={8}
                                bg="rgba(0, 0, 0, 0.4)"
                                css={{
                                    overflow: 'hidden',
                                }}
                                height={55}
                            >
                                <Flex
                                    borderRadius={8}
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    px={3}
                                    height={55}
                                    pl={0}
                                    css={{
                                        height: 65,
                                        overflow: 'hidden',
                                        position: 'relative',
                                    }}
                                >
                                    <Icon name="file-upload" size={17} color="#848484" />
                                    <Text ml={2} fontSize={17} fontWeight="bold" color="#848484">
                                        ĐĂNG TẢI BÀI HÁT
                                    </Text>
                                </Flex>
                            </Flex>
                        ) : (
                            <NavLink
                                {...{
                                    route: '/cat-nhac/[type]/[name][url][id]',
                                    params: {
                                        type: 'offline',
                                        url: doc.uri,
                                        name: doc.name,
                                        songName: data.songName,
                                        singerName: data.singerName,
                                        composer: data.composer
                                    },
                                }}>
                                <Flex
                                    height={56}
                                    borderRadius={8}
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    backgroundColor="#FDCC26">
                                    <Icon name="file-upload" size={17} color="gray" />
                                    <Text ml={2} fontSize={17} fontWeight="bold" color="gray">
                                        ĐĂNG TẢI BÀI HÁT
                                    </Text>
                                </Flex>
                            </NavLink>
                        )}
                </Flex>
            </Box>
        </KeyboardAwareScrollView >
    );
}

export const Logo = () => {
    return (
        <Image
            resizeMode="cover"
            source={
                require('../../../assets/music.png')
            }
            style={{ width: 40, height: 40 }}
        />
    );
};
