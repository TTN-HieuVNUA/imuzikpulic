import React from 'react';
import { Box } from '../../rebass';
import { Header } from '../../components';
import { PasswordForm } from './PersonalInformation';
import { ScrollView } from 'react-native-gesture-handler';

export function ChangePasswordBase() {
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Header leftButton="back" title="Đổi mật khẩu" />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Box px={3}>
          <PasswordForm />
        </Box>
      </ScrollView>
    </Box>
  );
}

export default function ChangePassword() {
  return <ChangePasswordBase />;
}
