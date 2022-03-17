import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Header, Section } from '../../../src/components';
import { withApollo } from '../../../src/helpers/apollo';
import Title from '../../../src/platform/Title';
import { useMeQuery, useUpdateProfileMutation } from '../../../src/queries';
import { Box, Text } from '../../../src/rebass';
import { ProfileForm } from '../../../src/screens/ProfileStack/ProfileScreen';

function UserInfoEditPage() {
  const { data: meData, loading: meLoading } = useMeQuery();
  const router = useRouter();
  React.useEffect(() => {
    if (!meLoading && !meData?.me) {
      router.replace('/ca-nhan');
    }
  }, [meData, meLoading, router]);
  const [fullName, setFullName] = useState(meData?.me?.fullName ?? '');
  const [address, setAddress] = useState(meData?.me?.address ?? '');
  const handleName = useCallback((newName: string) => setFullName(newName), []);
  const handleAddress = useCallback((newAddress: string) => setAddress(newAddress), []);
  const [updateProfile, { loading: updateProfileLoading }] = useUpdateProfileMutation();

  return (
    <Box>
      {meLoading && <ActivityIndicator />}

      {!meLoading && meData?.me && (
        <>
          <Header leftButton="back" title="Thông tin cá nhân">
            <TouchableOpacity
              disabled={updateProfileLoading}
              onPress={() =>
                updateProfile({
                  variables: {
                    fullName,
                    address,
                  },
                }).then(({ data }) => alert(data?.updateProfile.message))
              }>
              <Text color="secondary" fontSize={2} mr={15}>
                Lưu
              </Text>
            </TouchableOpacity>
          </Header>
          <Box>
            <Section>
              <Title>Thông tin cá nhân</Title>
              <ProfileForm editable setFullName={handleName} setAddress={handleAddress} />
            </Section>
          </Box>
        </>
      )}
    </Box>
  );
}
export default withApollo()(UserInfoEditPage);
