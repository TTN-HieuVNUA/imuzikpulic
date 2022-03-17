import { Input } from '@rebass/forms';
import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { Box, Flex, Text } from 'rebass';
import { PlaylistSong, PlaylistSongProps, Separator } from '../components';
import Icon from '../components/Icon';
import { usePlayer } from '../components/Player';
import { useGiftHandler } from '../hooks';
import { useNodeQuery } from '../queries';
import Download from './Download';
import Gift from './Gift';
import Share from './Share';

const PlayingListItem = (props: PlaylistSongProps) => {
  const { giftClick,showModalGift,setShowModalGift } = useGiftHandler();
  const [modalIsOpen, setIsOpen] = useState(false);
  //const [modalGift, setOpenGift] = useState(false);
  const [modalDownload, setOpenDownload] = useState(false);
  const { data } = useNodeQuery({ variables: { id: props.slug ?? '' } });
  const song = data?.node?.__typename === 'Song' ? data.node : null;
  const tone = _.maxBy(song?.tones ?? [], (t) => t.orderTimes);
  return (
    <Box>
      <PlaylistSong
        {...props}
        onGiftClick={() => giftClick()}
        onShareClick={() => setIsOpen(true)}
        onDownloadClick={() => setOpenDownload(true)}
      />
      <Share isOpen={modalIsOpen} onClose={() => setIsOpen(false)} slug={song?.slug} />
      <Download
        isOpen={modalDownload}
        onClose={() => setOpenDownload(false)}
        name={song?.name}
        toneCode={tone?.toneCode}
        singer={song?.singers.map((s) => s.alias).join(' - ') || tone?.singerName}
      />
      <Gift
        isOpen={showModalGift}
        onClose={() => setShowModalGift(false)}
        name={song?.name}
        toneCode={tone?.toneCode}
      />
    </Box>
  );
};
export const PlayingList = (props: { close?: () => void }) => {
  const player = usePlayer();
  const [filtering, setFiltering] = useState(false);
  const toggleFiltering = useCallback(() => {
    setFiltering(!filtering);
  }, [filtering]);
  const [keyword, setKeyword] = useState('');
  const visiblePlayables = useMemo(() => {
    const normalizedKeyword = keyword
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/ {2}/g, ' ')
      .trim();

    return (player?.currentCollection?.playables ?? []).map(
      (playable) =>
        !filtering ||
        !keyword ||
        playable.title
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(normalizedKeyword)
    );
  }, [filtering, keyword, player]);

  return (
    <Box bg="black" px={3} pb={3}>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        height={75}>
        {!filtering && (
          <Text color="normalText" fontWeight="bold" fontSize={3} py={25} px={4}>
            {player?.currentCollection?.name}
          </Text>
        )}
        <Flex
          flex={1}
          alignItems="center"
          justifyContent="flex-end"
          css={{
            transition: 'flex ease-in-out 400ms',
          }}>
          <Box py={2} px={3} mr={2} onClick={toggleFiltering} css={{ cursor: 'pointer' }}>
            <Icon name="search" size={24} />
          </Box>
          {filtering && (
            <Flex alignItems="center" flex={1}>
              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                flex={1}
                height={45}
                my={3}
                px={28}
                py={11}
                css={{
                  border: 'none',
                  borderRadius: 10,
                }}
                bg="alternativeBackground"
                placeholder="Gõ để tìm kiếm"
              />
              <Box px={4} py={2} onClick={toggleFiltering} css={{ cursor: 'pointer' }}>
                <Text color="normalText" fontSize={3} fontWeight="bold">
                  ĐÓNG
                </Text>
              </Box>
            </Flex>
          )}
          <Box py={2} px={3} onClick={props.close} css={{ cursor: 'pointer' }}>
            <Box css={{ position: 'relative', top: 2 }}>
              <Icon name="caret-down" size={24} />
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Separator mb={3} />
      <Box maxHeight="60vh" height={filtering ? '60vh' : 'auto'} overflowY="scroll">
        {(player?.currentCollection?.playables ?? []).map(
          (playable, idx) =>
            visiblePlayables[idx] && (
              <PlayingListItem
                key={playable.id}
                slug={playable.id}
                image={playable.image}
                title={playable.title}
                duration={(player?.currentPlayable === playable && player?.duration) || null}
                isPlaying={player?.currentPlayable === playable}
                onPlayClick={() => player?.playCollection(player?.currentCollection!, idx)}
              />
            )
        )}
      </Box>
    </Box>
  );
};
