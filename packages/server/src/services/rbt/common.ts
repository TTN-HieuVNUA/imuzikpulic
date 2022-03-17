import { left, right } from 'fp-ts/lib/Either';

import { requireCondition } from '../../api';
import {
  RBT_REGISTERED,
  RBT_SERVICE_PAUSE,
  RBT_UNREGISTERED,
  ReturnError,
  SYSTEM_ERROR,
} from '../../error-codes';
import { ExternalRbtService } from '../../infra/telecom';
import { RbtStatus } from '../../infra/telecom/constants';

// export const requireRegistered = requireCondition<{ status: RbtStatus }>(
//   (args) => args.status === 'active',
//   RBT_UNREGISTERED
// );

// export const requireRegisteredOrPaused = requireCondition<{ status: RbtStatus }>(
//   (args) => args.status === 'active' || args.status === 'paused',
//   RBT_UNREGISTERED
// );

// export const requireNotPaused = requireCondition<{ status: RbtStatus }>(
//   (args) => args.status !== 'paused',
//   RBT_SERVICE_PAUSE
// );
// export const requireNotRegistered = requireCondition<{ status: RbtStatus }>(
//   (args) => args.status !== 'active',
//   RBT_REGISTERED
// );

export const requireRegistered = requireCondition<{ status: RbtStatus }>(
  (args) => args.status === '2',
  RBT_UNREGISTERED
);

export const requireRegisteredOrPaused = requireCondition<{ status: RbtStatus }>(
  (args) => args.status === '2' || args.status === '5',
  RBT_UNREGISTERED
);

export const requireNotPaused = requireCondition<{ status: RbtStatus }>(
  (args) => args.status !== '5',
  RBT_SERVICE_PAUSE
);
export const requireNotRegistered = requireCondition<{ status: RbtStatus }>(
  (args) => args.status !== '2',
  RBT_REGISTERED
);

export const handleFailure = <T extends { success: boolean; returnCode: string; message: string }>(
  res: T
) => async () =>
  res.success ? right(res.message) : left(new ReturnError(res.returnCode, res.message));

export const getExternalStatus = (externalRbtService: ExternalRbtService, ignoreError = false) => <
  T extends { msisdn: string }
>(
  args: T
) => async () => {
  const res = await externalRbtService.getStatus(args.msisdn);
  return res.status === 'error' && !ignoreError
    ? left(new ReturnError(SYSTEM_ERROR))
    : right({ ...args, ...res });
};
