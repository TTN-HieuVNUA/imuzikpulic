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
            Ca s???: {props.song.artist}
          </Text>
          <Text color="lightText" fontSize={2} mb={2.5} fontWeight="bold" numberOfLines={1}>
            T??c gi???: {props.song.composer}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Item>
          <Item.Title>M?? nh???c ch???</Item.Title>
          <Item.Value>{props.code}</Item.Value>
        </Item>
        <Item>
          <Item.Title>Nh?? cung c???p</Item.Title>
          <Item.Value>
            <NavLink route="/nha-cung-cap/[group]" params={{ group: props?.cp }}>
              <Text color="green">{props.cpGroup}</Text>
            </NavLink>
          </Item.Value>
        </Item>
        <Item>
          <Item.Title>Gi??</Item.Title>
          <Item.Value color="primary" note="*???? bao g???m VAT">
            {props.price} ??/b??i
          </Item.Value>
        </Item>
        <Item>
          <Item.Title>Th???i h???n s??? d???ng</Item.Title>
          <Item.Value>{props.expiry} ng??y</Item.Value>
        </Item>
        {
          props.timeCreate ? (
            <Item>
              <Item.Title>Ng??y mua</Item.Title>
              <Item.Value>{props.timeCreate}</Item.Value>
            </Item>
          ) : (
            <Item>
              <Item.Title>Ng??y mua</Item.Title>
              <Item.Value>{props.published}</Item.Value>
            </Item>
          )
        }
        <Item>
          <Item.Title>Ng??y h???t h???n</Item.Title>
          <Item.Value>{props.published}</Item.Value>
        </Item>
        <Item>
          <Item.Title>S??? l?????t t???i</Item.Title>
          <Item.Value>{props.download} l?????t</Item.Value>
        </Item>
        <Text fontSize={1} pt={3} color="lightText">
          *Nh???c ch??? s??? t??? ?????ng gia h???n sau khi h???t th???i h???n.
        </Text>
        <Text fontSize={1} color="lightText">
          {'Gi??: '}
          <Text fontSize={1} pt={3} color="secondary" fontWeight="bold">
            {`${props.price}??/b??i/${props.expiry}ng??y`}
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