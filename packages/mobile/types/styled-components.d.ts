import { Theme } from '../src/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
