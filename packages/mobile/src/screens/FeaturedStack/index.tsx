import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FeaturedScreen from '../FeaturedScreen';
import ArticleScreen from '../HomeStack/ArticleScreen';
import ContentProviderScreen from '../ExploreStack/ContentProviderScreen';
import SongScreen from '../HomeStack/SongScreen';

const FeatureStack = createStackNavigator();

export const FeatureStackScreen = () => (
  <FeatureStack.Navigator screenOptions={{ headerShown: false }}>
    <FeatureStack.Screen name="/noi-bat" component={FeaturedScreen} />
    <FeatureStack.Screen name="/noi-bat/[slug]" component={ArticleScreen} />
    <FeatureStack.Screen name="/nha-cung-cap/[group]" component={ContentProviderScreen} />
    <FeatureStack.Screen name="/bai-hat/[slug]" component={SongScreen} />
  </FeatureStack.Navigator>
);
