import React, { PropsWithChildren, ReactNode } from 'react';
import { Box, Flex, Text } from 'rebass';
import { ColorProps, FontWeightProps, PaddingProps } from 'styled-system';

const Item = (props: PropsWithChildren<{ width?: number }>) => (
  <Flex width={props.width || 1 / 2} flexDirection="row" alignItems="center">
    {props.children}
  </Flex>
);

Item.Icon = (props: { icon?: ReactNode; iconPadding?: number }) => (
  <Flex>{props.icon && <Flex mr={props.iconPadding ?? 1}>{props.icon}</Flex>}</Flex>
);

Item.Description = (props: PropsWithChildren<ColorProps & { note?: string }>) => (
  <Flex flex={1} flexDirection="column">
    <Text fontSize={2} color={props.color || 'normalText'}>
      {props.children}
    </Text>
    {!!props.note && (
      <Text fontSize={2} color="lightText">
        {props.note}
      </Text>
    )}
  </Flex>
);

export const ListItem = (
  props: PropsWithChildren<{
    icon?: ReactNode;
    iconPadding?: number;
    title: string;
    subtitle?: string;
    value?: string;
    titleWidth?: number;
    showEllipsis?: 'visible' | 'hidden' | 'none';
    onEllipsisClick?: () => void;
  }> &
    FontWeightProps &
    PaddingProps
) => {
  const {
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
    ...paddingProps
  } = props;
  return (
    <Flex alignItems="center" overflow="hidden" flexDirection="row" py={3} {...paddingProps}>
      <Flex flex={1} alignItems="center" flexDirection="row">
        <Item width={titleWidth}>
          <Item.Icon icon={icon} iconPadding={iconPadding} />
          <Item.Description note={subtitle}>
            <Text fontWeight={fontWeight}>{title}</Text>
          </Item.Description>
        </Item>
        <Flex flex={1} flexDirection="column">
          {value ? (
            <Text fontSize={2} fontWeight={fontWeight}>
              {value}
            </Text>
          ) : (
            children
          )}
        </Flex>
      </Flex>
      <Box width={showEllipsis === 'none' ? 0 : 20}>
        {showEllipsis === 'visible' && (
          <Box onClick={onEllipsisClick}>
            {/* <Icon name="ellipsis-v" size={16} /> */}
            ...
          </Box>
        )}
      </Box>
    </Flex>
  );
};
