import { NextPageContext } from 'next';
import React from 'react';

import { Header, NotificationIcon, Section2 } from '../../src/components';
import { ConditionalGoVipButton, FooterSection } from '../../src/containers';
import { withApollo } from '../../src/helpers/apollo';
import { useHelpArticlesQuery } from '../../src/queries';
import { Box } from '../../src/rebass';

function HelpArticlePage({ slug = 'null' }: { slug?: string }) {
  const { data } = useHelpArticlesQuery({ variables: { slug } });

  return (
    <Box bg="white">
      <Box bg="defaultBackground">
        <Header leftButton="back" title={data?.helpArticleCategory?.name ?? ''} search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      <Section2>
        {(data?.helpArticleCategory?.articles ?? []).map((a) => (
          <Box key={a.id}>
            <div dangerouslySetInnerHTML={{ __html: a.body }} />
          </Box>
        ))}
      </Section2>
      <FooterSection />
    </Box>
  );
}

HelpArticlePage.getInitialProps = ({ req, query }: NextPageContext) => {
  return { url: req?.url, ...query };
};

export default withApollo({ ssr: true })(HelpArticlePage);
