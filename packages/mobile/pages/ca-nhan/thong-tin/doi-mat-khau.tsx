import { useRouter } from 'next/router';
import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Header, Section } from '../../../src/components';
import { withApollo } from '../../../src/helpers/apollo';
import Title from '../../../src/platform/Title';
import { useMeQuery } from '../../../src/queries';
import { Box } from '../../../src/rebass';
import { PasswordForm } from '../../../src/screens/ProfileStack/ProfileScreen';

function UserPasswordPage() {
  const { data: meData, loading: meLoading } = useMeQuery();
  const router = useRouter();
  React.useEffect(() => {
    if (!meLoading && !meData?.me) {
      router.replace('/ca-nhan');
    }
  }, [meData, meLoading, router]);

  return (
    <Box>
      {meLoading && <ActivityIndicator />}

      {!meLoading && meData?.me && (
        <>
          <Header leftButton="back" title="Đổi mật khẩu" />
          <Box>
            <Section>
              <Title>Đổi mật khẩu</Title>
              <PasswordForm />
            </Section>
          </Box>
        </>
      )}
    </Box>
  );
}
export default withApollo()(UserPasswordPage);
