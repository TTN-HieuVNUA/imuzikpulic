import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Link, Text } from 'rebass';
import { SelectionBar } from '../components';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';
import { Section } from '../components/Section';
import { BannerPackage } from '../containers';
import Banner from '../containers/Banner';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { PlayAllButton } from '../containers/PlayAllButton';
import { Playlist } from '../containers/Playlist';
import {
  useCollection,
  useFetchMoreSongEdges,
  usePlaylistOrder,
  useResponseHandler,
} from '../hooks';
import {
  LikeSingerMutation,
  SingerLikesDocument,
  useLikeSingerMutation,
  useSingerLikesQuery,
  useSingerQuery,
} from '../queries';

const ScrollbarStyled = styled(Box)`
  & > div::-webkit-scrollbar {
    width: 12px;
    background: #333333;
    border-radius: 20px;
  }
  & > div::-webkit-scrollbar-thumb {
    background: #b2b2b2;
    border-radius: 20px;
  }
`;

const SingerLike = ({ slug }: { slug: string }) => {
  const { data } = useSingerLikesQuery({
    variables: { slug },
  });
  const singerId = data?.singer.id;
  const liked = data?.singer.likes.liked;
  const totalLikes = data?.singer.likes.totalCount.toLocaleString('de-DE');
  const [likeSinger, { loading: likeSingerLoading }] = useLikeSingerMutation();
  const handleLikeSignerResult = useResponseHandler<LikeSingerMutation>(
    (res) => res.data?.likeSinger
  );
  const like = useCallback(() => {
    likeSinger({
      variables: {
        singerId,
        like: !liked,
      },
      refetchQueries: [{ query: SingerLikesDocument, variables: { slug } }],
    }).then(handleLikeSignerResult);
  }, [handleLikeSignerResult, likeSinger, liked, singerId, slug]);
  return (
    <Flex height="21.82px">
      <Box onClick={likeSingerLoading ? undefined : like} css={{ cursor: 'pointer' }}>
        <Icon name={liked ? 'heart-full' : 'heart'} size={24} color="yellow2" />
      </Box>
      <Text ml={2} fontSize={14} lineHeight="21.82px" color="#fccc26">
        {totalLikes} lượt yêu thích
      </Text>
    </Flex>
  );
};

const SingerDescription = (props: {
  slug: string;
  image: string;
  name: string;
  description: string;
  onMoreClick?: () => void;
}) => {
  const shortDescription = props.description
    .replace(/\n\n/g, ' ')
    .replace(/\n/g, '. ')
    .slice(0, 335);
  return (
    <>
      <Flex pt={22}>
        <Avatar image={props.image} size={100} imgShadow="0px 0px 50px 0px rgba(0, 0, 0, 1)" />
        <Flex flexDirection="column" justifyContent="space-between" ml="1em" py={4}>
          <Text
            fontSize={23}
            fontWeight={700}
            css={{
              textTransform: 'uppercase',
            }}>
            {props.name}
          </Text>
          <SingerLike slug={props.slug} />
        </Flex>
      </Flex>
      {props.description.length <= 335 ? (
        <Box my={13} ml={116} maxWidth={914}>
          <Text
            fontSize={17}
            minHeight={73}
            color="#b2b2b2"
            display="-webkit-box"
            overflow="hidden"
            css={{
              whiteSpace: 'pre-wrap',
            }}>
            {shortDescription}
          </Text>
        </Box>
      ) : (
        <Box my={13} ml={116} maxWidth={914}>
          <Text
            fontSize={17}
            minHeight={73}
            color="#b2b2b2"
            display="-webkit-box"
            overflow="hidden"
            css={{
              whiteSpace: 'pre-wrap',
            }}>
            {shortDescription}...
            <Link
              color="#fccc26"
              onClick={props.onMoreClick}
              css={{
                cursor: 'pointer',
              }}>
              {' '}
              Xem thêm
            </Link>
          </Text>
        </Box>
      )}
    </>
  );
};

