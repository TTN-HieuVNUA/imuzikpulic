import React, { PropsWithChildren } from 'react';
import { BackgroundColorProps, PaddingProps } from 'styled-system';

import { Header, NotificationIcon } from '../src/components';
import { ConditionalGoVipButton, PageBanner } from '../src/containers';
import { ExploreTabs } from '../src/containers/explore-tabs';
import { withApollo } from '../src/helpers/apollo';
import { Box } from '../src/rebass';
import { SingersSection } from '../src/screens/ExploreStack/ExploreScreen';

const Section = (props: PropsWithChildren<BackgroundColorProps & PaddingProps>) => {
  return <Box px={3} {...props} />;
};

function SingersPage() {
  return (
    <Box bg="defaultBackground" position="relative">
      <Box>
        <Box position="fixed" top={0} left={0} right={0} zIndex={100}>
          <Header logo search>
            <ConditionalGoVipButton />
            <NotificationIcon />
          </Header>
        </Box>
        <PageBanner page="ca-sy" />
      </Box>
      <Section bg="defaultBackground">
        <ExploreTabs currentTab="ca-sy" />
      </Section>
      <SingersSection />
    </Box>
  );
}

export default withApollo({ ssr: true })(SingersPage);
