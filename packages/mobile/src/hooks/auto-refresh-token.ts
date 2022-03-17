/* eslint-disable react-hooks/exhaustive-deps */
import { useApolloClient } from '@apollo/react-hooks';
import ms from 'ms';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { isClientSide } from '../helpers/utils';
import { useMeQuery, useRefreshAccessTokenMutation } from '../queries';
import { useTokenExpiry } from './token-expiry';

const REFRESH_TOKEN_BUFFER = ms('10m');

export const useAutoFreshToken = () => {
  const client = useApolloClient();
  const [refreshToken] = useRefreshAccessTokenMutation();
  useMeQuery();
  const tokenExpiry = useTokenExpiry();
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    if (tokenExpiry) {
      const {
        accessTokenExpiry,
        setAccessTokenExpiry,
        refreshTokenExpiry,
        setRefreshTokenExpiry,
      } = tokenExpiry;
      if (isClientSide || Platform.OS !== 'web') {
        const now = new Date().getTime();
        if (refreshTokenExpiry) {
          console.log(
            accessTokenExpiry ?? 0 - now - REFRESH_TOKEN_BUFFER,
            refreshTokenExpiry - now
          );
          if (
            !accessTokenExpiry ||
            (now > accessTokenExpiry - REFRESH_TOKEN_BUFFER && now < refreshTokenExpiry)
          ) {
            refreshToken().then(({ data }) => {
              if (data?.refreshAccessToken.success) {
                if (!accessTokenExpiry || accessTokenExpiry < now) {
                  console.log('Reset Apollo Client store...');
                  client.resetStore();
                }
                const newAccessTokenExpiry = data.refreshAccessToken.result?.accessTokenExpiry;
                if (newAccessTokenExpiry && now < newAccessTokenExpiry - REFRESH_TOKEN_BUFFER) {
                  // TODO: what if client clock is wrong????
                  // if client 's clock is fast, this can not refresh token properly.
                  setAccessTokenExpiry(newAccessTokenExpiry);
                }
              }
            });
          } else if (now > refreshTokenExpiry) {
            const reset = () => {
              console.log('Refresh Token Expired...');
              setRefreshTokenExpiry(null);
              setAccessTokenExpiry(null);
              client.resetStore();
            };
            if (now < accessTokenExpiry) {
              const timeout = setTimeout(reset, accessTokenExpiry + REFRESH_TOKEN_BUFFER - now);
              return () => {
                clearTimeout(timeout);
              };
            } else {
              reset();
            }
          }
          if (accessTokenExpiry && now < accessTokenExpiry - REFRESH_TOKEN_BUFFER) {
            setExpired(false);
            const timeout = setTimeout(() => {
              setExpired(true);
            }, accessTokenExpiry - REFRESH_TOKEN_BUFFER - now);
            return () => {
              clearTimeout(timeout);
            };
          }
        }
      }
    }
  }, [
    expired,
    isClientSide,
    tokenExpiry,
    new Date().getTime() > (tokenExpiry?.accessTokenExpiry ?? 0),
  ]);
};
