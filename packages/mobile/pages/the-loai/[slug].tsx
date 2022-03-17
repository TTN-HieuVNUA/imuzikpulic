import { NextPageContext } from 'next';
import React from 'react';

import { withApollo } from '../../src/helpers/apollo';
import { GenreScreenBase } from '../../src/screens/ExploreStack/GenreScreen';

function GenrePage({ slug }: { slug?: string }) {
  return <GenreScreenBase slug={slug} />;
}

GenrePage.getInitialProps = ({ req, query }: NextPageContext) => {
  return { url: req?.url, ...query };
};

export default withApollo({ ssr: true })(GenrePage);
