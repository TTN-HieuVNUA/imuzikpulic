import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import * as _ from 'lodash';
import {
  ChartSong,
  Header,
  Icon,
  IconName,
  ICON_GRADIENT_1,
  PlaylistSong,
  Section,
  Section2,
  Separator,
  TabBar,
  usePlayer,
} from '../../components';
import { ConditionalGoVipButton } from '../../containers/buttons';
import { CommentSong } from '../../containers/comment';
import { useCollection, useShareSong } from '../../hooks';
import { NavLink, useAlert, useNavigationLink } from '../../platform/links';
import Title from '../../platform/Title';
import { useTonePlayer } from '../../platform/tone-player';
import {
  LikeSongMutation,
  RingBackTone,
  SongBaseFragment,
  SongCommentsDocument,
  SongCommentsQuery,
  SongQuery,
  ToneBaseFragment,
  useCreateCommentMutation,
  useLikedSongQuery,
  useLikeSongMutation,
  useMeQuery,
  useSongCommentsQuery,
  useSongQuery,
} from '../../queries';
import { Box, Button, Flex, Input, Text } from '../../rebass';
import { useResponseHandler } from '../../hooks/response-handler';

const RbtItem = <T extends Pick<RingBackTone, 'duration' | 'fileUrl'> & ToneBaseFragment>(props: {
  tone: T;
  song: SongBaseFragment;
  idx: number;
  selected: boolean;
  setSelected: (s: boolean) => void;
}) => {
  const { tone, idx } = props;
  const { selected, setSelected } = props;
  const { audio, isPlaying, remain, duration, onPlayClick } = useTonePlayer(
    tone?.fileUrl ?? '',
    selected,
    useCallback(() => {
      setSelected(true);
    }, [setSelected])
  );
  return (
    <Box>
      <TouchableOpacity onPress={() => setSelected(!selected)}>
        <PlaylistSong
          index={idx + 1}
          slug={props.song.slug}
          toneCode={tone.toneCode}
          cp={tone.contentProvider?.name}
          duration={isPlaying ? remain : duration || tone.duration}
          download={tone.orderTimes}
          highlighted={selected}
          expanded={selected}
          onPlayClick={onPlayClick}
          isPlaying={isPlaying}
          hideLike
          hideDownload
          showExpandedDownload
          showExpandedGift
        />
      </TouchableOpacity>
      {audio}
    </Box>
  );
};
// const MainAction = React.memo(
//   (props: { icon: IconName; onPress?: () => void; enabled: boolean; small?: boolean }) => {
//     return (
//       <Flex px={4} py={1}>
//         <TouchableOpacity onPress={props.enabled ? props.onPress : null} disabled={!props.enabled}>
//           <Flex flexDirection="column" alignItems="center">
//             <Icon
//               name={props.icon}
//               size={props.small ? 30 : 40}
//               color={props.enabled ? 'normalText' : 'lightText'}
//             />
//           </Flex>
//         </TouchableOpacity>
//       </Flex>
//     );
//   }
// );

export const SongRbtSection = <
  T extends Pick<RingBackTone, 'duration' | 'fileUrl'> & ToneBaseFragment
>(props: {
  tones: T[];
  song: SongBaseFragment;
}) => {
  const [selectedToneCode, setSelectedToneCode] = useState<string | null>(null);
  const navigate = useNavigationLink('rbt', {
    type: 'download',
    songSlug: props.song.slug,
  });
  const { data: meData } = useMeQuery();
  const showPopup = useAlert({ type: 'requireLogin' });
  const requireLogin = () => {
    showPopup({ content: 'Vui lòng đăng nhập để sử dụng!' });
  };
  return (
    <Section2 my={4}>
      <Button
        size="large"
        variant="secondary"
        fontSize={3}
        mb={4}
        onPress={meData?.me ? navigate : requireLogin}>
        CÀI NHẠC CHỜ
      </Button>
      {(props.tones ?? []).map((tone, idx) => (
        <Box key={tone.toneCode} my={1}>
          <RbtItem
            tone={tone}
            idx={idx}
            song={props.song}
            selected={tone.toneCode === selectedToneCode}
            setSelected={(selected: boolean) => {
              if (!selected && selectedToneCode === tone.toneCode) {
                setSelectedToneCode(null);
              } else if (selected) {
                setSelectedToneCode(tone.toneCode);
              }
            }}
          />
        </Box>
      ))}
    </Section2>
  );
};

const SmallAction = React.memo(
  (props: { icon: IconName; onPress?: () => void; active?: boolean; disabled?: boolean }) => {
    return (
      <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <Flex flexDirection="column" alignItems="center" py={2} px={5}>
          <Icon name={props.icon} size={20} color={props.active ? ICON_GRADIENT_1 : 'normalText'} />
        </Flex>
      </TouchableOpacity>
    );
  }
);

