import React from 'react';

import { Header, Icon, ICON_GRADIENT_1 } from '../src/components';
import { withApollo } from '../src/helpers/apollo';
import { Box, Flex, Text } from '../src/rebass';
import { useNavigationLink } from '../src/platform/links';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';

function CreateRbtPage() {
  const navigationToCreateRbtFromLibrary = useNavigationLink('/tao-nhac-cho-co-san');
  const navigationToCreateRbtFromDevice = useNavigationLink('/tao-nhac-cho-ca-nhan');
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Header leftButton="back" title="Tạo nhạc chờ" />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={navigationToCreateRbtFromLibrary}>
          <Flex
            height={120}
            border={1}
            flexDirection="row"
            alignItems="center"
            borderColor="rgba(151, 151, 151, 0.4)"
            borderRadius={12}
            mx={3}>
            <Flex flex={1} alignItems="center">
              <Icon name="tune" size={50} color={ICON_GRADIENT_1} />
            </Flex>
            <Flex flex={3}>
              <Text ml={2} fontSize={[3, 4, 5]} fontWeight="bold" color="normalText">
                CHỌN BÀI HÁT CÓ SẴN TRÊN IMUZIK
              </Text>
            </Flex>
          </Flex>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigationToCreateRbtFromDevice}>
          <Flex
            height={120}
            mt={2}
            border={1}
            flexDirection="row"
            alignItems="center"
            borderColor="rgba(151, 151, 151, 0.4)"
            borderRadius={12}
            mx={3}>
            <Flex flex={1} alignItems="center">
              <Icon name="file-upload" size={50} color={ICON_GRADIENT_1} />
            </Flex>
            <Flex flex={3}>
              <Text ml={2} fontSize={[3, 4, 5]} fontWeight="bold" color="normalText">
                ĐĂNG TẢI BÀI HÁT TỰ CHỌN
              </Text>
            </Flex>
          </Flex>
        </TouchableOpacity>
      </ScrollView>
    </Box>
  );
}
export default withApollo({ ssr: true })(CreateRbtPage);
