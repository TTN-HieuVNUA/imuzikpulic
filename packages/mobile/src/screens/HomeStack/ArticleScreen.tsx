import { useRoute } from '@react-navigation/native';
import { parseISO } from 'date-fns';
import React, { useCallback, useState } from 'react';
import {
  FeaturedCard,
  H2,
  Header,
  NotificationIcon,
  PlaylistSong,
  Section,
  usePlayer,
} from '../../components';
import { ConditionalGoVipButton, PageBanner } from '../../containers';
import { useResponseHandler } from '../../hooks/response-handler';
import { NavLink } from '../../platform/links';
import Title from '../../platform/Title';
import {
  ArticleQuery,
  LikeSongMutation,
  useArticleQuery,
  useLikeSongMutation,
} from '../../queries';
import { Box, Button, Flex, Text } from '../../rebass';
import { ScrollView, useWindowDimensions } from 'react-native';
import { RenderHTML } from 'react-native-render-html';
import { useThemeManager } from '../../hooks';

export function ArticleScreenBase({ slug = '' }: { slug?: string }) {
  const baseVariables = { slug, first: 5 };
  const { data, fetchMore } = useArticleQuery({
    variables: baseVariables,
  });
  const [selectedSong, setSelectedSong] = useState<string | null>();
  const [likeSong] = useLikeSongMutation();
  const article = data?.article;
  const song = data?.article?.song;
  const player = usePlayer();
  const handleLikeSongResult = useResponseHandler<LikeSongMutation>((res) => res.data?.likeSong);
  const fetchMoreSongs = useCallback(() => {
    fetchMore({
      variables: {
        after: article?.articlesRelation.pageInfo.endCursor,
      },
      updateQuery: (previousResult: ArticleQuery, { fetchMoreResult }: any): ArticleQuery => {
        const newEdges = fetchMoreResult?.article?.articlesRelation.edges;
        const pageInfo = fetchMoreResult?.article?.articlesRelation.pageInfo;
        return newEdges?.length
          ? ({
              ...previousResult,
              article: {
                ...previousResult.article,
                articlesRelation: {
                  ...previousResult.article?.articlesRelation,
                  edges: [...(previousResult.article?.articlesRelation.edges ?? []), ...newEdges],
                  pageInfo,
                },
              },
            } as ArticleQuery)
          : previousResult;
      },
    });
  }, [fetchMore, article]);
  const onPlayClick = useCallback(() => {
    if (player.currentPlayable?.sources?.[0] === song?.fileUrl) player.onPlayClicked();
    else {
      player?.play({
        id: song!.id,
        title: song!.name,
        liked: !!song!.liked,
        artist: song!.singers.map((s) => s.alias).join(' - '),
        image: song!.imageUrl,
        sources: [song!.fileUrl],
      });
      setSelectedSong(song!.id);
    }
  }, [player, song]);
  const { width } = useWindowDimensions();
  const { theme } = useThemeManager();

  return (
    <Box position="relative" flex={1}>
      <Box>
        <Header leftButton="back" title={article?.title ?? 'Nổi bật'}>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      <ScrollView>
        <Title>Một thế giới âm nhạc</Title>
        <PageBanner page="trang-chu" />
        <Box bg="defaultBackground" position="relative">
          <Box padding={3}>
            <Text fontWeight="bold" fontSize={3} numberOfLines={1} color="black" mb={1}>
              {article?.title}
            </Text>
            <Text color="primary" fontSize={1} numberOfLines={1} mb={1}>
              {song?.genres.map((s) => s.name).join(' - ')} · 2 giờ trước
            </Text>
            {/*<Text color="normalText" fontSize={1} mb={1}>*/}
            {/*  {article?.body}*/}
            {/*</Text>*/}
            <RenderHTML
              baseStyle={{
                color: theme === 'dark' ? 'white' : 'black',
                paddingHorizontal: 8,
                backgroundColor: theme === 'dark' ? 'secondary' : 'white',
              }}
              contentWidth={width}
              source={{ html: article?.body || '' }}
            />
          </Box>
          <Box mt={1} mx={2} key={song?.id}>
            <PlaylistSong
              index={1}
              slug={song?.slug}
              image={song?.imageUrl}
              title={song?.name}
              artist={song?.singers.map((s) => s.alias).join(' - ')}
              download={song?.downloadNumber}
              liked={song?.liked}
              showExpandedGift
              isPlaying={player.isPlaying}
              showEq={player.currentPlayable?.sources?.[0] === song?.fileUrl}
              animated={player.isPlaying}
              expanded={selectedSong === song?.id}
              highlighted={selectedSong === song?.id}
              onPlayClick={onPlayClick}
              onLikeClick={() =>
                likeSong({ variables: { songId: song!.id, like: !song!.liked } }).then(
                  handleLikeSongResult
                )
              }
            />
          </Box>
        </Box>
        <Section>
          <H2>Liên quan</H2>
          <Flex>
            {(article?.articlesRelation.edges ?? []).map(
              ({ node }) =>
                node.id !== song?.id && (
                  <Box key={node.id} my={2}>
                    <NavLink {...{ route: '/noi-bat/[slug]', params: { slug: node.slug } }}>
                      <FeaturedCard
                        time={node.published_time && parseISO(node.published_time)}
                        image={node.image_path ?? ''}
                        title={node.title ?? ''}
                        description={node.description ?? ''}
                      />
                    </NavLink>
                  </Box>
                )
            )}
          </Flex>
          {article?.articlesRelation?.pageInfo.hasNextPage && (
            <Flex justifyContent="center" paddingBottom={3}>
              <Button variant="muted" onPress={fetchMoreSongs}>
                Xem thêm
              </Button>
            </Flex>
          )}
        </Section>
      </ScrollView>
    </Box>
  );
}

export default function ArticleScreen() {
  const route: { params?: { slug?: string } } = useRoute();
  return <ArticleScreenBase slug={route.params?.slug ?? ''} />;
}
