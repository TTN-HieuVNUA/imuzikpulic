import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { TabBar } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';

const allTabBars = (
  <Box bg="defaultBackground" py={3}>
    <Box bg="alternativeBackground">
      <TabBar>
        <TabBar.Item title="Trang chủ" icon="home" isActive />
        <TabBar.Item title="Nổi bật" icon="featured" />
        <TabBar.Item title="Khám phá" icon="tune" />
        <TabBar.Item title="Cá nhân" icon="user" />
      </TabBar>
    </Box>
    <Box height={50} />
    <Box bg="defaultBackground">
      <TabBar indicator="short" fontSize={3}>
        <TabBar.Item title="Quản lý dịch vụ" isActive />
        <TabBar.Item title="Thông tin cá nhân" />
      </TabBar>
    </Box>
    <Box height={50} />
    <Box bg="defaultBackground" px={3}>
      <TabBar indicator="long" fontSize={3}>
        <TabBar.Item title="Số điện thoại" isActive />
        <TabBar.Item title="Nhạc chờ" />
        <TabBar.Item title="Thời gian" />
      </TabBar>
    </Box>
    <Box height={50} />
    <Box bg="defaultBackground" px={3}>
      <TabBar indicator="long" fontSize={3}>
        <TabBar.Item title="Số điện thoại" />
        <TabBar.Item title="Nhạc chờ" />
        <TabBar.Item title="Thời gian" isActive />
      </TabBar>
    </Box>
  </Box>
);
storiesOf('TabBar', module)
  .add('Dark', () => <ThemeProvider theme={darkTheme}>{allTabBars}</ThemeProvider>)
  .add('Light', () => <ThemeProvider theme={lightTheme}>{allTabBars}</ThemeProvider>);
