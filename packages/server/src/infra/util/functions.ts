import * as _ from 'lodash/fp';
export const addKeyPrefix = (prefix: string) =>
  _.flow(
    _.toPairs,
    _.map(([key, value]) => [prefix + key, value]),
    _.fromPairs
  );
