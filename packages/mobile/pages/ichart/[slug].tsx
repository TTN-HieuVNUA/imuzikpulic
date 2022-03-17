import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useCallback } from 'react';
import { FlexProps, MarginProps } from 'styled-system';

import { Header, NotificationIcon, SelectionBar, SelectionBarItem } from '../../src/components';
import { ConditionalGoVipButton } from '../../src/containers';
import { withApollo } from '../../src/helpers/apollo';
import { useIChartQuery } from '../../src/queries';
import { Box } from '../../src/rebass';
import { IChartScreenBase } from '../../src/screens/HomeStack/IChartScreen';

const Section = (props: PropsWithChildren<MarginProps & FlexProps>) => {
  return <Box px={2} {...props} />;
};

function IChartPage({ slug = '' }: { slug?: string }) {
  const baseVariables = { slug, first: 10 };

  const { data } = useIChartQuery({
    variables: baseVariables,
  });
  const tabs = data?.iCharts?.map((chart) => ({ key: chart.slug, text: chart.name })) || [];
  const router = useRouter();
  const onSelected = useCallback(
    (item: SelectionBarItem<string>) => {
      router.push('/ichart/[slug]', `/ichart/${item.key}`);
    },
    [router]
  );
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Box bg="defaultBackground">
        <Header leftButton="back" title="Ichart" search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      <Section>
        <Box flexDirection="row" alignItems="center">
          <SelectionBar selectedKey={slug} items={tabs} onSelected={onSelected} flex={1} />
        </Box>
      </Section>
      <IChartScreenBase slug={slug} />
    </Box>
  );
}

IChartPage.getInitialProps = ({ req, query }: NextPageContext) => {
  return { url: req?.url, ...query };
};

export default withApollo({ ssr: true })(IChartPage);
