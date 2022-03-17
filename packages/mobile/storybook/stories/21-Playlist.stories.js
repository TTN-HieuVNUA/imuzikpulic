import { MockedProvider } from '@apollo/react-testing';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { PlayerProvider, PlayerView, WebAdapter } from '../../src/components';
import { Playlist } from '../../src/containers';
import { Box, Flex } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';
import { reactNavigationDecorator } from '../decorators';

const songConnection = {
  totalCount: 41,
  pageInfo: {
    hasNextPage: true,
    endCursor: 'YXJyYXljb25uZWN0aW9uOjk=',
  },
  edges: [
    {
      node: {
        id: 'U29uZzoyMDQ5MDYz',
        name: 'Em Muốn Quên',
        slug: 'em-muon-quen',
        imageUrl: 'http://imedia.imuzik.com.vn/media2/images/song/69/15/56/5a5f1fd60f36e.jpg',
        fileUrl: 'http://imedia.imuzik.com.vn/media2/songs/song/ea/21/1e/5a5f1fd278fe7.mp3',
        downloadNumber: 842,
        liked: false,
        singers: [
          {
            id: 'U2luZ2VyOjczNw==',
            alias: 'Lê Ánh Nhật',
          },
        ],
      },
    },
    {
      node: {
        id: 'U29uZzoxODgzNjQ1',
        name: 'Tình Yêu Con Gái',
        slug: '7qjfxppg-tinh-yeu-con-gai',
        imageUrl:
          'http://imedia.imuzik.com.vn/media1/images/singer/a7/b9/9a/52ef1c9b24a31cf776941902117cf9c075fa3397.jpg',
        fileUrl: 'http://imedia.imuzik.com.vn/media1/songs/song/18/42/21/52ae5d1502fba.mp3',
        downloadNumber: 1501,
        liked: false,
        singers: [
          {
            id: 'U2luZ2VyOjczNw==',
            alias: 'Lê Ánh Nhật',
          },
        ],
      },
    },
    {
      node: {
        id: 'U29uZzoxOTc3Mzk5',
        name: 'Cơn Mưa  Nhỏ Và Nắng',
        slug: 'con-mua-nho-va-nang',
        imageUrl:
          'http://imedia.imuzik.com.vn/media1/images/singer/a7/b9/9a/52ef1c9b24a31cf776941902117cf9c075fa3397.jpg',
        fileUrl: 'http://imedia.imuzik.com.vn/media1/songs/song/8d/40/08/55e7c1d34cadb.mp3',
        downloadNumber: 554,
        liked: false,
        singers: [
          {
            id: 'U2luZ2VyOjczNw==',
            alias: 'Lê Ánh Nhật',
          },
        ],
      },
    },
    {
      node: {
        id: 'U29uZzoyMDEwMTM1',
        name: 'Em Muốn Quên',
        slug: 'em-muo-n-quen',
        imageUrl:
          'http://imedia.imuzik.com.vn/media1/images/singer/a7/b9/9a/52ef1c9b24a31cf776941902117cf9c075fa3397.jpg',
        fileUrl: 'http://imedia.imuzik.com.vn/media1/songs/song/a0/36/6a/58217ce72f892.mp3',
        downloadNumber: 1149,
        liked: false,
        singers: [
          {
            id: 'U2luZ2VyOjczNw==',
            alias: 'Lê Ánh Nhật',
          },
        ],
      },
    },
    {
      node: {
        id: 'U29uZzoxOTU4MTY3',
        name: 'Em Nhớ Anh (Remix)',
        slug: 'em-nho-anh-remix',
        imageUrl:
          'http://imedia.imuzik.com.vn/media1/images/singer/a7/b9/9a/52ef1c9b24a31cf776941902117cf9c075fa3397.jpg',
        fileUrl: 'http://imedia.imuzik.com.vn/media1/songs/song/8e/86/68/5514b979b5dee.mp3',
        downloadNumber: 512,
        liked: false,
        singers: [
          {
            id: 'U2luZ2VyOjczNw==',
            alias: 'Lê Ánh Nhật',
          },
        ],
      },
    },
    {
      node: {
        id: 'U29uZzoxOTM4Nzk3',
        name: 'Mình từng yêu nhau',
        slug: 'y86cxf9b-minh-tung-yeu-nhau',
        imageUrl:
          'http://imedia.imuzik.com.vn/media1/images/singer/a7/b9/9a/52ef1c9b24a31cf776941902117cf9c075fa3397.jpg',
        fileUrl: 'http://imedia.imuzik.com.vn/media1/songs/song/c5/1c/cc/5446230f9a719.mp3',
        downloadNumber: 31276,
        liked: false,
        singers: [
          {
            id: 'U2luZ2VyOjczNw==',
            alias: 'Lê Ánh Nhật',
          },
        ],
      },
    },
    {
      node: {
        id: 'U29uZzoxOTU4MTY5',
        name: 'Em Không Tin (Remix)',
        slug: 'em-khong-tin-remix',
        imageUrl:
          'http://imedia.imuzik.com.vn/media1/images/singer/a7/b9/9a/52ef1c9b24a31cf776941902117cf9c075fa3397.jpg',
        fileUrl: 'http://imedia.imuzik.com.vn/media1/songs/song/f1/da/af/5514b9ce1d471.mp3',
        downloadNumber: 344,
        liked: false,
        singers: [
          {
            id: 'U2luZ2VyOjczNw==',
            alias: 'Lê Ánh Nhật',
          },
        ],
      },
    },
    {
      node: {
        id: 'U29uZzoxOTY2NTk5',
        name: 'Cô Bé Mùa Đông',
        slug: 'jncx8ktr-co-be-mua-dong',
        imageUrl:
          'http://imedia.imuzik.com.vn/media1/images/singer/a7/b9/9a/52ef1c9b24a31cf776941902117cf9c075fa3397.jpg',
        fileUrl: 'http://imedia.imuzik.com.vn/media1/songs/song/b6/50/0b/557e46c3771e5.mp3',
        downloadNumber: 17,
        liked: false,
        singers: [
          {
            id: 'U2luZ2VyOjczNw==',
            alias: 'Lê Ánh Nhật',
          },
        ],
      },
    },
    {
      node: {
        id: 'U29uZzoxODgzNjcx',
        name: 'Anh Sẽ Không Buồn',
        slug: 'anh-se-khong-buon',
        imageUrl:
          'http://imedia.imuzik.com.vn/media1/images/singer/a7/b9/9a/52ef1c9b24a31cf776941902117cf9c075fa3397.jpg',
        fileUrl: 'http://imedia.imuzik.com.vn/media1/songs/song/99/d2/29/52ae5f7e2f415.mp3',
        downloadNumber: 109,
        liked: false,
        singers: [
          {
            id: 'U2luZ2VyOjczNw==',
            alias: 'Lê Ánh Nhật',
          },
        ],
      },
    },
    {
      node: {
        id: 'U29uZzoxOTg3MjQ5',
        name: 'Giáng Sinh Ngọt Ngào',
        slug: 'giang-sinh-ngot-ngao',
        imageUrl:
          'http://imedia.imuzik.com.vn/media1/images/singer/a7/b9/9a/52ef1c9b24a31cf776941902117cf9c075fa3397.jpg',
        fileUrl: 'http://imedia.imuzik.com.vn/media1/songs/song/17/cd/d1/565c1ebe5b2af.mp3',
        downloadNumber: 21,
        liked: false,
        singers: [
          {
            id: 'U2luZ2VyOjczNw==',
            alias: 'Lê Ánh Nhật',
          },
          {
            id: 'U2luZ2VyOjE0NzY0',
            alias: 'Nhiều Ca Sĩ',
          },
        ],
      },
    },
  ],
};

