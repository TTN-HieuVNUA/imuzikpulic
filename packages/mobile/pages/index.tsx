import React from 'react';

import { Header, NotificationIcon } from '../src/components';
import { ConditionalGoVipButton } from '../src/containers';
import { withApollo } from '../src/helpers/apollo';
import { Box } from '../src/rebass';
import { HomeScreenBase } from '../src/screens/HomeStack/HomeScreen';

function HomePage() {
  const [transparent, setTransparent] = React.useState(true);
  React.useEffect(() => {
    const handleScroll = () => {
      setTransparent(window.scrollY < 200);
    };
    // eslint-disable-next-line no-undef
    document.addEventListener('scroll', handleScroll);
    return () => {
      // eslint-disable-next-line no-undef
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Box bg="defaultBackground" position="relative">
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        py={2}
        bg={transparent ? 'transparent' : 'defaultBackground'}>
        <Header logo search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      <HomeScreenBase />
    </Box>
  );
}

export default withApollo({ ssr: true })(HomePage);
