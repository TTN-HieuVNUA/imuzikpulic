import _ from 'lodash';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useModals } from '../hooks/modals';
import { Button } from '../rebass';

export type RouteProps = { route: string; params?: { [k: string]: string | null | undefined } };

const routeToLink = (
  route: string,
  params: { [k: string]: string | null | undefined } = {}
): LinkProps => {
  // 'trang-chu';
  // 'de-xuat';
  // 'ichart-slug';
  // 'chu-de';
  // 'chu-de-slug';
  // 'the-loai-slug';
  // 'ca-sy-slug';
  // 'bai-hat-slug';
  // 'noi-bat';
  // 'the-loai';
  // 'ca-sy';
  // 'nha-cung-cap';
  // 'nha-cung-cap-code';
  // 'ca-nhan';
  // 'goi-cuoc';
  // 'nhac-cho';
  // 'nhac-cho-nhom';
  // 'nhac-cho-nhom-groupId';
  const pathParams = new Set<string>();
  const pathname = route.replace(/\[([^\]]+)\]/, (match: string, paramName: string) => {
    pathParams.add(paramName);
    return params[paramName] ?? '';
  });
  return {
    href: route,
    as: { pathname, query: _.omit(params, Array.from(pathParams)) as { [key: string]: string } },
  };
};
export const UnderlineLink = ({ children, ...props }: React.PropsWithChildren<RouteProps>) => (
  <Link {...routeToLink(props.route, props.params)}>
    <a>
      <Button variant="underline" fontSize={1}>
        {children}
      </Button>
    </a>
  </Link>
);

export const NavLink = ({
  onPress,
  children,
  ...props
}: React.PropsWithChildren<RouteProps & { onPress?: () => void }>) => {
  const modals = useModals();
  const callback = useCallback(() => {
    modals?.popAll();
    if (onPress) {
      onPress();
    }
  }, [onPress, modals]);
  const navigate = useNavigationLink(props.route, props.params);
  if (props.route[0] !== '/')
    return <TouchableOpacity onPress={navigate}>{children}</TouchableOpacity>;
  return (
    <Link {...routeToLink(props.route, props.params)}>
      <a>
        <TouchableOpacity onPress={callback}>{children}</TouchableOpacity>
      </a>
    </Link>
  );
};

const paramFilter = (params?: { [k: string]: string | null | undefined | (() => void) }) =>
  params
    ? Object.keys(params).reduce((filtered: { [k: string]: string | null | undefined }, key) => {
        if (typeof params[key] === 'string') {
          filtered[key] = params[key] as string;
        }
        return filtered;
      }, {})
    : {};

export const useNavigationLink = (
  route: string,
  params?: { [k: string]: string | null | undefined | (() => void) }
) => {
  const router = useRouter();
  const modals = useModals();
  return useCallback(() => {
    switch (route) {
      case 'notification':
      case 'search':
      case 'vip':
      case 'player':
      case 'playlist':
      case 'rbt':
      case 'login':
      case 'popup':
        modals?.show(route, { ...params });
        return;
    }
    const { href, as } = routeToLink(route, paramFilter(params));
    modals?.popAll();
    if (href !== '#') {
      console.log(href, as);
      router.push(href, as);
    }
  }, [route, params, router, modals]);
};

export const useAlert = (params?: { [k: string]: string | null | undefined | (() => void) }) => {
  const modals = useModals();
  const route = 'popup';
  return useCallback(
    (extraParams?: { [k: string]: string | null | undefined | (() => void) }) => {
      modals?.show(route, { ...params, ...extraParams });
    },
    [params, modals]
  );
};
