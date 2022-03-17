import React from 'react';
import { Image } from 'react-native';

import { Box, Flex, Text } from '../rebass';

export interface AvatarProps {
  image?: string | null;
  name: string;
}

export const Avatar = ({ image, name }: AvatarProps) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Box height={150} width={150} overflow="hidden" borderRadius={100}>
        {!!image && (
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={{ height: '100%', width: '100%' }}
          />
        )}
      </Box>
      <Text fontWeight="bold" fontSize={2} mt={1} textAlign="center">
        {name}
      </Text>
    </Flex>
  );
};
