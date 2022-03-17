import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import SongScreen from '../HomeStack/SongScreen';
import ContentProviderScreen from './ContentProviderScreen';
import ExploreScreen from './ExploreScreen';
import GenreScreen from './GenreScreen';
import SingerScreen from './SingerScreen';

const ExploreStack = createStackNavigator();

export const ExploreStackScreen = () => (
  <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
    <ExploreStack.Screen name="/the-loai" component={ExploreScreen} />
    <ExploreStack.Screen name="/ca-sy" component={ExploreScreen} />
    <ExploreStack.Screen name="/nha-cung-cap" component={ExploreScreen} />
    <ExploreStack.Screen name="/ca-sy/[slug]" component={SingerScreen} />
    <ExploreStack.Screen name="/the-loai/[slug]" component={GenreScreen} />
    <ExploreStack.Screen name="/nha-cung-cap/[group]" component={ContentProviderScreen} />
    <ExploreStack.Screen name="/bai-hat/[slug]" component={SongScreen} />
  </ExploreStack.Navigator>
);
