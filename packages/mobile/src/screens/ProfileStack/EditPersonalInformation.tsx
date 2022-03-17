import React, { useCallback, useState } from 'react';
import { Box, Button } from '../../rebass';
import { Header, Section } from '../../components';
import { ProfileFormEdit } from './PersonalInformation';
import { useMeQuery, useUpdateProfileMutation } from '../../queries';
import { useRouter } from 'next/router';
import Title from '../../platform/Title';
import { ActivityIndicator, Alert } from 'react-native';
import { useGoBack } from '../../platform/go-back';

export function EditPersonalInformationBase() {
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
  const dismiss = useGoBack();
  return (
    <Box>
      {meLoading && <ActivityIndicator size="large" color="primary" />}

      {!meLoading && meData?.me && (
        <>
          <Header leftButton="back" title="Sửa thông tin" />
          <Box>
            <Section>
              <Title>Sửa thông tin</Title>
              <ProfileFormEdit editable setFullName={handleName} setAddress={handleAddress} />
              <Button
                height={40}
                disabled={updateProfileLoading}
                mt={2}
                onPress={() =>
                  updateProfile({
                    variables: {
                      fullName,
                      address,
                    },
                  }).then(({ data }) =>
                    Alert.alert('Sửa thông tin', `${data?.updateProfile.message}`, [
                      {
                        text: 'OK',
                        onPress: data?.updateProfile?.success ? dismiss : undefined,
                      },
                    ])
                  )
                }>
                Lưu
              </Button>
            </Section>
          </Box>
        </>
      )}
    </Box>
  );
}

export default function EditPersonalInformation() {
  return <EditPersonalInformationBase />;
}
