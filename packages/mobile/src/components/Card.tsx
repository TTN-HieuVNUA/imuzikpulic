import React from 'react';
import { Image } from 'react-native';

import { Box, Flex, Text } from '../rebass';

export interface CardLeftProps {
  title: string;
  image?: string | null;
  description?: string | null;
}

export const CardLeft = (props: CardLeftProps) => (
  <Box
    position="relative"
    overflow="hidden"
    borderRadius={4}
    height={80}
    flexDirection="row"
    alignItems="center">
    <Flex bg="#C4C4C4" position="absolute" width="100%" height="100%">
      {!!props.image && (
        <Image source={{ uri: props.image }} style={{ width: '100%', height: '100%' }} />
      )}
    </Flex>
    <Flex flexDirection="column" px={4} flex={1}>
      <Text
        color="white"
        fontWeight="bold"
        fontSize={4}
        css={{ position: 'relative', zIndex: 2 }}
        numberOfLines={1}>
        {props.title}
      </Text>
      <Text
        color="white"
        fontWeight="bold"
        fontSize={1}
        css={{ position: 'relative', zIndex: 2 }}
        numberOfLines={2}>
        {props.description || ' '}
      </Text>
    </Flex>
  </Box>
);
export interface CardCenterProps {
  title: string;
  image?: string | null;
}

export const CardCenter = (props: CardCenterProps) => (
  <Box
    position="relative"
    overflow="hidden"
    borderRadius={8}
    height={80}
    flexDirection="row"
    alignItems="center"
    justifyContent="center">
    <Flex bg="#C4C4C4" position="absolute" width="100%">
      {!!props.image && (
        <Image source={{ uri: props.image }} style={{ width: 'auto', height: 80 }} />
      )}
    </Flex>
    <Flex bg="rgba(0, 0, 0, 0.4)" position="absolute" width="100%" height="100%" />
    <Flex flexDirection="column" px={4}>
      <Text color="white" fontWeight="bold" fontSize={3} css={{ position: 'relative', zIndex: 2 }}>
        {props.title}
      </Text>
    </Flex>
  </Box>
);
