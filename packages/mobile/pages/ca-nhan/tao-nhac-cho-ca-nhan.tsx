import React from 'react';

import { withApollo } from '../../src/helpers/apollo';
import CreateRbtFromDevice from '../../src/screens/ProfileStack/CreateRbtFromDevice';

function CreateRbtFromDevicePage() {
  return <CreateRbtFromDevice />;
}
export default withApollo({ ssr: true })(CreateRbtFromDevicePage);
