import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import vi from 'date-fns/locale/vi';
import React from 'react';

import { Box, Flex, Text, Image } from 'rebass';

const getDistanceTime = (createdAtDate: Date) => {
  let time = formatDistanceToNow(createdAtDate, {
    locale: vi,
    addSuffix: true,
  });
  return time;
};
export interface PublicUser {
  id: string;
  fullName?: string | null | undefined;
  imageUrl?: string;
}

export interface Reply {
  id: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: PublicUser;
}

export interface Comment {
  id: string;
  content?: string;
  likes?: number | null | undefined;
  liked?: boolean | null | undefined;
  createdAt: Date;
  replies?: Reply[];
  user?: PublicUser;
}
const CommentAction = (props: {
  onActionPress: (index: number, action: string) => void;
  action: string;
  indx: number;
  length: number;
}) => {
  return (
    <>
      <Flex onClick={() => props.onActionPress(props.indx, props.action)}>
        <Text
          mr={4}
          fontWeight="bold"
          color={props.action === 'Xoá' ? '#F73939' : 'lightText'}
          fontSize={2}
          css={{ cursor: 'pointer' }}>
          {props.action}
        </Text>
      </Flex>
    </>
  );
};
const HeartIcon = () => {
  return (
    <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.65969 0.926389C8.50719 -0.345835 6.60875 -0.308914 5.5 1.04474C4.39094 -0.309604 2.49219 -0.345145 1.34031 0.926389C0.798437 1.52506 0.5 2.32042 0.5 3.16684C0.5 4.01327 0.798437 4.80897 1.34031 5.40695L5.5 10L9.65969 5.40661C10.2016 4.80862 10.5 4.01327 10.5 3.16684C10.5 2.32042 10.2016 1.52506 9.65969 0.926389Z"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="10.5"
          y1="10"
          x2="10.5"
          y2="0"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#A4196B" />
          <stop offset="1" stop-color="#FC6767" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export const CommentItem = (props: {
  id?: string | null;
  image?: string | null;
  user?: PublicUser | null;
  imageSize?: 'small' | 'big' | null;
  name?: string | null;
  createdAt?: Date | null;
  content?: string | null;
  likes?: number | null | undefined;
  actions?: string[];
  onActionPress: (_idx: number, action: string) => void;
  children?: React.ReactNodeArray;
  onClick?: (idx: number) => void;
}) => {
  const sizeImg = props.imageSize === 'big' ? 40 : 30;
  const mb = props.imageSize === 'big' ? 4 : null;
  const ml = props.imageSize === 'small' ? 2 : null;
  return (
    <Box
      mb={mb}
      ml={ml}
      mt={ml}
      overflow="hidden"
      css={{ borderRadius: 4, flexDirection: 'row', display: 'flex' }}>
      <Flex mr={1} width={sizeImg} height={sizeImg} overflow="hidden" css={{ borderRadius: 50 }}>
        {!!props.user && <Image src={props.user.imageUrl} style={{ width: '100%' }} />}
      </Flex>
      <Flex flex={1} flexDirection="column" pl={2}>
        <Flex flexDirection="row">
          <Box minWidth={290} maxWidth="100%" css={{ flexDirection: 'column', borderRadius: 10 }}>
            <Flex flexDirection="row" alignItems="center">
              <Flex alignItems="center">
                <Text color="lightText" fontWeight="bold" fontSize={2}>
                  {props.user?.fullName}
                </Text>
                <Text px={1} color="lightText" fontSize="4px">
                  {'\u2B24'}
                </Text>
                <Text color="lightText" fontSize={2} fontWeight="bold">
                  {props.createdAt && getDistanceTime(props.createdAt)}
                </Text>
              </Flex>
              {(props.likes ?? 0) > 0 && (
                <Flex
                  backgroundColor="lightBackground"
                  ml={1}
                  px={1}
                  flexDirection="row"
                  alignItems="center">
                  <HeartIcon />
                  <Text fontSize={2} pl="3.5px" fontWeight="bold" color="lightText">
                    {props.likes}
                  </Text>
                </Flex>
              )}
            </Flex>
            <Text color="normalText" fontSize={3} pt="3px">
              {props.content}
            </Text>
          </Box>
        </Flex>
        {props.actions && props.actions.length > 0 && (
          <Flex flexDirection="column" marginTop="6px">
            <Flex flexDirection="row" alignItems="center">
              {(props.actions || []).map((action, index) => (
                <CommentAction
                  onActionPress={props.onActionPress}
                  action={action}
                  indx={index}
                  length={props.actions?.length || 0}
                  key={index}
                />
              ))}
            </Flex>
          </Flex>
        )}
        {props.children}
      </Flex>
    </Box>
  );
};
