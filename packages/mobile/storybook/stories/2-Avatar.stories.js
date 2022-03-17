import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { Avatar } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';

storiesOf('Avatar', module)
  .add('Default', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" p={2} flexDirection="row">
        <Box width={1 / 2}>
          <Avatar name="Singer Name" image="https://via.placeholder.com/200" />
        </Box>
        <Box width={1 / 2}>
          <Avatar
            name="Singer Name Singer Name Singer Name Singer Name Singer Name"
            image="https://via.placeholder.com/200"
          />
        </Box>
      </Box>
    </ThemeProvider>
  ))
  .add('Light', () => (
    <ThemeProvider theme={lightTheme}>
      <Box bg="defaultBackground" p={2}>
        <Avatar name="Singer Name" image="https://via.placeholder.com/200" />
      </Box>
    </ThemeProvider>
  ));
