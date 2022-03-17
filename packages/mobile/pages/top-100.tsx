import React from 'react';

import { withApollo } from '../src/helpers/apollo';
import { Top100sScreenBase } from '../src/screens/HomeStack/Top100sScreen';

function Top100sPage() {
  return <Top100sScreenBase />;
}

export default withApollo({ ssr: true })(Top100sPage);
