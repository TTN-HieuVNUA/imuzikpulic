import React from 'react';
import { Box } from 'rebass';

import { CardBottom, CardCenter, CardLeft, CardTop } from '../components/Card';

export default {
  title: 'Card',
  component: CardTop,
};

export const Top = () => (
  <Box bg="defaultBackground" p={5}>
    <CardTop title="The loai" image="https://via.placeholder.com/200" />
  </Box>
);

export const Left = () => (
  <Box bg="defaultBackground" p={5}>
    <CardLeft title="Nha Cung Cap" image="https://via.placeholder.com/200" />
  </Box>
);

export const Center = () => (
  <Box bg="defaultBackground" p={5}>
    <CardCenter
      title="Top 100 Nhac Au My"
      image="https://via.placeholder.com/200"
    />
  </Box>
);

export const Bottom = () => (
  <Box bg="defaultBackground" p={5}>
    <CardBottom
      title="Top 100 Nhac Au My"
      image="https://via.placeholder.com/200"
    />
  </Box>
);
