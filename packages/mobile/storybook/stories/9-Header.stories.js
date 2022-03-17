import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { GoVipButton, Header } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';
import { reactNavigationDecorator } from '../decorators';

const HeaderStory = () => (
  <Box height={600} justifyContent="space-around">
    <Box bg="defaultBackground">
      <Header logo search>
        <GoVipButton />
        {/* <NotificationIcon /> */}
      </Header>
    </Box>
    <Box bg="defaultBackground">
      <Header leftButton="back" title="Chủ đề" search>
        <GoVipButton />
        {/* <NotificationIcon /> */}
      </Header>
    </Box>
    <Box bg="defaultBackground">
      <Header leftButton="caret-down">
        <GoVipButton />
      </Header>
    </Box>
  </Box>
);

storiesOf('Header', module)
  .addDecorator(reactNavigationDecorator)
  .add('Dark', () => (
    <ThemeProvider theme={darkTheme}>
      <HeaderStory />
    </ThemeProvider>
  ))
  .add('Light', () => (
    <ThemeProvider theme={lightTheme}>
      <HeaderStory />
    </ThemeProvider>
  ));
