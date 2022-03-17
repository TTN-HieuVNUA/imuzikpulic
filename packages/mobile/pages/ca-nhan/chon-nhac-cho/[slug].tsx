import { NextPageContext } from 'next';
import React from 'react';
import { withApollo } from '../../../src/helpers/apollo';
import { TrimmerScreen } from '../../../src/screens/ProfileStack/TrimmerScreen';

function TrimmerPage({ slug = '' }: { slug?: string }) {
  return (
    <>
      <TrimmerScreen slug={slug} />
    </>
  );
}

TrimmerPage.getInitialProps = ({ req, query }: NextPageContext) => {
  return { url: req?.url, ...query };
};

export default withApollo({ ssr: true })(TrimmerPage);
