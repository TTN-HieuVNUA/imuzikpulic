import { NextPageContext } from 'next';
import React from 'react';
import { withApollo } from '../src/helpers/apollo';
import { TrimmerOfflineBase } from '../src/screens/ProfileStack/TrimmerOffline';


function GenrePage({ url }: { url?: string },{ name }: { name?: string }) {
  return <TrimmerOfflineBase url={url}  name={name}/>;
}

GenrePage.getInitialProps = ({ req, query }: NextPageContext) => {
  return { url: req?.url, ...query };
};

export default withApollo({ ssr: true })(GenrePage);
