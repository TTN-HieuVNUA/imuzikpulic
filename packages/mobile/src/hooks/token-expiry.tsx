import React, { Dispatch, PropsWithChildren, SetStateAction, useContext } from 'react';

import { useLocalStorage } from './local-storage';

const TokenExpiryContext = React.createContext<{
  accessTokenExpiry: number | null;
  setAccessTokenExpiry: Dispatch<SetStateAction<number | null>>;
  refreshTokenExpiry: number | null;
  setRefreshTokenExpiry: Dispatch<SetStateAction<number | null>>;
} | null>(null);

export const TokenExpiryProvider = (props: PropsWithChildren<object>) => {
  const [accessTokenExpiry, setAccessTokenExpiry] = useLocalStorage<number | null>(
    'accessTokenExpiry',
    null
  );
  const [refreshTokenExpiry, setRefreshTokenExpiry] = useLocalStorage<number | null>(
    'refreshTokenExpiry',
    null
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
