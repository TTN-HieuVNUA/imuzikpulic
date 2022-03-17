import React from 'react';
import { Box, Button } from 'rebass';

import Icon from '../components/Icon';

export default {
  title: 'Button',
  component: Button,
};

export const Primary = () => (
  <Box bg="defaultBackground" p={5}>
    <Button variant="primary">
      <Icon name="tune" size={17} />
      Nghe tất cả
    </Button>
  </Box>
);

export const Outline = () => (
  <Box bg="defaultBackground" p={5}>
    <Button variant="outline">CÀI ĐẶT NHẠC CHỜ</Button>
  </Box>
);

export const Muted = () => (
  <Box bg="defaultBackground" p={5}>
    <Button variant="muted">Xem tất cả</Button>
  </Box>
);
