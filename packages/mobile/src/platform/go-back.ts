import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useModals } from '../hooks/modals';

export const useGoBack = () => {
  const router = useRouter();
  const modals = useModals();
  return useCallback(() => {
    if (modals?.hasModalShown) {
      modals?.pop();
    } else {
      router.back();
    }
  }, [router, modals]);
};
