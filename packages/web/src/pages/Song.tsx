import { Input } from '@rebass/forms';
import { useTheme } from 'emotion-theming';
import _ from 'lodash';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Card, Flex, Image, Text } from 'rebass';
import { H2, Separator,TitlePage } from '../components';
import Icon from '../components/Icon';
import { formatSongDuration, usePlayer } from '../components/Player';
import { Section} from '../components/Section';
import { Song, SongBig } from '../components/Song';
import { CommentSong } from '../containers/Comment';
import Download from '../containers/Download';
import Footer from '../containers/Footer';
import Gift from '../containers/Gift';
import Header from '../containers/Header';
import Share from '../containers/Share';
import { format } from 'date-fns';
import { useCollection, useGiftHandler, useResponseHandler, useTonePlayer } from '../hooks';
import {
  LikeSongMutation,
  SongCommentsDocument,
  SongCommentsQuery,
  SongQuery,
  useCreateCommentMutation,
  useLikedSongQuery,
  useLikeSongMutation,
  useMeQuery,
  useSongCommentsQuery,
  useSongQuery,
} from '../queries';
import { Theme } from '../themes';

const RbtHeader = () => (
  <Flex height={70} flexDirection="row" alignItems="center">
    <Text color="normalText" textAlign="center" width={60}></Text>
    <Text color="normalText" textAlign="center" width={60} fontWeight="bold" fontSize={2}>
      STT
    </Text>
    <Text color="normalText" textAlign="center" width={150} fontWeight="bold" fontSize={3}>
      Mã nhạc chờ
    </Text>
    <Text color="normalText" textAlign="center" width={200} fontWeight="bold" fontSize={3}>
      Lượt tải
    </Text>
    <Text color="normalText" textAlign="center" width={250} fontWeight="bold" fontSize={3}>
      Ngày xuất bản
    </Text>
    <Text color="normalText" textAlign="center" flex={1} fontWeight="bold" fontSize={3}>
      Nhà cung cấp
    </Text>
    <Text color="normalText" textAlign="center" width={140} fontWeight="bold" fontSize={3}>
      Thời gian
    </Text>
  </Flex>
);
const RbtItem = (props: {
  eq?: boolean;
  idx: number;
  toneCode?: string | null;
  cpImage?: string | null;
  cpCode?: string | null;
  cp?: string | null;
  downloadNumber?: number;
  publishDate?: Date | null;
  duration?: number | null;
  selected?: boolean;
  fileUrl?: string | null;
  setSelected: (selected: boolean) => void;
}) => {
  const theme = useTheme<Theme>();
  const { audio, isPlaying, remain, duration, onPlayClick } = useTonePlayer(
    props.fileUrl ?? '',
    !!props.selected,
    useCallback(() => {
      props.setSelected(true);
    }, [props])
  );

  return (
    <Flex
      height={70}
      flexDirection="row"
      alignItems="center"
      bg={props.selected ? 'alternativeBackground' : 'defaultBackground'}
      css={{
        '&:hover': {
          backgroundColor: theme.colors.alternativeBackground,
        },
      }}
      onClick={onPlayClick}>
      <Text color="normalText" textAlign="center" width={60}></Text>
      <Text color="normalText" textAlign="center" width={60} fontWeight="bold" fontSize={2}>
        {props.idx}
      </Text>
      <Text
        color="normalText"
        textAlign="center"
        width={150}
        fontWeight="bold"
        fontSize={3}
       >
        {props.toneCode}
      </Text>
      <Text textAlign="center" width={200} fontSize={2} color="lightText">
        {props.downloadNumber}
      </Text>
      <Text textAlign="center" width={250} fontSize={2} color="lightText" mr={90}>
        {props.publishDate ? format(new Date(props.publishDate), 'dd/MM/yyyy') : ''}
      </Text>
      <Text color="normalText" textAlign="center" flex={1} fontWeight="bold" fontSize={2}>
        <Flex alignItems="center">
          <Link to={`/nha-cung-cap/${props.cpCode}`} onClick={(e) => e.stopPropagation()}>
            <Flex
              alignItems="center"
              css={{
                '&:hover': {
                  color: theme.colors.primary,
                },
              }}>
              {props.cpImage && (
                <Image
                  css={{ borderRadius: 15, overflow: 'hidden' }}
                  src={props.cpImage}
                  width={30}
                  height={30}
                  mr={2}
                />
              )}
              {props.cp}
            </Flex>
          </Link>
        </Flex>
      </Text>
      <Text textAlign="center" width={140} fontSize={2} color="lightText">
        {formatSongDuration(isPlaying ? remain : (duration || props.duration) ?? 0)}
      </Text>
      {audio}
    </Flex>
  );
};

