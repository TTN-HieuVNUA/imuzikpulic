import { LinearGradient } from 'expo-linear-gradient';
import React, { PropsWithChildren, ReactNode, useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
} from 'react-native';

import { Box, Flex } from '../../src/rebass';

const HEIGHT = 200;
const Banner = (props: PropsWithChildren<object>) => {
  const screenWidth = Math.round(Dimensions.get('window').width) || 500;
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      setActiveIdx(Math.floor(e.nativeEvent.contentOffset.x / screenWidth + 0.5));
    },
    [screenWidth]
  );
  return (
    <Box position="relative" width={Platform.OS === 'web' ? '100vw' : screenWidth} height={HEIGHT}>
      <ScrollView
        scrollEventThrottle={16}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}>
        {props.children}
      </ScrollView>
      <Flex flexDirection="row" p={4} position="absolute" right={0} bottom={0}>
        {(props.children as ReactNode[]).map((_, idx) => (
          <Box overflow="hidden" borderRadius={6} mx="2px" key={idx}>
            <Box
              height={3}
              width={idx === activeIdx ? 16 : 4}
              bg={idx === activeIdx ? 'secondary' : '#323232'}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

Banner.Item = (props: PropsWithChildren<{ image: string }>) => {
  const screenWidth = Math.round(Dimensions.get('window').width) || 500;
  return (
    <Box width={Platform.OS === 'web' ? '100vw' : screenWidth} height={HEIGHT} position="relative">
      <Image source={{ uri: props.image }} style={{ width: '100%', height: '100%' }} />
      <Box position="absolute" bottom={0} width="100%">
        <Box position="absolute" width="100%" height="100%">
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', '#262523']}
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
        <Box width={2 / 3} p={3}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export { Banner };
