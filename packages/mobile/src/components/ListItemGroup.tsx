import React, { PropsWithChildren, ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { ColorProps, FontWeightProps, PaddingProps } from 'styled-system';
import { NavLink } from '../platform/links';

import { Box, Flex, Text } from '../rebass';
import { Theme } from '../themes';
import { Icon } from './svg-icon';

const Item = (props: PropsWithChildren<{ width?: number }>) => (
  <Flex width={props.width || 1 / 2} flexDirection="row" alignItems="center">
    {props.children}
  </Flex>
);

Item.Icon = (props: { icon?: ReactNode; iconPadding?: number }) => (
  <Flex>{props.icon && <Flex mr={props.iconPadding ?? 1}>{props.icon}</Flex>}</Flex>
);

Item.Description = (props: PropsWithChildren<ColorProps & { note?: string }>) => (
  <Flex flex={1}>
    <Text fontSize={2} numberOfLines={1} color={props.color || 'normalText'}>
      {props.children}
    </Text>
    {!!props.note && (
      <Text fontSize={1} numberOfLines={1} color="lightText">
        {props.note}
      </Text>
    )}
  </Flex>
);

export const ListItemGroup = (
  props: PropsWithChildren<{
    groupId?:string
    icon?: ReactNode;
    iconPadding?: number;
    title: string;
    subtitle?: string;
    value?: string;
    titleWidth?: number;
    titleColor?: keyof Theme['colors'];
    showEllipsis?: 'visible' | 'hidden' | 'none';
    showCaret?: boolean;
    onEllipsisClick?: () => void;
  }> &
    FontWeightProps &
    PaddingProps
) => {
  const {
    groupId,
    icon,
    iconPadding,
    title,
    subtitle,
    value,
    titleWidth,
    showEllipsis = 'hidden',
    onEllipsisClick,
    fontWeight,
    children,
    showCaret = false,
    ...paddingProps
  } = props;
  return (
    <Box alignItems="center" overflow="hidden" flexDirection="row" py={3} {...paddingProps}>
      
      <Box flex={1} alignItems="center" flexDirection="row">
      <NavLink route="/ca-nhan/nhac-cho-nhom/[groupId]" params={{ groupId: groupId }}>
        <Item width={titleWidth}>
          <Item.Icon icon={icon} iconPadding={iconPadding} />
          <Item.Description note={subtitle}>
            <Text fontWeight={fontWeight} color={props.titleColor}>
              {title}
            </Text>
          </Item.Description>
        </Item>
        <Flex flex={1}>
          {value ? (
            <Text fontSize={2} fontWeight={fontWeight}>
              {value}
            </Text>
          ) : (
            children
          )}
        </Flex>
        </NavLink>
      </Box>
      
      {showCaret ? (
        <Flex justifyContent="center" alignItems="center" width={40}>
          <Icon name="caret-right" size={14} color="listItemCaret" />
        </Flex>
      ) : (
        <Box width={showEllipsis === 'none' ? 0 : 40}>
          {showEllipsis === 'visible' && (
            <TouchableOpacity onPress={onEllipsisClick}>
              <Flex justifyContent="center" alignItems="flex-end">
                <Icon name="ellipsis-v" size={16} />
              </Flex>
            </TouchableOpacity>
          )}
        </Box>
      )}
    </Box>
  );
};