const SongComment = (props: { slugSong: string; songId: string }) => {
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
  }, [fetchMore, comment]);
  const [createComment] = useCreateCommentMutation({
    variables: { songId: props.songId, content: cmtContent },
    refetchQueries: [
      { query: SongCommentsDocument, variables: { slug: props.slugSong, first: 10 } },
    ],
  });
  const onSubmitComment = useCallback(() => {
    createComment().then(({ data }) => {
      if (data?.createComment.success) {
        setCmtContent('');
      } else {
        alert(data?.createComment.message);
      }
    });
  }, [createComment]);
  return (
    <Section my={3}>
      <Box
        mb={4}
        overflow="hidden"
        css={{ position: 'relative', display: 'flex', borderRadius: 4, flexDirection: 'row' }}>
        {!!meData?.me?.avatarUrl && (
          <Flex
            mr={1}
            width={40}
            height={40}
            overflow="hidden"
            flexDirection="column"
            css={{ borderRadius: 50 }}>
            <Image src={meData?.me?.avatarUrl} style={{ width: '100%', height: 80 }} />
          </Flex>
        )}
        <Flex flex={1} alignItems="center">
          <Input
            style={{
              height: 17,
              width: '100%',
              padding: '10px',
              border: 'none',
              fontSize: 14,
              fontStyle: 'italic',
            }}
            placeholder={meData?.me ? 'Viết bình luận…' : 'Vui lòng đăng nhập để có thể bình luận'}
            disabled={!meData?.me}
            color="normalText"
            onChange={(e) => setCmtContent(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSubmitComment();
              }
            }}
            defaultValue={cmtContent}
            value={cmtContent}
          />
        </Flex>
      </Box>
      {!!comments &&
        comments.map(
          (comment, index) =>
            comment.node && (
              <CommentSong comment={comment.node} slugSong={props.slugSong} key={index} />
            )
        )}
      {comment?.pageInfo.hasNextPage && (
        <Flex justifyContent="center">
          <Button onClick={fetchMoreComment} disabled={loading} variant="muted">
            Xem thêm
          </Button>
        </Flex>
      )}
    </Section>
  );
};

