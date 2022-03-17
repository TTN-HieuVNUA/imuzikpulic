import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import GenreScreen from '../ExploreStack/GenreScreen';
import SingerScreen from '../ExploreStack/SingerScreen';
import HomeScreen from './HomeScreen';
import IChartScreen from './IChartScreen';
import RecommendedScreen from './RecommendedScreen';
import SongScreen from './SongScreen';
import Top100sScreen from './Top100sScreen';
import TopicScreen from './TopicScreen';
import TopicsScreen from './TopicsScreen';
import ContentProviderScreen from '../ExploreStack/ContentProviderScreen';

const HomeStack = createStackNavigator();

export const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="/" component={HomeScreen} />
    <HomeStack.Screen name="/de-xuat" component={RecommendedScreen} />
    <HomeStack.Screen name="/ichart/[slug]" component={IChartScreen} />
    <HomeStack.Screen name="/top-100" component={Top100sScreen} />
    <HomeStack.Screen name="/top-100/[slug]" component={TopicScreen} />
    <HomeStack.Screen name="/chu-de" component={TopicsScreen} />
    <HomeStack.Screen name="/chu-de/[slug]" component={TopicScreen} />
    <HomeStack.Screen name="/the-loai/[slug]" component={GenreScreen} />
    <HomeStack.Screen name="/ca-sy/[slug]" component={SingerScreen} />
    <HomeStack.Screen name="/bai-hat/[slug]" component={SongScreen} />
    <HomeStack.Screen name="/nha-cung-cap/[group]" component={ContentProviderScreen} />
  </HomeStack.Navigator>
);
