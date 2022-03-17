import React from 'react';

import { Header, NotificationIcon } from '../src/components';
import { ConditionalGoVipButton } from '../src/containers';
import { withApollo } from '../src/helpers/apollo';
import { Box } from '../src/rebass';
import { FeaturedScreenBase } from '../src/screens/FeaturedScreen';

function FeaturedPage() {
  return (
    <Box bg="defaultBackground" flex={1}>
      <Header logo search>
        <ConditionalGoVipButton />
        <NotificationIcon />
      </Header>
      <Box flex={1}>
        <FeaturedScreenBase />
      </Box>
    </Box>
  );
}
export default withApollo({ ssr: true })(FeaturedPage);
