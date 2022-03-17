import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Input, Text } from '../../rebass';
import { Header, Icon, InputWithButton, ListItem } from '../../components';
import { useLogout } from '../../containers';
import { Alert, Image, TextInputProps, TouchableOpacity } from 'react-native';
import {
  useGenerateCaptchaMutation,
  useMeQuery,
  useUpdateAvatarMutation,
  useUpdatePasswordMutation,
} from '../../queries';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Theme } from '../../themes';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigationLink } from '../../platform/links';
import Captcha from '../../containers/Captcha';
import { height } from 'styled-system';

const SettingInputItem = ({
  disable,
  title,
  color,
  ...props
}: { title: string; disable: boolean; color?: keyof Theme['colors'] } & TextInputProps) => (
  <Box paddingBottom={3}>
    <ListItem
      title={title}
      titleWidth={1 / 3}
      fontWeight="400"
      py={0}
      showEllipsis="none"
      titleColor="inputClose">
      <InputWithButton
        {...props}
        disabled={disable}
        bg={color ? 'normalText' : color}
        px={0}
        textAlign="right"
        height={35}
        placeholder={title}
        color={color ? color : 'normalText'}
      />
    </ListItem>
  </Box>
);

export const PasswordForm = () => {
  const { data: meData } = useMeQuery();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaImg, setCaptchaImg] = useState('');
  const [refreshCaptcha, setRefreshCaptcha] = useState(0);
  const [generateCaptcha] = useGenerateCaptchaMutation();
  const [updatePassword, { loading: updatePasswordLoading }] = useUpdatePasswordMutation();
  useEffect(() => {
    generateCaptcha({ variables: { username: meData?.me?.username } }).then(({ data }) => {
      setCaptchaImg(data?.generateCaptcha.result?.data ?? '');
    });
  }, [generateCaptcha, meData?.me?.username, refreshCaptcha]);
  const logout = useLogout();
  return (
    <>
      <SettingInputItem
        title="Mật khẩu cũ"
        disable={false}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry={true}
      />
      <SettingInputItem
        disable={false}
        title="Mật khẩu mới"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
      />
      <SettingInputItem
        title="Nhập lại mật khẩu mới"
        disable={false}
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry={true}
      />
      <Box>
        <ListItem
          title={''}
          titleWidth={1 / 3}
          fontWeight="400"
          py={0}
          showEllipsis="none"
          titleColor="inputClose">
          <Captcha content={captchaImg} />
          <Box
            marginTop={3}
            backgroundColor={'alternativeBackground'}
            height={35}
            width={150}
            alignItems="center"
            borderRadius={8}
            borderColor={'transparent'}
            borderWidth={0}
            overflow="hidden"
            justifyContent="space-between"
            flexDirection="row">
            <Flex flexDirection="row" flex={1} height="100%">
              <Input
                px={3}
                fontSize={2}
                width="100%"
                height="100%"
                color="normalText"
                value={captcha}
                onChangeText={setCaptcha}
                editable={!false}
                underlineColorAndroid="transparent"
                placeholder="Nhập mã captcha"
              />
            </Flex>
          </Box>
        </ListItem>
      </Box>
      <Button
        mt={5}
        size="medium"
        disabled={updatePasswordLoading}
        onPress={() =>
          updatePassword({
            variables: {
              currentPassword,
              newPassword,
              repeatPassword,
              captcha,
            },
          }).then(({ data }) => {
            setRefreshCaptcha(refreshCaptcha + 1);
            console.log(data?.updatePassword?.result);
            Alert.alert(
              'Đổi mật khẩu',
              `${data?.updatePassword.result ?? data?.updatePassword.message}`,
              [
                {
                  text: 'OK',
                  onPress: data?.updatePassword?.success ? logout : undefined,
                },
              ]
            );
            // alert(data?.updatePassword.result ?? data?.updatePassword.message);
          })
        }
        variant="secondary">
        Lưu
      </Button>
    </>
  );
};

