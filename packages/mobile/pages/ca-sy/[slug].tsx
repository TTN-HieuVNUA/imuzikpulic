import { NextPageContext } from 'next';
import React from 'react';

import { withApollo } from '../../src/helpers/apollo';
import { SingerScreenBase } from '../../src/screens/ExploreStack/SingerScreen';

function SingerPage({ slug }: { slug?: string }) {
  return <SingerScreenBase slug={slug} />;
}

SingerPage.getInitialProps = ({ req, query }: NextPageContext) => {
  return { url: req?.url, ...query };
};

export default withApollo({ ssr: true })(SingerPage);
