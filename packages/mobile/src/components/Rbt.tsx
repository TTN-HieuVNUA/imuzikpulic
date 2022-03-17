import React, { PropsWithChildren } from 'react';
import { Image } from 'react-native';
import { ColorProps } from 'styled-system';

import { Flex, Text } from '../rebass';
import { NavLink } from '../platform/links';
import { useTheme } from 'styled-components/native';

export interface RbtProps {
  song: {
    title: string;
    artist: string;
    image?: string | null;
    composer?: string;
  };
  code: string;
  cp?: string;
  timeCreate?: string;
  cpGroup?: string;
  price: number;
  expiry: number;
  published: string;
  download: number;
}

const Item = (props: PropsWithChildren<object>) => (
  <Flex
    flexDirection="row"
    borderBottomColor="#3D3D3F"
    borderBottomWidth={1}
    minHeight={44}
    justifyContent="space-between"
    alignItems="center">
    {props.children}
  </Flex>
);

Item.Title = (props: PropsWithChildren<object>) => (
  <Text fontSize={2} fontWeight="bold" color="lightText">
    {props.children}
  </Text>
);
Item.Value = (props: PropsWithChildren<ColorProps & { note?: string }>) => (
  <Flex alignItems="flex-end">
    <Text fontSize={2} fontWeight="bold" color={props.color || 'normalText'}>
      {props.children}
    </Text>
    {!!props.note && (
      <Text fontSize={1} color="lightText">
        {props.note}
      </Text>
    )}
  </Flex>
);
export const Rbt = (props: RbtProps) => {
  return (
    <Flex>
      <Flex alignItems="center" flexDirection="row" mb={3}>
        <Flex bg="#C4C4C4" overflow="hidden" borderRadius={8} width={64} height={64}>
          {!!props.song.image ? (
            <Image source={{ uri: props.song.image }} style={{ width: '100%', height: '100%' }} />
          ) : (<LogoImuzik size='lg' />)}
        </Flex>
        <Flex
          flexDirection="column"
          mx={3}
          width="100%"
          flex={1}
          justifyContent="space-between"
          height={64}>
          <Text color="primary" fontSize={3} fontWeight="bold" numberOfLines={1}>
            {props.song.title}
          </Text>
          <Text color="lightText" fontSize={2} mb={2.5} fontWeight="bold" numberOfLines={1}>
            Ca sỹ: {props.song.artist}
          </Text>
          <Text color="lightText" fontSize={2} mb={2.5} fontWeight="bold" numberOfLines={1}>
            Tác giả: {props.song.composer}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Item>
          <Item.Title>Mã nhạc chờ</Item.Title>
          <Item.Value>{props.code}</Item.Value>
        </Item>
        <Item>
          <Item.Title>Nhà cung cấp</Item.Title>
          <Item.Value>
            <NavLink route="/nha-cung-cap/[group]" params={{ group: props?.cp }}>
              <Text color="green">{props.cpGroup}</Text>
            </NavLink>
          </Item.Value>
        </Item>
        <Item>
          <Item.Title>Giá</Item.Title>
          <Item.Value color="primary" note="*Đã bao gồm VAT">
            {props.price} đ/bài
          </Item.Value>
        </Item>
        <Item>
          <Item.Title>Thời hạn sử dụng</Item.Title>
          <Item.Value>{props.expiry} ngày</Item.Value>
        </Item>
        {
          props.timeCreate ? (
            <Item>
              <Item.Title>Ngày mua</Item.Title>
              <Item.Value>{props.timeCreate}</Item.Value>
            </Item>
          ) : (
            <Item>
              <Item.Title>Ngày mua</Item.Title>
              <Item.Value>{props.published}</Item.Value>
            </Item>
          )
        }
        <Item>
          <Item.Title>Ngày hết hạn</Item.Title>
          <Item.Value>{props.published}</Item.Value>
        </Item>
        <Item>
          <Item.Title>Số lượt tải</Item.Title>
          <Item.Value>{props.download} lượt</Item.Value>
        </Item>
        <Text fontSize={1} pt={3} color="lightText">
          *Nhạc chờ sẽ tự động gia hạn sau khi hết thời hạn.
        </Text>
        <Text fontSize={1} color="lightText">
          {'Giá: '}
          <Text fontSize={1} pt={3} color="secondary" fontWeight="bold">
            {`${props.price}đ/bài/${props.expiry}ngày`}
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
};

export const LogoImuzik = (props: { size?: 'lg' | 'md' }) => {
  const theme = useTheme();
  return (
    <Image
      source={

        require('../../assets/icon.png')

      }
      style={{ width: 64, height: 64 }}
    />
  );
};