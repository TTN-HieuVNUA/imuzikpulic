import React, { PropsWithChildren } from 'react';
import { MarginProps } from 'styled-system';

import { Box, Flex, Text } from '../rebass';

export const H2 = ({ children, ...props }: PropsWithChildren<MarginProps>) => {
  return (
    <Flex flexDirection="row" mx={-3} my={2} alignItems="center" {...props}>
      <Box borderRadius={2} overflow="hidden" bg="secondary" width={4} height={16} />
      <Text color="normalText" ml={2} fontSize={4} fontWeight="bold">
        {children}
      </Text>
    </Flex>
  );
};
