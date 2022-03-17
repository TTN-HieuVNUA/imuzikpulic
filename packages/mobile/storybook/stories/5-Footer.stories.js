import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { Footer } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme } from '../../src/themes';

storiesOf('Footer', module).add('Default', () => (
  <ThemeProvider theme={darkTheme}>
    <Box bg="defaultBackground">
      <Footer>
        <Footer.Item>Liên hệ</Footer.Item>
        <Footer.Item>Chính sách bảo mật</Footer.Item>
        <Footer.Item>Hướng dẫn</Footer.Item>
        <Footer.Item>Tổng đài âm nhạc</Footer.Item>
        <Footer.Item>Điều khoản sử dụng</Footer.Item>
        <Footer.Item>Nhạc chờ doanh nghiệp</Footer.Item>
        <Footer.Item>Góp ý / báo lỗi</Footer.Item>
        <Footer.Item>Quy chế sàn</Footer.Item>
        <Footer.Item>Câu hỏi thường gặp</Footer.Item>
      </Footer>
    </Box>
  </ThemeProvider>
));
