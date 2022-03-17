import React from 'react';

import { withApollo } from '../../src/helpers/apollo';
import { MyPlaylistScreenBase } from '../../src/screens/ProfileStack/MyPlaylistScreen';

function MyPlaylistPage() {
  return <MyPlaylistScreenBase />;
}

export default withApollo()(MyPlaylistPage);
