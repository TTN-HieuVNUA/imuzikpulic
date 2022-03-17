import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

export const reactNavigationDecorator = (story) => {
  const TestStack = createStackNavigator();

  const App = () => (
    <NavigationContainer>
      <TestStack.Navigator screenOptions={{ headerShown: false }}>
        <TestStack.Screen name="trang-chu" component={story} />
      </TestStack.Navigator>
    </NavigationContainer>
  );
  return <App />;
};
