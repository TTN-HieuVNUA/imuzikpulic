import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Flex,Text } from 'rebass';
import { Link } from 'react-router-dom';
import { ChartSong, H2, Separator } from '../components';
import { Section } from '../components/Section';
import { PageBanner } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { useGiftHandler, useResponseHandler } from '../hooks';
import { ArticleQuery, LikeSongMutation, useArticleQuery, useLikeSongMutation } from '../queries';
import { FeaturedCard } from '../components/Card';
import { usePlayer } from '../components/Player';
import Share from '../containers/Share';
import Download from '../containers/Download';
import Gift from '../containers/Gift';
import {
  Song as SongProps
} from '../queries';
export default function ArticlePage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const baseVariables = { slug, first: 3 };
  const { giftClick,showModalGift,setShowModalGift } = useGiftHandler();
  const [modalDownload, setOpenDownload] = useState(false);
  const [modalShare, setOpenShare] = useState(false);
  const [likeSong] = useLikeSongMutation();
  const handleLikeSongResult = useResponseHandler<LikeSongMutation>((res) => res.data?.likeSong);
  const { data, fetchMore,loading } =  useArticleQuery({ variables:baseVariables });
  let song = data?.article?.song;
  const player = usePlayer();
  const fetchMoreItem = useCallback(() => {
    fetchMore({
      variables: {
        after: data.article?.articlesRelation.pageInfo.endCursor,
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
  }, [fetchMore, data]);
  const onPlayClick = useCallback(() => {
    if (player.currentPlayable?.sources?.[0] === song?.fileUrl) player.onPlayClicked();
    else {
      player?.play({
        id: data.article?.song!.id,
        title: song!.name,
        artist: song!.singers.map((s) => s.alias).join(' - '),
        image: song!.imageUrl,
        sources: [song!.fileUrl],
      });
    }
  }, [player, song,data]);
  useEffect(() => {
    const loading_screen = document.getElementById('ipl-progress-indicator')
    loading_screen.classList.remove('available')
    if(!loading)
    {
      setTimeout(() => {
        loading_screen.classList.add('available')
      }, 500)
    }
  },[loading]);
  return (
    <Box>
      <Header.Fixed />
      <PageBanner page="nha-cung-cap" slug={slug} />
      <Section>

          <Text fontSize={5} fontWeight="bold" color="normalText">
          {data?.article?.title}
          </Text>
          <Text color="primary" fontSize={2} mb={4}>
            Trữ tình · 2 giờ trước
          </Text>
          <div
            style={{ color: 'gray' }}
            dangerouslySetInnerHTML={{ __html: data?.article?.body ?? '' }}
          />
      </Section>
      {data?.article?.song ? (
        <Section>
        <Box px={3} pt={0} pb={4}>
        <ChartSong
                  slug={song?.slug}
                  image={song?.imageUrl}
                  title={song?.name}
                  artist={song?.singers}
                  download={song?.downloadNumber}
                  liked={song?.liked}
                  onPlayClick={onPlayClick}
                  onLikeClick={() =>
                    likeSong({ variables: { songId: song!.id, like: !song!.liked } }).then(
                      handleLikeSongResult
                    )}
                  compact={false}
                  onDownloadClick={() => setOpenDownload(true)}
                  onGiftClick={() => giftClick()}
                  onShareClick={() => setOpenShare(true)}
                  showShare={false}
                />
                <Separator />
                <Share
                  isOpen={modalShare}
                  onClose={() => setOpenShare(false)}
                  slug={song?.slug ?? ''}
                />
                <Download
                  isOpen={modalDownload}
                  onClose={() => setOpenDownload(false)}
                  name={song?.name}
                  toneCode={(song as SongProps)?.toneFromList?.toneCode}
                  singer={song?.singers.map((s) => s.alias).join(' - ')}
                />
                <Gift
                  isOpen={showModalGift}
                  onClose={() => setShowModalGift(false)}
                  name={song?.name}
                  toneCode={(song as SongProps)?.toneFromList?.toneCode}
                />
              </Box>
        </Section>
      ):(<></>)}
      <Section>
        <Flex flexDirection="column">
          <H2>Liên quan</H2>
        </Flex>
      </Section>
      <Section py={4}>
        <Flex flexWrap="wrap" mx={-3}>
          {(data?.article?.articlesRelation?.edges ?? []).map(({ node }, idx) => {

            return (
              <Box width={1 / 3} p={3} key={node.id ?? idx}>
                <Link {...{ to: `/noi-bat/${node.slug}` }}>
                  <FeaturedCard
                    mb={2}
                    title={node.title}
                    time={new Date(node.published_time)}
                    image={node.image_path || ''}
                    description={node.description}
                  />
                </Link>
              </Box>
            );
          })}
        </Flex>
        {data?.article?.articlesRelation?.pageInfo?.hasNextPage && (
          <Flex alignItems="center" flexDirection="column" width="100%" pt={5}>
            <Button variant="muted" onClick={fetchMoreItem}>
              Xem thêm
            </Button>
          </Flex>
        )}
      </Section>
      <Footer />
    </Box>
  );
}
