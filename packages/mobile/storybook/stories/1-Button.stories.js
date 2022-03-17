import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { Icon } from '../../src/components';
import { Box, Button } from '../../src/rebass';
import { darkTheme } from '../../src/themes';

storiesOf('Button', module)
  .add('Primary', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" p={2}>
        <Button variant="primary" width={86}>
          Go VIP
        </Button>
      </Box>
    </ThemeProvider>
  ))
  .add('PrimaryWithIcon', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" p={2}>
        <Button
          variant="primary"
          leftIcon={<Icon name="player-play" color="#262523" size={7} />}
          fontSize={0}
          width={100}>
          NGHE TẤT CẢ
        </Button>
      </Box>
    </ThemeProvider>
  ))
  .add('Secondary', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" p={2}>
        <Button variant="secondary" size="large" fontSize={16}>
          CÀI NHẠC CHỜ
        </Button>
      </Box>
    </ThemeProvider>
  ))
  .add('Outline', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" p={2}>
        <Button variant="outline" color="#979797" textColor="white">
          ĐĂNG KÝ
        </Button>
      </Box>
    </ThemeProvider>
  ))
  .add('Muted', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" p={2}>
        <Button variant="muted" size="large" fontSize={16}>
          QUAY LẠI
        </Button>
      </Box>
    </ThemeProvider>
  ))
  .add('Underlined', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" p={2}>
        <Button variant="underline" size="large" fontSize={1}>
          Xem tất cả
        </Button>
      </Box>
    </ThemeProvider>
  ));
