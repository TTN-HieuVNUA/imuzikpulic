import { format } from 'date-fns';
import { addDays, parse } from 'date-fns/esm';
import React, { PropsWithChildren } from 'react';
import { Box, Flex, Image, Text } from 'rebass';
import { ColorProps } from 'styled-system';

import { Separator } from './Separator';

export interface RbtProps {
  song: {
    title: string;
    artist: string;
    image: string;
    composer?: string;
  };
  code: string;
  cp: string;
  price?: number | null;
  expiry?: number;
  purchased?: string;
  genre?: string;
  download?: number | null;
}

export const Item = (props: PropsWithChildren<object>) => (
  <Flex flexDirection="row" mt={3} justifyContent="flex-start" alignItems="center">
    {props.children}
  </Flex>
);

Item.Vertical = (props: PropsWithChildren<object>) => (
  <Flex flexDirection="column" justifyContent="center" alignItems="flex-start">
    {props.children}
  </Flex>
);

Item.Title = (props: PropsWithChildren<object>) => (
  <Text fontSize={2} fontWeight="bold" color="lightText" minWidth={120}>
    {props.children}
  </Text>
);
Item.Value = (props: PropsWithChildren<ColorProps & { note?: string }>) => (
  <Flex flexDirection="column" alignItems="flex-end">
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
    <Flex flexDirection="column">
      <Flex>
        <Flex alignItems="center" flexDirection="row" mb={3} width={0.5}>
          <Flex bg="#C4C4C4" overflow="hidden" css={{ borderRadius: 8 }}>
            <Image src={props.song.image} css={{ width: 64, height: 64 }} />
          </Flex>
          <Flex
            flexDirection="column"
            mx={3}
            width="100%"
            flex={1}
            justifyContent="space-between"
            height={64}>
            <Text color="primary" fontSize={3} fontWeight="bold">
              {props.song.title}
            </Text>
            <Text color="lightText" fontSize={2} mb={2.5}>
              Ca s???: {props.song.artist}
            </Text>
            <Text color="lightText" fontSize={2} mb={2.5}>
              T??c gi???: {props.song.composer}
            </Text>
          </Flex>
        </Flex>
        <Flex width={0.5} justifyContent="space-between">
          <Item.Vertical>
            <Item.Title>M?? nh???c ch???</Item.Title>
            <Item.Value>{props.code}</Item.Value>
          </Item.Vertical>
          <Item.Vertical>
            <Item.Title></Item.Title>
            <Item.Value color="primary" note="*???? bao g???m VAT">
              {props.price} ??/b??i
            </Item.Value>
          </Item.Vertical>
        </Flex>
      </Flex>
      <Separator />
      <Flex flexWrap="wrap">
        <Box width={0.5}>
          <Item>
            <Item.Title>Nh?? cung c???p</Item.Title>
            <Item.Value>{props.cp}</Item.Value>
          </Item>
        </Box>
        <Box width={0.5}>
          <Item>
            <Item.Title>Th???i h???n s??? d???ng</Item.Title>
            <Item.Value>{props.expiry} ng??y</Item.Value>
          </Item>
        </Box>
        <Box width={0.5}>
          <Item>
            <Item.Title>Th??? lo???i</Item.Title>
            <Item.Value>{props.genre}</Item.Value>
          </Item>
        </Box>
        <Box width={0.5}>
          <Item>
            <Item.Title>Ng??y mua</Item.Title>
            <Item.Value>{props.purchased}</Item.Value>
          </Item>
        </Box>
        <Box width={0.5}>
          <Item>
            <Item.Title>S??? l?????t t???i</Item.Title>
            <Item.Value>{props.download} l?????t</Item.Value>
          </Item>
        </Box>
        <Box width={0.5}>
          <Item>
            <Item.Title>Ng??y h???t h???n</Item.Title>
            <Item.Value>
              {props.purchased
                ? format(
                  addDays(parse(props.purchased, 'dd/MM/yyyy', new Date()), props.expiry),
                  'dd/MM/yyyy'
                )
                : ''}
            </Item.Value>
          </Item>
        </Box>
      </Flex>
    </Flex>
  );
};
