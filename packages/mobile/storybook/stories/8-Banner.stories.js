import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { Banner } from '../../src/components';
import { MockBanner } from '../../src/containers/mock-banner';
import { Box, Text } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';

storiesOf('Banner', module)
  .add('Dark', () => {
    return (
      <ThemeProvider theme={darkTheme}>
        <Box bg="defaultBackground">
          <Banner>
            <Banner.Item image="https://via.placeholder.com/500">
              <Text fontWeight="bold" fontSize={3} color="white">
                Cài đặt nhạc chờ Imuzik
              </Text>
              <Text fontWeight="bold" color="primary" fontSize={2}>
                chỉ 10.000đ/tháng, cước tải bài hát 3.000đ
              </Text>
            </Banner.Item>
            <Banner.Item image="https://via.placeholder.com/500">
              <Text fontWeight="bold" fontSize={3} color="white">
                Cài đặt nhạc chờ Imuzik
              </Text>
              <Text fontWeight="bold" color="primary" fontSize={2}>
                chỉ 10.000đ/tháng, cước tải bài hát 3.000đ
              </Text>
            </Banner.Item>
          </Banner>
          <MockBanner />
        </Box>
      </ThemeProvider>
    );
  })
  .add('Light', () => {
    return (
      <ThemeProvider theme={lightTheme}>
        <Box bg="defaultBackground">
          <Banner>
            <Banner.Item image="https://via.placeholder.com/500">
              <Text fontWeight="bold" fontSize={3} color="white">
                Cài đặt nhạc chờ Imuzik
              </Text>
              <Text fontWeight="bold" color="primary" fontSize={2}>
                chỉ 10.000đ/tháng, cước tải bài hát 3.000đ
              </Text>
            </Banner.Item>
            <Banner.Item image="https://via.placeholder.com/500">
              <Text fontWeight="bold" fontSize={3} color="white">
                Cài đặt nhạc chờ Imuzik
              </Text>
              <Text fontWeight="bold" color="primary" fontSize={2}>
                chỉ 10.000đ/tháng, cước tải bài hát 3.000đ
              </Text>
            </Banner.Item>
          </Banner>
        </Box>
      </ThemeProvider>
    );
  });
