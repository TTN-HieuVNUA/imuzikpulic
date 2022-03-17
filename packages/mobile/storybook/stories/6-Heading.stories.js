import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { H2, Section } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';

storiesOf('Heading', module)
  .add('Dark', () => (
    <ThemeProvider theme={darkTheme}>
      <Section bg="defaultBackground">
        <H2>Ichart</H2>
      </Section>
    </ThemeProvider>
  ))
  .add('Light', () => (
    <ThemeProvider theme={lightTheme}>
      <Box bg="defaultBackground" p={3}>
        <H2>Ichart</H2>
      </Box>
    </ThemeProvider>
  ));
