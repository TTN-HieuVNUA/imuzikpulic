import { parseISO } from 'date-fns';
import React, { useState, useCallback } from 'react';
import { Alert, Image, TouchableOpacity } from 'react-native';

import { CommentItem } from '../components/CommentCard';
import {
  useMeQuery,
  useCreateReplyMutation,
  useLikeCommentMutation,
  CommentDocument,
  useDeleteCommentMutation,
  useDeleteReplyMutation,
  SongCommentsDocument,
} from '../queries';
import { Box, Flex, Text, Input } from '../rebass';

export interface PublicUser {
  id: string;
  fullName?: string | null;
  imageUrl?: string | null;
}

export interface Reply {
  id: string;
  content?: string;
  createdAt: string;
  updatedAt?: string;
  user?: PublicUser;
}

export interface Comment {
  id: string;
  content?: string | null;
  likes?: number | null;
  liked?: boolean | null;
  createdAt: string;
  replies?: Reply[] | null;
  user?: PublicUser | null;
}

const CommentInput = (props: { meData: any; commentId: string }) => {
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
        Alert.alert(data?.createReply.message ?? 'Unknown Error');
      }
    });
  }, [createReply]);
  return (
    <Box position="relative" overflow="hidden" borderRadius={4} flexDirection="row">
      {!!props.meData?.me?.avatarUrl && (
        <Flex
          mr={1}
          width={24}
          height={24}
          overflow="hidden"
          flexDirection="column"
          borderRadius={50}>
          <Image
            source={{
              uri: props.meData?.me?.avatarUrl,
            }}
            style={{ width: '100%', height: 80 }}
          />
        </Flex>
      )}
      <Flex flex={1} mb={2} borderRadius={10} border="0.5px solid #848484">
        <Input
          style={{ height: 32, width: '100%', padding: 10 }}
          placeholder={
            props.meData?.me ? 'Th??m b??nh lu???n???' : 'Vui l??ng ????ng nh???p ????? c?? th??? b??nh lu???n'
          }
          editable={!!props.meData?.me}
          placeholderTextColor="lightText"
          color="normalText"
          onChangeText={setReplyContent}
          onSubmitEditing={onSubmitReply}
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
    meData?.me?.id === comment.user?.id ? ['B??nh lu???n', 'Th??ch', 'Xo??'] : ['B??nh lu???n', 'Th??ch'];
  const replyActions = meData?.me?.id === comment.user?.id ? ['Xo??'] : [];
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
      onActionPress={(_idx: any, action: string) => {
        switch (action) {
          case 'B??nh lu???n': {
            setReply(true);
            break;
          }
          case 'Th??ch': {
            likeComment({ variables: { commentId: comment.id, like: !liked } });
            break;
          }
          case 'Xo??': {
            deleteComment({ variables: { commentId: comment.id } });
            break;
          }
          default:
        }
      }}>
      {replies && replies?.length > 1 && !repliesExpanded && (
        <Flex m={2}>
          <TouchableOpacity onPress={() => setrepliesExpanded(true)}>
            <Text color="normalText" fontWeight="bold" fontSize={0}>
              Xem th??m {replies.length - 1} b??nh lu???n
            </Text>
          </TouchableOpacity>
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
          onActionPress={(_idx: any, action: string) => {
            switch (action) {
              case 'Xo??': {
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
