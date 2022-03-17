import { LinearGradient } from 'expo-linear-gradient';
import React, { PropsWithChildren } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Box, Flex, Text } from '../rebass';

export const Member = (
  props: PropsWithChildren<{
    image?: string | null;
    name?: string;
    package: string;
    onPress?: () => void;
  }>
) => {
  return (
    <Flex borderRadius={8} overflow="hidden">
      <LinearGradient colors={['#38EF7D', '#11998E']} start={[0, 0]} end={[1, 1]}>
        <TouchableOpacity onPress={props.onPress}>
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            minHeight={80}
            p={2}>
            <Flex
              borderRadius={4}
              overflow="hidden"
              width={56}
              height={56}
              bg="rgba(0,0,0,0.1)"
              position="relative">
              {!!props.image && (
                <Image source={{ uri: props.image }} style={{ width: 56, height: 56 }} />
              )}
            </Flex>
            {!!props.name && (
              <Flex flexDirection="column" justifyContent="space-between" flex={1} ml={2} mr={1}>
                <Text fontWeight="bold" color="white" fontSize={3} mb={1} numberOfLines={2}>
                  Hi, {props.name}
                </Text>
                <Box flexDirection="row">
                  <Box borderWidth={1} borderColor="white" borderRadius={4}>
                    <Text fontSize={0} color="white" p={1}>
                      {props.package}
                    </Text>
                  </Box>
                </Box>
              </Flex>
            )}
            {props.children}
          </Flex>
        </TouchableOpacity>
      </LinearGradient>
    </Flex>
  );
};