storiesOf('Playlist', module)
  .addDecorator(reactNavigationDecorator)
  .add('Dark Full', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" height={600} width={350}>
        <PlayerProvider adapter={WebAdapter}>
          <MockedProvider mocks={[]}>
            <Flex flex={1}>
              <Playlist songs={songConnection} loading />
              <PlayerView />
            </Flex>
          </MockedProvider>
        </PlayerProvider>
      </Box>
    </ThemeProvider>
  ))

  .add('Dark Chart', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" height={600} width={350}>
        <PlayerProvider adapter={WebAdapter}>
          <MockedProvider mocks={[]}>
            <Flex flex={1}>
              <Playlist showIdx isChart songs={songConnection} loading />
              <PlayerView />
            </Flex>
          </MockedProvider>
        </PlayerProvider>
      </Box>
    </ThemeProvider>
  ))
  .add('Empty Loading', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" height={600} width={350}>
        <PlayerProvider adapter={WebAdapter}>
          <MockedProvider mocks={[]}>
            <Playlist
              songs={{
                pageInfo: {},
              }}
              loading
            />
          </MockedProvider>
        </PlayerProvider>
      </Box>
    </ThemeProvider>
  ))
  .add('Light', () => (
    <ThemeProvider theme={lightTheme}>
      <Box bg="defaultBackground" height={600} width={350}>
        <PlayerProvider adapter={WebAdapter}>
          <MockedProvider mocks={[]}>
            <Flex flex={1}>
              <Playlist isChart songs={songConnection} loading />
              <PlayerView />
            </Flex>
          </MockedProvider>
        </PlayerProvider>
      </Box>
    </ThemeProvider>
  ));
