import React from 'react';

import { Banner } from '../components';
import { Text } from '../rebass';

export const MockBanner = () => (
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
);
