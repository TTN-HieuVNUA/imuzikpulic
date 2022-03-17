import React, { Dispatch, PropsWithChildren, useContext } from 'react';

import { useLocalStorage } from './local-storage';

const TokenExpiryContext = React.createContext<{
  accessTokenExpiry: number | null;
  setAccessTokenExpiry: Dispatch<number | null>;
  refreshTokenExpiry: number | null;
  setRefreshTokenExpiry: Dispatch<number | null>;
} | null>(null);

export const TokenExpiryProvider = (props: PropsWithChildren<object>) => {
  const [accessTokenExpiry, setAccessTokenExpiry] = useLocalStorage<number | null>(
    'accessTokenExpiry'
  );
  const [refreshTokenExpiry, setRefreshTokenExpiry] = useLocalStorage<number | null>(
    'refreshTokenExpiry'
  );
  return (
    <TokenExpiryContext.Provider
      value={{
        accessTokenExpiry,
        setAccessTokenExpiry,
        refreshTokenExpiry,
        setRefreshTokenExpiry,
      }}
      {...props}
    />
  );
};

export const useTokenExpiry = () => useContext(TokenExpiryContext);
