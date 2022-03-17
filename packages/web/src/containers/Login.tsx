import {
  AuthenticateMutation,
  useAuthenticateMutation,
  useGenerateCaptchaMutation,
  useLogoutMutation,
  useServerSettingsQuery,
} from '../queries';
import { Box, Button, Flex, Text } from 'rebass';
import { ExecutionResult, MutationResult } from '@apollo/react-common';
import React, { useCallback, useEffect, useState } from 'react';

import { AUTH_USER_CAPTCHA_REQUIRE } from '../error-codes';
import { Input } from '@rebass/forms';
import Modal from 'react-modal';
import { Section } from '../components';
import { useApolloClient } from '@apollo/react-hooks';
import { useTokenExpiry } from '../hooks/token-expiry';

export const useLogout = () => {
  const client = useApolloClient();
  const [logout] = useLogoutMutation();
  return useCallback(async () => {
    await logout();
    await client.resetStore();
  }, [client, logout]);
};

const useLogin = (
  username: string,
  password: string,
  captcha: string
): [() => Promise<ExecutionResult<AuthenticateMutation>>, MutationResult<AuthenticateMutation>] => {
  const [authenticate, result] = useAuthenticateMutation();
  const client = useApolloClient();
  const tokenExpiry = useTokenExpiry();
  const login = useCallback(
    () =>
      authenticate({
        variables: {
          username,
          password,
          captcha,
        },
      }).then(async (res) => {
        if (res.data?.authenticate.success) {
          await client.resetStore();
          tokenExpiry?.setAccessTokenExpiry(
            res.data?.authenticate.result?.accessTokenExpiry ?? null
          );
          tokenExpiry?.setRefreshTokenExpiry(
            res.data?.authenticate.result?.refreshTokenExpiry ?? null
          );
        }
        return res;
      }),
    [authenticate, username, password, captcha, client, tokenExpiry]
  );

  return [login, result];
};

const LoginSection = (props: { onSuccess?: () => void }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [requireCaptcha, setRequireCaptcha] = useState(0);
  const [captcha, setCaptcha] = useState('');
  const [captchaImg, setCaptchaImg] = useState('');
  const [error, setError] = useState<string | null>();
  const [login, { loading: loggingIn }] = useLogin(username, password, captcha);
  const [generateCaptcha] = useGenerateCaptchaMutation();
  const { data: serverSettingsData } = useServerSettingsQuery();
  const onLoginPress = useCallback(async () => {
    setError('');
    const res = await login();

    if (!res.data?.authenticate.success) {

      if (requireCaptcha > 0 || res.data?.authenticate.errorCode === AUTH_USER_CAPTCHA_REQUIRE) {
        setCaptcha('');
        setRequireCaptcha(requireCaptcha + 1);
      }
      setError(res.data?.authenticate.message);
    } else {
      console.log('res', res);
      console.log('props', props);
      props.onSuccess?.();
    }
  }, [login, props.onSuccess, requireCaptcha]);
  useEffect(() => {
    if (requireCaptcha) {
      generateCaptcha({ variables: { username } }).then(({ data }) => {
        setCaptchaImg(data?.generateCaptcha.result?.data ?? '');
      });
    }
  }, [generateCaptcha, requireCaptcha, username]);
  return (
    <Section>
      <Text
        textAlign="center"
        fontSize={5}
        color="primary"
        fontWeight={900}
        pt={6}
        pb={5}
        sx={{
          textTransform: 'uppercase',
        }}>
        Đăng Nhập
      </Text>
      <Box mb={5}>
        <Text color="#979797" fontSize={3} lineHeight="20px" mb={13}>
          Số điện thoại
        </Text>
        <Input
          placeholder="Số điện thoại"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <Text color="#979797" fontSize={3} lineHeight="20px" mb={13}>
          Mật khẩu
        </Text>
        <Input
          placeholder="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Flex mb={6}>
        <Text color="#C4C4C4" fontSize={2} lineHeight="17px" fontStyle="italic" mb={3}>
          {serverSettingsData?.serverSettings.serviceNumber}
        </Text>
        {/* <Text
          color="#C4C4C4"
          fontSize={2}
          lineHeight="17px"
          fontStyle="italic"
          ml="auto"
          sx={{
            textDecorationLine: 'underline',
          }}>
          Quên mật khẩu
        </Text> */}
      </Flex>
      {requireCaptcha > 0 && (
        <Box mb={2}>
          <Flex mb={2} alignItems="center">
            <div
              style={{ width: 150, height: 50, backgroundColor: 'white' }}
              dangerouslySetInnerHTML={{ __html: captchaImg }}
            />
          </Flex>
          <Box>
            <Input
              placeholder="Mã xác thực"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
            />
          </Box>
        </Box>
      )}
      {!!error && (
        <Box mb={2}>
          <Text textAlign="center">{error}</Text>
        </Box>
      )}
      <Flex alignItems="center" mb={4}>
        <Button onClick={props.onSuccess} variant="clear">
          Hủy
        </Button>
        <Button
          variant="secondary"
          size="large"
          onClick={onLoginPress}
          disabled={loggingIn}
          width="100%">
          Đăng nhập
        </Button>
      </Flex>
      <Text textAlign="center" color="#C4C4C4" fontSize={2} lineHeight="17px">
        Gửi mã OTP về số điện thoại
      </Text>
    </Section>
  );
};

const LoginContext = React.createContext<{ showLogin?: () => void }>({});

export const LoginProvider = (props: React.PropsWithChildren<object>) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <LoginContext.Provider value={{ showLogin: () => setIsOpen(true) }}>
      {props.children}
      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
          },
          content: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            border: 'none',
            background: 'transparent',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: 'none',
            outline: 'none',
            padding: '0px',
          },
        }}>
        <Flex
          justifyContent="space-around"
          alignItems="center"
          height="100%"
          width="100%"
          css={{ position: 'relative' }}>
          <Box
            css={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            onClick={() => setIsOpen(false)}
          />
          <Box
            maxWidth="800px"
            maxHeight="555px"
            width="100%"
            height="100%"
            css={{ position: 'relative' }}
            bg="defaultBackground"
            sx={{
              boxShadow: '0px 0px 20px #000000',
            }}
            px={151}
            py={5}>
            <LoginSection onSuccess={() => setIsOpen(false)} />
          </Box>
        </Flex>
      </Modal>
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  return React.useContext(LoginContext);
};
