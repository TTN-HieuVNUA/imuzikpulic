import React from 'react';
import { Box } from 'rebass';
import { MarginProps } from 'styled-system';

export const Separator = (props: MarginProps) => (
  <Box height={1} width="100%" bg="separator" {...props} />
);
