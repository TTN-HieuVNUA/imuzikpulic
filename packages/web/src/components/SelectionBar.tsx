import React from 'react';
import { Flex, Text, TextProps } from 'rebass';
import { FlexProps, MarginProps, PaddingProps } from 'styled-system';

export interface SelectionBarItem<ItemType extends string> {
  key: ItemType;
  text: string;
}
export function SelectionBarItems<ItemType extends string>({
  selectedKey,
  items,
  onSelected,
  fontSize,
  selectedFontSize,
  selectedColor = 'primary',
  normalColor = 'lightText',
  flex,
  ...props
}: {
  selectedColor?: TextProps['color'];
  normalColor?: TextProps['color'];
  flex?: TextProps['flex'];
  selectedKey: ItemType;
  fontSize: number;
  selectedFontSize?: number;
  items: SelectionBarItem<ItemType>[];
  onSelected?: (item: SelectionBarItem<ItemType>) => void;
} & PaddingProps &
  MarginProps) {
  return (
    <>
      {items.map((item) => (
        <Flex key={item.key} flex={flex}>
          <Text
            onClick={() => onSelected && onSelected(item)}
            css={{
              cursor: 'pointer',
              width: '100%',
            }}
            textAlign="center"
            color={selectedKey === item.key ? selectedColor : normalColor}
            fontSize={(selectedKey === item.key && selectedFontSize) || fontSize}
            fontWeight="bold"
            {...props}>
            {item.text}
          </Text>
        </Flex>
      ))}
    </>
  );
}

export function SelectionBar<ItemType extends string>({
  selectedKey,
  items,
  onSelected,
  ...props
}: {
  selectedKey: ItemType;
  items: SelectionBarItem<ItemType>[];
  onSelected?: (item: SelectionBarItem<ItemType>) => void;
} & MarginProps &
  FlexProps) {
  return (
    <Flex
      alignItems="center"
      flexDirection="row"
      px={1}
      justifyContent="center"
      mx={-2}
      mt={1}
      {...props}>
      <SelectionBarItems<ItemType>
        {...{ selectedKey, items, onSelected }}
        fontSize={4}
        selectedFontSize={5}
        px={5}
        pt={2}
        pb={3}
        mr={1}
      />
    </Flex>
  );
}
