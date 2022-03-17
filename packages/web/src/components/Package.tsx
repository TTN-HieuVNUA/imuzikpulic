import { useTheme } from 'emotion-theming';
import React, { useCallback, useState } from 'react';
import { Button, Flex, Text } from 'rebass';
import { useLoginContext } from '../containers/Login';
import { useResponseHandler } from '../hooks';
import {
  MyRbtDocument,
  RegisterRbtMutation,
  useMeQuery,
  useMyRbtQuery,
  useRbtPackagesQuery,
  useRegisterRbtMutation,
  useServerSettingsQuery,
} from '../queries';
import { Theme } from '../themes';
import { Modal, useAlert } from './Modal';
import { Separator } from './Separator';
import { Spinner } from './Spinner';

export function ActivePackage(props: {
  name: string;
  price: string;
  description: string;
  paused?: boolean;
  disabled?: boolean;
  onCancel?: () => void;
  onActivateOrPause?: () => void;
}) {
  const theme = useTheme<Theme>();
  return (
    <Flex
      css={{
        width: 237,
        height: 265,
        border: `1px solid ${theme.colors.primary}`,
        borderRadius: 10,
        overflow: 'hidden',
      }}
      flexDirection="column">
      <Flex bg="primary" flexDirection="column" alignItems="center" css={{ width: '100%' }} py={3}>
        <Text color="#32302E" fontSize={3} mb={1} fontWeight="bold">
          {props.name}
        </Text>
        <Text color="#32302E" fontSize={5} fontWeight="bold">
          {props.price}
        </Text>
      </Flex>
      <Flex flexDirection="column" justifyContent="space-between" flex={1}>
        <Text p={3} mt={2} fontSize={2} color="#848484">
          {props.description}
        </Text>
        <Flex justifyContent="center" mb={4}>
          <Button
            disabled={props.disabled}
            css={{
              background: 'none',
              border: 'none',
              padding: '6px 16px',
              color: '#C4C4C4',
              fontSize: theme.fontSizes[2],
            }}
            onClick={props.onCancel}>
            Hủy
          </Button>
          <Button
            ml={3}
            disabled={props.disabled}
            variant="primary"
            css={{
              color: '#262523',
              fontSize: theme.fontSizes[2],
              padding: '6px 16px',
            }}
            onClick={props.onActivateOrPause}>
            {props.paused ? 'Kích hoạt' : 'Tạm dừng'}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const useVipBrandId = () => {
  const { data } = useServerSettingsQuery();
  return data?.serverSettings.vipBrandId;
};
export const useRegisterPackage = (brandId?: string) => {
  const vipBrandId = useVipBrandId();
  const { data: packagesData } = useRbtPackagesQuery();
  const { name, price, period } =
    packagesData?.rbtPackages?.find((p) => p.brandId === brandId) ?? {};
  const [registerRbt, { loading: registerRbtLoading }] = useRegisterRbtMutation({
    refetchQueries: [{ query: MyRbtDocument }],
  });
  const handleRegister = useResponseHandler<RegisterRbtMutation>((res) => res.data?.registerRbt);
  const { data: meData } = useMeQuery();
  const { showLogin } = useLoginContext();
  const [confirmOpened, setConfirmOpened] = useState(false);
  const { show: showAlert, node } = useAlert();
  const { data: myRbtData } = useMyRbtQuery();
  const myPackage = packagesData?.rbtPackages?.find((p) => p.brandId === myRbtData?.myRbt?.brandId);
  const register = useCallback(() => {
    if (registerRbtLoading) return;
    if (!meData?.me) return showLogin?.();
    if (myPackage && myPackage.brandId === brandId) {
      showAlert(
        <>
          Bạn đang sử dụng gói cước <br />
          <b> “{name}”</b> <br />
          Giá cước “{price}” đồng/{period}, gia hạn hàng {period}.
        </>
      );
    } else if (myPackage && brandId !== vipBrandId) {
      showAlert('Để đăng ký, vui lòng hủy gói cước đang sử dụng.');
    } else {
      setConfirmOpened(true);
    }
  }, [
    brandId,
    meData,
    myPackage,
    name,
    period,
    price,
    registerRbtLoading,
    showAlert,
    showLogin,
    vipBrandId,
  ]);
  return {
    register,
    loading: registerRbtLoading,
    node: (
      <>
        <Modal
          isOpen={confirmOpened}
          actions={[{ title: 'Bỏ qua' }, { title: 'Đồng ý', isPrimary: true }]}
          loading={registerRbtLoading}
          onAction={async (idx) => {
            if (registerRbtLoading) return;
            if (idx === 1) {
              const result = await registerRbt({ variables: { brandId } }).then(handleRegister);
              if (result.data.registerRbt.success)
                if (brandId === vipBrandId) showAlert(`Bạn đã là thành viên VIP.`);
                else showAlert(`Bạn đã đăng ký thành công gói cước “${name}” `);
            }
            setConfirmOpened(false);
          }}
          onClose={()=>setConfirmOpened(false)}
          >
          {myPackage && brandId === vipBrandId ? (
            <>
              Bạn đang sử dụng gói cước “{myPackage.name}”, giá cước “{myPackage.price}” đồng/
              {myPackage.period}. Bạn có đồng ý chuyển sang gói VIP để trở thành VIP Member?"
            </>
          ) : (
            <>
              Bạn có chắc muốn đăng ký sử dụng Imuzik gói cước <br />
              <b> “{name}”</b> <br />
              Giá cước “{price}” đồng/{period}, gia hạn hàng {period}.
            </>
          )}
          <Flex justifyContent="center" mt={3}>
            <Spinner loading={registerRbtLoading} size={10} />
          </Flex>
        </Modal>
        {node}
      </>
    ),
  };
};

export const useRegisterPackageVIP = (brandId?: string) => {
  const vipBrandId = useVipBrandId();
  const { data: packagesData } = useRbtPackagesQuery();
  const { name, price, period } =
    packagesData?.rbtPackages?.find((p) => p.brandId === brandId) ?? {};
  const [registerRbt, { loading: registerRbtLoading }] = useRegisterRbtMutation({
    refetchQueries: [{ query: MyRbtDocument }],
  });
  const handleRegister = useResponseHandler<RegisterRbtMutation>((res) => res.data?.registerRbt);
  const { data: meData } = useMeQuery();
  const { showLogin } = useLoginContext();
  const [confirmOpened, setConfirmOpened] = useState(false);
  const { show: showAlert, node } = useAlert();
  const { data: myRbtData } = useMyRbtQuery();
  const myPackage = packagesData?.rbtPackages?.find((p) => p.brandId === myRbtData?.myRbt?.brandId);
  const register = useCallback(() => {
    if (registerRbtLoading) return;
    if (!meData?.me) return showLogin?.();
    setConfirmOpened(true);
    
  }, [
    brandId,
    meData,
    myPackage,
    name,
    period,
    price,
    registerRbtLoading,
    showAlert,
    showLogin,
    vipBrandId,
  ]);
  return {
    register,
    loading: registerRbtLoading,
    myRbtData,
    packagesData,
    node: (
      <>
        <Modal
          isOpen={confirmOpened}
          actions={[{ title: 'Bỏ qua' }, { title: 'Đồng ý', isPrimary: true }]}
          loading={registerRbtLoading}
          onAction={async (idx) => {
            if (registerRbtLoading) return;
            if (idx === 1) {
              const result = await registerRbt({ variables: { brandId } }).then(handleRegister);
              if (result.data.registerRbt.success)
                 showAlert(`Đăng ký VIP thành công!`);
            }
            setConfirmOpened(false);
          }}
          onClose={()=>setConfirmOpened(false)}
          >
            <>
              Bạn có đồng ý đăng ký gói cước VIP và trở thành VIP member của Imuzik với
              giá cước {price} đồng/{period}, gia hạn hàng {period}.
            </>
          <Flex justifyContent="center" mt={3}>
            <Spinner loading={registerRbtLoading} size={10} />
          </Flex>
        </Modal>
        {node}
      </>
    ),
  };
};

export function AvailablePackage(props: {
  name: string;
  price: string;
  period: string;
  description: string;
  brandId: string;
  disabled?: boolean;
}) {
  const theme = useTheme<Theme>();
  const { register, node } = useRegisterPackage(props.brandId);
  return (
    <Flex
      css={{
        width: 237,
        height: 265,
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
      }}
      flexDirection="column">
      <Flex flexDirection="column" alignItems="center" css={{ width: '100%' }} py={3}>
        <Text color="normalText" fontSize={3} mb={1} fontWeight="bold">
          {props.name}
        </Text>
        <Text color="primary" fontSize={5} fontWeight="bold">
          {props.price}đ/{props.period}
        </Text>
      </Flex>
      <Separator mx={2} />
      <Flex flexDirection="column" justifyContent="space-between" flex={1} overflowY="auto">
        <Text p={3} mt={2} fontSize={2} color="#848484">
          {props.description}
        </Text>
        <Flex justifyContent="center" mb={4}>
          <Button
            disabled={props.disabled}
            css={{
              fontSize: theme.fontSizes[2],
              padding: '6px 16px',
              background: theme.colors.gradients[0],
            }}
            onClick={register}>
            Đăng ký
          </Button>
          {node}
        </Flex>
      </Flex>
    </Flex>
  );
}
