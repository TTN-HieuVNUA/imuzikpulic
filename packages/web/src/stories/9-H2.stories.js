import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { Box } from 'rebass';

import H2 from '../components/H2';
import { darkTheme, lightTheme } from '../themes';

export default {
  title: 'H2',
  component: H2,
};

export const Dark = () => (
  <ThemeProvider theme={darkTheme}>
    <Box bg="defaultBackground" p={5}>
      <H2>Ichart</H2>
    </Box>
  </ThemeProvider>
);

export const Light = () => (
  <ThemeProvider theme={lightTheme}>
    <Box bg="defaultBackground" p={5}>
      <H2>Ichart</H2>
    </Box>
  </ThemeProvider>
);
