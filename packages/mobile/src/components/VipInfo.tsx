import React, { PropsWithChildren } from 'react';
import { ColorProps, MarginProps } from 'styled-system';

import { Box, Flex, Text } from '../rebass';
import { Icon } from './svg-icon';

const Item = (props: PropsWithChildren<object>) => (
  <Flex flexDirection="row" minHeight={44} marginBottom={18}>
    {props.children}
  </Flex>
);

Item.Icon = () => <Icon color="primary" name="tick" size={18} />;
Item.Description = (props: PropsWithChildren<ColorProps & { note?: string }>) => (
  <Flex flex={1} marginLeft={15}>
    <Text fontSize={2} color={props.color || 'normalText'}>
      {props.children}
    </Text>
    {!!props.note && (
      <Text fontSize={1} color="lightText">
        {props.note}
      </Text>
    )}
  </Flex>
);

export const VipInfo = ({ price, ...props }: { price: string } & MarginProps) => (
  <Box
    border={1}
    borderColor="primary"
    position="relative"
    overflow="hidden"
    borderRadius={8}
    height={480}
    flexDirection="column"
    alignItems="center"
    {...props}>
    <Flex
      flexDirection="column"
      width="100%"
      alignItems="center"
      justifyContent="center"
      backgroundColor="primary"
      height={48}>
      <Text color="#262523" fontWeight="bold" fontSize={4} numberOfLines={1}>
        VIP
      </Text>
    </Flex>
    <Flex
      borderBottomColor="#3D3D3F"
      borderBottomWidth={1}
      flexDirection="column"
      width="100%"
      alignItems="center"
      justifyContent="center"
      height={73}
      px={29}>
      <Text fontSize={2} numberOfLines={1}>
        Chỉ với{' '}
        <Text fontWeight="bold" color="primary">
          {price}
        </Text>{' '}
        để trở thành IVIP và
      </Text>
      <Text fontSize={2} numberOfLines={1}>
        hưởng đặc quyền của mọi <Text fontWeight="bold">VIP member.</Text>
      </Text>
    </Flex>
    <Flex marginTop={18} flexDirection="column" width="100%" justifyContent="center" height={19}>
      <Text marginLeft={19} fontWeight="bold" fontSize={2} numberOfLines={1}>
        Quyền lợi đặc biệt
      </Text>
    </Flex>
    <Flex
      marginTop={28}
      paddingLeft={23}
      paddingRight={19}
      flexDirection="column"
      width="100%"
      justifyContent="center">
      <Item>
        <Item.Icon />
        <Item.Description note="Thưởng thức kho nhạc số chất lượng cao freedata, cập nhật thường xuyên nội dung Hot">
          Âm nhạc <Text fontWeight="bold">sống động đẳng cấp</Text>
        </Item.Description>
      </Item>
      <Item>
        <Item.Icon />
        <Item.Description note="cài đặt tất cả nhạc chờ với giá 0 đồng">
          Cài đặt nhạc chờ <Text fontWeight="bold">không giới hạn</Text>
        </Item.Description>
      </Item>
      <Item>
        <Item.Icon />
        <Item.Description note="Nghe nhạc thoải mái mà không sợ quảng cáo">
          <Text fontWeight="bold">Không</Text> quảng cáo
        </Item.Description>
      </Item>
      <Item>
        <Item.Icon />
        <Item.Description note="Tính năng miễn phí cho phép người gọi nghe nhạc chờ do chính mình cài đặt khi gọi tới thuê bao khác">
          Nhạc chờ cho <Text fontWeight="bold">người gọi</Text>
        </Item.Description>
      </Item>
    </Flex>
  </Box>
);
