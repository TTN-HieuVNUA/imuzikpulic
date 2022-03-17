import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { PackageListItem, Separator } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';

storiesOf('PackageListItem', module)
  .add('Dark', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" p={3}>
        <PackageListItem
          package="Gói ngày"
          price="1.000đ"
          period="ngày"
          description="Đã bao gồm VAT - Tải nhạc chờ không giới hạn"
          action="register"
        />
        <Separator />
        <PackageListItem
          package="Gói tuần"
          price="5.000đ"
          period="tuần"
          description="2500đ/tuần đầu tiên, 5000đ/các tuần tiếp theo, Đã bao gồm VAT - Tải nhạc chờ không giới hạn"
          action="cancel"
        />
        <Separator />
      </Box>
    </ThemeProvider>
  ))
  .add('Light', () => (
    <ThemeProvider theme={lightTheme}>
      <Box bg="defaultBackground" p={3}>
        <PackageListItem
          package="Gói ngày"
          price="1.000đ"
          period="ngày"
          description="Đã bao gồm VAT - Tải nhạc chờ không giới hạn"
          action="register"
        />
        <Separator />
        <PackageListItem
          package="Gói tuần"
          price="5.000đ"
          period="tuần"
          description="2500đ/tuần đầu tiên, 5000đ/các tuần tiếp theo, Đã bao gồm VAT - Tải nhạc chờ không giới hạn"
          action="cancel"
        />
        <Separator />{' '}
      </Box>
    </ThemeProvider>
  ));
