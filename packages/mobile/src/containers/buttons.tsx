import React from 'react';

import { GoVipButton } from '../components';
import { Box } from '../rebass';

export const ConditionalGoVipButton = () => {
  return (
    <Box>
      <GoVipButton testID="go-vip" />
    </Box>
  );
};
