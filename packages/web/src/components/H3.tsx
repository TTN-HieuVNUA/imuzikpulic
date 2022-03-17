import { useTheme } from 'emotion-theming';
import React, { PropsWithChildren } from 'react';
import { Box, Flex, Text } from 'rebass';

import { Theme } from '../themes';

export function H3(props: PropsWithChildren<{ id?: string }>) {
  const theme = useTheme<Theme>();
  return (
    <Text mt={2} my={4} color="normalText" as="h3" fontSize={6} id={props.id}>
      <Flex css={{ position: 'relative' }}>
        <Box
          css={{
            position: 'absolute',
            left: 0,
            top: 10,
            bottom: 10,
            width: 6,
            backgroundColor: theme.colors.secondary,
          }}
          mr={2}
        />
        <Box ml={4}>{props.children}</Box>
      </Flex>
    </Text>
  );
}
