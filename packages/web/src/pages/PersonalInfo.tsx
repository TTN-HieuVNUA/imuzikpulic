import { Input, Label } from '@rebass/forms';
import { parseISO } from 'date-fns';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useDropzone } from 'react-dropzone';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, Flex } from 'rebass';
import { Section } from '../components';
import Avatar from '../components/Avatar';
import H1 from '../components/H1';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { useLogout } from '../containers/Login';
import SideMenu from '../containers/SideMenu';
import { useResponseHandler } from '../hooks';
import {
  UpdateAvatarMutation,
  UpdatePasswordMutation,
  UpdateProfileMutation,
  useGenerateCaptchaMutation,
  useMeQuery,
  useUpdateAvatarMutation,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from '../queries';
import Resizer from 'react-image-file-resizer';
import Captcha from '../containers/Captcha';

export function PersonalSplitView(props: React.PropsWithChildren<{ title: string }>) {
  const history = useHistory();
  const { data: meData, loading } = useMeQuery();
  useEffect(() => {
    if (!loading && !meData?.me) {
      history.push('/');
    }
  }, [history, loading, meData]);
  const logout = useLogout();
  const [updateAvatar] = useUpdateAvatarMutation();
  const handleUpdateAvatar = useResponseHandler<UpdateAvatarMutation>(
    (res) => res.data?.updateAvatar
  );
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      Resizer.imageFileResizer(
        acceptedFiles[0],
        512,
        512,
        'JPEG',
        100,
        0,
        (uri) => {
          updateAvatar({ variables: { avatar: uri as string } }).then(handleUpdateAvatar);
        },
        'base64'
      );
    },
    [handleUpdateAvatar, updateAvatar]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
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
    <Flex flexDirection="column">
      <Header.Fixed placeholder />
      <Section flex={1}>
        <Flex flexDirection="row" alignItems="stretch">
          <Flex width={300} flexDirection="column" alignItems="center" mt={32} mb={100}>
            <Box {...getRootProps()} sx={{ border: isDragActive ? '1px dashed red' : undefined }}>
              <input {...getInputProps()} />
              <Avatar image={meData?.me?.avatarUrl ?? ''} size={200} />
            </Box>
            <Link to="/vip-member">
              <Button mx={2} fontSize={3} variant="primary" mb={44} mt={22}>
                Go VIP
              </Button>
            </Link>
            <SideMenu currentPath={history.location.pathname} logout={logout} />
          </Flex>
          <Flex ml={5} flexDirection="column" flex={1} mt={118}>
            <H1>{props.title}</H1>
            <Box backgroundColor="alternativeBackground" flex={1} mt={5}>
              {props.children}
            </Box>
          </Flex>
        </Flex>
      </Section>
      <Footer />
    </Flex>
  );
}

