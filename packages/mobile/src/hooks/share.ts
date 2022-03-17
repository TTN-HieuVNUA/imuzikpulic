import { useCallback } from 'react';
import { Platform, Share } from 'react-native';

export const useShareSong = (slug?: string | null, shareAction?: () => void) => {
  return useCallback(() => {
    if (slug) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        Share.share({
          message: `http://beta.imuzik.vn/bai-hat/${slug}`,
        });
      } else {
        shareAction && shareAction();
      }
    }
  }, [shareAction, slug]);
};
