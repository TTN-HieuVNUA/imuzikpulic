import { useTheme } from 'emotion-theming';
import queryString from 'query-string';
import React, { useCallback, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Flex, Text } from 'rebass';
import Icon from '../components/Icon';
import { Logo } from '../components/Logo';
import { SearchBox } from '../components/SearchBox';
import { Section } from '../components/Section';
import { useOnClickOutside } from '../hooks';
import { useMeQuery, useMyRbtQuery } from '../queries';
import { Theme } from '../themes';
import { useLoginContext } from './Login';
import { NotificationBox } from './Notification';

function Header() {
  const theme = useTheme<Theme>();
  const { data: meData } = useMeQuery();
  const { showLogin } = useLoginContext();
  const { data: myRbtData } = useMyRbtQuery();
  const [searchBox, setSearchBox] = useState(false);
  const [notificationBox, setNotificationBox] = useState(false);
  const toggleNotification = useCallback(() => {
    setNotificationBox(!notificationBox);
  }, [notificationBox]);
  const hideNotification = useCallback(() => {
    setNotificationBox(false);
  }, []);
  const { pathname, search } = useLocation();
  const parsed = queryString.parse(search);
  const ref = useRef();
  useOnClickOutside(ref, hideNotification);
  return (
    <Section
      css={{
        background: 'linear-gradient(180deg, #2A2A2A 0%, rgba(130, 130, 130, 0) 100%)',
      }}>
      <Flex
        alignItems="center"
        css={{
          a: { textDecoration: 'none' },
          'a *': {
            cursor: 'pointer',
          },
          'a:hover *': {
            color: theme.colors.primary,
            fill: theme.colors.primary,
          },
        }}>
        <Box mr={30}>
          <a href="/">
            <Logo />
          </a>
        </Box>

        {pathname === '/tim-kiem' ? (
          <SearchBox value={parsed.q.toString()} />
        ) : (
          <>
            {!searchBox ? (
              <>
                <Flex alignItems="center" flex={1}>
                  <a href="/kham-pha">
                    <Text fontSize={4} fontWeight="bold" p={25} color={pathname?.includes("/kham-pha") ? "#FDCC26" : "white"}>
                      KHÁM PHÁ
                    </Text>
                  </a>
                  <a href="/ichart">
                    <Text fontSize={4} fontWeight="bold" p={25} color={pathname?.includes("/ichart") ? "#FDCC26" : "white"}>
                      ICHART
                    </Text>
                  </a>
                  <a href="/top-100">
                    <Text fontSize={4} fontWeight="bold" p={25} color={pathname?.includes("/top-100") ? "#FDCC26" : "white"}>
                      TOP 100
                    </Text>
                  </a>
                  <a href="/sang-tao">
                    <Text fontSize={4} fontWeight="bold" p={25} color={pathname?.includes("/sang-tao") && !pathname?.includes("/ichart/sang-tao") ? "#FDCC26" : "white"}>
                      SÁNG TẠO
                    </Text>
                  </a>
                  <Link to="/vip-member">
                    <Button
                      hidden={myRbtData?.myRbt?.brandId === "472"}
                      mx={2}
                      css={{ height: 36, fontSize: theme.fontSizes[3], color: '#262523' }}
                      variant="primary">
                      Go VIP
                    </Button>
                  </Link>
                </Flex>
                <Flex alignItems="center">
                  <Box p={2} onClick={() => setSearchBox(true)}>
                    <Icon size={24} name="search" color="white" />
                  </Box>
                </Flex>
              </>
            ) : (
              <SearchBox autoFocus onClickOutside={(value) => setSearchBox(value)} />
            )}
          </>
        )}

        <Flex alignItems="center">
          <Box css={{ position: 'relative' }} ref={ref}>
            <Box p={2} onClick={toggleNotification}>
              <Icon size={24} name="notification" color="white" />
            </Box>
            {notificationBox && <NotificationBox onClose={hideNotification} />}
          </Box>
          {meData?.me ? (
            <Link to="/ca-nhan">
              <Box p={2}>
                <Icon size={24} name="user" color="white" />
              </Box>
            </Link>
          ) : (
            <Flex flexDirection="row">
              <Text
                css={{ cursor: 'pointer' }}
                fontSize={4}
                fontWeight="bold"
                p={2}
                color="white"
                onClick={showLogin}>
                Đăng ký
              </Text>
              <Text
                css={{ cursor: 'pointer' }}
                fontSize={4}
                fontWeight="bold"
                p={2}
                color="white"
                onClick={showLogin}>
                Đăng nhập
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Section>
  );
}

Header.Fixed = ({ placeholder: padding }: { placeholder?: boolean }) => (
  <Box>
    <Box
      css={{
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
      }}>
      <Header />
    </Box>
    {padding && <Box height={74} width="100%" />}
  </Box>
);

export default Header;
