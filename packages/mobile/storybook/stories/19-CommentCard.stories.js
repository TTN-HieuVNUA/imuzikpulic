import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import subMinutes from 'date-fns/subMinutes';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import { CommentItem } from '../../src/components';
import { Box, Flex, Text } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';

const fakeDate1 = subMinutes(new Date(), 30);
const fakeDate2 = subMinutes(new Date(), 30);
const fakeDate3 = subMinutes(new Date(), 3600);

const comment = {
  user: { name: 'Nguyễn Anh Huy', imageUrl: 'https://via.placeholder.com/200' },
  content: 'Rất hay',
  likes: 1,
  createdAt: fakeDate1,
  replies: [
    {
      user: { name: 'Test1', imageUrl: 'https://via.placeholder.com/200' },
      content: 'Hay quá. bài hat  này khá tốt và ca sĩ có chất giọng cực kì hay',
      createdAt: fakeDate2,
    },
    {
      user: { name: 'Test2', imageUrl: 'https://via.placeholder.com/200' },
      content: 'Hay thật sự !!',
      createdAt: fakeDate3,
    },
  ],
};
export const CommentCard = (props) => {
  const { comment, onLiked, onReply } = props;
  const [repliesExpanded, setrepliesExpanded] = useState(false);
  const actions = ['Bình luận', 'Thích'];
  let replies = comment?.replies;
  return (
    <CommentItem
      image={comment?.user?.imageUrl}
      likes={comment.likes}
      imageSize="big"
      user={comment.user}
      createdAt={comment.createdAt}
      content={comment?.content}
      actions={actions}
      onActionPress={(_idx, action) => {
        switch (action) {
          case 'Bình luận': {
            onReply();
            break;
          }
          case 'Thích': {
            onLiked();
            break;
          }
          case 'Xoá': {
            break;
          }
          default:
        }
      }}>
      {replies && replies?.length > 1 && !repliesExpanded && (
        <Flex my={2} ml={2}>
          <TouchableOpacity onPress={() => setrepliesExpanded(true)}>
            <Text color="normalText" fontWeight="bold" fontSize={0}>
              Xem thêm {replies.length - 1} bình luận
            </Text>
          </TouchableOpacity>
        </Flex>
      )}
      {(repliesExpanded ? replies ?? [] : replies?.slice(0, 1) ?? []).map((reply, indx) => (
        <CommentItem
          key={indx}
          image={comment?.user?.imageUrl}
          createdAt={reply.createdAt}
          imageSize="small"
          content={reply.content}
          user={reply.user}
        />
      ))}
    </CommentItem>
  );
};

const commentCards = (
  <Box bg="defaultBackground" py={3}>
    <Box bg="defaultBackground" p={2}>
      <CommentCard comment={comment} onLiked={action('like')} onReply={action('reply')} />
      <CommentCard comment={comment} onLiked={action('like')} onReply={action('reply')} />
    </Box>
  </Box>
);
storiesOf('CommentCard', module)
  .add('Dark', () => <ThemeProvider theme={darkTheme}>{commentCards}</ThemeProvider>)
  .add('Light', () => <ThemeProvider theme={lightTheme}>{commentCards}</ThemeProvider>);
