import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import isBefore from 'date-fns/isBefore';
import ms from 'ms';
import { AppProps } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import React from 'react';
import { PlayerProvider, WebAdapter } from '../src/components';
import { FAVICON } from '../src/components/svg-icon/favicon';
import { withApollo } from '../src/helpers/apollo';
import { isServerSide } from '../src/helpers/utils';
import { ThemeManagerProvider, useAutoFreshToken } from '../src/hooks';
import { ModalsProvider } from '../src/hooks/modals';
import { TokenExpiryProvider } from '../src/hooks/token-expiry';
import { MinInnerHeight } from '../src/platform/inner-height';
import { WapTabBar } from '../src/platform/WapTabBar';
import { useMeQuery } from '../src/queries';
import { Box } from '../src/rebass';

const { publicRuntimeConfig } = getConfig();

const Providers = (props: React.PropsWithChildren<object>) => (
  <ModalsProvider>
    <TokenExpiryProvider>
      <ThemeManagerProvider>
        <ActionSheetProvider>
          <PlayerProvider adapter={WebAdapter}>{props.children}</PlayerProvider>
        </ActionSheetProvider>
      </ThemeManagerProvider>
    </TokenExpiryProvider>
  </ModalsProvider>
);
const LAST_AUTO_LOGIN_KEY = 'last-auto-login';
function ImuzikApp({ Component, pageProps }: AppProps) {
  useAutoFreshToken();
  const { data: meData } = useMeQuery();
  React.useEffect(() => {
    if (!isServerSide) {
      (async () => {
        const lastAutoLogin = Number(window.localStorage.getItem(LAST_AUTO_LOGIN_KEY) ?? 0);
        const now = new Date();
        console.log(
          publicRuntimeConfig.AUTO_LOGIN_HOST,
          new Date((lastAutoLogin ?? 0) + ms('15m')),
          now
        );
        if (isBefore(new Date((lastAutoLogin ?? 0) + ms('15m')), now) && !meData?.me) {
          let redirectUri = '';
          window.localStorage.setItem(LAST_AUTO_LOGIN_KEY, (+now).toString());
          let params = (new URL(location.href)).searchParams;
          let qr = params.get('r');
          if(qr!=null&&qr!='undefined')
          {
            redirectUri = encodeURIComponent(
              qr
            );
          }else{
            redirectUri = encodeURIComponent(
              location.href
            );
          }
          location.href = `${publicRuntimeConfig.AUTO_LOGIN_HOST}/auto-login?r=${redirectUri??"/"}`;
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
	<link rel="shortcut icon" href={FAVICON} />
      </Head>
      <Providers>
        <MinInnerHeight bg="defaultBackground">
          <Component {...pageProps} />
          <WapTabBar.Padding />
        </MinInnerHeight>
        <Box position="fixed" bottom={0} left={0} right={0}>
          <WapTabBar url={pageProps.url} />
        </Box>
      </Providers>
    </>
  );
}

export default withApollo()(ImuzikApp);
