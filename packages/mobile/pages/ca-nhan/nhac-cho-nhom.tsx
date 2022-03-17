import React from 'react';

import { Header } from '../../src/components';
import { withApollo } from '../../src/helpers/apollo';
import { Box } from '../../src/rebass';
import { RbtGroupsScreenBase } from '../../src/screens/ProfileStack/RbtGroupsScreen';

function GroupsRbtPage() {
  return (
    <Box bg="defaultBackground">
      <Header leftButton="back" title="Nhạc chờ cho nhóm" />
      <RbtGroupsScreenBase />
    </Box>
  );
}
export default withApollo()(GroupsRbtPage);
