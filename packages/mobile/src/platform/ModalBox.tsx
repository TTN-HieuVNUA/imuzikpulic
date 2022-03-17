import React, { useCallback, useRef } from 'react';
import { Dimensions, Platform, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { PaddingProps } from 'styled-system';
import { Box } from '../rebass';
import { useGoBack } from './go-back';

export const ModalBox = ({
  children,
  heightRatio = 1,
  type = 'modal',
  ...props
}: React.PropsWithChildren<{ heightRatio?: number; type?: 'modal' | 'popup' } & PaddingProps>) => {
  const closing = useRef(false);

  const goBack = useGoBack();
  const dismiss = useCallback(() => {
    if (!closing.current) {
      closing.current = true;
      goBack();
      setTimeout(() => {
        closing.current = false;
      }, 2000);
    }
  }, [goBack]);
  const screenHeight = Math.round(Dimensions.get('window').height) || 1000;
  return (
    <SafeAreaView
      style={{ backgroundColor: heightRatio < 1 ? 'rgba(0,0,0,0.2)' : 'defaultBackground' }}>
      <Box
        {...(type === 'popup' && { alignItems: 'center', justifyContent: 'center' })}
        bg={heightRatio < 1 ? 'rgba(0,0,0,0.5)' : 'defaultBackground'}
        {...(Platform.OS === 'web'
          ? { position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }
          : { height: '100%' })}
        {...(heightRatio < 1 ? null : props)}>
        {heightRatio < 1 ? (
          <>
            <TouchableWithoutFeedback
              style={{ width: '100%', height: '100%' }}
              onPress={dismiss}
              children={<Box height="100%" width="100%" />}
            />
            <Box
              borderTopLeftRadius={16}
              borderTopRightRadius={16}
              {...(type === 'popup' && {
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                left: 15,
                right: 15,
              })}
              bg="defaultBackground"
              position="absolute"
              {...(type === 'modal' && { bottom: 0, left: 0, right: 0 })}
              height={
                heightRatio <= 0
                  ? 'auto'
                  : Platform.OS === 'web'
                  ? `${Math.round(100 * heightRatio)}vh`
                  : screenHeight * heightRatio
              }
              pt={4}>
              <Box {...props} height="100%">
                {children}
              </Box>
            </Box>
          </>
        ) : (
          children
        )}
      </Box>
    </SafeAreaView>
  );
};
