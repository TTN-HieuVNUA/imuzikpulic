import React from 'react';

import {
  Avatar,
  AvatarProps,
  CardCenter,
  CardCenterProps,
  CardLeft,
  CardLeftProps,
} from '../components';
import { NavLink, RouteProps, UnderlineLink } from '../platform/links';

export const ViewAllLink = (props: RouteProps) => (
  <UnderlineLink {...props}>Xem tất cả</UnderlineLink>
);

export const CardLeftLink = ({ link, ...cardProps }: { link: RouteProps } & CardLeftProps) => (
  <NavLink {...link}>
    <CardLeft {...cardProps} />
  </NavLink>
);

export const CardCenterLink = ({ link, ...cardProps }: { link: RouteProps } & CardCenterProps) => (
  <NavLink {...link}>
    <CardCenter {...cardProps} />
  </NavLink>
);

export const AvatarLink = ({ link, ...avatarProps }: { link: RouteProps } & AvatarProps) => (
  <NavLink {...link}>
    <Avatar {...avatarProps} />
  </NavLink>
);
