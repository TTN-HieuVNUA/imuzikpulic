import { text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { VipInfo } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';

const allTabBars = (
  <Box bg="defaultBackground" py={3}>
    <Box bg="alternativeBackground">
      <Box bg="defaultBackground" p={2}>
        <VipInfo price={text('price', '15000đ/tháng')} />
      </Box>
    </Box>
  </Box>
);
storiesOf('VipInfo', module)
  .add('Dark', () => <ThemeProvider theme={darkTheme}>{allTabBars}</ThemeProvider>)
  .add('Light', () => <ThemeProvider theme={lightTheme}>{allTabBars}</ThemeProvider>);
