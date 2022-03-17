import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { GoVipButton, Member } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';
import { reactNavigationDecorator } from '../decorators';

const MemberStory = () => (
  <Box bg="defaultBackground" p={3}>
    <Member image="https://via.placeholder.com/200" name="Thu Huyền" package="MIỄN PHÍ">
      <GoVipButton />
    </Member>
    <Box height={100} />
    <Member
      image="https://via.placeholder.com/200"
      name="Thu Huyền Thu Huyền Thu Huyền Thu Huyền Thu Huyền Thu Huyền "
      package="MIỄN PHÍ">
      <GoVipButton mr={1} />
    </Member>
  </Box>
);

storiesOf('Member', module)
  .addDecorator(reactNavigationDecorator)
  .add('Dark', () => (
    <ThemeProvider theme={darkTheme}>
      <MemberStory />
    </ThemeProvider>
  ))
  .add('Light', () => (
    <ThemeProvider theme={lightTheme}>
      <MemberStory />
    </ThemeProvider>
  ));
