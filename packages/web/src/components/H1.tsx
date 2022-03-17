import React, { PropsWithChildren } from 'react';
import { Box, Text } from 'rebass';

export default function H1(props: PropsWithChildren<{}>) {
  return (
    <Text color="secondary" as="h1" fontWeight="bold" fontSize={23}>
      <Box
        css={{
          display: 'inline-block',
          background: '-webkit-linear-gradient(180deg, #11998E 0%, #38EF7D 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
        {props.children}
      </Box>
    </Text>
  );
}
