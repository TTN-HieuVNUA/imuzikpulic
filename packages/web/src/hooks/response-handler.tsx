import { useState } from 'react';
import { ExecutionResult } from '@apollo/react-common';
import { useCallback } from 'react';
import { useToasts } from 'react-toast-notifications';

import { useLoginContext } from '../containers/Login';
import { Payload, useMeQuery } from '../queries';

const REQUIRE_LOGIN = '000002';

export function useResponseHandler<T>(
  mutationResultExtractor: (
    res: ExecutionResult<T>
  ) => (Payload & { result?: unknown }) | undefined,
  successMessage?: string
) {
  const { addToast } = useToasts();
  const { showLogin } = useLoginContext();
  return useCallback(
    (res: ExecutionResult<T>) => {
      const result = mutationResultExtractor(res);
      switch (result?.errorCode) {
        case REQUIRE_LOGIN:
          showLogin?.();
          break;

        default:
          const message = (typeof result?.result === 'string' && result.result) || result?.message;
          if (message !== 'Successful' || successMessage) {
            addToast(result?.success ? successMessage || message : message, {
              appearance: result?.success ? 'success' : 'error',
              autoDismiss: true,
            });
          }
      }
      return res;
    },
    [addToast, mutationResultExtractor, showLogin, successMessage]
  );
}

export const useGiftHandler = () => {
  const [modalGift, setOpenGift] = useState(false);
  const { data: meData,loading } = useMeQuery();
  const { showLogin } = useLoginContext();
  const giftClick = useCallback(() => {
    if (!meData?.me) {
      return showLogin?.();
    }else{
      setOpenGift(true);
    }
  }, [
    meData,
    showLogin
  ]);
  return {
    giftClick,
    loading: loading,
    showModalGift: modalGift,
    setShowModalGift:setOpenGift
  };
};

export const useDownloadHandler = () => {
  const [modalDownload, setOpenDownload] = useState(false);
  const { data: meData,loading } = useMeQuery();
  const { showLogin } = useLoginContext();
  const downloadClick = useCallback(() => {
    if (!meData?.me) {
      return showLogin?.();
    }else{
      setOpenDownload(true);
    }
  }, [
    meData,
    showLogin
  ]);
  return {
    downloadClick,
    loading: loading,
    showModalDownload: modalDownload,
    setShowModalDownload:setOpenDownload
  };
};