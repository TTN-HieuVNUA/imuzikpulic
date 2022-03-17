import React from 'react';
import { useTheme } from 'styled-components/native';

import { Flex } from '../../rebass';
import { Theme } from '../../themes';
import { SVG } from './svg';
import { IconName } from './types';

/* eslint consistent-return: 0 */
export const ICON_GRADIENT_1 = 'url(#paint0_linear)';
export const ICON_GRADIENT_2 = 'url(#paint1_linear)';

export type IconColor = keyof Theme['colors'] | 'url(#paint0_linear)' | 'url(#paint1_linear)';
export const Icon = (props: { name: IconName; size: number; color?: IconColor }) => {
  const theme = useTheme();
  return (
    <Flex
      // style={{
      //   display: 'inline-block',
      //   svg: {
      //     position: 'absolute',
      //   },
      // }}
      height={props.size}
      width={props.size}
      alignItems="center"
      justifyContent="center">
      <SVG
        name={props.name}
        size={props.size}
        color={
          props.color
            ? props.color === ICON_GRADIENT_1 || props.color === ICON_GRADIENT_2
              ? props.color
              : theme.colors[props.color] || props.color
            : theme.colors.normalText
        }
      />
    </Flex>
  );
};
// export default styled(Icon)`
//   fill: ${props => (props.theme as any).colors[props.fill || 'normalText']};
// `;
export * from './types';
