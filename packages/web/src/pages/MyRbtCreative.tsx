import React, { useCallback, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Box, Button, Flex, Text, Image } from 'rebass';
import { Separator } from '../components';
import Icon, { ICON_GRADIENT_1 } from '../components/Icon';
import { formatSongDuration } from '../components/Player';
import { useFetchMoreEdges, useGiftHandler, useTonePlayer } from '../hooks';
import {
  RingBackToneCreation, Singer,
  useGetMyToneCreationsQuery, useMyRbtQuery, useRbtPackagesQuery,
} from '../queries';
import * as _ from 'lodash';
import { format } from 'date-fns';

import { PersonalSplitView } from './PersonalInfo';
import Gift from '../containers/Gift';
import Download from '../containers/Download';
import { Item, RbtProps } from '../components/Rbt';

enum ToneStatue {
  PENDING = 1,
  APPROVED,
  REJECTED
}
export interface RbtCreativeProps extends RbtProps {
  status?: string;
  available_datetime?: string;
  genre?: string;
  download?: number | null;
  created_at?: string
}


export const Rbt = (props: RbtCreativeProps) => {
  return (
    <Flex flexDirection="column">
      <Flex>
        <Flex alignItems="center" flexDirection="row" mb={3} width={0.5}>
          <Flex bg="#C4C4C4" overflow="hidden" css={{ borderRadius: 8 }}>
            <Image src={props.song.image} css={{ width: 64, height: 64 }} />
          </Flex>
          <Flex
            flexDirection="column"
            mx={3}
            width="100%"
            flex={1}
            justifyContent="space-between"
            height={64}>
            <Text color="primary" fontSize={3} fontWeight="bold" style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
              {props.song.title}
            </Text>
            <Text color="lightText" fontSize={2} mb={2.5} style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
              Ca sỹ: {props.song.artist}
            </Text>
            <Text color="lightText" fontSize={2} mb={2.5} style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
              Tác giả: {props.song.composer}
            </Text>
          </Flex>
        </Flex>
        <Flex width={0.5} justifyContent="space-between">
          <Item.Vertical>
            <Item.Title>Mã nhạc chờ</Item.Title>
            <Item.Value>{props.code}</Item.Value>
          </Item.Vertical>
          <Item.Vertical>
            <Item.Title></Item.Title>
            <Item.Value color="primary" note="*Đã bao gồm VAT">
              {/*TODO: Check giá theo gói cước đang dùng*/}
              {props.price} đ/bài
            </Item.Value>
          </Item.Vertical>
        </Flex>
      </Flex>
      <Separator />
      <Flex flexWrap="wrap">
        <Box width={0.5}>
          <Item>
            <Item.Title>Nhà cung cấp</Item.Title>
            <Item.Value>{props.cp}</Item.Value>
          </Item>
        </Box>
        <Box width={0.5}>
          <Item>
            <Item.Title>Trạng thái</Item.Title>
            <Item.Value>{props.status}</Item.Value>
          </Item>
        </Box>
        <Box width={0.5}>
          <Item>
            <Item.Title>Thể loại</Item.Title>
            <Item.Value>{props.genre}</Item.Value>
          </Item>
        </Box>
        <Box width={0.5}>
          <Item>
            <Item.Title>Ngày tạo</Item.Title>
            <Item.Value>
              {format(new Date(props.created_at), "dd/MM/yyyy")}
            </Item.Value>
          </Item>
        </Box>
        <Box width={0.5}>
          <Item>
            <Item.Title>Số lượt tải</Item.Title>
            <Item.Value>{props.download ? props.download : 0} lượt</Item.Value>
          </Item>
        </Box>
        <Box width={0.5}>
          <Item>
            <Item.Title>Ngày hết hạn</Item.Title>
            <Item.Value>
              {format(new Date(props.available_datetime), 'dd/MM/yyyy')}
            </Item.Value>
          </Item>
        </Box>
      </Flex>
    </Flex>
  );
};


