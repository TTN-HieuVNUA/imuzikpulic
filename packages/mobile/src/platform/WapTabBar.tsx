import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { BackgroundColorProps } from 'styled-system';
import { PlayerView, PlayerViewPadding, TabBar, usePlayer } from '../components';
import { ModalName } from '../hooks/modal-names';
import { useModals } from '../hooks/modals';
import { Box } from '../rebass';
import { LoginScreen } from '../screens/LoginScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { PlayerScreen } from '../screens/PlayerScreen';
import { PlaylistScreen } from '../screens/PlaylistScreen';
import { PopupScreenBase } from '../screens/PopupScreen';
import { RbtScreenBase } from '../screens/RbtScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { VipScreen } from '../screens/VipScreen';
import { Modal } from './Modal';

function usePreviousState<T>(current: T) {
  const [state, setState] = React.useState(current);
  const [previous, setPrevious] = React.useState(current);
  React.useEffect(() => {
    setState(current);
    setPrevious(state);
  }, [state, previous, current]);
  return [state, previous, setState];
}

const WapTabBar = (props: { url?: string }) => {
  const router = useRouter();
  const url = props.url || router.route;
  const player = usePlayer();
  const modals = useModals();
  const [missing, previousMissing] = usePreviousState(player.missingPermission);
  useEffect(() => {
    if (missing && missing !== previousMissing) modals!.show('player');
    // TODO: double check
  }, [missing, previousMissing, modals]);
  const modalPairs: [ModalName, ReactNode][] = React.useMemo(
    () => [
      ['player', <PlayerScreen />],
      ['playlist', <PlaylistScreen />],
      ['vip', <VipScreen />],
      ['search', <SearchScreen />],
      ['notification', <NotificationScreen />],
      ['rbt', <RbtScreenBase {...modals?.params('rbt')} />],
      ['login', <LoginScreen />],
      ['popup', <PopupScreenBase {...modals?.params('popup')} />],
    ],
    [modals]
  );
  if (!player || !modals) return null;
  return (
    <Box bg="tabBar">
      <SafeAreaView>
        <TouchableOpacity onPress={() => modals.show('player')}>
          <PlayerView />
        </TouchableOpacity>
        <Box bg="tabBar">
          <TabBar>
            <Link href="/">
              <a>
                <TabBar.Item
                  title="Trang chủ"
                  icon="home"
                  isActive={/(^\/(\?.*)?$)|(chu-de|ichart)/.test(url)}
                />
              </a>
            </Link>
            <Link href="/noi-bat">
              <a>
                <TabBar.Item title="Nổi bật" icon="featured" isActive={/^\/(noi-bat)/.test(url)} />
              </a>
            </Link>
            <Link href="/ca-sy">
              <a>
                <TabBar.Item
                  title="Khám phá"
                  icon="tune2"
                  isActive={/^\/(the-loai|ca-sy|nha-cung-cap)/.test(url)}
                />
              </a>
            </Link>
            <Link href="/ca-nhan">
              <a>
                <TabBar.Item title="Cá nhân" icon="user" isActive={/^\/(ca-nhan)/.test(url)} />
              </a>
            </Link>
          </TabBar>
        </Box>

        {modalPairs.map(([name, node]) => (
          <Modal
            key={name}
            ariaHideApp={false}
            animationType="slide"
            transparent
            visible={modals.isVisible(name)}>
            {modals.isEverVisible(name) ? node : null}
          </Modal>
        ))}
      </SafeAreaView>
    </Box>
  );
};

WapTabBar.Padding = (props: BackgroundColorProps) => (
  <SafeAreaView>
    <PlayerViewPadding {...props} />
    <Box height={56} {...props} />
  </SafeAreaView>
);

export { WapTabBar };
