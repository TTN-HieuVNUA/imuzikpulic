import { NextPageContext } from 'next';
import React from 'react';

import { withApollo } from '../../src/helpers/apollo';
import { ContentProviderScreenBase } from '../../src/screens/ExploreStack/ContentProviderScreen';

function ContentProviderPage({ group }: { group: string }) {
  return <ContentProviderScreenBase group={group} />;
}

ContentProviderPage.getInitialProps = ({ req, query }: NextPageContext) => {
  return { url: req?.url, ...query };
};
export default withApollo({ ssr: true })(ContentProviderPage);
