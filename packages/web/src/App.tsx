import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";
import vi from 'date-fns/locale/vi';
import _ from 'lodash';
import React, { useState } from 'react';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { Box } from 'rebass';
import {
  PlayerProvider,
  PlayerView,
  PlayerViewPadding,
  usePlayer,
  WebAdapter,
} from './components/Player';
import { Section } from './components/Section';
import Gift from './containers/Gift';
import { LoginProvider } from './containers/Login';
import Share from './containers/Share';
import { useGiftHandler, useScrollTop } from './hooks';
import { ThemeManagerProvider } from './hooks/themes';
import introspectionResult from './introspection-result';
import ArticlePage from './pages/ArticlePage';
import ContentProviderPage from './pages/ContentProvider';
import ContentProvidersPage from './pages/ContentProviders';
import ExplorePage from './pages/Explore';
import FeaturedPage from './pages/Featured';
import GenrePage from './pages/Genre';
import HomePage from './pages/Home';
import HelpCenter from './pages/HelpCenter';
import IChartPage from './pages/Ichart';
import MyPlaylistPage from './pages/MyPlaylist';
import MyRbtPage from './pages/MyRbt';
import NotFoundPage from './pages/NotFound';
import PackagesPage from './pages/Packages';
import PersonalInfoPage from './pages/PersonalInfo';
import RbtGroupPage from './pages/RbtGroup';
import RecommendedSongsPage from './pages/RecommendedSongs';
import SearchPage from './pages/Search';
import SingerPage from './pages/Singer';
import SingersPage from './pages/Singers';
import SongPage from './pages/Song';
import Top100 from './pages/top100';
import TopicPage from './pages/Topic';
import VipMember from './pages/VipMember';
import { useNodeQuery } from './queries';
import { darkTheme } from './themes';
import GenresPage from './pages/Genres';
import TopicsPage from './pages/Topics';
import Top100s from './pages/Top100s';
import CreativePage from './pages/Creative';
import MyRbtCreativePage from './pages/MyRbtCreative';
import { ApolloLink, HttpLink } from '@apollo/client';

registerLocale('vi', vi);
setDefaultLocale('vi');
const ScrollTop: React.FC = () => {
  useScrollTop();
  return null;
};

const Paths = () => {
  const { pathname } = useLocation();
  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/de-xuat">
        <RecommendedSongsPage />
      </Route>
      <Route exact path="/kham-pha">
        <ExplorePage />
      </Route>
      <Route exact path="/noi-bat">
        <FeaturedPage />
      </Route>
      <Route path="/noi-bat/:slug">
        <ArticlePage />
      </Route>
      <Route path="/huong-dan/:slug">
        <HelpCenter />
      </Route>
      <Route exact path="/ichart">
        <IChartPage />
      </Route>
      <Route path="/ichart/:slug">
        <IChartPage />
      </Route>
      <Route path="/the-loai/:slug">
        <GenrePage />
      </Route>
      <Route path="/the-loai">
        <GenresPage />
      </Route>
      <Route exact path="/ca-sy">
        <SingersPage />
      </Route>
      <Route path="/ca-sy/:slug">
        <SingerPage />
      </Route>
      <Route exact path="/nha-cung-cap">
        <ContentProvidersPage />
      </Route>
      <Route path="/nha-cung-cap/:group">
        <ContentProviderPage />
      </Route>
      <Route path="/chu-de/:slug">
        <TopicPage />
      </Route>
      <Route path="/chu-de">
        <TopicsPage />
      </Route>
      <Route path="/bai-hat/:slug">
        <SongPage />
      </Route>
      <Route path="/ca-nhan/nhac-cho">
        <MyRbtPage />
      </Route>
      <Route path="/ca-nhan/nhac-cho-sang-tao">
        <MyRbtCreativePage />
      </Route>
      <Route path="/ca-nhan/nhac-cho-nhom">
        <RbtGroupPage />
      </Route>
      <Route path="/ca-nhan/goi-cuoc">
        <PackagesPage />
      </Route>
      <Route path="/ca-nhan/my-playlist">
        <MyPlaylistPage />
      </Route>
      <Route path="/ca-nhan">
        <PersonalInfoPage />
      </Route>
      <Route path="/vip-member">
        <VipMember />
      </Route>
      <Route path="/tim-kiem">
        <SearchPage />
      </Route>
      <Route exact path="/top-100">
        <Top100s />
      </Route>
      <Route path="/top-100/:slug">
        <Top100 />
      </Route>
      <Route path="/sang-tao">
        <CreativePage />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

// const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST || 'http://apibeta.imuzik.vn';
const BACKEND_HOST = 'http://101.99.6.31:5051';
// const BACKEND_HOST = 'http://192.168.146.8:10300';
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionResult,
});

const Player = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  //const [modalGift, setOpenGift] = useState(false);
  const { giftClick, showModalGift, setShowModalGift } = useGiftHandler();
  const player = usePlayer();
  const { data } = useNodeQuery({ variables: { id: player?.currentPlayable?.id ?? '' } });
  const song = data?.node?.__typename === 'Song' ? data.node : null;
  const tone = _.maxBy(song?.tones ?? [], (t) => t.orderTimes);
  return (
    <>
      <Box
        css={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 300 }}
        bg="playerBackground">
        <Section>
          <PlayerView onGiftClick={() => giftClick()} onShareClick={() => setIsOpen(true)} />
        </Section>
      </Box>
      <PlayerViewPadding />
      <Share isOpen={modalIsOpen} onClose={() => setIsOpen(false)} slug={song?.slug} />
      <Gift
        isOpen={showModalGift}
        onClose={() => setShowModalGift(false)}
        name={song?.name}
        toneCode={tone?.toneCode}
      />
    </>
  );
};

function App() {
  const theme = darkTheme;
  const uploadLink = createUploadLink({
    uri: `${BACKEND_HOST}/api-v2/graphql`,
    credentials: 'include',
  });

  const client = new ApolloClient({
    connectToDevTools: true,
    // link: createHttpLink({
    //   uri: `${BACKEND_HOST}/api-v2/graphql`, // Server URL (must be absolute)
    //   credentials: 'include',
    //   //headers: { X_CHANNEL: 'web' },
    //   // fetch,
    // }),
    //@ts-ignore
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache({ fragmentMatcher }),
  });

  return (
    <ToastProvider>
      <ApolloProvider client={client}>
        <ThemeManagerProvider>
          <LoginProvider>
            <Box
              bg="defaultBackground"
              css={{ minHeight: '100vh', color: theme.colors.normalText }}>
              <Router>
                <PlayerProvider adapter={WebAdapter}>
                  <ScrollTop />
                  <Paths />
                  <Player />
                </PlayerProvider>
              </Router>
            </Box>
          </LoginProvider>
        </ThemeManagerProvider>
      </ApolloProvider>
    </ToastProvider>
  );
}

export default App;
