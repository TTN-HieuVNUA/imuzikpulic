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
        { path: '/ca-nhan', text: 'Th??ng tin c?? nh??n' },
        { path: '/ca-nhan/my-playlist', text: 'My Playlist' },
        { path: '/ca-nhan/goi-cuoc', text: 'Th??ng tin g??i c?????c' },
        { path: '/ca-nhan/nhac-cho-sang-tao', text: 'Qu???n l?? nh???c s??ng t???o' },
        { path: '/ca-nhan/nhac-cho', text: 'B??? s??u t???p nh???c ch???' },
        { path: '/ca-nhan/nhac-cho-nhom', text: 'Nh???c ch??? cho nh??m' },
        { path: '/ca-nhan/nhac-cho-ban-be', text: 'Nh???c ch??? c???a b???n b??, ng?????i th??n' },
      ].map((item) => (
        <Item key={item.path} to={item.path} active={currentPath === item.path}>
          {item.text}
        </Item>
      ))}
      <ItemView disableHighlight>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>Ch??? ????? n???n t???i</Box>
          <VtToggle
            checked={themeManager?.theme !== 'light'}
            onChange={(e) => themeManager?.setTheme(e.target.checked ? 'dark' : 'light')}
          />
        </Flex>
      </ItemView>
      <Box onClick={props.logout}>
        <ItemView disableHighlight>????NG XU???T</ItemView>
      </Box>
    </Flex>
  );
}
