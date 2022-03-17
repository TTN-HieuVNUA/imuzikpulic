import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Header, NotificationIcon } from '../src/components';
import { ConditionalGoVipButton } from '../src/containers';
import { withApollo } from '../src/helpers/apollo';
import { useNavigationLink } from '../src/platform/links';
import { useMeQuery } from '../src/queries';
import { Box } from '../src/rebass';
import { ManageSection, MemberSection } from '../src/screens/ProfileStack/ProfileScreen';

function UserPage() {
  const { data: meData, loading } = useMeQuery();
  const navigate = useNavigationLink('login');

  return (
    <Box>
      {loading && <ActivityIndicator />}
      <Header logo search>
        <ConditionalGoVipButton />
        <NotificationIcon />
      </Header>
      <Box>
        <MemberSection showLogin={!loading && !meData?.me ? navigate : undefined} />
        <ManageSection />
      </Box>
    </Box>
  );
}
export default withApollo()(UserPage);
