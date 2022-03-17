import React from 'react';
import { Box } from 'rebass';

import Avatar from '../components/Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
};

export const Default = () => (
  <Box bg="defaultBackground" p={5}>
    <Avatar name="Singer Name" image="https://via.placeholder.com/200" />
  </Box>
);
