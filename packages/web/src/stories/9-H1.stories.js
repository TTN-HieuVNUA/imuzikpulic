import React from 'react';
import { Box } from 'rebass';

import H1 from '../components/H1';

export default {
  title: 'H1',
};

export const Default = () => (
  <Box bg="defaultBackground" p={5}>
    <H1>Bộ sưu tập nhạc chờ</H1>
  </Box>
);
