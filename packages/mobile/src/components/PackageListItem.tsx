import React, { PropsWithChildren } from 'react';
import { ColorProps } from 'styled-system';
import { useVipBrandId } from '../hooks';
import { useNavigationLink } from '../platform/links';
import { Button, Flex, Text } from '../rebass';

const Item = (props: PropsWithChildren<object>) => (
  <Flex
    alignItems="center"
    flexDirection="row"
    justifyContent="space-between"
    minHeight={44}
    py={3}>
    {props.children}
  </Flex>
);

Item.Button = (props: {
  type: { type: string; content: string };
  onPress?: () => void;
  disabled?: boolean;
}) => (
  <Button
    onPress={props.onPress}
    variant={props.type.type}
    width={103}
    fontSize={props.type.type === 'primary' ? 0 : 2}
    disabled={props.disabled}>
    {props.type.content}
  </Button>
);

Item.Description = (props: PropsWithChildren<ColorProps & { note?: string }>) => (
  <Flex flex={1} mr={6}>
    <Text fontSize={2} color={props.color || 'normalText'} mb={1}>
      {props.children}
    </Text>
    {!!props.note && (
      <Text fontSize={1} numberOfLines={3} color="lightText">
        {props.note}
      </Text>
    )}
  </Flex>
);

const useContentType = (
  userPackage: { brandId: string; name: string; price: string; period: string },
  currentPackage: { brandId: string; name: string; price: string; period: string }
): [string, 'confirm' | 'cancel'] => {
  const vipBrandId = useVipBrandId();
  if (userPackage.brandId === '') {
    if (currentPackage.brandId === vipBrandId) {
      return [
        `Bạn có đồng ý đăng ký gói VIP và trở thành VIP Member của Imuzik với giá cước ${currentPackage.price} đồng/${currentPackage.period}, gia hạn hàng ${currentPackage.period}?`,
        'confirm',
      ];
    } else {
      return [
        `Bạn có chắc muốn đăng ký sử dụng Imuzik gói cước ${currentPackage.name}, giá cước ${currentPackage.price} đồng/${currentPackage.period}, gia hạn hàng ${currentPackage.period}`,
        'confirm',
      ];
    }
  } else {
    if (userPackage.brandId === vipBrandId) {
      return ['Bạn đã là thành viên VIP', 'cancel'];
    } else {
      if (currentPackage.brandId === vipBrandId) {
        return [
          `Bạn đang sử dụng gói cước ${userPackage.name}, giá cước ${userPackage.price} đồng/${userPackage.period}. Bạn có Đồng ý chuyển sang gói VIP để trở thành VIP Member?`,
          'confirm',
        ];
      } else {
        if (userPackage.brandId === currentPackage.brandId) {
          return [
            `Bạn đang sử dụng gói cước ${userPackage.name}, giá cước ${userPackage} đồng/${userPackage.period}, gia hạn hàng ${userPackage.period}`,
            'cancel',
          ];
        } else {
          return ['Để đăng ký vui lòng hủy gói cước đang sử dụng', 'cancel'];
        }
      }
    }
  }
};

export const PackageListItem = (props: {
  id: string;
  period: string;
  package: string;
  price: string;
  action: 'register' | 'cancel';
  onPress?: () => void;
  description?: string;
  disabled?: boolean;
  brandId: string;
  myRbtBrandId: string;
  myRbtPackage: string;
  myRbtPrice: string;
  myPeriod: string;
}) => {
  const [content, type] = useContentType(
    {
      brandId: props.myRbtBrandId,
      name: props.myRbtPackage,
      price: props.myRbtPrice,
      period: props.myPeriod,
    },
    { brandId: props.brandId, name: props.package, price: props.price, period: props.period }
  );
  const confirm = useNavigationLink('popup', {
    title: `Đăng ký ${props.package}`,
    type,
    content,
    action: props.onPress,
  });
  return (
    <Item>
      <Item.Description note={props.description}>
        <Text fontWeight="bold">{props.package}</Text>
        <Text fontWeight="bold" color="primary">
          {` ${props.price}đ/${props.period}`}
        </Text>
      </Item.Description>
      <Item.Button
        type={
          props.action === 'register'
            ? { type: 'outline', content: 'ĐĂNG KÝ' }
            : { type: 'primary', content: 'ĐANG SỬ DỤNG' }
        }
        disabled={props.disabled}
        onPress={confirm}
      />
    </Item>
  );
};
