import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { InputWithButton } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';

const allTabBars = (
  <Box bg="defaultBackground" py={3}>
    <Box bg="defaultBackground" p={2}>
      <InputWithButton
        placeholder={text('placeholder', 'Nhập tên nhóm')}
        icon={text('icon', 'plus')}
        gradient
        border={false}
        onPress={action('onpress')}
      />
    </Box>
    <Box bg="defaultBackground" p={2}>
      <InputWithButton
        placeholder="*Nhập số điện thoại người nhận"
        icon="address-book"
        gradient={false}
        border
        onPress={action('onpress')}
      />
    </Box>
  </Box>
);

storiesOf('InputWithButton', module)
  .add('Dark', () => <ThemeProvider theme={darkTheme}>{allTabBars}</ThemeProvider>)
  .add('Light', () => <ThemeProvider theme={lightTheme}>{allTabBars}</ThemeProvider>);
