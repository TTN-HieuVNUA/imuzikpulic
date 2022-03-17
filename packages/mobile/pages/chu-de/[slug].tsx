import { NextPageContext } from 'next';
import React from 'react';

import { withApollo } from '../../src/helpers/apollo';
import { TopicScreenBase } from '../../src/screens/HomeStack/TopicScreen';

function TopicPage({ slug }: { slug?: string }) {
  return <TopicScreenBase slug={slug} />;
}

TopicPage.getInitialProps = ({ req, query }: NextPageContext) => {
  return { url: req?.url, ...query };
};

export default withApollo({ ssr: true })(TopicPage);