const CollectionItemComponent = (props: {
  selected: boolean;
  playedCallback?: () => void;
  rbtCreation: RingBackToneCreation,
  userPackage?: { brandId: string, name: string, price: string }
}) => {
  const { addToast } = useToasts();
  const { rbtCreation, selected } = props;
  const [modalDownload, setOpenDownload] = useState(false);
  const { giftClick, showModalGift, setShowModalGift } = useGiftHandler();

  const [showInfo, setShowInfo] = useState(false);
  const [optionsLoadMore, setOptionsLoadMore] = useState(false);

  let price = rbtCreation.tone_price;
  let { userPackage } = props;
  if (userPackage.brandId === '472' || userPackage.brandId === '75' || userPackage.brandId === '86') {
    price = 0
  }

  const isDownloadOrGift = rbtCreation.tone_status === ToneStatue.APPROVED && rbtCreation?.tone;

  const warningDownloadOrGift = () => {
    addToast('Nhạc chờ phải ở trạng thái Đã phê duyệt', {
      appearance: 'warning',
      autoDismiss: true
    })
  }

  const onOptionsLoadMoreClick = () => {
    if (optionsLoadMore) {
      setShowInfo(false);
    }
    setOptionsLoadMore(!optionsLoadMore);
  };
  const { audio, isPlaying, remain, duration, onPlayClick } = useTonePlayer(
    rbtCreation?.tone?.fileUrl ?? "",
    selected,
    props.playedCallback,
  );
  const status = rbtCreation.tone_status === ToneStatue.APPROVED && rbtCreation?.tone ?
    'Đã phê duyệt' : rbtCreation.tone_status === ToneStatue.PENDING || (rbtCreation.tone_status === ToneStatue.APPROVED && !rbtCreation?.tone) ?
      'Chờ phê duyệt' : 'Từ chối'
  return (
    <Box>
      <Flex flexDirection='row' alignItems='center' my={2}>
        <Flex flexDirection='column' flex={4 / 10} ml={2}>
          <Text fontSize={2} fontWeight='bold' mb={1} color='normalText'
            style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {rbtCreation?.song?.name ?? rbtCreation?.tone_name}
          </Text>
          <Text fontSize={2} color='lightText'
            style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {rbtCreation.singer_name ? rbtCreation.singer_name :
              _.flatMap(rbtCreation?.song?.singers ?? [], (a, idx) => [
                ...(idx === 0 ? [] : [' - ']),
                <span key={idx}>{a.alias}</span>,
              ])
            }
          </Text>
        </Flex>
        {!optionsLoadMore ?
          <Flex flex={6 / 10} flexDirection='row' alignItems='center'>
            <Flex flex={1 / 10} justifyContent='center'>
              {rbtCreation?.tone ?
                <Box onClick={onPlayClick}>
                  <Icon name={isPlaying ? 'player-pause' : 'player-play'} size={20} />
                </Box>
                :
                ''
              }
            </Flex>

            <Flex flex={2 / 10} justifyContent='center'>
              <Text color='lightText' fontSize={2}>
                {rbtCreation.duration
                  ? formatSongDuration(isPlaying ? remain : (rbtCreation.duration) ?? 0)
                  : ''}
              </Text>
            </Flex>

            <Flex flex={5 / 10} justifyContent='center'>
              <Text fontSize={2} fontWeight='bold' mb={1} px={3} color='normalText'>
                {status}
              </Text>
            </Flex>
            <Flex flex={3 / 10} justifyContent='center'>
              <Text fontSize={2} fontWeight='bold' mb={1} px={3} color='normalText'>
              </Text>
            </Flex>
            <Flex flex={1 / 10} justifyContent='center'
              css={{
                '&:hover': {},
                cursor: 'pointer',
              }}
            >
              <Box onClick={onOptionsLoadMoreClick}>
                <Icon name='options-load-more' size={20} />
              </Box>
            </Flex>
          </Flex>
          :
          <Flex flex={6 / 10} flexDirection='row' alignItems='center'>

            <Flex
              flex={3 / 10}
              css={{ cursor: 'pointer' }}
              alignItems='center'
              onClick={() => setShowInfo(!showInfo)} justifyContent='center'>
              <Icon name='info' color={ICON_GRADIENT_1} size={16} />
              <Text ml={2} fontWeight='bold' fontSize={2} color='normalText'>
                Thông tin
              </Text>
            </Flex>
            <Flex
              onClick={() => isDownloadOrGift ? setOpenDownload(true) : warningDownloadOrGift()}
              flex={3 / 10}
              css={{ cursor: 'pointer' }} alignItems='center' justifyContent='center'>
              <Icon name='gift' color={ICON_GRADIENT_1} size={16} />
              <Text ml={2} fontWeight='bold' fontSize={2} color='normalText'>
                Tải
              </Text>
            </Flex>
            <Flex
              onClick={isDownloadOrGift ? giftClick : warningDownloadOrGift}
              flex={3 / 10}
              css={{ cursor: 'pointer' }} alignItems='center' justifyContent='center'>
              <Icon name='gift' color={ICON_GRADIENT_1} size={16} />
              <Text ml={2} fontWeight='bold' fontSize={2} color='normalText'>
                Tặng quà
              </Text>
            </Flex>
            <Flex flex={1 / 10} justifyContent='center'
              css={{
                '&:hover': {},
                cursor: 'pointer',
              }}
            >
              <Box onClick={onOptionsLoadMoreClick}>
                <Icon name='options-load-more-active' size={20} />
              </Box>
            </Flex>
          </Flex>
        }

      </Flex>
      {showInfo && (
        <Flex bg='defaultBackground' px={5} py={4} mb={3}>
          <Rbt
            song={{
              image: '/imgs/rbt.png',
              title: (rbtCreation?.song?.name ?? rbtCreation?.tone_name) ?? '',
              artist: rbtCreation.singer_name ? rbtCreation.singer_name :
                rbtCreation?.song?.singers?.map((value: Singer, index: number) => {
                  return value.name
                }).join('-')
              ,
              composer: (rbtCreation.composer ? rbtCreation.composer : 'unknown')
            }}
            code={rbtCreation?.tone?.toneCode ?? rbtCreation.tone_code}
            cp={rbtCreation?.contentProvider?.name ?? ''}
            genre={(rbtCreation?.song?.genres?.map((value => value.name)).join('-'))}
            price={price}
            download={rbtCreation?.tone?.orderTimes}
            status={status}
            available_datetime={rbtCreation.available_datetime}
            created_at={rbtCreation.created_at}
          />
        </Flex>
      )}
      <Download
        isOpen={modalDownload}
        onClose={() => setOpenDownload(false)}
        name={rbtCreation?.song?.name ?? rbtCreation.tone_name}
        toneCode={rbtCreation?.tone?.toneCode ?? rbtCreation.tone_code}
        singer={rbtCreation.singer_name ? rbtCreation.singer_name :
          rbtCreation?.song?.singers?.map((value: Singer, index: number) => {
            return value.name
          }).join('-')
        }
      />
      <Gift
        isOpen={showModalGift}
        onClose={() => setShowModalGift(false)}
        name={rbtCreation?.song?.name ?? rbtCreation.tone_name}
        toneCode={rbtCreation?.tone?.toneCode ?? rbtCreation.tone_code}
      />
      {audio}
    </Box>
  );
};

