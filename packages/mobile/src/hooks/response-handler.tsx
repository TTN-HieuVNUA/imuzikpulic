import { ExecutionResult } from '@apollo/react-common';
import { useCallback } from 'react';
import { useNavigationLink } from '../platform/links';
import { Payload } from '../queries';

const REQUIRE_LOGIN = '000002';

export function useResponseHandler<T>(
  mutationResultExtractor: (
    res: ExecutionResult<T>
  ) => (Payload & { result?: unknown }) | undefined,
  successMessage?: string
) {
  const showLogin = useNavigationLink('login');
  return useCallback(
    (res: ExecutionResult<T>) => {
      const result = mutationResultExtractor(res);
      switch (result?.errorCode) {
        case REQUIRE_LOGIN:
          showLogin();
          break;

        default:
          const message = (typeof result?.result === 'string' && result.result) || result?.message;
          // if (message !== 'Successful' || successMessage) {
          // }
      }
      return res;
    },
    [mutationResultExtractor, showLogin, successMessage]
  );
}
