import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';

import { Box, Button, Flex, Text } from '../rebass';
import { Icon } from './svg-icon';

export const AddMemberCard = (props: {
  onCancel?: () => void;
  onAdd?: () => void;
  showContact?: boolean;
  onPressContact?: () => void;
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  disabled?: boolean;
}) => (
  <Box overflow="hidden" borderRadius={8} p={4} flexDirection="row" alignItems="center" bg="white">
    <Flex flexDirection="column" flex={1}>
      <Text fontWeight="bold" fontSize={4} pb={32} color="#262523">
        Thêm số điện thoại
      </Text>
      <Flex flexDirection="row" alignItems="center" pb={3}>
        <TextInput
          editable={!props.disabled}
          placeholder="Nhập tên"
          placeholderTextColor="#848484"
          underlineColorAndroid="transparent"
          value={props.name}
          onChangeText={props.setName}
          style={{
            width: '100%',
            height: 48,
            paddingLeft: 15,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: '#C9C9C9',
            color: '#262523',
            fontSize: 14,
          }}
        />
        {!!props.showContact && (
          <TouchableOpacity onPress={props.onPressContact}>
            <Flex justifyContent="center" alignItems="center" pl={13}>
              <Icon name="address-book" size={20} color="gray" />
              <Text fontSize={1} pt={1} color="gray">
                Danh bạ
              </Text>
            </Flex>
          </TouchableOpacity>
        )}
      </Flex>
      <Flex pb={1}>
        <TextInput
          placeholder="Nhập số điện thoại "
          editable={!props.disabled}
          placeholderTextColor="#848484"
          underlineColorAndroid="transparent"
          value={props.phone}
          onChangeText={props.setPhone}
          style={{
            width: '100%',
            height: 48,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: '#C9C9C9',
            color: '#262523',
            fontSize: 14,
            paddingLeft: 15,
          }}
        />
      </Flex>
      <Flex pt={4} flexDirection="row" alignItems="center">
        <Box width={120}>
          <Button
            variant="secondary"
            size="large"
            fontSize={16}
            onPress={props.onAdd}
            disabled={props.disabled}>
            Thêm SĐT
          </Button>
        </Box>
        <Box width={105} ml={2}>
          <Button
            borderWidth={0}
            size="large"
            variant="outline"
            color="#3D3D3F"
            onPress={props.onCancel}
            disabled={props.disabled}>
            Hủy bỏ
          </Button>
        </Box>
      </Flex>
    </Flex>
  </Box>
);
