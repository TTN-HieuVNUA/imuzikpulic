import React, { PropsWithChildren, useState } from 'react';
import { Flex, Text } from 'rebass';
import * as _ from 'lodash';

import { Theme } from '../themes';
import { useTheme } from 'emotion-theming';
import Icon from './Icon';

export interface CreativeSongInterface {
  id?: number,
  image: string,
  title: string,
  fileUrl?: string,
  singers?: { id?: string; alias?: string | null; slug?: string | null }[],
  isPlay?: boolean | undefined,
  onClick?: () => void,
  rbtCode?: string,
  slug?:string
}

export const CreativeSong = (props: CreativeSongInterface) => {
  const theme = useTheme<Theme>();
  console.log(theme);
  return (
    <Flex
      flexDirection='row'
      alignItems='center'
      pb={2}
    >
      <Flex
        onClick={props.onClick ? props.onClick : ()=> {}}
        css={{
          cursor: 'pointer',
          '.icon svg path': {
            fill: theme.colors.normalText,
          },
          '&:hover': {
            backgroundColor: theme.colors.hover,
            '.icon svg path': {
              fill: theme.colors.primary,
            },
            '> *': {
              color: `${theme.colors.primary} `,
            },
          },
        }}
        flex={1} alignItems={'center'}>
        <Flex
          css={{
            height: 100,
            width: 100,
            backgroundSize: 'cover',
            backgroundColor: '#C4C4C4',
          }}
          style={{
            backgroundImage: `url(${props.image})`,
          }}
          justifyContent='center'
          alignItems='center'
        >
          {
            props.isPlay ? <Icon name='player-pause' color='white' size={45} /> : <Icon name='play' color='white' size={45} />
          }
        </Flex>
        <Flex flexDirection='column' mx={3}>
          <Text color='normalText' fontSize={4} mb={1} fontWeight='bold'
                css={{
                  textOverflow: 'ellipsis',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  maxWidth: '500px',
                  overflow: 'hidden',
                  userSelect: 'none'
                }}>
            {props.title}
          </Text>
          <Text color='lightText' fontSize={3} mb={1}
                css={{
                  textOverflow: 'ellipsis',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  maxWidth: '500px',
                  overflow: 'hidden',
                  userSelect: 'none'

                }}>
            {_.flatMap(props.singers ?? [], (a, idx) => [
              ...(idx === 0 ? [] : [' - ']),
              <span key={idx}>{a.alias}</span>,
            ])}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
