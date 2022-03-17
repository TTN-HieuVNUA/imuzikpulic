import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { withApollo } from '../../../src/helpers/apollo';
import { RbtGroupScreenBase } from '../../../src/screens/ProfileStack/RbtGroupScreen';

function RbtGroupPage() {
  const { groupId } = useRouter().query;
  return <RbtGroupScreenBase groupId={groupId as string} />;
}
RbtGroupPage.getInitialProps = ({ req, query }: NextPageContext) => {
  return { url: req?.url, ...query };
};
export default withApollo()(RbtGroupPage);
