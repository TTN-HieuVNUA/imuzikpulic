import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import MyPlaylistScreen from './MyPlaylistScreen';
import MyRbtScreen from './MyRbtScreen';
import PackagesScreen from './PackagesScreen';
import ProfileScreen from './ProfileScreen';
import RbtGroupScreen from './RbtGroupScreen';
import RbtGroupsScreen from './RbtGroupsScreen';
import HelpCenterScreen from './HelpCenterScreen';
import HelpCenterDetails from './HelpCenterDetails';
import PersonalInformation from './PersonalInformation';
import ChangePassword from './ChangePassword';
import EditPersonalInformation from './EditPersonalInformation';
import ContentProviderScreen from '../ExploreStack/ContentProviderScreen';
import SongScreen from '../HomeStack/SongScreen';
import CreateRbtScreen from './CreateRbtScreen';
import CreateRbtFromLibrary from './CreateRbtFromLibrary';
import CreateRbtFromDevice from './CreateRbtFromDevice';
import RbtManagerScreen from './RbtManagerScreen';
// import { route } from 'next/dist/next-server/server/router';
import { useRoute, useNavigation } from '@react-navigation/native';
const ProfileStack = createStackNavigator();

export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="/ca-nhan" component={ProfileScreen} />
      <ProfileStack.Screen name="/ca-nhan/goi-cuoc" component={PackagesScreen} />
      <ProfileStack.Screen name="/ca-nhan/nhac-cho" component={MyRbtScreen} />
      <ProfileStack.Screen name="/ca-nhan/my-playlist" component={MyPlaylistScreen} />
      <ProfileStack.Screen name="/ca-nhan/nhac-cho-nhom" component={RbtGroupsScreen} />
      <ProfileStack.Screen name="/ca-nhan/nhac-cho-nhom/[groupId]" component={RbtGroupScreen} />
      <ProfileStack.Screen name="/ca-nhan/thong-tin" component={PersonalInformation} />
      <ProfileStack.Screen name="/huong-dan" component={HelpCenterScreen} />
      <ProfileStack.Screen name="/huong-dan/[slug]" component={HelpCenterDetails} />
      <ProfileStack.Screen name="/doi-mat-khau" component={ChangePassword} />
      <ProfileStack.Screen name="/chinh-sua-thong-tin" component={EditPersonalInformation} />
      <ProfileStack.Screen name="/nha-cung-cap/[group]" component={ContentProviderScreen} />
      <ProfileStack.Screen name="/bai-hat/[slug]" component={SongScreen} />
      <ProfileStack.Screen name="/tao-nhac-cho" component={CreateRbtScreen} />
      <ProfileStack.Screen name="/tao-nhac-cho/nhac-co-san" component={CreateRbtFromLibrary} />
      {/* <ProfileStack.Screen name="/tao-nhac-cho/nhac-tu-thiet-bi" component={CreateRbtFromDevice} /> */}
      <ProfileStack.Screen name="/quan-ly-nhac-cho" component={RbtManagerScreen} />
    </ProfileStack.Navigator>
  );
};