const SingerFullDescription = (props: {
  slug: string;
  image: string;
  name: string;
  description: string;
  onMoreClick?: () => void;
}) => {
  return (
    <Box
      pt={42}
      pb={59}
      pl={68}
      pr={34}
      backgroundColor="#262523"
      css={{
        position: 'absolute',
        top: 0,
        zIndex: 202,
        boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 1)',
      }}>
      <Box maxWidth={1044}>
        <Flex css={{ position: 'relative' }}>
          <Avatar image={props.image} size={100} imgShadow="0px 0px 50px 0px rgba(0, 0, 0, 1)" />
          <Flex flexDirection="column" justifyContent="space-between" ml="1em" py={4}>
            <Text
              fontSize={23}
              fontWeight={700}
              css={{
                textTransform: 'uppercase',
              }}>
              {props.name}
            </Text>
            <SingerLike slug={props.slug} />
          </Flex>
          <Box
            css={{
              position: 'absolute',
              top: 0,
              right: 0,
              cursor: 'pointer',
            }}
            onClick={props.onMoreClick}>
            <Icon name="cross2" />
          </Box>
        </Flex>
        <ScrollbarStyled mt={24}>
          <Text
            fontSize={17}
            color="#b2b2b2"
            overflowY="auto"
            maxHeight={637}
            pr={34}
            css={{
              whiteSpace: 'pre-wrap',
            }}>
            {props.description}
          </Text>
        </ScrollbarStyled>
      </Box>
    </Box>
  );
};

export default function SingerPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { orderBy, selectionBarProps } = usePlaylistOrder();

  const baseVariables = { slug, orderBy, first: 20 };

  const { data, fetchMore, refetch, loading } = useSingerQuery({
    variables: baseVariables,
  });
  const fetchMoreSongs = useFetchMoreSongEdges(
    loading,
    'singer',
    fetchMore,
    data?.singer!,
    baseVariables
  );
  const collection = useCollection(data?.singer?.alias ?? '', data?.singer?.songs);

  const [fullView, setFullView] = React.useState(false);
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
    <Box css={{ position: 'relative' }}>
      <Header.Fixed />
      <Banner autoPlay interval={3000}>
        {[
          <div key={0}>
            <img src={data?.singer?.imageUrl} alt="placeholder" />
            <Banner.Content />
          </div>,
        ]}
      </Banner>
      <BannerPackage />
      <Section>
        {fullView ? (
          <>
            <Box
              height="100%"
              width="100%"
              backgroundColor="rgba(0,0,0,0.3)"
              onClick={() => setFullView(false)}
              css={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 201,
              }}
            />
            <Box height={208} css={{ position: 'relative' }}>
              <SingerFullDescription
                image={data?.singer?.imageUrl ?? ''}
                name={data?.singer?.alias ?? ''}
                slug={slug}
                description={data?.singer?.description ?? ''}
                onMoreClick={() => setFullView(false)}
              />
            </Box>
          </>
        ) : (
          <SingerDescription
            image={data?.singer?.imageUrl ?? ''}
            name={data?.singer?.alias ?? ''}
            slug={slug}
            description={data?.singer?.description ?? ''}
            onMoreClick={() => setFullView(true)}
          />
        )}
      </Section>
      <Section>
        <Flex flexDirection="row" alignItems="center">
          <SelectionBar {...selectionBarProps} flex={1} />
          <PlayAllButton collection={collection} />
        </Flex>
      </Section>
      <Section>
        <Flex flexDirection="column">
          <Playlist
            songs={data?.singer?.songs}
            loading={loading}
            name={data?.singer?.alias ?? ''}
            onRefresh={refetch}
            onFetchMore={fetchMoreSongs}
          />
        </Flex>
      </Section>
      <Footer />
    </Box>
  );
}
