import React from 'react';
import { Box } from 'rebass';

import SideMenu from '../containers/SideMenu';

export default {
  title: 'SideMenu',
  component: SideMenu,
};

export const Default = () => (
  <Box bg="defaultBackground" p={5}>
    <SideMenu currentPath="/collections" />
  </Box>
);
