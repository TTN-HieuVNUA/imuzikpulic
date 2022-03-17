import React, { useState } from 'react';

import { HeaderClose, Icon, ICON_GRADIENT_1 } from '../src/components';
import { withApollo } from '../src/helpers/apollo';
import { Box, Button, Flex, Text } from '../src/rebass';
import * as DocumentPicker from 'expo-document-picker';
import { NavLink } from '../src/platform/links';
import { LinearGradient } from 'expo-linear-gradient';

function CreateRbtFromDevicePage() {
  const [doc, setDoc] = useState({ name: '', size: '', uri: '' });
  const pickDocument = async () => {
    await DocumentPicker.getDocumentAsync({
      type: 'audio/mp3',
      copyToCacheDirectory: true,
    }).then((response: { type?: any; name?: any; size?: any; uri?: any }) => {
      if (response.type === 'success') {
        let { name, size, uri } = response;
        let nameParts = name.split('.');
        let fileType = nameParts[nameParts.length - 1];
        let fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: 'application/' + fileType,
        };
        setDoc(fileToUpload);
      }
    });
  };
  return (
    <Box bg="defaultBackground" position="relative" height="100%">
      <Flex flexDirection="row" justifyContent="flex-end">
        <HeaderClose />
      </Flex>
      <Flex flexDirection="row" alignItems="center" mx={2}>
        <Icon name="tune" size={50} color={ICON_GRADIENT_1} />
        <Text ml={2} fontSize={20} fontWeight="bold" color="normalText">
          Tạo nhạc chờ {'\n'}từ Đăng tải bài hát
        </Text>
      </Flex>
      <Flex mx={2}>
        <Text fontSize={14} mt={2} fontWeight="bold" color="lightText">
          Upload bài hát bạn muốn tạo nhạc chờ {'\n'}(định dạng mp3,128kps)
        </Text>
        <Button size="large" variant="primary" mt={2} onPress={pickDocument}>
          <Flex height={60} flexDirection="row" alignItems="center">
            <Icon name="file-upload" size={20} color="gray" />
            <Text ml={2} fontSize={20} fontWeight="bold" color="gray">
              ĐĂNG TẢI BÀI HÁT
            </Text>
          </Flex>
        </Button>
        {doc?.uri ? (
          <NavLink
            {...{
              route: '/cat-nhac/[name][url]',
              params: { url: doc.uri, name: doc.name },
            }}>
            <Flex
              height={65}
              mt={2}
              flexDirection="row"
              backgroundColor="#000000"
              alignItems="center"
              borderColor="rgba(151, 151, 151, 0.4)"
              borderRadius={12}>
              <Flex flex={1} alignItems="center">
                <LinearGradient
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  colors={['#000000', '#b9b9b9']}
                  start={[0, 0]}
                  end={[1, 2]}>
                  <Icon name="tune" size={25} color="white" />
                </LinearGradient>
              </Flex>
              <Flex flex={4}>
                <Text ml={2} fontSize={[3, 4, 5]} fontWeight="bold" color="white">
                  {doc.name}
                </Text>
                <Text ml={2} fontSize={[3, 4, 5]} fontWeight="bold" color="white">
                  Không tên
                </Text>
              </Flex>
            </Flex>
          </NavLink>
        ) : undefined}
      </Flex>
    </Box>
  );
}
export default withApollo({ ssr: true })(CreateRbtFromDevicePage);
