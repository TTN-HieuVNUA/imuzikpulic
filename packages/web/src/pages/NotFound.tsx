import React from 'react';
import { Box } from 'rebass';

import { H2, Section } from '../components';
import { PageBanner } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';

export default function NotFoundPage() {
  return (
    <Box>
      <Header.Fixed />
      <PageBanner page="trang-chu" />
      <Section py={5}>
        <H2>Not Found</H2>
      </Section>
      <Footer />
    </Box>
  );
}
