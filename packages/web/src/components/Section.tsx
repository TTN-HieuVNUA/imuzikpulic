import styled from '@emotion/styled';
import React from 'react';
import { Box, BoxProps } from 'rebass';
import { maxWidth, MaxWidthProps } from 'styled-system';

const ContainerContent = styled<React.FunctionComponent<BoxProps & MaxWidthProps>>(Box)`
  margin-left: auto;
  margin-right: auto;
  ${maxWidth}
`;

export const Section = ({
  bgImage,
  bg,
  css,
  ...props
}: BoxProps & MaxWidthProps & { bgImage?: string }) => (
  <Box css={css}>
    <Box bg={bg} css={{ backgroundImage: bgImage, width: '100%' }}>
      <ContainerContent {...{ maxWidth: 1146, ...props }} />
    </Box>
  </Box>
);
