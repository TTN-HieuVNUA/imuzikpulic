import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import React from 'react';
import { Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Header, HeaderClose, Separator } from '../components';
import { LoadingFooter } from '../containers';
import { marketingLink } from '../helpers/marketing-link';
import { useFetchMoreEdges, useLocalStorage } from '../hooks';
import { ModalBox } from '../platform/ModalBox';
import { NavLink } from '../platform/links';
import {
  useMarkSpamAsSeenMutation,
  useMeQuery,
  useRecordSpamClickMutation,
  useSpamsQuery,
} from '../queries';
import { Box, Text } from '../rebass';

const NotificationItem = (props: {
  seen?: boolean;
  name: string;
  content: string;
  date?: Date;
  image?: string | null;
}) => {
  return (
    <Box flexDirection="row" alignItems="center" py={3}>
      <Box width={10} mr={1}>
        {!props.seen && (
          <Box width={6} height={6} overflow="hidden" bg="secondary" style={{ borderRadius: 6 }} />
        )}
      </Box>
      {props.image && (
        <Image source={{ uri: props.image }} style={{ width: 44, height: 44 }} resizeMode="cover" />
      )}
      <Box flexDirection="column" ml={2} flex={1}>
        <Text color="normalText" fontWeight="bold" fontSize={2} numberOfLines={1}>
          {props.name}
        </Text>
        <Text color="lightText" fontSize={1} numberOfLines={3} mb={1}>
          {props.content}
        </Text>
        <Text color="primary" fontSize={1}>
          {props.date && formatDistanceToNow(props.date, { addSuffix: true, locale: vi })}
        </Text>
      </Box>
    </Box>
  );
};

export const NotificationScreen = () => {
  const { data, loading, fetchMore, refetch } = useSpamsQuery({ variables: { first: 10 } });
  const [markSpamAsSeen] = useMarkSpamAsSeenMutation();
  const [recordSpamClick] = useRecordSpamClickMutation();
  const onFetchMore = useFetchMoreEdges(loading, 'spams', fetchMore, data?.spams);
  const { data: meData } = useMeQuery();
  const [markedSpam, setMarkedSpam] = useLocalStorage<string>('markedSpam', '');
  return (
    <ModalBox px={3}>
      <Header title="Thông báo">
        <HeaderClose />
      </Header>
      {meData?.me ? (
        <FlatList
          data={data?.spams.edges ?? []}
          ListFooterComponent={
            <LoadingFooter hasMore={data?.spams?.pageInfo.hasNextPage || loading} />
          }
          initialNumToRender={10}
          onEndReachedThreshold={0.2}
          refreshing={loading}
          onRefresh={refetch}
          onEndReached={onFetchMore}
          keyExtractor={({ node: { id } }) => id}
          renderItem={({ item: { node } }) => (
            <Box key={node.id}>
              <NavLink
                {...marketingLink(
                  node.itemType,
                  node.item?.__typename === 'Song'
                    ? node.item?.slug
                    : node.item?.__typename === 'RingBackTone'
                    ? node.item?.song?.slug
                    : node.item?.__typename === 'Topic'
                    ? node.item?.slug
                    : node.item?.__typename === 'Singer'
                    ? node.item?.slug
                    : null
                )}
                onPress={() => {
                  if (meData?.me) {
                    if (!node.seen) {
                      markSpamAsSeen({ variables: { spamId: node.id, seen: true } });
                    }
                    recordSpamClick({ variables: { spamId: node.id } });
                  } else {
                    if (markedSpam?.indexOf(node?.id) === -1) {
                      setMarkedSpam(node.id);
                    }
                  }
                }}>
                {node.item && (
                  <NotificationItem
                    date={node.sendTime && parseISO(node.sendTime)}
                    image={
                      node.item?.__typename === 'Song'
                        ? node.item?.imageUrl
                        : node.item?.__typename === 'RingBackTone'
                        ? node.item?.song?.imageUrl
                        : node.item?.__typename === 'Topic'
                        ? node.item?.imageUrl
                        : node.item?.__typename === 'Singer'
                        ? node.item?.imageUrl
                        : null
                    }
                    name={node.name}
                    content={node.content}
                    seen={meData?.me ? !!node.seen : markedSpam?.indexOf(node?.id) !== -1}
                  />
                )}
              </NavLink>
              <Separator />
            </Box>
          )}
        />
      ) : (
        <Text>Thông báo chỉ hiển thị khi đăng nhập</Text>
      )}
    </ModalBox>
  );
};
