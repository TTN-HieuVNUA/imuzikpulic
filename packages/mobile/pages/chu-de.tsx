import React from 'react';

import { withApollo } from '../src/helpers/apollo';
import { TopicsScreenBase } from '../src/screens/HomeStack/TopicsScreen';

function TopicsPage() {
  return <TopicsScreenBase />;
}

export default withApollo({ ssr: true })(TopicsPage);