const getPermissionAsync = async () => {
  if (Constants.platform?.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};

export const ProfileFormEdit = (props: {
  editable: boolean;
  setFullName?: (newName: string) => void;
  setAddress?: (newAddress: string) => void;
}) => {
  
  const { data: meData } = useMeQuery();
  const [fullName, setFullName] = useState(meData?.me?.fullName ?? '');
  // TODO: sex + birthday
  useEffect(() => {
    setFullName(meData?.me?.fullName ?? '');
  }, [meData?.me?.fullName]);
  useEffect(() => {
    if (props.setFullName) props.setFullName(fullName);
  }, [fullName, props]);
  const [updateAvatar] = useUpdateAvatarMutation();
  const uploadAvatar = React.useCallback(async () => {
    await getPermissionAsync();
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!image.cancelled) {
      const resized = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 512, height: 512 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );

      if (resized.base64) {
        updateAvatar({ variables: { avatar: resized.base64 } }).then((res) => {
          if (!res.data?.updateAvatar.success)
            Alert.alert(res.data?.updateAvatar.message ?? 'unknown error');
        });
      }
    }
  }, [updateAvatar]);
  return (
    <>
      <Flex flexDirection="column" alignItems="center" mb={2}>
        <Box height={86} width={86} overflow="hidden" borderRadius={16}>
          <Image
            source={{ uri: meData?.me?.avatarUrl || '' }}
            resizeMode="cover"
            style={{ height: '100%', width: '100%' }}
          />
        </Box>

        <TouchableOpacity onPress={uploadAvatar}>
          <Text fontWeight="bold" fontSize={2} mt={16} textAlign="center" color="secondary">
            Thay ảnh đại diện
          </Text>
        </TouchableOpacity>
      </Flex>
      <SettingInputItem
        title="Tên hiển thị"
        disable={false}
        value={fullName}
        onChangeText={setFullName}
        editable={props.editable}
      />
      <SettingInputItem
        disable
        title="Số điện thoại"
        value={meData?.me?.username ?? ''}
        editable={false}
      />
    </>
  );
};

export const ProfileForm = (props: {
  editable: boolean;
  setFullName?: (newName: string) => void;
  setAddress?: (newAddress: string) => void;
}) => {
  const { data: meData } = useMeQuery();
  const [fullName, setFullName] = useState(meData?.me?.fullName ?? '');
  // TODO: sex + birthday
  useEffect(() => {
    setFullName(meData?.me?.fullName ?? '');
  }, [meData?.me?.fullName]);
  useEffect(() => {
    if (props.setFullName) props.setFullName(fullName);
  }, [fullName, props]);
  const logout = useLogout();
  const toChangePassword = useNavigationLink('/doi-mat-khau');
  return (
    <>
      <Flex flexDirection="column" alignItems="center" mb={2}>
        <Box height={86} width={86} overflow="hidden" borderRadius={16}>
          <Image
            source={{ uri: meData?.me?.avatarUrl || '' }}
            resizeMode="cover"
            style={{ height: '100%', width: '100%' }}
          />
        </Box>
      </Flex>
      <SettingInputItem
        disable
        title="Tên hiển thị"
        value={fullName}
        onChangeText={setFullName}
        editable={props.editable}
      />
      <SettingInputItem
        disable
        title="Số điện thoại"
        value={meData?.me?.username ?? ''}
        editable={false}
      />
      <Button height={40} variant="outline" onPress={toChangePassword}>
        ĐỔI MẬT KHẨU
      </Button>
      <TouchableOpacity style={{height:30,marginTop:10, flexDirection:'row',borderColor:'#5A5A5A',borderRadius:8,alignItems:'center',justifyContent:'center',borderWidth:1 ,borderStyle:'solid'}} onPress={logout}>
        <Icon name="exit" size={20} color="normalText" />
        <Text ml={1} style={{ fontWeight: 'bold' }}>
          ĐĂNG XUẤT
        </Text>
      </TouchableOpacity>
    </>
  );
};

export function PersonalInformationBase() {
  const navigationEditPersonalInformation = useNavigationLink('/chinh-sua-thong-tin');
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Header leftButton="back" title="Thông tin cá nhân">
        <TouchableOpacity style={{ marginRight: 15 }} onPress={navigationEditPersonalInformation}>
          <Icon name="pen" size={20} color="headerText" />
        </TouchableOpacity>
      </Header>
      <ScrollView style={{ paddingHorizontal: 8 }}>
        <ProfileForm editable={false} />
      </ScrollView>
    </Box>
  );
}

export default function PersonalInformation() {
  return <PersonalInformationBase />;
}
