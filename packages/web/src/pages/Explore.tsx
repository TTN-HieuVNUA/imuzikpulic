import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex } from 'rebass';

import { GridCarousel, H2 } from '../components';
import { CardBottom } from '../components/Card';
import { Section } from '../components/Section';
import { PageBanner } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { useContentProvidersQuery } from '../queries';
import { GenresSection, SingersSection } from './Home';

export const CpsSection = () => {
  const { data } = useContentProvidersQuery({ variables: { first: 8 } });
  // TODO: hot cps?
  return (
    <Section py={4}>
      <H2>Nhà cung cấp</H2>
      <GridCarousel rows={2} columns={2} mx={3}>
        {(data?.contentProviders?.edges ?? []).map(({ node: cp }) => (
          <Link to={`/nha-cung-cap/${cp.group}`} key={cp.group}>
            <CardBottom mb={4} title={cp.name} image={cp.imageUrl} />
          </Link>
        ))}
      </GridCarousel>
      <Flex justifyContent="center">
        <Link to="/nha-cung-cap">
          <Button variant="muted">Xem tất cả</Button>
        </Link>
      </Flex>
    </Section>
  );
};

export default function ExplorePage() {
  return (
    <Box>
      <Header.Fixed />
      <PageBanner page="kham-pha" />
      <GenresSection />
      <SingersSection />
      <CpsSection />
      <Footer />
    </Box>
  );
}
