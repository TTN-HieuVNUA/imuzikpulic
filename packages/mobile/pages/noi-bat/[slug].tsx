import { NextPageContext } from 'next';
import React from 'react';

import { withApollo } from '../../src/helpers/apollo';
import { ArticleScreenBase } from '../../src/screens/HomeStack/ArticleScreen';

function ArticlePage({ slug }: { slug?: string }) {
  return <ArticleScreenBase slug={slug} />;
}

ArticlePage.getInitialProps = ({ req, query }: NextPageContext) => {
  return { url: req?.url, ...query };
};

export default withApollo({ ssr: true })(ArticlePage);
