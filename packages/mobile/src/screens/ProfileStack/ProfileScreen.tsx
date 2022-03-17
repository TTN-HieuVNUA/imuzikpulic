import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import {
  Header,
  ICON_GRADIENT_1,
  Icon,
  IconName,
  ListItem,
  Member,
  NotificationIcon,
  Section,
  Separator,
} from '../../components';
import { useThemeManager } from '../../hooks';
import Title from '../../platform/Title';
import { NavLink, useNavigationLink } from '../../platform/links';
import { useMeQuery, useMyRbtQuery } from '../../queries';
import { Box, Flex, Text } from '../../rebass';
import { ConditionalGoVipButton } from '../../containers';

const Toggle = (props: { selected: boolean }) => (
  <Box>
    <Box width={40} height={16} bg="separator" borderRadius={8} overflow="hidden" m="4px" />
    <Box
      width={24}
      height={24}
      borderRadius={12}
      overflow="hidden"
      position="absolute"
      top={0}
      {...(props.selected ? { right: 0 } : { left: 0 })}>
      <LinearGradient
        colors={['#38EF7D', '#11998E']}
        start={[0, 0]}
        end={[1, 1]}
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  </Box>
);

const SettingItem = (props: {
  onPress?: () => void;
  title: string;
  icon?: IconName;
  value?: string;
  rightNode?: React.ReactNode;
}) => {
  const item = (
    <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
      <Box flex={1}>
        <ListItem
          icon={props.icon && <Icon name={props.icon} size={16} color={ICON_GRADIENT_1} />}
          iconPadding={3}
          title={props.title}
          value={props.value}
          titleWidth={props.value ? 0.5 : 1}
          showCaret={!props.rightNode}
          py={4}
        />
      </Box>
      {props.rightNode}
    </Flex>
  );
  return (
    <Box>
      {props.onPress ? <TouchableOpacity onPress={props.onPress}>{item}</TouchableOpacity> : item}
      <Separator />
    </Box>
  );
};

export function MemberSection(props: { showLogin?: () => void }) {
  const { data: meData } = useMeQuery();
  const { data: myRbtData } = useMyRbtQuery();
  const navigatePersonalInfo = useNavigationLink('/ca-nhan/thong-tin');
  const navigateLogin = useNavigationLink('login');
  return (
    <Section mt={3}>
      <Member
        image={
          meData?.me
            ? meData?.me?.avatarUrl
            : 'https://png.pngtree.com/png-vector/20190223/ourlarge/pngtree-profile-line-black-icon-png-image_691051.jpg'
        }
        name={(meData?.me?.fullName || meData?.me?.displayMsisdn) ?? ''}
        package={myRbtData?.myRbt?.name ?? 'Miễn phí'}
        onPress={props.showLogin ? navigateLogin : navigatePersonalInfo}>
        {props.showLogin ? (
          <TouchableOpacity style={{height:35,borderRadius:12,alignItems:'center',justifyContent:'center', width:104,backgroundColor:'#FDCC26'}} onPress={props.showLogin}>
            <Text fontWeight="bold" color='black' >
              Đăng nhập
            </Text>
          </TouchableOpacity>
        ) : (
          <Flex justifyContent="center" alignItems="center" width={40} mr={-2}>
            <Icon name="caret-right" size={14} color="white" />
          </Flex>
        )}
      </Member>
    </Section>
  );
}

export function ManageSection() {
  const { theme, setTheme } = useThemeManager();
  const { data: meData, loading } = useMeQuery();

  return (
    <Section>
      <Title>Quản lý dịch vụ Tuân</Title>
      {loading ? (
        <ActivityIndicator size="large" color="primary" />
      ) : (
        <>
          <NavLink route={meData?.me ? '/quan-ly-nhac-cho' : 'login'}>
            <SettingItem title="Quản lý nhạc chờ" icon="playlist2" />
          </NavLink>
          <NavLink route={meData?.me ? '/ca-nhan/my-playlist' : 'login'}>
            <SettingItem title="My Playlist" icon="playlist2" />
          </NavLink>
          <NavLink route={meData?.me ? '/ca-nhan/goi-cuoc' : 'login'}>
            <SettingItem title="Thông tin gói cước" icon="tune" />
          </NavLink>
          <NavLink route={meData?.me ? '/ca-nhan/nhac-cho' : 'login'}>
            <SettingItem title="Bộ sưu tập nhạc chờ" icon="tunes" />
          </NavLink>
          <NavLink route={meData?.me ? '/ca-nhan/nhac-cho-nhom' : 'login'}>
            <SettingItem title="Nhạc chờ cho nhóm" icon="album" />
          </NavLink>
          <SettingItem title="Nhạc chờ của bạn bè, người thân" icon="tune-group" />
          <NavLink route="/huong-dan">
            <SettingItem title="Hỗ trợ" icon="user" />
          </NavLink>
        </>
      )}
      <SettingItem
        title="Chế độ nền tối"
        icon="night"
        onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        rightNode={<Toggle selected={theme === 'dark'} />}
      />
    </Section>
  );
}

export default function ProfileScreen() {
  const { data: meData, loading } = useMeQuery();
  const toLogin = useNavigationLink('login');
  const toCreateRbt = useNavigationLink('/tao-nhac-cho');
  return (
    <Box bg="defaultBackground" position="relative" height="100%">
      <Box height="100%">
        {loading && <ActivityIndicator size="large" color="primary" />}

        {!loading && (
          <Box flex={1}>
            <Header logo search>
              <ConditionalGoVipButton />
              <NotificationIcon />
            </Header>
            <ScrollView>
              <MemberSection showLogin={meData?.me ? undefined : toLogin} />
              <Box alignItems='center' px={3}>
                <TouchableOpacity
                  style={{height:50,flexDirection:'row',marginTop:8,width:'100%',borderRadius:8,alignItems:'center',justifyContent:'center',backgroundColor:'#FDCC26'}}
                  onPress={meData?.me ? toCreateRbt : toLogin}>
                  <Icon name="ring-tone" size={20} color="gray" />
                  <Text ml={1} fontSize={[3, 4, 5]}  fontWeight="bold" color="gray">
                    TỰ SÁNG TẠO NHẠC CHỜ
                  </Text>
                </TouchableOpacity>
              </Box>
              <Box mt={1} mb={4}>
                <ManageSection />
              </Box>
            </ScrollView>
          </Box>
        )}
      </Box>
    </Box>
  );
}
