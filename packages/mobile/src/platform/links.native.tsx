import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import { Button } from '../rebass';

// const PARAM_REGEX = /^\[([^\]]+)\]$/;

export type RouteProps = { route: string; params?: { [k: string]: string | null | undefined } };

export const useNavigationLink = (
  route: string,
  params?: { [k: string]: string | null | undefined }
) => {
  const navigation = useNavigation();
  return useCallback(() => {
    navigation.navigate(route, params);
  }, [navigation, route, params]);
};
export const useAlert = (params?: { [k: string]: string | null | undefined }) => {
  const navigation = useNavigation();
  return useCallback(
    (extraParams?: { [k: string]: string | null | undefined }) => {
      navigation.navigate('alert', { ...params, ...extraParams });
    },
    [navigation, params]
  );
};

export const NavLink = ({
  onPress,
  children,
  ...props
}: React.PropsWithChildren<RouteProps & { onPress?: () => void }>) => {
  const navigate = useNavigationLink(props.route, props.params);
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) onPress();
        navigate();
      }}>
      {children}
    </TouchableOpacity>
  );
};

export const UnderlineLink = ({ children, ...props }: React.PropsWithChildren<RouteProps>) => {
  const navigate = useNavigationLink(props.route, props.params);
  return (
    <Button variant="underline" fontSize={1} onPress={navigate}>
      {children}
    </Button>
  );
};
