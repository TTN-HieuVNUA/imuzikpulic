/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Box, Flex, Text } from 'rebass';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { Logo } from '../components/Logo';
import { Section } from '../components/Section';
import { useHelpArticleCategoriesQuery, useServerSettingsQuery } from '../queries';

const Hr = () => (
  <Box
    css={{
      width: '100%',
      height: 1,
      backgroundColor: '#3D3D3F',
    }}
  />
);
export default function Footer() {
  const { data } = useHelpArticleCategoriesQuery();
  const { data: serverSettingsData } = useServerSettingsQuery();
  return (
    <Section bg="black">
      <Flex flexDirection="column" alignItems="center">
        <Flex css={{ width: '100%' }} my={6}>
          <Flex width={3 / 4} flexWrap="wrap">
            {(data?.helpArticleCategories ?? []).map((item) => (
              <Link {...{ to: `/huong-dan/${item.slug}` }} style={{ color: 'white', fontWeight: 'bold', width: '33%',fontSize:'14px' }} key={item.id}>
                {item.name}
              </Link>
            ))}
          </Flex>
          <Box width={1 / 4}>
            <Text color="white" fontWeight="bold" fontSize={3} mb={4}>
              Liên hệ
            </Text>
            <Flex flexDirection="row" justifyContent="flex-start">
              <Box mr={3}>
                <a
                  href={serverSettingsData?.serverSettings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  <Icon name="fb" size={40} />
                </a>
              </Box>
              <Box mr={3}>
                <a href={`mailto:${serverSettingsData?.serverSettings.contactEmail}`}>
                  <Icon name="email" size={40} />
                </a>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Hr />
        <Flex justifyContent="space-between" css={{ width: '100%' }} alignItems="center" my={7}>
          <Logo />
          <Text ml={64} color="primary" fontWeight="bold" fontSize={3} flex={1}>
            Đơn vị chủ quản: Tập đoàn Công nghiệp - Viễn thông Quân đội Viettel
            <br />
            Giấy phép MXH số 67/GP-BTTTT cấp ngày 05/02/2016
          </Text>
          <Box>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">
              <Icon name="up" size={48} />
            </a>
          </Box>
        </Flex>
        <Text color="#5A5A5A" mb={26}>
          @ 2019 VAS Viettel. Imuzik. All rights reserved.
        </Text>
      </Flex>
    </Section>
  );
}
