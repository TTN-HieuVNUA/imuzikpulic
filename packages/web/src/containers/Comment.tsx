import { parseISO } from 'date-fns';
import React, { useState, useCallback } from 'react';

import { CommentItem } from '../components/CommentItem';
import {
  useMeQuery,
  useCreateReplyMutation,
  useLikeCommentMutation,
  CommentDocument,
  useDeleteCommentMutation,
  useDeleteReplyMutation,
  SongCommentsDocument,
  MeQuery,
  Comment,
} from '../queries';
import { Box, Flex, Text, Image } from 'rebass';
import { Input } from '@rebass/forms';

export interface PublicUser {
  id: string;
  fullName?: string | null | undefined;
  imageUrl?: string;
}

export interface Reply {
  id: string;
  content?: string;
  createdAt: string;
  updatedAt?: string;
  user?: PublicUser;
}

const CommentInput = (props: { meData: MeQuery | undefined; commentId: string }) => {
  const [replyContent, setReplyContent] = useState('');
  const [createReply] = useCreateReplyMutation({
    variables: { commentId: props.commentId, content: replyContent },
    refetchQueries: [{ query: CommentDocument, variables: { id: props.commentId } }],
  });
  const onSubmitReply = useCallback(() => {
    createReply().then(({ data }) => {
      if (data?.createReply.success) {
        setReplyContent('');
      } else {
        alert(data?.createReply.message);
      }
    });
  }, [createReply]);
  return (
    <Box
      overflow="hidden"
      mt={2}
      ml={2}
      css={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 4,
        flexDirection: 'row',
      }}>
      {!!props.meData?.me?.avatarUrl && (
        <Flex
          mr={1}
          width={32}
          height={32}
          overflow="hidden"
          flexDirection="column"
          css={{ borderRadius: 50 }}>
          <Image
            src={props.meData?.me?.avatarUrl}
            style={{ width: '100%', height: 80, borderRadius: 50 }}
          />
        </Flex>
      )}
      <Flex flex={1} css={{ borderRadius: 10 }}>
        <Input
          style={{
            height: 17,
            width: '100%',
            padding: '10px',
            border: 'none',
            fontSize: 14,
            fontStyle: 'italic',
          }}
          placeholder={
            props.meData?.me ? 'Thêm bình luận…' : 'Vui lòng đăng nhập để có thể bình luận'
          }
          color="normalText"
          onChange={(e) => setReplyContent(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onSubmitReply();
            }
          }}
          defaultValue={replyContent}
          value={replyContent}
        />
      </Flex>
    </Box>
  );
};
export const CommentSong = ({ comment, slugSong }: { comment: Comment; slugSong: string }) => {
  const [reply, setReply] = useState(false);
  const [repliesExpanded, setrepliesExpanded] = useState(false);
  const { data: meData } = useMeQuery();
  const liked = comment.liked;
  const actions =
    meData?.me?.id === comment.user?.id ? ['Bình luận', 'Thích', 'Xoá'] : ['Bình luận', 'Thích'];
  const replyActions = meData?.me?.id === comment.user?.id ? ['Xoá'] : [];
  const [likeComment] = useLikeCommentMutation({
    refetchQueries: [{ query: CommentDocument, variables: { id: comment.id } }],
  });
  const [deleteComment] = useDeleteCommentMutation({
    refetchQueries: [{ query: SongCommentsDocument, variables: { slug: slugSong, first: 10 } }],
  });
  const [deleteReply] = useDeleteReplyMutation({
    refetchQueries: [{ query: CommentDocument, variables: { id: comment.id } }],
  });

  const replies = comment?.replies;
  return (
    <CommentItem
      image={comment?.user?.imageUrl}
      likes={comment.likes}
      imageSize="big"
      user={comment.user}
      createdAt={parseISO(comment.createdAt)}
      content={comment?.content}
      actions={actions}
      onActionPress={(_idx: number, action: string) => {
        switch (action) {
          case 'Bình luận': {
            setReply(true);
            break;
          }
          case 'Thích': {
            likeComment({ variables: { commentId: comment.id, like: !liked } });
            break;
          }
          case 'Xoá': {
            deleteComment({ variables: { commentId: comment.id } });
            break;
          }
          default:
        }
      }}>
      {replies && replies?.length > 1 && !repliesExpanded && (
        <Flex my={2}>
          <Flex onClick={() => setrepliesExpanded(true)} css={{ cursor: 'pointer' }}>
            <Text color="normalText" fontWeight="bold" fontSize={0}>
              Xem thêm {replies.length - 1} bình luận
            </Text>
          </Flex>
        </Flex>
      )}
      {(repliesExpanded ? replies ?? [] : replies?.slice(-1) ?? []).map((reply: Reply, indx) => (
        <CommentItem
          key={indx}
          image={comment?.user?.imageUrl}
          createdAt={parseISO(reply.createdAt)}
          imageSize="small"
          content={reply.content}
          user={reply.user}
          actions={replyActions}
          onActionPress={(_idx: number, action: string) => {
            switch (action) {
              case 'Xoá': {
                deleteReply({ variables: { commentId: comment.id, replyId: reply.id } });
                break;
              }
              default:
            }
          }}
        />
      ))}
      {reply && <CommentInput meData={meData} commentId={comment.id} />}
    </CommentItem>
  );
};
