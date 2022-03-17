import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react-native';
import React from 'react';
import wait from 'waait';

import { MeDocument } from '../queries';
import { ConditionalGoVipButton } from './buttons';

describe('ConditionalGoVip', () => {
  it.skip('should be hidden if user is not login', async () => {
    const { queryAllByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: { query: MeDocument },
            result: {
              data: {
                me: null,
              },
            },
          },
        ]}
        addTypename={false}>
        <ConditionalGoVipButton />
      </MockedProvider>
    );
    expect(queryAllByTestId('go-vip')).toHaveLength(0);
  });
  it.skip('should be shown if user is logged in', async () => {
    const { queryAllByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: { query: MeDocument },
            result: {
              data: {
                me: {
                  __typename: 'Member',
                  id: '1',
                  username: '919216811',
                  fullName: '',
                  birthday: null,
                  address: '',
                  sex: 'FEMALE',
                  avatarUrl: null,
                  displayMsisdn: '091xxxxxx1',
                },
              },
            },
          },
        ]}>
        <ConditionalGoVipButton />
      </MockedProvider>
    );

    await wait();
    expect(queryAllByTestId('go-vip')).toHaveLength(1);
  });
});
