import React, { PropsWithChildren } from 'react';
import { Dimensions, Platform } from 'react-native';
import { MarginProps } from 'styled-system';

import { Flex, Text } from '../rebass';

export const Footer = (props: PropsWithChildren<object>) => {
  return (
    <Flex flexDirection="column" bg="black" py={3}>
      <Flex px={3}>
        <Text color="secondary" fontSize={0} fontWeight="bold" mb={3}>
          Đơn vị chủ quản: Tập đoàn Công nghiệp - Viễn thông Quân đội Viettel
        </Text>
        <Text color="secondary" fontSize={0} fontWeight="bold" mb={3}>
          Giấy phép MXH số 67/GP-BTTTT cấp ngày 05/02/2016
        </Text>
      </Flex>
      <Flex flexDirection="row" flexWrap="wrap">
        {props.children}
      </Flex>
      <Text color="lightText" textAlign="center" m={3} fontSize={0} fontWeight="bold">
        ©2019 VAS Viettel. Imuzik. All rights reserved.
      </Text>
    </Flex>
  );
};
Footer.Item = (props: PropsWithChildren<MarginProps>) => {
  const screenWidth = Math.round(Dimensions.get('window').width) || 500;
  return (
    <Text
      width={Platform.OS === 'web' ? '50vw' : screenWidth / 2}
      color="white"
      fontWeight="bold"
      fontSize={1}
      py={2}
      px={3}
      {...props}
    />
  );
};
