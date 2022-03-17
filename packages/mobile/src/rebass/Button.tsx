import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { TouchableNativeFeedbackProps } from 'react-native';
import { DefaultTheme, useTheme } from 'styled-components/native';
import { TextColorProps } from 'styled-system';

import { Flex, StyledButton, StyledButtonProps, Text } from './others';

export interface ButtonProps
  extends StyledButtonProps,
    TouchableNativeFeedbackProps,
    TextColorProps {
  leftIcon?: ReactNode;
  activeOpacity?: number;
  variant?: keyof DefaultTheme['buttons'];
  fontSize?: number;
  size?: 'default' | 'large' | 'medium' | 'largest';
}

export const Button = ({
  bg: _bg,
  borderRadius,
  children,
  leftIcon,
  size = 'default',
  color,
  fontSize,
  variant = 'primary',
  ...props
}: React.PropsWithChildren<ButtonProps>) => {
  const theme = useTheme();
  const { text: defaultText, ...defaultButton } = theme.buttons.default || {};
  const { text, textStyle, gradient, ...button } = theme.buttons[variant] || {};
  return (
    <StyledButton
      borderRadius={borderRadius === undefined ? 10 : borderRadius}
      {...defaultButton}
      {...button}
      {...props}
      style={{}}
      height={size === 'largest' ? 56 :size === 'large' ? 50 : size === 'medium' ? 40 : 32}
      activeOpacity={props.activeOpacity || 0.7}
      justifyContent="center"
      overflow="hidden">
      <LinearGradient
        colors={gradient?.colors || ['transparent', 'transparent']}
        start={[0, 0]}
        end={[1, 1]}
        style={{ height: '100%' }}>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%">
          <Text
            style={{
              ...textStyle,
            }}
            {...{
              ...defaultText,
              ...text,
              ...(color !== undefined && { color }),
              ...(fontSize !== undefined && { fontSize }),
            }}>
            {leftIcon ? (
              <>
                {leftIcon} {children}
              </>
            ) : (
              children
            )}
          </Text>
        </Flex>
      </LinearGradient>
    </StyledButton>
  );
};