const CollectionItem = React.memo(CollectionItemComponent);

export default function MyRbtCreativePage() {
  const { data, loading, fetchMore, refetch } = useGetMyToneCreationsQuery({ variables: { first: 10 } });
  const [selectedRbt, setSelectedRbt] = useState<Pick<RingBackToneCreation, 'id' | 'tone_code'> | null>(null);
  const { data: packagesData } = useRbtPackagesQuery();
  const { data: myRbtData } = useMyRbtQuery();
  const myPackage = packagesData?.rbtPackages?.find((p) => p.brandId === myRbtData?.myRbt?.brandId);
  const userPackage = {
    brandId: myPackage?.brandId || '',
    name: myPackage?.name || '',
    price: myPackage?.price || '',
  }
  const fetchMoreItem = useFetchMoreEdges(loading, 'getMyToneCreations', fetchMore, data?.getMyToneCreations);
  const hasNextPage = data?.getMyToneCreations?.pageInfo?.hasNextPage;

  useEffect(() => {
    const loading_screen = document.getElementById('ipl-progress-indicator');
    loading_screen.classList.remove('available');
    if (!loading) {
      setTimeout(() => {
        loading_screen.classList.add('available');
      }, 500);
    }
  }, [loading]);

  const playedCallback = useCallback((data) => setSelectedRbt(data), []);

  return (
    <PersonalSplitView title='Quản lý nhạc sáng tạo'>
      <Box mx={5} my={4}>
        {(data?.getMyToneCreations?.edges ?? []).map((node, idx) => {
          const data = node.node as RingBackToneCreation;
          return (
            <Box key={data.id}>
              <CollectionItem
                rbtCreation={data}
                selected={data.id === selectedRbt?.id}
                playedCallback={() => playedCallback(data)}
                userPackage={userPackage}
              />
              <Separator />
            </Box>
          );
        },
        )}
        {hasNextPage &&
          <Flex alignItems='center' flexDirection='column' width='100%' pt={1}>
            <Button variant='muted' onClick={fetchMoreItem}>
              Xem thêm
            </Button>
          </Flex>}
      </Box>
    </PersonalSplitView>
  );
}
