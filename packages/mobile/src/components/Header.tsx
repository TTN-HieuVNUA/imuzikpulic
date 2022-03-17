import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import {
  Image,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { useLocalStorage } from '../hooks';

import { useGoBack } from '../platform/go-back';
import { NavLink, useNavigationLink } from '../platform/links';
import { useMeQuery, useSpamsQuery } from '../queries';
import { Box, Button, ButtonProps, Flex, Text } from '../rebass';
import { Icon, IconName } from './svg-icon';

export const Logo = (props: { size?: 'lg' | 'md' }) => {
  const theme = useTheme();
  return (
    <Image
      source={
        theme.name === 'dark'
          ? require('../../assets/logo.png')
          : require('../../assets/logo-light.png')
      }
      style={props.size === 'lg' ? { width: 152, height: 72 } : { width: 92, height: 44 }}
    />
  );
};

export interface HeaderProps {
  logo?: boolean;
  title?: string;
  search?: boolean;
  leftButton?: 'back' | 'dismiss';
  leftButtonClick?: () => void;
}

const HeaderDismiss = (props: { leftButtonClick?: () => void }) => {
  return (
    <TouchableOpacity onPress={props.leftButtonClick}>
      <Box p={3}>
        <Icon name="caret-down-bold" size={20} color="headerText" />
      </Box>
    </TouchableOpacity>
  );
};

export const HeaderBack = (props: { leftButtonClick?: () => void }) => {
  const goBack = useGoBack();
  return (
    <TouchableOpacity onPress={props.leftButtonClick ?? goBack}>
      <Box p={3}>
        <Icon name="back" size={20} color="headerText" />
      </Box>
    </TouchableOpacity>
  );
};

export const HeaderClose = (props: { leftButtonClick?: () => void; icon?: IconName }) => {
  const goBack = useGoBack();
  const header = (
    // <Flex flexDirection="row" alignItems="center">
    //   <Flex flex={1}>
    //     <TouchableOpacity onPress={props.leftButtonClick ?? goBack}>
    //       <Box p={3}>
    //         <Icon name="cross" size={16} color="headerText" />
    //       </Box>
    //     </TouchableOpacity>
    //   </Flex>
    // </Flex>
    <TouchableOpacity onPress={props.leftButtonClick ?? goBack}>
      <Box p={3}>
        <Icon name="cross" size={16} color="headerText" />
      </Box>
    </TouchableOpacity>
  );
  if (Platform.OS === 'web') return header;
  return <SafeAreaView>{header}</SafeAreaView>;
};

export const Header = (props: PropsWithChildren<HeaderProps>) => {
  const theme = useTheme();

  const header = (
    <Flex flexDirection="row" alignItems="center" py={1}>
      {props.logo ? (
        <Flex flex={1} px={3}>
          <NavLink route="/">
            <Logo />
          </NavLink>
        </Flex>
      ) : (
        <Flex flex={1} flexDirection="row" alignItems="center">
          {props.leftButton === 'back' ? (
            <HeaderBack leftButtonClick={props.leftButtonClick} />
          ) : props.leftButton === 'dismiss' ? (
            <HeaderDismiss leftButtonClick={props.leftButtonClick} />
          ) : null}
          <Text
            fontWeight="bold"
            fontSize={4}
            color={theme.colors.headerText}
            flex={1}
            numberOfLines={1}>
            {props.title}
          </Text>
        </Flex>
      )}
      {props.children}
      {props.search && <SearchIcon />}
    </Flex>
  );
  if (Platform.OS === 'web') return header;
  return <SafeAreaView>{header}</SafeAreaView>;
};

// Header.Fix = (props: PropsWithChildren<HeaderProps>) => (
//   <Box position="relative">
//     <Box opacity={0}>
//       <Header {...props} />
//     </Box>
//     <Box bg="defaultBackground" position="fixed" top={0} left={0} right={0} zIndex={1000}>
//       <Header {...props} />
//     </Box>
//   </Box>
// );

export const GoVipButton = (_props: ButtonProps) => {
  const navigate = useNavigationLink('vip');
  return (
    <Button variant="primary" width={86} mr={2} onPress={navigate}>
      Go VIP
    </Button>
  );
};

export const NotificationIcon = (_props: {
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}) => {
  const { data, refetch } = useSpamsQuery({ variables: { first: 20 } });
  const { data: meData } = useMeQuery();
  const [markedSpam] = useLocalStorage<string>('markedSpam', '');
  const count = useMemo(
    () => (meData?.me ? (data?.spams.edges ?? []).filter(({ node }) => !node.seen).length : 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.spams.edges, meData?.me, markedSpam]
  );
  const navigate = useNavigationLink('notification');
  useEffect(() => {
    if (meData?.me) refetch();
  }, [meData?.me, refetch]);
  return (
    <TouchableOpacity onPress={navigate}>
      <Box p={2} mr={1} position="relative">
        <Icon name="notification" size={20} color="headerText" />
        {count > 0 && (
          <Box
            position="absolute"
            right="6px"
            top="7px"
            overflow="hidden"
            bg="red"
            height={13}
            minWidth={13}
            style={{ borderRadius: 20 }}
            justifyContent="center"
            alignItems="center">
            <Text
              fontSize={8}
              color="white"
              fontWeight="bold"
              style={{ position: 'relative', left: -0.5, top: -0.5 }}>
              {count}
            </Text>
          </Box>
        )}
      </Box>
    </TouchableOpacity>
  );
};
export const SearchIcon = (_props: {
  count?: number;
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}) => {
  const navigate = useNavigationLink('search');
  return (
    <TouchableOpacity onPress={navigate}>
      <Box p={2} mr={1}>
        <Icon name="search" size={20} color="headerText" />
      </Box>
    </TouchableOpacity>
  );
};

export const HeaderIconButton = (props: {
  icon: IconName;
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}) => (
  <TouchableOpacity onPress={props.onPress}>
    <Box p={2} mr={1}>
      <Icon name={props.icon} size={20} color="headerText" />
    </Box>
  </TouchableOpacity>
);
