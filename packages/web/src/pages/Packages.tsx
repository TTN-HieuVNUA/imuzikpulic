import React, { useEffect } from 'react';
import { Box, Flex } from 'rebass';
import { ActivePackage, AvailablePackage } from '../components/Package';
import { useResponseHandler } from '../hooks';
import {
  ActivateRbtMutation,
  CancelRbtMutation,
  MyRbtDocument,
  PauseRbtMutation,
  useActivateRbtMutation,
  useCancelRbtMutation,
  useMyRbtQuery,
  usePauseRbtMutation,
  useRbtPackagesQuery,
} from '../queries';
import { PersonalSplitView } from './PersonalInfo';

export default function PackagesPage() {
  const { data: packagesData } = useRbtPackagesQuery();
  const { data: myRbtData } = useMyRbtQuery();

  const [activateRbt, { loading: activateRbtLoading }] = useActivateRbtMutation({
    refetchQueries: [{ query: MyRbtDocument }],
  });
  const handleActivate = useResponseHandler<ActivateRbtMutation>((res) => res.data?.activateRbt);

  const [cancelRbt, { loading: cancelRbtLoading }] = useCancelRbtMutation({
    refetchQueries: [{ query: MyRbtDocument }],
  });
  const handleCancel = useResponseHandler<CancelRbtMutation>((res) => res.data?.cancelRbt);

  const [pauseRbt, { loading: pauseRbtLoading }] = usePauseRbtMutation({
    refetchQueries: [{ query: MyRbtDocument }],
  });
  const handlePause = useResponseHandler<PauseRbtMutation>((res) => res.data?.pauseRbt);

  const loading = activateRbtLoading || cancelRbtLoading || pauseRbtLoading;
  useEffect(() => {
    const loading_screen = document.getElementById('ipl-progress-indicator')
    loading_screen.classList.remove('available')
    if(!loading)
    {
      setTimeout(() => {
        loading_screen.classList.add('available')
      }, 500)
    }
  },[loading]);
  return (
    <PersonalSplitView title="Thông tin gói cước">
      <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-around" my={7} mx={5}>
        {(packagesData?.rbtPackages ?? []).map((p) => (
          <Box key={p.id} mt={2} mb={3}>
            {myRbtData?.myRbt?.brandId === p.brandId ? (
              <ActivePackage
                name={p.name}
                price={`${p.price}đ/${p.period}`}
                description={p.note}
                paused={myRbtData?.myRbt?.status === 2}
                disabled={loading}
                onCancel={() => cancelRbt().then(handleCancel)}
                onActivateOrPause={
                  myRbtData?.myRbt?.status === 1
                    ? () => pauseRbt().then(handlePause)
                    : () => activateRbt().then(handleActivate)
                }
              />
            ) : (
              <AvailablePackage
                name={p.name}
                price={p.price}
                period={p.period}
                description={p.note}
                disabled={loading}
                brandId={p.brandId}
              />
            )}
          </Box>
        ))}
      </Flex>
    </PersonalSplitView>
  );
}
