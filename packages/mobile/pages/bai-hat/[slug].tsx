import { NextPageContext } from 'next';
import React from 'react';

import { Header } from '../../src/components';
import { ConditionalGoVipButton } from '../../src/containers';
import { withApollo } from '../../src/helpers/apollo';
import { useSongQuery } from '../../src/queries';
import { SongScreenBase } from '../../src/screens/HomeStack/SongScreen';

function SongPage({ slug = '' }: { slug?: string }) {
  const { data } = useSongQuery({ variables: { slug } });
  return (
    <>
      <Header leftButton="back" title={data?.song?.name} search>
        <ConditionalGoVipButton />
      </Header>
      <SongScreenBase slug={slug} />
    </>
  );
}

SongPage.getInitialProps = ({ req, query }: NextPageContext) => {
  return { url: req?.url, ...query };
};

export default withApollo({ ssr: true })(SongPage);
