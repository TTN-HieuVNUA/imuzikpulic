import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground } from 'react-native';

import { Box, Flex, Text } from '../rebass';

export const FeaturedCard = (props: {
  time: Date;
  title: string;
  image: string;
  description?: string;
}) => (
  <Box borderRadius={8} alignItems="center" overflow="hidden" height={195}>
    <ImageBackground
      source={{ uri: props.image }}
      style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }}>
      <LinearGradient colors={['black', 'rgba(0, 0, 0, 0.0)']} start={[0, 1]} end={[0, 0]}>
        <Flex p={3} height={150} justifyContent="flex-end">
          {props.time ? (
            <Text color="primary" fontSize={0} numberOfLines={1} mb={1}>
              {formatDistanceToNow(props.time, {
                locale: vi,
                addSuffix: true,
              })}
            </Text>
          ) : null}
          <Text fontWeight="bold" fontSize={2} numberOfLines={1} color="white" mb={1}>
            {props.title}
          </Text>
          <Text color="#B2B2B2" fontSize={1} numberOfLines={2}>
            {props.description}
          </Text>
        </Flex>
      </LinearGradient>
    </ImageBackground>
  </Box>
);