const RelatedSongSection = (props: { slug: string }) => {
  const { data, fetchMore, loading } = useSongQuery({
    variables: { slug: props.slug, first: 10 },
  });
  const player = usePlayer();
  const song = data?.song;
  const collection = useCollection(
    (song?.singers ?? []).map((s) => s.alias).join(' - '),
    song?.songsFromSameSingers
  );
  const fetchMoreSongs = useCallback(() => {
    fetchMore({
      variables: {
        after: song?.songsFromSameSingers.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }): SongQuery => {
        const newEdges = fetchMoreResult?.song?.songsFromSameSingers.edges;
        const pageInfo = fetchMoreResult?.song?.songsFromSameSingers.pageInfo;
        return newEdges?.length
          ? ({
              ...previousResult,
              song: {
                ...previousResult.song,
                songsFromSameSingers: {
                  ...previousResult.song?.songsFromSameSingers,
                  edges: [...(previousResult.song?.songsFromSameSingers.edges ?? []), ...newEdges],
                  pageInfo,
                },
              },
            } as SongQuery)
          : previousResult;
      },
    });
  }, [fetchMore, song]);
  return (
    <Section my={3}>
      {(song?.songsFromSameSingers.edges ?? []).map(
        ({ node }, idx) =>
          node.id !== song?.id && (
            <Box key={idx}>
              <Separator />
              <Box py={2}>
                <ChartSong
                  slug={node.slug}
                  image={node.imageUrl}
                  title={node.name}
                  artist={node.singers.map((s) => s.alias).join(' - ')}
                  download={node.downloadNumber}
                  onPlayClick={() => player.playCollection(collection, idx)}
                />
              </Box>
            </Box>
          )
      )}
      {song?.songsFromSameSingers?.pageInfo.hasNextPage && (
        <Button variant="underline" onPress={fetchMoreSongs} disabled={loading}>
          Xem thêm
        </Button>
      )}
    </Section>
  );
};
const SongComment = (props: { slugSong: string; songId: any }) => {
  const [cmtContent, setCmtContent] = useState('');
  const { data: meData } = useMeQuery();
  const { data, fetchMore, loading } = useSongCommentsQuery({
    variables: { slug: props.slugSong, first: 10 },
  });
  let comments = data?.song?.comments.edges;
  let comment = data?.song?.comments;
  const fetchMoreComment = useCallback(() => {
    fetchMore({
      variables: {
        after: comment?.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }): SongCommentsQuery => {
        const newEdges = fetchMoreResult?.song?.comments?.edges;
        const pageInfo = fetchMoreResult?.song?.comments?.pageInfo;
        return newEdges?.length
          ? ({
              ...previousResult,
              song: {
                ...previousResult.song,
                comments: {
                  ...previousResult.song?.comments,
                  edges: [...(previousResult.song?.comments.edges ?? []), ...newEdges],
                  pageInfo,
                },
              },
            } as SongCommentsQuery)
          : previousResult;
      },
    });
  }, [fetchMore, comment?.pageInfo.endCursor]);
  const [createComment] = useCreateCommentMutation({
    variables: { songId: props.songId, content: cmtContent },
    refetchQueries: [
      {
        query: SongCommentsDocument,
        variables: { slug: props.slugSong, first: 10 },
      },
    ],
  });
  const onSubmitComment = useCallback(() => {
    createComment().then(({ data }) => {
      if (data?.createComment.success) {
        setCmtContent('');
      } else {
        Alert.alert(data?.createComment.message ?? 'Unknown Error');
      }
    });
  }, [createComment]);
  return (
    <Section my={3}>
      <Box mb={2} position="relative" overflow="hidden" borderRadius={4} flexDirection="row">
        {!!meData?.me?.avatarUrl && (
          <Flex
            mr={1}
            width={32}
            height={32}
            overflow="hidden"
            flexDirection="column"
            borderRadius={50}>
            <Image
              source={{
                uri: meData?.me?.avatarUrl,
              }}
              style={{ width: '100%', height: 80 }}
            />
          </Flex>
        )}
        <Flex flex={1} mb={2} borderRadius={10} border="0.5px solid #848484">
          <Input
            style={{ height: 32, width: '100%', padding: 10 }}
            placeholder={meData?.me ? 'Thêm bình luận…' : 'Vui lòng đăng nhập để có thể bình luận'}
            editable={!!meData?.me}
            placeholderTextColor="lightText"
            color="normalText"
            onChangeText={setCmtContent}
            onSubmitEditing={onSubmitComment}
            value={cmtContent}
          />
        </Flex>
      </Box>
      {!!comments &&
        comments.map((comment, index) => (
          <CommentSong comment={comment.node} slugSong={props.slugSong} key={index} />
        ))}
      {comment?.pageInfo.hasNextPage && (
        <Button variant="underline" onPress={fetchMoreComment} disabled={loading}>
          Xem thêm
        </Button>
      )}
    </Section>
  );
};
export const SongScreenBase = ({ slug }: { slug: string }) => {
  const player = usePlayer();
  const { data, loading: dataLoading } = useSongQuery({ variables: { slug } });
  const song = data?.song;
  // const [likeSong] = useLikeSongMutation();
  const [showComment, setShowComment] = useState(false);
  const { data: likedSongData, loading: likedSongDataLoading } = useLikedSongQuery({
    variables: { first: 20 },
  });

  const [likeSong] = useLikeSongMutation();
  const handleLikeSongRes = useResponseHandler<LikeSongMutation>((res) => res.data?.likeSong);
  const toggleLike = useCallback(() => {
    if (song) {
      likeSong({ variables: { songId: song.id, like: !song.liked } }).then(handleLikeSongRes);
    }
  }, [handleLikeSongRes, likeSong, song]);
  const { data: meData, loading: meDataLoading } = useMeQuery();
  const playlistConnection = useMemo(() => {
    if (!song) return;
    return {
      edges: [
        { node: song },
        ...((meData?.me ? likedSongData?.likedSongs.edges : song?.songsFromSameSingers.edges) ??
          []),
      ],
    };
  }, [likedSongData, meData, song]);
  const playlist = useCollection(song?.name, playlistConnection);

  useEffect(() => {
    if (!song) return;
    if (player.currentPlayable?.sources?.[0] !== song?.fileUrl) {
      if (player && !dataLoading && !likedSongDataLoading && !meDataLoading) {
        // player.playCollection(playlist);
        player.playCollection(playlist, 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLoading, likedSongDataLoading, meDataLoading]);

  const showGift = useNavigationLink('rbt', { type: 'gift', songSlug: slug });
  const shareAction = useNavigationLink('popup', {
    title: 'Chia sẻ',
    type: 'share',
    songSlug: slug,
  });
  const { data: dataMe } = useMeQuery();
  const showPopup = useAlert({ type: 'requireLogin' });
  const requireLogin = () => {
    showPopup({ content: 'Vui lòng đăng nhập để sử dụng!' });
  };
  const shareSong = useShareSong(song?.slug, shareAction);
  return (
    <>
      <Title>{song?.name}</Title>
      <Box width="100%" alignItems="center" py={1}>
          <Box
            borderRadius={8}
            overflow="hidden"
            mb={3}
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.25)">
            <ImageBackground
              style={{ width: 240, height: 240 }}
              source={{
                uri: song?.imageUrl ?? 'https://source.unsplash.com/random/512x512',
              }}/>
          </Box>
        <Text mt={1} fontSize={3} fontWeight="bold">
          {song?.name}
        </Text>
        <Box>
          <Text color="primary">
            {_.flatMap(song?.singers ?? [], (a, idx) => [
              ...(idx === 0 ? [] : [' ']),
              <NavLink key={idx} route="/ca-sy/[slug]" params={{ slug: a.slug }}>
                <Text fontSize={2} color="primary"  mt={2}>
                  {a.alias}
                </Text>
              </NavLink>,
            ])}
          </Text>
        </Box>
        <Flex py={1} flexDirection="row" justifyContent="center" alignItems="center"  width="100%">
          <SmallAction
            icon={song?.liked ? 'heartlove' : 'heart'}
            active={!!song?.liked}
            onPress={meData?.me ? toggleLike : requireLogin}
          />
          <SmallAction icon="gift" onPress={dataMe?.me ? showGift : requireLogin} />
          <SmallAction icon="share" onPress={shareSong} />
        </Flex>
      </Box>
      <Separator />
      {song && (
        <>
          {song.tones.length > 0 && <SongRbtSection song={song} tones={song.tones} />}
          <TabBar indicator="short" fontSize={3}>
            <TabBar.Item
              title="Liên quan"
              isActive={!showComment}
              onPress={() => setShowComment(false)}
            />
            <TabBar.Item
              title={`Bình luận (${song?.comments.totalCount ?? ''})`}
              isActive={showComment}
              onPress={() => setShowComment(true)}
            />
          </TabBar>

          {showComment ? (
            <SongComment slugSong={slug} songId={song.id} />
          ) : (
            <RelatedSongSection slug={slug} />
          )}
        </>
      )}
    </>
  );
};

export default function SongScreen() {
  const route: { params?: { slug?: string } } = useRoute();
  const { data } = useSongQuery({
    variables: { slug: route.params?.slug ?? '' },
  });
  const scrollViewRef = useRef<ScrollView>(null);
  React.useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [route.params?.slug]);
  return (
    <Box bg="defaultBackground" height="100%">
      <Header leftButton="back" title={data?.song?.name} search>
        <ConditionalGoVipButton />
      </Header>
      <Box flex={1}>
        <ScrollView ref={scrollViewRef}>
          <SongScreenBase slug={route.params?.slug ?? ''} />
        </ScrollView>
      </Box>
    </Box>
  );
}
