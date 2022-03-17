import React from 'react';
import { Box } from 'rebass';

import { CardTop } from '../components/Card';
import { GridCarousel } from '../components/GridCarousel';
import { Section } from '../components/Section';

export default {
  title: 'GridCarousel',
};

export const Default = () => (
  <Box bg="defaultBackground">
    <Section py={100}>
      <GridCarousel columns={4} rows={2}>
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
        <CardTop mx={1} mb={2} title="Nha Cung Cap" image="https://via.placeholder.com/200" />
      </GridCarousel>
    </Section>
  </Box>
);
