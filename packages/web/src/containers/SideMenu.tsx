import 'react-toggle/style.css';

import { useTheme } from 'emotion-theming';
import React, { ChangeEvent, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';
import { Box, Flex, Text } from 'rebass';

import { useThemeManager } from '../hooks/themes';
import { Theme } from '../themes';

const VtToggle = (props: {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      css={{
        '.react-toggle-track': {
          width: 40,
          height: 16,
        },
        '.react-toggle-thumb': {
          width: 24,
          height: 24,
          border: 'none',
          top: -3,
          left: -5,
          background: theme.colors.lightText,
        },
        '.react-toggle--checked .react-toggle-thumb': {
          background: theme.colors.gradients[0],
          left: 20,
        },
      }}>
      <Toggle icons={false} {...props} />
    </Box>
  );
};

const ItemView = (props: PropsWithChildren<{ active?: boolean; disableHighlight?: boolean }>) => {
  const theme = useTheme<Theme>();
  return (
    <Box
      css={{
        ...(props.disableHighlight
          ? {}
          : {
            '&.active, &:hover': {
              borderLeft: `solid 4px ${theme.colors.secondary}`,
              '.item': {
                paddingLeft: 22,
              },
            },
          }),
        cursor: 'pointer',
      }}
      className={props.active ? 'active' : ''}>
      <Text
        px={26}
        py={18}
        fontWeight="bold"
        fontSize={3}
        css={{
          borderBottom: `1px solid ${theme.colors.separator}`,
        }}
        color="normalText"
        className="item">
        {props.children}
      </Text>
    </Box>
  );
};

const Item = ({ to, ...props }: PropsWithChildren<{ to: string; active?: boolean }>) => {
  return (
    <Link to={to}>
      <ItemView {...props} />
    </Link>
  );
};
export default function SideMenu(props: { currentPath?: string; logout: () => void }) {
  const { currentPath } = props;
  const themeManager = useThemeManager();
  return (
    <Flex
      flexDirection="column"
      css={{
        a: {
          textDecoration: 'none',
        },
      }}>
      {[
        { path: '/ca-nhan', text: 'Thông tin cá nhân' },
        { path: '/ca-nhan/my-playlist', text: 'My Playlist' },
        { path: '/ca-nhan/goi-cuoc', text: 'Thông tin gói cước' },
        { path: '/ca-nhan/nhac-cho-sang-tao', text: 'Quản lý nhạc sáng tạo' },
        { path: '/ca-nhan/nhac-cho', text: 'Bộ sưu tập nhạc chờ' },
        { path: '/ca-nhan/nhac-cho-nhom', text: 'Nhạc chờ cho nhóm' },
        { path: '/ca-nhan/nhac-cho-ban-be', text: 'Nhạc chờ của bạn bè, người thân' },
      ].map((item) => (
        <Item key={item.path} to={item.path} active={currentPath === item.path}>
          {item.text}
        </Item>
      ))}
      <ItemView disableHighlight>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>Chế độ nền tối</Box>
          <VtToggle
            checked={themeManager?.theme !== 'light'}
            onChange={(e) => themeManager?.setTheme(e.target.checked ? 'dark' : 'light')}
          />
        </Flex>
      </ItemView>
      <Box onClick={props.logout}>
        <ItemView disableHighlight>ĐĂNG XUẤT</ItemView>
      </Box>
    </Flex>
  );
}
