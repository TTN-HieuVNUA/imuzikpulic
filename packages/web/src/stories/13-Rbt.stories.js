import React from 'react';
import { Box } from 'rebass';

import { Rbt } from '../components/Rbt';

export default {
  title: 'Rbt',
};

export const Primary = () => (
  <Box bg="defaultBackground" p={5}>
    <Rbt
      song={{
        image: 'https://via.placeholder.com/200',
        title: 'Lối Nhỏ',
        artist: 'Đen ft. Phương Anh Đào',
        composer: 'Đen',
      }}
      code="12342945"
      cp="DTECH"
      price={3000}
      expiry={30}
      published="20/09/2019"
      download={24015}
    />
  </Box>
);
