import sinon = require('sinon');

import { TestContext } from '../../hooks';

export const addSoapCall = (
  ctx: TestContext,
  service: string,
  method: string,
  args: any[],
  result: any,
  throws?: string
) => {
  const client = {
    [`${method}Async`]: throws
      ? sinon.stub().throws(throws)
      : sinon.stub().returns(Promise.resolve([result])),
  };
  ctx.soapCalls[service].push({
    client,
    assert() {
      // console.log(client[`${method}Async`].args[0], args);
      // console.log(client[`${method}Async`].callCount);
      sinon.assert.calledOnceWithExactly(client[`${method}Async`], ...args);
    },
  });
};
