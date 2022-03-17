import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { Section } from '../components/Section';
import { Icon } from '../components/svg-icon';
import { VipInfo } from '../components/VipInfo';
import { useVipBrandId } from '../hooks';
import { useGoBack } from '../platform/go-back';
import { useAlert, useNavigationLink } from '../platform/links';
import { ModalBox } from '../platform/ModalBox';
import {
  MyRbtDocument,
  MyRbtDownloadsDocument,
  useMeQuery,
  useMyRbtQuery,
  useRbtPackagesQuery,
  useRegisterRbtMutation,
} from '../queries';
import { Box, Button, Flex, Text } from '../rebass';

const useContentType = (
  userPackage: { brandId: string; name: string; price: string; period: string },
  vipPackage: { brandId: string; price: string }
): [string, 'confirm' | 'cancel'] => {
  if (userPackage.brandId === '') {
    return [
      `Bạn có đồng ý đăng ký gói VIP và trở thành VIP Member của Imuzik với giá cước ${vipPackage.price} đồng/tháng, gia hạn hàng tháng?`,
      'confirm',
    ];
  } else {
    if (userPackage.brandId === vipPackage.brandId) {
      return ['Bạn đã là thành viên VIP', 'cancel'];
    } else {
      return [
        `Bạn đang sử dụng gói cước ${userPackage.name}, giá cước ${userPackage.price} đồng/${userPackage.period}. Bạn có Đồng ý chuyển sang gói VIP để trở thành VIP Member?`,
        'confirm',
      ];
    }
  }
};

export const VipScreen = () => {
  const [registerRbt, { loading }] = useRegisterRbtMutation({
    refetchQueries: [{ query: MyRbtDocument }, { query: MyRbtDownloadsDocument }],
  });
  const vipBrandId = useVipBrandId();
  const dismiss = useGoBack();
  const showPopup = useAlert({ type: 'cancel', action: dismiss });
  const registerVIP = useCallback(() => {
    if (!vipBrandId) return;
    registerRbt({
      variables: {
        brandId: vipBrandId,
      },
    }).then((res) => {
      if (res.data?.registerRbt.success) showPopup({ content: 'Đăng kí VIP thành công!' });
      else
        showPopup({
          content: res.data?.registerRbt?.message ?? 'Hệ thống đang bận! Vui lòng thử lại sau!',
        });
    });
  }, [vipBrandId, registerRbt, showPopup]);
  const { data: packagesData } = useRbtPackagesQuery();
  const { data: myRbtData } = useMyRbtQuery();
  const myPackage = packagesData?.rbtPackages?.find((p) => p.brandId === myRbtData?.myRbt?.brandId);
  const vipPackage = packagesData?.rbtPackages?.find((p) => p.brandId === vipBrandId);
  const [content, type] = useContentType(
    {
      brandId: myPackage?.brandId || '',
      name: myPackage?.name || '',
      price: myPackage?.price || '',
      period: myPackage?.period || '',
    },
    { brandId: vipPackage?.brandId || '', price: vipPackage?.price || '' }
  );

  const { data: meData } = useMeQuery();
  const showPopupLogin = useAlert({ type: 'requireLogin' });
  const requireLogin = () => {
    showPopupLogin({ content: 'Vui lòng đăng nhập để sử dụng!' });
  };

  const forwardToPackagePage = useNavigationLink('/ca-nhan/goi-cuoc');
  const confirmChangePackage = useNavigationLink('popup', {
    title: 'Đăng ký GoVip',
    type: 'confirm',
    content: 'Để đăng ký, vui lòng hủy gói cước đang sử dụng tại trang thông tin gói cước.',
    action: forwardToPackagePage,
  });

  const isConfirmChangePackage = myPackage?.brandId && myPackage?.brandId !== vipPackage?.brandId;
  const isVip = myPackage?.brandId && myPackage?.brandId === vipPackage?.brandId;

  const confirm = useNavigationLink('popup', {
    title: 'Đăng ký GoVip',
    type,
    content,
    action: isConfirmChangePackage ? confirmChangePackage : registerVIP,
  });

  return (
    <ModalBox>
      <Section bg="defaultBackground">
        <Flex flexDirection="row" justifyContent="space-between" alignItems="flex-start" mr={-2}>
          <Box>
            <Text fontSize={4} fontWeight="bold">
              Nâng cấp
            </Text>
            <Text fontSize={5} fontWeight="bold" color="primary">
              VIP MEMBER
            </Text>
          </Box>
          <TouchableOpacity onPress={dismiss}>
            <Box p={2}>
              <Icon name="cross" size={16} />
            </Box>
          </TouchableOpacity>
        </Flex>

        <VipInfo price="15.000đ/tháng" mt={5} mb={4} />
        {!isVip ? (
          <Button
            variant="secondary"
            fontSize={3}
            size="large"
            disabled={loading}
            onPress={meData?.me ? confirm : requireLogin}>
            ĐĂNG KÝ THÀNH VIÊN VIP
          </Button>
        ) : (
          <Button variant="primary" fontSize={3} size="large" disabled={loading}>
            BẠN ĐANG LÀM THÀNH VIÊN VIP
          </Button>
        )}
      </Section>
    </ModalBox>
  );
};
