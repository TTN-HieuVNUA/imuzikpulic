import React, { PropsWithChildren } from 'react';
import {
  TouchableOpacityProps,
  View,
  Text as _Text,
  TextInput as _TextInput,
  TextProps as _TextProps,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import {
  AlignContentProps,
  AlignItemsProps,
  BackgroundColorProps,
  BorderColorProps,
  BorderProps,
  BorderRadiusProps,
  BottomProps,
  BoxShadowProps,
  ColorProps,
  FlexDirectionProps,
  FlexProps,
  FlexWrapProps,
  FontSizeProps,
  HeightProps,
  JustifyContentProps,
  LayoutProps,
  LeftProps,
  OverflowProps,
  PositionProps,
  RightProps,
  SpaceProps,
  TopProps,
  TypographyProps,
  WidthProps,
  ZIndexProps,
  borderRadius as _borderRadius,
  alignContent,
  alignItems,
  border,
  borderColor,
  borderRadius,
  bottom,
  boxShadow,
  color,
  flex,
  flexDirection,
  flexWrap,
  height,
  justifyContent,
  layout,
  left,
  overflow,
  position,
  right,
  space,
  top,
  typography,
  width,
  zIndex,
} from 'styled-system';

export interface BoxProps
  extends LayoutProps,
    ColorProps,
    WidthProps,
    HeightProps,
    SpaceProps,
    PositionProps,
    TopProps,
    BottomProps,
    LeftProps,
    RightProps,
    BorderProps,
    ZIndexProps,
    FlexProps,
    FlexDirectionProps,
    FlexWrapProps,
    JustifyContentProps,
    AlignContentProps,
    AlignItemsProps,
    BorderRadiusProps,
    OverflowProps,
    BoxShadowProps {
  aspectRatio?: number;
}

export const Box = styled(View)<BoxProps>`
  ${boxShadow}
  ${layout}
  ${space}
  ${width}
  ${height}
  ${color}
  ${position}
  ${top}
  ${bottom}
  ${left}
  ${right}
  ${border}
  ${zIndex}
  ${flex}
  ${flexDirection}
  ${flexWrap}
  ${justifyContent}
  ${alignContent}
  ${alignItems}
  ${borderRadius}
  ${overflow}
  ${(props) =>
    props.aspectRatio &&
    css`
      aspect-ratio: ${props.aspectRatio};
    `}
`;

interface CardProps
  extends ColorProps,
    WidthProps,
    SpaceProps,
    BorderProps,
    BorderRadiusProps,
    BorderColorProps,
    BoxShadowProps,
    OverflowProps,
    HeightProps,
    ZIndexProps,
    FlexProps,
    FlexDirectionProps,
    JustifyContentProps,
    AlignItemsProps {}

export const Card = styled(View)<CardProps & { borderWidth?: number }>`
  ${boxShadow}
  ${borderRadius}
  ${borderColor}
  ${border}
  ${space}
  ${width}
  ${color}
  ${overflow}
  ${height}
  ${zIndex}
  ${flex}
  ${flexDirection}
  ${justifyContent}
  ${alignItems}
`;
// ${props =>
//   props.boxShadow &&
//   css`
//     elevation: 4;
//   `}

interface TextProps
  extends ColorProps,
    WidthProps,
    SpaceProps,
    TypographyProps,
    _TextProps,
    FlexProps,
    PropsWithChildren<object> {
  textShadowColor?: string;
}

const BaseText = styled(_Text)<TextProps>`
  ${flex}
  ${typography}
  ${space}
  ${width}
  ${color}
  ${(props) =>
    props.textShadowColor &&
    css`
      text-shadow-color: ${props.textShadowColor};
      text-shadow-offset: -1px 1px;
      text-shadow-radius: 10;
    `}
`;

export const Text = (props: TextProps) => (
  <BaseText {...{ color: 'normalText', fontFamily: 'body', ...props }} />
);

interface TextInputProps
  extends ColorProps,
    BorderColorProps,
    FlexProps,
    BorderProps,
    BorderRadiusProps,
    SpaceProps,
    FontSizeProps {}

export const TextInput = styled(_TextInput)<TextInputProps>`
  ${space}
  ${color}
  ${flex}
  ${border}
  ${borderColor}
  ${borderRadius}
`;

// export const Separator = styled(View)<>`
//   ${props =>
//     css`
//       border-bottom-width: 1;
//       border-bottom-color: ${props.theme.colors.border};
//     `}
// `;

// export const BackgroundImage = styled(View)<BackgroundProps>`
//   ${background}
// `;

// export const Segment = styled(SegmentedControlIOS)``;
export const Flex = Box;
export interface StyledButtonProps
  extends TouchableOpacityProps,
    BackgroundColorProps,
    BorderProps,
    BoxShadowProps,
    SpaceProps,
    JustifyContentProps,
    LayoutProps {
  bg?: string;
}

export const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
  ${_borderRadius}
  ${layout}
  ${border}
  ${justifyContent}
  ${width}
  ${space}
  ${color}
  ${boxShadow}
  ${(props) =>
    props.boxShadow &&
    css`
      elevation: 4;
    `}
  ${(props) =>
    props.disabled &&
    css`
      background-color: ${props.theme.colors.lightText};
    `}
`;