const PasswordForm = () => {
  const { data: meData } = useMeQuery();
  const [updatePassword, { loading }] = useUpdatePasswordMutation();
  const handleUpdatePasswordResult = useResponseHandler<UpdatePasswordMutation>(
    (res) => res.data?.updatePassword
  );
  const [generateCaptcha] = useGenerateCaptchaMutation();
  const [captchaImg, setCaptchaImg] = useState('');
  const [refreshCaptcha, setRefreshCaptcha] = useState(0);
  useEffect(() => {
    generateCaptcha({ variables: { username:meData?.me?.username } }).then(({ data }) => {
      setCaptchaImg(data?.generateCaptcha.result?.data ?? '');
    });
  }, [refreshCaptcha]);
  const formik = useFormik<{
    currentPassword: string;
    repeatPassword: string;
    newPassword: string;
    captcha:string;
  }>({
    initialValues: {
      currentPassword: '',
      repeatPassword: '',
      newPassword: '',
      captcha:''
    },
    onSubmit: (values, helper) => {
      updatePassword({ variables: { ...values } })
        .then(handleUpdatePasswordResult)
        .then((res) => {
          if (res.data?.updatePassword.success) {
            helper.resetForm();
          }
        }).then(()=>{
          setRefreshCaptcha(refreshCaptcha+1);
        })
        .catch(console.error);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mx={8} my={5}>
        <Input id="username" name="username" type="hidden" value="12313" />
        <Label htmlFor="currentPassword">M???t kh???u c??</Label>
        <Input
          id="currentPassword"
          name="currentPassword"
          placeholder="M???t kh???u c??"
          autoComplete="current-password"
          type="password"
          mb={3}
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
        />
        <Label htmlFor="newPassword">M???t kh???u m???i</Label>
        <Input
          id="newPassword"
          name="newPassword"
          placeholder="M???t kh???u m???i"
          autoComplete="new-password"
          type="password"
          mb={3}
          value={formik.values.newPassword}
          onChange={formik.handleChange}
        />
        <Label htmlFor="repeatPassword">L???p l???i m???t kh???u</Label>
        <Input
          id="repeatPassword"
          name="repeatPassword"
          placeholder="L???p l???i m???t kh???u" 
          autoComplete="new-password"
          type="password"
          mb={3}
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
        />
        <Captcha content={captchaImg} />
        <Input
          id="captcha"
          name="captcha"
          placeholder="M?? captcha"
          type="text"
          mt={3}
          mb={3}
          value={formik.values.captcha}
          onChange={formik.handleChange}
        />
        <Flex flexDirection="row" justifyContent="flex-end" alignItems="center">
          <Button
            variant="clear"
            mr={4}
            onClick={formik.handleReset}
            disabled={loading || !formik.dirty}>
            H???y
          </Button>
          <Button variant="secondary" type="submit" disabled={loading || !formik.dirty}>
            L??u thay ?????i
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

const PersonalInfoForm = () => {
  const { data: meData } = useMeQuery();
  const [updateProfile, { loading }] = useUpdateProfileMutation();
  const handleUpdateProfileResult = useResponseHandler<UpdateProfileMutation>(
    (res) => res.data?.updateProfile,
    'C???p nh???t th??ng tin c?? nh??n th??nh c??ng'
  );
  const formik = useFormik<{ fullName: string; address: string; birthday: Date | null }>({
    initialValues: {
      fullName: meData?.me?.fullName ?? '',
      address: meData?.me?.address ?? '',
      birthday: meData?.me?.birthday && parseISO(meData?.me?.birthday),
    },
    onSubmit: (values) => {
      updateProfile({
        variables: { ...meData?.me, ...values, birthday: values.birthday?.toISOString() },
      })
        .then(handleUpdateProfileResult)
        .catch(console.error);
    },
  });

  useEffect(() => {
    formik.setValues({
      fullName: meData?.me?.fullName ?? '',
      address: meData?.me?.address ?? '',
      birthday: meData?.me?.birthday && parseISO(meData?.me?.birthday),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meData]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mx={8} my={5} css={{ '.birthday': { width: '100%' } }}>
        <Label htmlFor="fullName">H??? v?? t??n</Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="H??? v?? t??n"
          mb={3}
          value={formik.values.fullName}
          onChange={formik.handleChange}
        />
        <Label htmlFor="phoneNumber">S??? ??i???n tho???i</Label>
        <Input tabIndex={-1} id="phoneNumber" readOnly value={meData?.me?.username ?? ''} mb={3} />
        <Flex flexDirection="row" justifyContent="flex-end" alignItems="center">
          <Button
            variant="clear"
            mr={4}
            onClick={formik.handleReset}
            disabled={loading || !formik.dirty}>
            H???y
          </Button>
          <Button variant="secondary" type="submit" disabled={loading || !formik.dirty}>
            L??u thay ?????i
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default function PersonalInfoPage() {
  return (
    <PersonalSplitView title="Th??ng tin c?? nh??n">
      <PersonalInfoForm />
      <PasswordForm />
    </PersonalSplitView>
  );
}
