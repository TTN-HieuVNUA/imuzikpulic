import React from 'react';

import { withApollo } from '../../src/helpers/apollo';
import CreateRbtFromLibrary from '../../src/screens/ProfileStack/CreateRbtFromLibrary';

function CreateRbtFromLibraryPage() {
  return <CreateRbtFromLibrary />;
}
export default withApollo({ ssr: true })(CreateRbtFromLibraryPage);
