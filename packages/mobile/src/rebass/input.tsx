import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';

export type InputProps = TextInputProps & SpaceProps & TypographyProps & ColorProps & LayoutProps;

export const Input = styled.TextInput<InputProps>`
  ${color}
  ${layout}
  ${space}
  ${typography}
`;
