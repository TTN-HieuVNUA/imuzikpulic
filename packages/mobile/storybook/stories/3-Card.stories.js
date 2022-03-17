import { text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { CardCenter, CardLeft } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme } from '../../src/themes';

storiesOf('Card', module)
  .add('Left', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" p={2}>
        <CardLeft
          title={text('title', 'Coffee time')}
          image="https://via.placeholder.com/200"
          description={text('description', 'Một chút mô tả')}
        />
      </Box>
      <Box bg="defaultBackground" p={2}>
        <CardLeft
          title="Coffee time Coffee time Coffee time Coffee time Coffee time Coffee time Coffee time"
          image="https://via.placeholder.com/200"
          description="Một chút mô tả Một chút mô tả Một chút mô tả Một chút mô tả Một chút mô tả Một chút mô tả Một chút mô tả Một chút mô tả Một chút mô tả Một chút mô tả Một chút mô tả Một chút mô tả"
        />
      </Box>
      <Box bg="defaultBackground" p={2}>
        <CardLeft title={text('title', 'Coffee time')} image="https://via.placeholder.com/200" />
      </Box>
    </ThemeProvider>
  ))

  .add('Center', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" p={2}>
        <CardCenter title={text('title', 'DITECH')} image="https://via.placeholder.com/200" />
        <CardCenter
          title="Long Text Long Text Long Text Long Text Long Text Long Text Long Text"
          image="https://via.placeholder.com/200"
        />
      </Box>
    </ThemeProvider>
  ));
