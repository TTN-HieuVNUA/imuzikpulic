import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { BackgroundColorProps, FlexProps } from 'styled-system';
import { Box, Flex, Input, InputProps, Text } from '../rebass';
import { Icon, IconColor, IconName, ICON_GRADIENT_1 } from './svg-icon';

export interface InputWithButtonProps extends InputProps {
  text?: string;
  textColor?: string;
  textSize?: number;
  icon?: IconName;
  iconColor?: IconColor;
  iconSize?: number;
  gradient?: boolean;
  border?: boolean;
  borderRadius?: number;
  onPress?: () => void;
  disabled?: boolean;
  height?: number;
  maxLength?: number;
}
export const InputWithButton = ({
  text,
  textColor,
  textSize,
  border,
  borderRadius,
  icon,
  iconColor,
  iconSize,
  onPress,
  gradient,
  disabled,
  bg,
  backgroundColor,
  height,
  flex,
  placeholderTextColor,
  maxLength,
  ...inputProps
}: InputWithButtonProps & BackgroundColorProps & FlexProps) => {
  const theme = useTheme();
  return (
    <Box
      backgroundColor={bg || backgroundColor || 'alternativeBackground'}
      height={height ?? 48}
      alignItems="center"
      borderRadius={borderRadius || 8}
      borderColor={border ? 'lightText' : 'transparent'}
      borderWidth={border ? 1 : 0}
      overflow="hidden"
      justifyContent="space-between"
      flex={flex}
      flexDirection="row">
      <Flex flexDirection="row" flex={1} height="100%">
        <Input
          px={3}
          fontSize={2}
          width="100%"
          height="100%"
          color="normalText"
          placeholder={inputProps.placeholder}
          placeholderTextColor={placeholderTextColor ? placeholderTextColor : theme.colors.primary}
          editable={!disabled}
          underlineColorAndroid="transparent"
          selectionColor={theme.colors.primary}
          value={inputProps.value}
          onChange={inputProps.onChange}
          onChangeText={inputProps.onChangeText}
          secureTextEntry={inputProps.secureTextEntry}
          maxLength={maxLength}
        />
      </Flex>
      {icon && (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
          <Box p={3}>
            <Icon
              name={icon}
              size={iconSize || 20}
              color={gradient ? ICON_GRADIENT_1 : iconColor || 'normalText'}
            />
          </Box>
        </TouchableOpacity>
      )}
      {text && (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
          <Box p={3}>
            <Text fontSize={textSize || 20} color={textColor || 'white'}>
              {text}
            </Text>
          </Box>
        </TouchableOpacity>
      )}
    </Box>
  );
};
