import { ExecutionResult, MutationFunctionOptions } from '@apollo/react-common';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Header, PackageListItem, Section, Separator } from '../../components';
import { useAlert } from '../../platform/links';
import Title from '../../platform/Title';
import {
  MyRbtDocument,
  MyRbtDownloadsDocument,
  useActivateRbtMutation,
  useCancelRbtMutation,
  useMyRbtQuery,
  usePauseRbtMutation,
  useRbtPackagesQuery,
  useRegisterRbtMutation,
} from '../../queries';
import { Box, Button, Flex } from '../../rebass';

export function PackagesScreenBase() {
  const { data: packagesData } = useRbtPackagesQuery();
  const { data: myRbtData } = useMyRbtQuery();

  const [registerRbt, { loading: registerRbtLoading }] = useRegisterRbtMutation({
    refetchQueries: [{ query: MyRbtDocument }, { query: MyRbtDownloadsDocument }],
  });
  const [activateRbt, { loading: activateRbtLoading }] = useActivateRbtMutation({
    refetchQueries: [{ query: MyRbtDocument }, { query: MyRbtDownloadsDocument }],
  });
  const [cancelRbt, { loading: cancelRbtLoading }] = useCancelRbtMutation({
    refetchQueries: [{ query: MyRbtDocument }, { query: MyRbtDownloadsDocument }],
  });
  const [pauseRbt, { loading: pauseRbtLoading }] = usePauseRbtMutation({
    refetchQueries: [{ query: MyRbtDocument }, { query: MyRbtDownloadsDocument }],
  });
  const showPopup = useAlert({ type: 'cancel' });
  const mutateAndAlert = <TData, TVariables>(
    mutate: (
      options?: MutationFunctionOptions<TData, TVariables>
    ) => Promise<ExecutionResult<TData>>,
    field: keyof TData,
    options?: MutationFunctionOptions<TData, TVariables>
  ) => () => {
    mutate(options).then(({ data }) =>
      showPopup({ content: (data?.[field] as any)?.result ?? (data?.[field] as any)?.message })
    );
  };
  const loading = registerRbtLoading || activateRbtLoading || cancelRbtLoading || pauseRbtLoading;
  // TODO: VIP package?
  const myPackage = packagesData?.rbtPackages?.find((p) => p.brandId === myRbtData?.myRbt?.brandId);
  return (
    <Box bg="defaultBackground">
      <Title>Thông tin gói cước</Title>
      <Section>
        {(packagesData?.rbtPackages ?? []).map((p) => (
          <Box key={p.id}>
            <PackageListItem
              id={p.id}
              package={p.name}
              price={p.price}
              period={p.period}
              description={p.note}
              action={myRbtData?.myRbt?.brandId === p.brandId ? 'cancel' : 'register'}
              onPress={
                myRbtData?.myRbt?.brandId === p.brandId
                  ? undefined // mutateAndAlert(cancelRbt, 'cancelRbt')
                  : mutateAndAlert(registerRbt, 'registerRbt', {
                      variables: { brandId: p.brandId },
                    })
              }
              disabled={loading}
              brandId={p.brandId}
              myRbtBrandId={myPackage?.brandId || ''}
              myRbtPackage={myPackage?.name || ''}
              myRbtPrice={myPackage?.price || ''}
              myPeriod={myPackage?.period || ''}
            />
            <Separator />
          </Box>
        ))}
      </Section>
      {(myRbtData?.myRbt?.status ?? 0) > 0 && (
        <Flex mx={3} my={5} alignItems="stretch" flexDirection="column">
          <Button
            variant="outline"
            onPress={
              myRbtData?.myRbt?.status === 1
                ? mutateAndAlert(pauseRbt, 'pauseRbt')
                : mutateAndAlert(activateRbt, 'activateRbt')
            }
            height={40}
            disabled={loading}>
            {myRbtData?.myRbt?.status === 1 ? 'TẠM DỪNG DỊCH VỤ' : 'KÍCH HOẠT DỊCH VỤ'}
          </Button>
          <Button
            mt={3}
            height={40}
            variant="outlineDanger"
            onPress={mutateAndAlert(cancelRbt, 'cancelRbt')}
            disabled={loading}>
            HỦY BỎ DỊCH VỤ
          </Button>
        </Flex>
      )}
    </Box>
  );
}

export default function PackagesScreen() {
  return (
    <Box bg="defaultBackground" position="relative" height="100%">
      <Header leftButton="back" title="Gói cước" />
      <ScrollView>
        <PackagesScreenBase />
      </ScrollView>
    </Box>
  );
}
