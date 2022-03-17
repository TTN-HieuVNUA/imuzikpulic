import { useRouter } from 'next/router';
import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Header, Icon, Section } from '../../src/components';
import { useLogout } from '../../src/containers';
import { withApollo } from '../../src/helpers/apollo';
import { useNavigationLink } from '../../src/platform/links';
import { useMeQuery } from '../../src/queries';
import { Box, Button, Text } from '../../src/rebass';
import { UserInfoSection } from '../../src/screens/ProfileStack/ProfileScreen';

function UserInfoPage() {
  const { data: meData, loading: meLoading } = useMeQuery();
  const router = useRouter();
  React.useEffect(() => {
    if (!meLoading && !meData?.me) {
      router.replace('/ca-nhan');
    }
  }, [meData, meLoading, router]);
  const navigateEditPersonalInfo = useNavigationLink('/ca-nhan/thong-tin/chinh-sua-thong-tin');
  const navigatePersonalPassword = useNavigationLink('/ca-nhan/thong-tin/doi-mat-khau');
  const logout = useLogout();

  return (
    <Box>
      {meLoading && <ActivityIndicator />}

      {!meLoading && meData?.me && (
        <>
          <Header leftButton="back" title="Thông tin cá nhân">
            <TouchableOpacity onPress={navigateEditPersonalInfo}>
              <Text color="primary" fontSize={2} mr={15}>
                Sửa
              </Text>
            </TouchableOpacity>
          </Header>
          <Box>
            <UserInfoSection />
            <Section mt={4}>
              <Button mb={3} size="medium" onPress={navigatePersonalPassword} variant="outline">
                ĐỔI MẬT KHẨU
              </Button>
              <Button
                mb={4}
                size="medium"
                pb="3px"
                leftIcon={
                  <Box position="relative" top="3px">
                    <Icon name="exit" size={17} />
                  </Box>
                }
                onPress={logout}
                variant="outline">
                ĐĂNG XUẤT
              </Button>
            </Section>
          </Box>
        </>
      )}
    </Box>
  );
}
export default withApollo()(UserInfoPage);
