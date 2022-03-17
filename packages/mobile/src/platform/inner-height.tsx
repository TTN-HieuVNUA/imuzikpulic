import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { Box, BoxProps } from '../rebass';

export const useInnerHeight = () => {
  const [innerHeight, setInnerHeight] = useState<number | string>(
    Platform.OS === 'web' ? '100vh' : '100%'
  );

  useEffect(() => {
    if (process.browser) {
      setTimeout(() => {
        setInnerHeight(window.innerHeight);
      }, 100);
      const handler = () => {
        setInnerHeight(window.innerHeight);
      };
      window.addEventListener('scroll', handler);
      return () => {
        window.removeEventListener('scroll', handler);
      };
    }
  }, []);
  return innerHeight;
};

export const MinInnerHeight = (props: React.PropsWithChildren<BoxProps>) => {
  const height = useInnerHeight();
  return <Box style={{ minHeight: height }} {...props} />;
};
