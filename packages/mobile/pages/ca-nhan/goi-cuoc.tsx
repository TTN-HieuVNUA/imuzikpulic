import React from 'react';

import { Header } from '../../src/components';
import { withApollo } from '../../src/helpers/apollo';
import { Box } from '../../src/rebass';
import { PackagesScreenBase } from '../../src/screens/ProfileStack/PackagesScreen';

function PackagesPage() {
  return (
    <Box bg="defaultBackground">
      <Header leftButton="back" title="Gói cước" />
      <PackagesScreenBase />
    </Box>
  );
}

export default withApollo()(PackagesPage);
