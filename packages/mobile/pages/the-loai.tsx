import React from 'react';

import { Header, NotificationIcon, Section } from '../src/components';
import { ConditionalGoVipButton, ExploreTabs, PageBanner } from '../src/containers';
import { withApollo } from '../src/helpers/apollo';
import { Box } from '../src/rebass';
import { GenresSection } from '../src/screens/ExploreStack/ExploreScreen';

function GenresPage() {
  return (
    <Box bg="defaultBackground" position="relative">
      <Box>
        <Box position="fixed" top={0} left={0} right={0} zIndex={100}>
          <Header logo search>
            <ConditionalGoVipButton />
            <NotificationIcon />
          </Header>
        </Box>
        <PageBanner page="the-loai" />
      </Box>
      <Section bg="defaultBackground">
        <ExploreTabs currentTab="the-loai" />
      </Section>
      <GenresSection />
    </Box>
  );
}

export default withApollo({ ssr: true })(GenresPage);
