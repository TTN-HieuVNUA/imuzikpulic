import React from 'react';

import { withApollo } from '../../src/helpers/apollo';
import CreateRbtScreen from '../../src/screens/ProfileStack/CreateRbtScreen';

function CreateRbtPage() {
  return <CreateRbtScreen />;
}
export default withApollo({ ssr: true })(CreateRbtPage);
