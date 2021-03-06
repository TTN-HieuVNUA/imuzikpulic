import { useRoute } from '@react-navigation/native';
import getConfig from 'next/config';
import React, { useState } from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

import { Icon, InputWithButton } from '../components';
import { ModalBox } from '../platform/ModalBox';
import { useGoBack } from '../platform/go-back';
import { Button, Flex, Text, Box } from '../rebass';
import { useAlert, useNavigationLink } from '../platform/links';
import * as SMS from 'expo-sms';

export const PopupScreenBase = (props: {
  title?: string;
  content?: string;
  songSlug?: string;
  action?: () => void;
  type?:
    | 'confirm'
    | 'cancel'
    | 'share'
    | 'cancel1stack'
    | 'requireLogin'
    | 'create-rbt'
    | 'invite-download'
    | 'navigation-to-rbt-packages';
}) => {
  const dismiss = useGoBack();
  const navigatorToCreateRbt = useNavigationLink('/tao-nhac-cho');
  const navigatorLogin = useNavigationLink('login');
  const navigatorToRbtPackages = useNavigationLink('/ca-nhan/goi-cuoc');
  const navigationToRbtManager = useNavigationLink('/quan-ly-nhac-cho');
  const toRbtPackages = () => {
    dismiss();
    navigatorToRbtPackages();
  };

  const requiredLogin = () => {
    dismiss();
    navigatorLogin();
  };

  const closeModalGift = () => {
    dismiss();
    props.action;
    dismiss();
  };
  const closeModalGift1Stack = () => {
    dismiss();
    props.action;
  };

  const checkGiftNumber = (giftNumber: string): boolean => {
    // const vnf_regex = /((086|096|097|098|032|033|034|035|036|037|038|039)+([0-9]{7})\b)/g;
    const vnf_regex = /^(0|84|\\+84)[1-9]([0-9]{8})/g;
    return vnf_regex.test(giftNumber);
  };

  const sendMessage = async (phone: string, code: string | undefined) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      await SMS.sendSMSAsync(['1221'], 'MOI ' + `${code}` + ` ${phone}`);
    }
  };
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const showPopup = useAlert({ type: 'cancel', action: dismiss });

  const { publicRuntimeConfig = {} } = getConfig() || {};
  global.Buffer = require('buffer').Buffer;
  const SHARE_LINK = `${publicRuntimeConfig.HOST}/bai-hat/${props.songSlug}`;
  // APP_ID ???? for Facebook Messenger Share
  const SHARE_SOCIAL: { key: number; name: string; src: ImageSourcePropType; link: string }[] = [
    {
      key: 0,
      name: 'Facebook',
      src: require('../../assets/logo-facebook.png'),
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(SHARE_LINK)}`,
    },
    {
      key: 1,
      name: 'Zalo',
      src: require('../../assets/logo-zalo.png'),
      link: `https://sp.zalo.me/share_inline?d=${encodeURI(
        global.Buffer.from(`{"url":"${SHARE_LINK}"}`).toString('base64')
      )}`,
    },
    // {
    //   key: 2,
    //   name: 'Messenger',
    //   src: require('../../assets/logo-messenger.png'),
    //   link: `https://www.facebook.com/dialog/send?app_id=${123456789}&link=${encodeURI(
    //     SHARE_LINK
    //   )}&redirect_uri=${encodeURI(SHARE_LINK)}`,
    // },
  ];
  return (
    <ModalBox type="popup" heightRatio={0} px={3} pb={5}>
      <Text textAlign="center" fontWeight={700} fontSize={4}>
        {props.title}
      </Text>
      {props.type === 'share' ? (
        <>
          <Box position="absolute" right={3}>
            <TouchableOpacity onPress={dismiss}>
              <Icon name="round-cross-solid-2" size={24} />
            </TouchableOpacity>
          </Box>
          <Box display="flex" flexDirection="row" overflowX="auto" mr={-3} pt={6} pb={4}>
            {SHARE_SOCIAL.map((i) => (
              <Box display="flex" mr="31px">
                <TouchableOpacity onPress={() => window.open(i.link, '_blank')}>
                  <Image source={i.src} style={{ width: 64, height: 64 }} />
                </TouchableOpacity>
                <Text mt="8px" textAlign="center" lineHeight="22px">
                  {i.name}
                </Text>
              </Box>
            ))}
          </Box>
          <InputWithButton
            borderRadius={16}
            height={48}
            gradient={false}
            backgroundColor="#3d3d3f"
            value={SHARE_LINK}
            color="#848484"
            editable={false}
            text="SAO CH??P"
            textColor="#fccc26"
            textSize={14}
            onPress={() => navigator.clipboard.writeText(SHARE_LINK)}
          />
        </>
      ) : (
        <>
          {props.type === 'confirm' && (
            <Box>
              <Text textAlign="center" fontWeight={400} fontSize={16} px={5} py={5}>
                {props.content}
              </Text>
              <Flex flexDirection="row">
                <Button width={5 / 12} size="medium" variant="transparent" mt={4} onPress={dismiss}>
                  B??? qua
                </Button>
                <Button
                  width={7 / 12}
                  size="medium"
                  variant="secondary"
                  fontSize={2}
                  mt={4}
                  onPress={() => {
                    dismiss();
                    props.action?.();
                  }}>
                  ?????ng ??
                </Button>
              </Flex>
            </Box>
          )}
          {props.type === 'cancel' && (
            <Box>
              <Text textAlign="center" fontWeight={400} fontSize={16} px={5} py={5}>
                {props.content}
              </Text>
              <Flex alignItems="center">
                <Button
                  width={7 / 12}
                  size="medium"
                  variant="secondary"
                  fontSize={2}
                  mt={4}
                  onPress={closeModalGift}>
                  ????ng
                </Button>
              </Flex>
            </Box>
          )}
          {props.type === 'cancel1stack' && (
            <Box>
              <Text textAlign="center" fontWeight={700} fontSize={4}>
                Th??ng b??o
              </Text>
              <Text textAlign="center" fontWeight={400} fontSize={16} px={5} py={5}>
                {props.content}
              </Text>
              <Flex alignItems="center">
                <Button
                  width={7 / 12}
                  size="medium"
                  variant="secondary"
                  fontSize={2}
                  mt={4}
                  onPress={closeModalGift1Stack}>
                  ????ng
                </Button>
              </Flex>
            </Box>
          )}
          {props.type === 'requireLogin' && (
            <Box>
              <Text textAlign="center" fontWeight={700} fontSize={4}>
                Th??ng b??o
              </Text>
              <Text textAlign="center" fontWeight={400} fontSize={16} px={5} py={5}>
                {props.content}
              </Text>
              <Flex flexDirection="row">
                <Button width={5 / 12} size="medium" variant="transparent" mt={4} onPress={dismiss}>
                  B??? qua
                </Button>
                <Button
                  width={7 / 12}
                  size="medium"
                  variant="secondary"
                  fontSize={2}
                  mt={4}
                  onPress={requiredLogin}>
                  ?????ng ??
                </Button>
              </Flex>
            </Box>
          )}
          {props.type === 'invite-download' && (
            <Box>
              <Text textAlign="center" fontWeight={400} fontSize={16} px={1} py={5}>
                M???i b???n nh???p s??? ??i???n tho???i m???i t???i nh???c ch???!
              </Text>
              <InputWithButton
                placeholder="*Nh???p s??? ??i???n tho???i ng?????i nh???n"
                gradient={false}
                backgroundColor="transparent"
                height={48}
                border
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <Flex flexDirection="row">
                <Button width={5 / 12} size="medium" variant="transparent" mt={4} onPress={dismiss}>
                  B??? qua
                </Button>
                <Button
                  width={7 / 12}
                  size="medium"
                  variant="secondary"
                  fontSize={2}
                  mt={4}
                  onPress={() =>
                    checkGiftNumber(phoneNumber)
                      ? sendMessage(phoneNumber, props.content)
                      : showPopup({
                          content: 'S??? TB b???n nh???p kh??ng ????ng, vui l??ng nh???p l???i s??? TB kh??c',
                        })
                  }>
                  ?????ng ??
                </Button>
              </Flex>
            </Box>
          )}
          {props.type === 'navigation-to-rbt-packages' && (
            <Box>
              <Text textAlign="center" fontWeight={700} fontSize={4}>
                Th??ng b??o
              </Text>
              <Text textAlign="center" fontWeight={400} fontSize={16} px={5} py={5}>
                {props.content}
              </Text>
              <Flex flexDirection="row">
                <Button width={5 / 12} size="medium" variant="transparent" mt={4} onPress={dismiss}>
                  B??? qua
                </Button>
                <Button
                  width={7 / 12}
                  size="medium"
                  variant="secondary"
                  fontSize={2}
                  mt={4}
                  onPress={toRbtPackages}>
                  G??i c?????c
                </Button>
              </Flex>
            </Box>
          )}
          {props.type === 'create-rbt' && (
            <Box>
              <Flex flexDirection="row" justifyContent="center">
                <Text textAlign="center" fontWeight={700} fontSize={4} style={{ top: -20 }}>
                  Th??ng b??o
                </Text>
                <Box position="absolute" width="100%" alignItems="flex-end">
                  <TouchableOpacity onPress={dismiss} style={{ top: -20 }}>
                    <Icon name="round-cross-solid-2" size={28} />
                  </TouchableOpacity>
                </Box>
              </Flex>

              <Text textAlign="center" fontWeight={400} fontSize={16} px={2} py={2}>
                Ch??c m???ng b???n ???? t???o nh???c ch??? th??nh c??ng, ????? c?? th??? s??? d???ng b??i nh???c c???a b???n s??? ???????c
                ki???m duy???t trong 3 ng??y l??m vi???c.
              </Text>
              <Box
                height={60}
                bg="lightBackground"
                alignItems="center"
                justifyContent="space-between"
                borderRadius={15}
                px={3}
                flexDirection="row">
                <Text textAlign="center" fontWeight={400} fontSize={16} color={'#848484'}>
                  M?? nh???c ch??? l?? {props.content}
                </Text>
                <Text textAlign="center" color="primary" fontWeight={400} fontSize={16}>
                  Ch??? ph?? duy???t
                </Text>
              </Box>
              <Flex flexDirection="row">
                <Button
                  width={5 / 12}
                  size="medium"
                  variant="transparent"
                  mt={4}
                  onPress={navigatorToCreateRbt}>
                  T???o th??m
                </Button>
                <Button
                  width={7 / 12}
                  size="medium"
                  variant="secondary"
                  fontSize={2}
                  mt={4}
                  onPress={navigationToRbtManager}>
                  Qu???n l?? nh???c ch???
                </Button>
              </Flex>
            </Box>
          )}
        </>
      )}
    </ModalBox>
  );
};

export const PopupScreen = () => {
  const route: {
    params?: {
      songSlug?: string;
      toneCode?: string;
      type?: 'confirm' | 'cancel' | 'share' | 'cancel1stack' | 'requireLogin';
      action?: () => void;
    };
  } = useRoute();
  return <PopupScreenBase {...route.params} />;
};
