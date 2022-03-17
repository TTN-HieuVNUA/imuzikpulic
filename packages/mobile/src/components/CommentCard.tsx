import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import vi from 'date-fns/locale/vi';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { Icon, ICON_GRADIENT_2 } from '../components/svg-icon';
import { Box, Flex, Text } from '../rebass';

const getDistanceTime = (createdAtDate: Date) => {
  let time = formatDistanceToNow(createdAtDate, {
    locale: vi,
    addSuffix: true,
  });
  return time;
};
export interface PublicUser {
  id: string;
  fullName?: string | null;
  imageUrl?: string | null;
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
  likes?: number | null;
  liked?: boolean | null;
  createdAt: Date;
  replies?: Reply[];
  user?: PublicUser;
}
const CommentAction = (props: {
  onActionPress?: any;
  action: string;
  indx: number;
  length: number;
}) => {
  return (
    <>
      <TouchableOpacity onPress={() => props.onActionPress(props.indx, props.action)}>
        <Text
          fontWeight="bold"
          color={props.action === 'Xoá' ? '#F73939' : 'lightText'}
          fontSize={1}>
          {props.action}
        </Text>
      </TouchableOpacity>
      {props.indx < props.length - 1 && (
        <Text px={1} color="lightText" fontSize="2px">
          {'\u2B24'}
        </Text>
      )}
    </>
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
  likes?: number | null;
  actions?: string[] | null;
  onActionPress?: any;
  children?: React.ReactNodeArray;
  onClick?: (idx: number) => void;
}) => {
  const sizeImg = props.imageSize === 'big' ? 32 : 24;
  const mb = props.imageSize === 'big' ? 4 : null;
  const ml = props.imageSize === 'small' ? 2 : null;
  return (
    <Box
      mb={mb}
      ml={ml}
      mt={ml}
      position="relative"
      overflow="hidden"
      borderRadius={4}
      flexDirection="row">
      <Flex mr={1} width={sizeImg} height={sizeImg} overflow="hidden" borderRadius={50}>
        {!!props.user && (
          <Image
            source={{
              uri: props.user.imageUrl ?? '',
            }}
            style={{ width: '100%', height: 80 }}
          />
        )}
      </Flex>
      <Flex flex={1}>
        <Flex flexDirection="row">
          <Box
            p={2}
            minWidth={190}
            maxWidth="100%"
            flexDirection="column"
            backgroundColor="alternativeBackground"
            borderRadius={10}>
            <Flex flexDirection="row" alignItems="center">
              <Text color="lightText" fontWeight="bold" fontSize={0} numberOfLines={1}>
                {props.user?.fullName}
              </Text>
              <Text px={1} color="lightText" fontSize="2px">
                {'\u2B24'}
              </Text>
              <Text color="lightText" fontSize={0} numberOfLines={1}>
                {props.createdAt && getDistanceTime(props.createdAt)}
              </Text>
            </Flex>
            <Text color="normalText" fontSize={2} pt="3px">
              {props.content}
            </Text>
            {(props.likes ?? 0) > 0 && (
              <Box
                backgroundColor="lightBackground"
                flexDirection="row"
                position="absolute"
                bottom={-10}
                alignItems="center"
                borderRadius={7.5}
                height={15}
                right={2}
                px={1}>
                <Icon name="heartlove" color={ICON_GRADIENT_2} size={10} />
                <Text fontSize={0} pl="2.5px" pt="2px" color="lightText">
                  {props.likes}
                </Text>
              </Box>
            )}
          </Box>
        </Flex>
        {props.actions && props.actions.length > 0 && (
          <Flex flexDirection="column" ml={2} marginTop="3px">
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
