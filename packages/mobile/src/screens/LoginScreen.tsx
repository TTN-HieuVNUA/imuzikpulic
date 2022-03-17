import React from 'react';

import { HeaderClose } from '../components';
import { LoginSection } from '../containers';
import { Flex } from '../rebass';

export const LoginScreen = () => (
  <Flex bg="defaultBackground">
    <HeaderClose />
    <LoginSection />
  </Flex>
);
