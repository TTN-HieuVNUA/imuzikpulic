import { useTheme } from 'emotion-theming';
import React from 'react';
import { Flex, Image, Text } from 'rebass';

import { Theme } from '../themes';

export default function Avatar(props: {
  size?: number;
  image: string;
  name?: string;
  imgShadow?: string;
}) {
  const theme = useTheme<Theme>();
  const { size = 154 } = props;
  return (
    <Flex flexDirection="column" alignItems="center">
      <Image
        src={props.image}
        css={{
          backgroundColor: theme.colors.alternativeBackground,
          height: size,
          width: `${size}px !important`,
          overflow: 'hidden',
          borderRadius: 100,
          objectFit: 'cover',
          objectPosition: 'center',
          boxShadow: `${props.imgShadow ?? ''}`,
        }}
      />
      {props.name && (
        <Text fontWeight="bold" fontSize={2} color="normalText" mt={1}>
          {props.name}
        </Text>
      )}
    </Flex>
  );
}
