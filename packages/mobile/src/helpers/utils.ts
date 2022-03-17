import { Platform } from 'react-native';

export const isWeb = Platform.OS === 'web';
export const isServerSide = isWeb ? !(process as any).browser : false;
export const isClientSide = isWeb ? !!(process as any).browser : true;
