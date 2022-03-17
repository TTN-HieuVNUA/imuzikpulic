import { ExecutionResult, MutationResult } from '@apollo/react-common';
import { useApolloClient } from '@apollo/react-hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { ICON_GRADIENT_1, Icon, InputWithButton, Logo } from '../components';
import { AUTH_USER_CAPTCHA_REQUIRE } from '../error-codes';
import { useModals } from '../hooks';
import { useTokenExpiry } from '../hooks/token-expiry';
import {
  AuthenticateMutation,
  useAuthenticateMutation,
  useGenerateCaptchaMutation,
  useLogoutMutation,
  useServerSettingsQuery,
} from '../queries';
import { Box, Button, Flex, Text } from '../rebass';
import Captcha from './Captcha';
import * as SMS from 'expo-sms';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useGoBack } from '../platform/go-back';
import { useNavigationLink } from '../platform/links';

export const useLogout = () => {
  const client = useApolloClient();
  const [logout] = useLogoutMutation();
  const navigatorProfile = useNavigationLink('/ca-nhan');
  return useCallback(async () => {
    try {
      await logout();
      await client.resetStore();
    } catch (e) {
      console.log(e);
    }
    navigatorProfile();
  }, [client, logout, navigatorProfile]);
};

const sendMessage = async () => {
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    await SMS.sendSMSAsync(['1221'], 'MK');
  }
};

const useLogin = (
  username: string,
  password: string,
  captcha: string
): [() => Promise<ExecutionResult<AuthenticateMutation>>, MutationResult<AuthenticateMutation>] => {
  const [authenticate, result] = useAuthenticateMutation();
  const client = useApolloClient();
  const { setAccessTokenExpiry, setRefreshTokenExpiry } = useTokenExpiry()!;
  const goBack = useGoBack();
  const login = useCallback(
    () =>
      authenticate({
        variables: {
          username,
          password,
          captcha,
        },
      }).then(async (res) => {
        if (res.data?.authenticate.success && res.data?.authenticate.result) {
          goBack();
          await client.resetStore();
          setAccessTokenExpiry(res.data.authenticate.result.accessTokenExpiry);
          setRefreshTokenExpiry(res.data.authenticate.result.refreshTokenExpiry);
        }
        return res;
      }),
    [
      authenticate,
      username,
      password,
      captcha,
      goBack,
      client,
      setAccessTokenExpiry,
      setRefreshTokenExpiry,
    ]
  );

  return [login, result];
};

export const LoginSection = () => {
  const { data: settingsData } = useServerSettingsQuery();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [requireCaptcha, setRequireCaptcha] = useState(0);
  const [captcha, setCaptcha] = useState('');
  const [captchaImg, setCaptchaImg] = useState('');
  const [error, setError] = useState<string | null>();
  const [login, { loading: loggingIn }] = useLogin(username, password, captcha);
  const [generateCaptcha] = useGenerateCaptchaMutation();

  const onForgotPasswordPress = useNavigationLink('popup', {
    title: 'Quên mật khẩu',
    type: 'confirm',
    content: settingsData?.serverSettings.serviceNumber,
    action: sendMessage,
  });

  const onRegisterPress = useNavigationLink('popup', {
    title: 'Đăng kí tài khoản',
    type: 'confirm',
    content: settingsData?.serverSettings.serviceNumber,
    action: sendMessage,
  });
  const modals = useModals();
  const onLoginPress = useCallback(async () => {
    setError('');
    return login().then(async (res) => {
      if (res.data?.authenticate.success) {
        modals?.pop();
      } else {
        if (requireCaptcha > 0 || res.data?.authenticate.errorCode === AUTH_USER_CAPTCHA_REQUIRE) {
          setCaptcha('');
          setRequireCaptcha(requireCaptcha + 1);
        }
        setError(res.data?.authenticate.message);
      }
    });
  }, [login, modals, requireCaptcha]);
  useEffect(() => {
    if (requireCaptcha) {
      generateCaptcha({ variables: { username } }).then(({ data }) => {
        setCaptchaImg(data?.generateCaptcha.result?.data ?? '');
      });
    }
  }, [generateCaptcha, requireCaptcha, username]);
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={{ paddingHorizontal: 15, flexGrow: 1, justifyContent: 'center' }}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <Flex alignItems="center" my={50}>
        <Logo size="lg" />
      </Flex>
      <Text fontSize={4} textAlign="center" color="normalText" fontWeight="bold" pb={5}>
        Đăng Nhập
      </Text>
      <Flex
        mb={2}
        flexDirection="row"
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="tabBar">
        <Icon name="mobile" size={22} color={ICON_GRADIENT_1} />
        <InputWithButton
          bg="transparent"
          placeholder="Số điện thoại"
          value={username}
          onChangeText={setUsername}
          flex={1}
        />
      </Flex>
      <Flex
        mb={2}
        flexDirection="row"
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="tabBar">
        <Icon name="lock" size={22} color={ICON_GRADIENT_1} />
        <InputWithButton
          bg="transparent"
          placeholder="Mật khẩu"
          textContentType="password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          flex={1}
        />
      </Flex>
      {requireCaptcha > 0 && (
        <Box mb={2}>
          <Box mb={2} alignItems="center">
            <Captcha content={captchaImg} />
          </Box>
          <Box>
            <InputWithButton placeholder="Mã xác thực" value={captcha} onChangeText={setCaptcha} />
          </Box>
        </Box>
      )}
      {!!error && (
        <Box mb={2}>
          <Text textAlign="center">{error}</Text>
        </Box>
      )}

      <Flex
      // alignItems="right" // Error on mobile app
      >
        <TouchableOpacity onPress={onForgotPasswordPress}>
          <Text color="normalText" textAlign="right" fontSize={2} py={2}>
            Quên mật khẩu
          </Text>
        </TouchableOpacity>
      </Flex>
      <Button variant="secondary" size="large" onPress={onLoginPress} disabled={loggingIn} mt={4}>
        ĐĂNG NHẬP
      </Button>

      <Flex flexDirection="row" py={20} alignItems="center">
        <Box height={1} bg="lightBackground" flex={1} />
        <Text mx={2}>hoặc</Text>
        <Box height={1} bg="lightBackground" flex={1} />
      </Flex>

      <Button variant="primary" size="large" onPress={onLoginPress} disabled={loggingIn}>
        TỰ ĐỘNG ĐĂNG NHẬP BẰNG 3G/4G
      </Button>
      <Flex
        alignItems="center"
        mt={3}
        // mt="10vh" // Error on mobile app
      >
        <TouchableOpacity onPress={onRegisterPress}>
          <Text color="normalText" textAlign="right" fontSize={13}>
            Bạn chưa có tài khoản?{' '}
            <Text color="primary" fontSize={13} fontWeight="bold">
              Đăng ký
            </Text>
          </Text>
        </TouchableOpacity>
      </Flex>
    </KeyboardAwareScrollView>
  );
};
