import React from 'react';

import { withApollo } from '../../src/helpers/apollo';
import RbtManagerScreen from '../../src/screens/ProfileStack/RbtManagerScreen';

function RbtManagerPage() {
  return <RbtManagerScreen />;
}

export default withApollo()(RbtManagerPage);
