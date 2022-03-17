import React from 'react';
import { Box, Text } from 'rebass';

import { Section } from '../components/Section';
import Banner from '../containers/Banner';
import Header from '../containers/Header';

export default {
  title: 'Banner',
  component: Banner,
};

export const Default = () => (
  <Box>
    <Header.Fixed />
    <Banner>
      <div>
        <img src="https://via.placeholder.com/1920x585" />
        <Banner.Content>
          <Text color="white" fontSize={5}>
            Sugar - Maroon 5
          </Text>
          <Text color="#B2B2B2" fontSize={3}>
            Sau khi phát hành, "Sugar" nhận được những phản ứng tích cực từ các nhà phê bình âm
            nhạc.
          </Text>
          <Text color="primary" fontSize={2}>
            2 giờ trước
          </Text>
        </Banner.Content>
      </div>
      <div>
        <img src="https://via.placeholder.com/1920x585" />
        <Banner.Content>Test</Banner.Content>
      </div>
    </Banner>
    <Section>
      <Box css={{ position: 'relative', textAlign: 'center' }}>
        <Text color="white" fontSize={3}>
          Cài đặt nhạc chờ Imuzik
        </Text>
        <Text color="primary" fontSize={3}>
          chỉ 10.000đ/tháng, cước tải bài hát 3.000đ
        </Text>
      </Box>
    </Section>
  </Box>
);
