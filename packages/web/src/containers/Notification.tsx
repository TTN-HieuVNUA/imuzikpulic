import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import vi from 'date-fns/locale/vi';
import parseISO from 'date-fns/parseISO';
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Text } from 'rebass';
import { Spinner } from '../components/Spinner';
import { marketingLink } from '../helpers/marketing-links';
import { useFetchMoreEdges, useLocalStorage } from '../hooks';
import {
  useMarkSpamAsSeenMutation,
  useMeQuery,
  useRecordSpamClickMutation,
  useSpamsQuery,
} from '../queries';

const NotificationItem = (props: {
  seen?: boolean;
  name: string;
  content: string;
  date?: Date;
  image?: string | null;
}) => {
  return (
    <Flex flexDirection="row" alignItems="flex-start" py={3}>
      <Box width={10} mr={1}>
        {!props.seen && (
          <Box width={6} height={6} overflow="hidden" bg="secondary" style={{ borderRadius: 6 }} />
        )}
      </Box>
      {props.image && (
        <Box
          flexDirection="column"
          css={{
            backgroundImage: `url(${props.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: 44,
            height: 44,
          }}
        />
      )}
      <Box flexDirection="column" ml={2} flex={1}>
        <Text
          color="normalText"
          fontWeight="bold"
          fontSize={2}
          css={{
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            overflow: 'hidden',
          }}>
          {props.name}
        </Text>
        <Text
          color="lightText"
          fontSize={1}
          mb={1}
          css={{
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}>
          {props.content}
        </Text>
        <Text color="primary" fontSize={1}>
          {props.date && formatDistanceToNow(props.date, { addSuffix: true, locale: vi })}
        </Text>
      </Box>
    </Flex>
  );
};
export const NotificationBox = (props: { onClose: () => void }) => {
  const { data, loading, fetchMore } = useSpamsQuery({ variables: { first: 10 } });
  const [markSpamAsSeen] = useMarkSpamAsSeenMutation();
  const [recordSpamClick] = useRecordSpamClickMutation();
  const onFetchMore = useFetchMoreEdges(loading, 'spams', fetchMore, data?.spams);
  const { data: meData } = useMeQuery();
  const [markedSpam, setMarkedSpam] = useLocalStorage<string[]>('markedSpam', []);
  return (
    <Box
      p={3}
      bg="defaultBackground"
      css={{
        position: 'absolute',
        // top: '100%',
        top: '48px',
        backgroundColor: '#262523',
        borderRadius: '5px',
        right: 0,
        width: 500,
        maxWidth: '100vw',
        overflowY: 'auto',
        maxHeight: '90vh',
      }}>
      {(data?.spams.edges ?? []).map(({ node }) => (
        <Box key={node.id}>
          <Link
            {...marketingLink(node.itemType, (node.item?.__typename === 'Song'
            ? node.item?.slug
            : node.item?.__typename === 'RingBackTone'
            ? node.item?.song?.slug
            : node.item?.__typename === 'Topic'
            ? node.item?.slug
            : node.item?.__typename === 'Singer'
            ? node.item?.slug
            : null))}
            onClick={() => {
              if (meData?.me) {
                if (!node.seen) {
                  markSpamAsSeen({ variables: { spamId: node.id, seen: true } });
                }
                recordSpamClick({ variables: { spamId: node.id } });
              } else {
                if (markedSpam.indexOf(node.id) === -1) {
                  setMarkedSpam([node.id, ...markedSpam]);
                }
              }
              props.onClose();
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
                seen={meData?.me ? !!node.seen : markedSpam.indexOf(node.id) !== -1}
              />
            )}
          </Link>
        </Box>
      ))}
      <Spinner loading={loading} />
      {data?.spams.totalCount > data?.spams.edges.length && (
        <Button variant="muted" onClick={onFetchMore} disabled={loading}>
          Xem THÊM
        </Button>
      )}
    </Box>
  );
};
