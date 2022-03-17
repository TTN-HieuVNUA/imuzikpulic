import React from 'react';

import { Header } from '../../src/components';
import { withApollo } from '../../src/helpers/apollo';
import { Box } from '../../src/rebass';
import { MyRbtScreenBase } from '../../src/screens/ProfileStack/MyRbtScreen';

function RbtCollectionPage() {
  return (
    <Box bg="defaultBackground">
      <Header leftButton="back" title="Bộ sưu tập nhạc chờ" />
      <MyRbtScreenBase />
    </Box>
  );
}

export default withApollo()(RbtCollectionPage);
