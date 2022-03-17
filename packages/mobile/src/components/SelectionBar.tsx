import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { FlexProps, MarginProps, PaddingProps } from 'styled-system';

import { Flex, Text } from '../rebass';

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
  ...props
}: {
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
        <TouchableOpacity key={item.key} onPress={() => onSelected && onSelected(item)}>
          <Text
            color={selectedKey === item.key ? 'primary' : 'lightText'}
            fontSize={(selectedKey === item.key && selectedFontSize) || fontSize}
            fontWeight="bold"
            {...props}>
            {item.text}
          </Text>
        </TouchableOpacity>
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
    <ScrollView horizontal alwaysBounceVertical={false}>
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
          fontSize={3}
          selectedFontSize={4}
          px={1}
          pt={2}
          pb={3}
          mr={1}
        />
      </Flex>
    </ScrollView>
  );
}
