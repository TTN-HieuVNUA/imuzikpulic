import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

export const useGoBack = () => {
  const navigation = useNavigation();
  return useCallback(() => {
    if (navigation.canGoBack()) navigation.goBack();
  }, [navigation]);
};
