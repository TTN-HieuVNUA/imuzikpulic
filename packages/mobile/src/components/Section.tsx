import React, { PropsWithChildren } from 'react';
import { BackgroundColorProps, FlexProps, MarginProps } from 'styled-system';

import { Box } from '../rebass';

export const Section = (
  props: PropsWithChildren<MarginProps & FlexProps & BackgroundColorProps>
) => {
  return <Box px={3} {...props} />;
};

export const Section2 = (
  props: PropsWithChildren<MarginProps & FlexProps & BackgroundColorProps>
) => {
  return <Box px={2} {...props} />;
};