export default function SongPage() {
  const theme = useTheme<Theme>();
  const { slug = '' } = useParams<{ slug?: string }>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDownload, setOpenDownload] = useState(false);
  const { giftClick,showModalGift,setShowModalGift } = useGiftHandler();
  //const [modalGift, setOpenGift] = useState(false);
  const { data, fetchMore,loading } = useSongQuery({ variables: { slug, first: 8 } });
  const [selectedToneCode, setSelectedToneCode] = useState<string | null>(null);
  const song = data?.song;
  const tone = _.maxBy(song?.tones ?? [], (t) => t.orderTimes);
  const [likeSong] = useLikeSongMutation();
  const handleLikeSongResult = useResponseHandler<LikeSongMutation>((res) => res.data?.likeSong);
  const player = usePlayer();
  const commentsRef = useRef<HTMLDivElement>(null);
  const onCommentClick = useCallback(() => {
    commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  const singerCollection = useCollection(
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
  const { data: likedSongData } = useLikedSongQuery({
    variables: { first: 20 },
  });
  const { data: meData } = useMeQuery();
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
      <TitlePage title={song?.name}></TitlePage>
      <Header.Fixed placeholder />
      <Section py={5}>
        <Text color="primary" css={{ fontStyle: 'italic', textAlign: 'center' }}>
          Cài đặt nhạc chờ Imuzik chỉ 10.000/tháng, cước tải bài hát 3.000/bài (gia hạn hàng tháng)
        </Text>
      </Section>
      {song && (
        <Section>
          <SongBig
            image={song.imageUrl}
            title={song.name ?? ''}
            artist={song.singers}
            genres={song.genres}
            liked={!!song.liked}
            download={song.downloadNumber}
            onPlayClick={() => player?.playCollection(playlist)}
            onLikeClick={() =>
              likeSong({ variables: { songId: song.id, like: !song.liked } }).then(
                handleLikeSongResult
              )
            }
            onCommentClick={onCommentClick}
            onShareClick={() => setIsOpen(true)}
            onAddToPlaylistClick={() =>
              player.addPlayable({
                id: song.id,
                title: song.name,
                artist: song.singers.map((s) => s.alias).join(' - '),
                image: song.imageUrl,
                sources: [song.fileUrl],
              })
            }
            onPlayNextClick={() =>
              player.addPlayableNext({
                id: song.id,
                title: song.name,
                artist: song.singers.map((s) => s.alias).join(' - '),
                image: song.imageUrl,
                sources: [song.fileUrl],
              })
            }
          />
        </Section>
      )}
      <Section my={5}>
        <Flex mx={-3}>
          <Flex width={1 / 2}>
            <Flex
              css={{
                'svg path': {
                  fill: '#262523',
                },
                borderRadius: 8,
                background: 'linear-gradient(270deg, #11998E 0%, #38EF7D 100%)',
              }}
              alignItems="center"
              justifyContent="center"
              width="100%"
              mx={3}>
              <Flex mx={3}>
                <Icon size={20} name="money" />
                <Text ml={1} color="#262523" fontWeight="bold">
                  Giá cước: 3.000đ/bài
                </Text>
              </Flex>
              <Flex mx={3}>
                <Icon size={20} name="calendar" />
                <Text ml={1} color="#262523" fontWeight="bold">
                  Thời hạn sử dụng: 30 ngày
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex width={1 / 2}>
            <Box width={1 / 2} px={3}>
              <Button
                onClick={() => setOpenDownload(true)}
                variant="outline"
                width="100%"
                fontWeight="bold">
                CÀI ĐẶT NHẠC CHỜ
              </Button>
            </Box>
            <Box width={1 / 2} px={3}>
              <Button
                onClick={() => giftClick()}
                variant="outline"
                width="100%"
                fontWeight="bold">
                TẶNG NHẠC CHỜ
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Section>
      <Section mb={45}>
        <RbtHeader />
        <Separator />
        {(data?.song?.tones ?? []).map((tone, idx) => (
          <Box key={tone.toneCode}>
            <RbtItem
              selected={selectedToneCode === tone.toneCode}
              setSelected={(selected: boolean) => {
                if (!selected && selectedToneCode === tone.toneCode) {
                  setSelectedToneCode(null);
                } else if (selected) {
                  setSelectedToneCode(tone.toneCode);
                }
              }}
              idx={idx + 1}
              toneCode={tone.toneCode}
              cp={tone.contentProvider?.name}
              cpImage={tone.contentProvider?.imageUrl}
              cpCode={tone.contentProvider?.group}
              duration={tone.duration}
              downloadNumber={tone.orderTimes}
              publishDate={tone.createdAt}
              fileUrl={tone.fileUrl}
            />
            <Separator />
          </Box>
        ))}
      </Section>

      <Section mb={72}>
        <Card
          px={135}
          py={4}
          css={{
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 16,
            borderColor: theme.colors.normalText,
          }}>
          <Text color="normalText" fontSize={3} textAlign="center" mb={4}>
            Giá đã bao gồm giá trị bản quyền bài hát; phí dịch vụ đăng ký sử dụng nhạc chuông chờ,
            các chi phí và thuế VAT
          </Text>
          <Text color="normalText" fontSize={3} textAlign="center">
            Sản phẩm được hỗ trợ tự động gia hạn sau khi hết thời hạn sử dụng. Giá trị gia hạn bằng
            giá trị gốc là
            <br /> 3.000đ/bài/30 ngày sử dụng/lần gia hạn.
          </Text>
        </Card>
      </Section>

      {(data?.song?.songsFromSameSingers?.totalCount ?? 0) > 0 && (
        <Section>
          <H2>Liên quan</H2>
          <Flex flexWrap="wrap" mx={-3}>
            {(data?.song?.songsFromSameSingers.edges ?? []).map(
              ({ node }, idx) =>
                node.id !== song?.id && (
                  <Box width={1 / 4} px={3} pt={0} pb={4} key={idx}>
                    <Song
                      slug={node.slug}
                      image={node.imageUrl}
                      title={node.name}
                      artist={node.singers}
                      download={node.downloadNumber}
                      onPlayClick={() => player?.playCollection(singerCollection, idx)}
                    />
                  </Box>
                )
            )}
          </Flex>
          {data?.song?.songsFromSameSingers?.pageInfo.hasNextPage && (
            <Flex justifyContent="center">
              <Button variant="muted" onClick={fetchMoreSongs}>
                Xem tHÊM
              </Button>
            </Flex>
          )}
        </Section>
      )}
      <div ref={commentsRef}>
        <Section py={4}>
          <H2 id="binh-luan">Bình luận</H2>
          {data?.song && <SongComment slugSong={slug} songId={data.song.id} />}
        </Section>
      </div>
      <Share isOpen={modalIsOpen} onClose={() => setIsOpen(false)} slug={slug} />
      <Download
        isOpen={modalDownload}
        onClose={() => setOpenDownload(false)}
        name={song?.name}
        toneCode={selectedToneCode ?? tone?.toneCode}
        singer={song?.singers.map((s) => s.alias).join(' - ') || tone?.singerName}
      />
      <Gift
        isOpen={showModalGift}
        onClose={() => setShowModalGift(false)}
        name={song?.name}
        toneCode={selectedToneCode ?? tone?.toneCode}
      />
      <Footer />
    </Box>
  );
}
