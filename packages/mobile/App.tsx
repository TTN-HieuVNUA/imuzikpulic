import { ApolloProvider } from '@apollo/react-hooks';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { createHttpLink } from 'apollo-link-http';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useEffect } from 'react';
import { Alert, Platform, SafeAreaView, StatusBar } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';

import { MobileAdapter, PlayerProvider, PlayerView, TabBar } from './src/components';
import { marketingLink } from './src/helpers/marketing-link';
import { ThemeManagerProvider, useAutoFreshToken, useThemeManager } from './src/hooks';
import { TokenExpiryProvider } from './src/hooks/token-expiry';
import introspectionResult from './src/introspection-result';
import { useMeQuery, useRegisterDeviceMutation } from './src/queries';
import { Box } from './src/rebass';
import { ExploreStackScreen } from './src/screens/ExploreStack';
import { HomeStackScreen } from './src/screens/HomeStack';
import { LoginScreen } from './src/screens/LoginScreen';
import { NotificationScreen } from './src/screens/NotificationScreen';
import { PlayerScreen } from './src/screens/PlayerScreen';
import { PlaylistScreen } from './src/screens/PlaylistScreen';
import { PopupScreen } from './src/screens/PopupScreen';
import { ProfileStackScreen } from './src/screens/ProfileStack';
import { RbtScreen } from './src/screens/RbtScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { VipScreen } from './src/screens/VipScreen';
import { DarkNavigationTheme, LightNavigationTheme } from './src/themes';
import { FeatureStackScreen } from './src/screens/FeaturedStack';
import SongScreen from './src/screens/HomeStack/SongScreen';
import ContentProviderScreen from './src/screens/ExploreStack/ContentProviderScreen';
import PackagesScreen from './src/screens/ProfileStack/PackagesScreen';
import TrimmerScreen from './src/screens/ProfileStack/TrimmerScreen';
import { ApolloLink } from '@apollo/client';
import CreateRbtFromDevice from './src/screens/ProfileStack/CreateRbtFromDevice';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionResult,
});

// const BACKEND_HOST = 'http://192.168.1.29:5500';
// const BACKEND_HOST = 'http://apibeta.imuzik.vn';
// const BACKEND_HOST = 'http://localhost:3002';
const BACKEND_HOST = 'http://101.99.6.31:5051';
const Providers = (props: React.PropsWithChildren<object>) => {
  const uploadLink = createUploadLink({
    uri: `${BACKEND_HOST}/api-v2/graphql`,
    credentials: 'include',
    headers: {
      X_CHANNEL: 'app',
    },
  });

  const client = new ApolloClient({
    connectToDevTools: true,
    // link: createHttpLink({
    //   uri: `${BACKEND_HOST}/api-v2/graphql`, // Server URL (must be absolute)
    //   credentials: 'include',
    //   headers: {
    //     X_CHANNEL: 'app',
    //   },
    //   // fetch,
    // }),
    // @ts-ignore
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache({ fragmentMatcher }),
    // TODO: cookie is working for app, WTF???
  });
  return (
    <AppearanceProvider>
      <TokenExpiryProvider>
        <ThemeManagerProvider>
          <ActionSheetProvider>
            <PlayerProvider adapter={MobileAdapter}>
              <ApolloProvider client={client}>{props.children}</ApolloProvider>
            </PlayerProvider>
          </ActionSheetProvider>
        </ThemeManagerProvider>
      </TokenExpiryProvider>
    </AppearanceProvider>
  );
};

const MobileTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const onPress = state.routes.map((route, idx) => () => {
    const isFocused = state.index === idx;
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  });
  const onLongPress = state.routes.map((route) => () =>
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    })
  );
  return (
    <Box bg="tabBar">
      <SafeAreaView>
        <PlayerView />
        <TabBar>
          <TabBar.Item
            title="Trang chủ"
            icon="home"
            isActive={state.index === 0}
            onPress={onPress[0]}
            onLongPress={onLongPress[0]}
          />
          <TabBar.Item
            title="Nổi bật"
            icon="featured"
            isActive={state.index === 1}
            onPress={onPress[1]}
            onLongPress={onLongPress[1]}
          />
          <TabBar.Item
            title="Khám phá"
            icon="tune2"
            isActive={state.index === 2}
            onPress={onPress[2]}
            onLongPress={onLongPress[2]}
          />
          <TabBar.Item
            title="Cá nhân"
            icon="user"
            isActive={state.index === 3}
            onPress={onPress[3]}
            onLongPress={onLongPress[3]}
          />
        </TabBar>
      </SafeAreaView>
    </Box>
  );
};

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainScreen = () => (
  <Tab.Navigator tabBar={MobileTabBar}>
    <Tab.Screen name="/" component={HomeStackScreen} />
    <Tab.Screen name="/noi-bat" component={FeatureStackScreen} />
    <Tab.Screen name="/kham-pha" component={ExploreStackScreen} />
    <Tab.Screen name="/ca-nhan" component={ProfileStackScreen} />
  </Tab.Navigator>
);

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Thông báo bị tắt');
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log(token);
  } else {
    Alert.alert('Thông báo chỉ chạy trên thiết bị thật');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const transparentScreen = {
  cardStyle: {
    backgroundColor: 'transparent',
  },
};

const NotificationListener = () => {
  const nav = useNavigation();
  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      // TODO: handle notification
      console.log(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      // TODO: handle notification
      console.log(response);
      const node = response.notification.request.content.data as {
        itemType: string;
        itemId: string;
      };
      const { route, params } = marketingLink(node.itemType, node.itemId);
      nav.navigate(route, params);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [nav]);
  return null;
};

function Routes() {
  const { theme } = useThemeManager();

  const { data: meData } = useMeQuery();

  useAutoFreshToken();
  const [registerDevice] = useRegisterDeviceMutation();
  useEffect(() => {
    if (meData?.me) {
      registerForPushNotificationsAsync().then((token) => {
        if (token) registerDevice({ variables: { registerId: token, deviceType: Platform.OS } });
      });
    }
  }, [meData?.me, registerDevice]);

  return (
    <>
      <StatusBar
        backgroundColor={theme === 'dark' ? 'black' : 'white'}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer theme={theme === 'dark' ? DarkNavigationTheme : LightNavigationTheme}>
        <RootStack.Navigator
          mode="modal"
          screenOptions={{ headerShown: false, headerLeft: NotificationListener }}>
          <RootStack.Screen name="main" component={MainScreen} />
          <RootStack.Screen name="notification" component={NotificationScreen} />
          <RootStack.Screen name="search" component={SearchScreen} />
          <RootStack.Screen name="vip" component={VipScreen} />
          <RootStack.Screen name="player" component={PlayerScreen} />
          <RootStack.Screen name="rbt" component={RbtScreen} options={transparentScreen} />
          <RootStack.Screen name="login" component={LoginScreen} />
          <RootStack.Screen name="popup" component={PopupScreen} options={transparentScreen} />
          <RootStack.Screen name="alert" component={PopupScreen} options={transparentScreen} />
          <RootStack.Screen name="/bai-hat/[slug]" component={SongScreen} />
          <RootStack.Screen name="/nha-cung-cap/[group]" component={ContentProviderScreen} />
          <RootStack.Screen name="/ca-nhan/goi-cuoc" component={PackagesScreen} />
          <RootStack.Screen name="/tao-nhac-cho/nhac-tu-thiet-bi" component={CreateRbtFromDevice} />
          <RootStack.Screen name="/cat-nhac/[type]/[name][url][id]" component={TrimmerScreen} />
          <RootStack.Screen
            name="playlist"
            component={PlaylistScreen}
            options={transparentScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}

function App() {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
}

// const app = Platform.OS === 'web' ? storybook : App;
// const app = storybook;
export default App;
