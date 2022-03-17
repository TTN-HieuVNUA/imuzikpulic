import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { AddMemberCard } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';

const allTabBars = (
  <Box bg="defaultBackground" py={3}>
    <Box bg="defaultBackground" p={2}>
      <AddMemberCard
        onAdd={action('add')}
        onCancel={action('cancel')}
        onPressContact={action('onPressContact')}
      />
    </Box>
  </Box>
);
storiesOf('AddMemberCard', module)
  .add('Dark', () => <ThemeProvider theme={darkTheme}>{allTabBars}</ThemeProvider>)
  .add('Light', () => <ThemeProvider theme={lightTheme}>{allTabBars}</ThemeProvider>);
