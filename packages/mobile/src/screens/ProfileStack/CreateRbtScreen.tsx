import React from 'react';
import { Box, Text, Flex } from '../../rebass';
import { Header } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon, ICON_GRADIENT_1 } from '../../components/svg-icon';
import { TouchableOpacity } from 'react-native';
import { useNavigationLink } from '../../platform/links';

export default function CreateRbtScreen() {
  const navigationToCreateRbtFromLibrary = useNavigationLink('/tao-nhac-cho/nhac-co-san');
  const navigationToCreateRbtFromDevice = useNavigationLink('/tao-nhac-cho/nhac-tu-thiet-bi');
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
              <Text fontFamily="Arial" ml={2} mr={1} fontSize={[3, 4, 5]} fontWeight="bold" color="normalText">
                CHỌN TỪ BÀI HÁT CÓ SẴN TRÊN IMUZIK
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
              <Text ml={2} fontFamily='Arial' fontSize={[3, 4, 5]} fontWeight="bold" color="normalText">
                ĐĂNG TẢI BÀI HÁT TỰ CHỌN
              </Text>
            </Flex>
          </Flex>
        </TouchableOpacity>
      </ScrollView>
    </Box>
  );
}
