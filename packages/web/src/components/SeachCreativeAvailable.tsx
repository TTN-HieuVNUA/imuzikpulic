import { Box, Button, Flex, Text } from 'rebass';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Input } from '@rebass/forms';
import { useTheme } from 'emotion-theming';
import { Theme } from '../themes';
import { CreativeSong, CreativeSongInterface } from './CreativeSong';
import { NodeType, SongBaseFragment, useSearchQuery } from '../queries';
import { useFetchMoreEdges } from '../hooks';

const SearchCreativeAvailableComponent = (props: {
  autoFocus?: boolean;
  value?: string;
  onClickOutside?: (value: boolean) => void;
  onChooseSong?: (song: CreativeSongInterface) => void;
}) => {
  const theme = useTheme<Theme>();
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = React.useState('');
  const [queryInput, setQueryInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { data, loading, fetchMore, refetch } = useSearchQuery({
    variables: { query, first: 5, type: NodeType.Song },
  });

  const fetchMoreItem = useFetchMoreEdges(loading, 'search', fetchMore, data?.search);
  const hasNextPage = data?.search?.pageInfo?.hasNextPage;

  const filteredEdges = useMemo(() => (data?.search.edges ?? []).filter((e) => e.node), [
    data?.search.edges,
  ]);
  useEffect(() => {
    // only change query if there is no typing within 500ms
    const timeout = setTimeout(() => {
      setQuery(queryInput);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [queryInput]);

  const onclickSong = (song: CreativeSongInterface) => {
    setShowResult(false);
    props.onChooseSong(song);
  };

  const closeResult = useCallback(() => {
    showResult && setShowResult(false);
  }, [showResult]);
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      if (props.onClickOutside) {
        props.onClickOutside(false);
      } else {
        closeResult();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });
  useEffect(() => {
    if (props.value) {
      setQueryInput(props.value);
    }
  }, [props.value]);
  return (
    <>
      <Text color='#979797' fontSize={3}>Nhập tên bài hát bạn muốn tạo đoạn nhạc chờ mới</Text>

      <Flex
        ref={ref}
        my='17px'
        px='13px'
        css={{
          position: 'relative',
          alignItems: 'center',
          width: '100%',
          maxWidth: '700px',
          border: '2px solid #C4C4C4',
          borderRadius: '5px',
          backgroundBlendMode: 'multiply',
          height: '40px',
        }}>
        <Input
          autoFocus={props.autoFocus}
          px='13px'
          maxLength={255}
          placeholder='Nhập tên bài hát'
          css={{
            border: 'none',
            ':focus': {
              outline: 'none',
            },
            '::placeholder': {
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.87)',
              fontSize: theme.fontSizes[2],
              lineHeight: '17px',
            },
          }}
          value={queryInput}
          onChange={(e) => {
            setQueryInput(e.target.value);
            !showResult && setShowResult(true);
          }}
          onFocus={() => {
            !showResult && setShowResult(true);
          }}
          onKeyDown={(e) => {
            //TODO:
            //Enter + esc
          }}
        />
        {showResult && (
          <Box
            id='search-container'
            px='21px'
            py='18px'
            css={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '48px',
              backgroundColor: theme.colors.backgroundWs,
              borderRadius: '5px',
              zIndex: 3,
              maxHeight: '650px',
              overflowY: filteredEdges.length === 0 ? 'hidden' : 'scroll',
            }}>
            {filteredEdges.length === 0 && !loading && queryInput.length === 0 &&
            <p>Vui lòng nhập thông tin tìm kiếm...</p>}
            {loading && queryInput.length > 0 && <p>Đang tìm kiếm...</p>}
            {filteredEdges.length === 0 && !loading && queryInput.length !== 0 && <p>Không tìm thấy kết quả nào...</p>}
            {!loading && filteredEdges.map((node, index) => {
              let song = node.node as SongBaseFragment;
              return (
                <Box key={index} onClick={() => onclickSong({
                  slug: song.slug,
                  title: song.name,
                  image: song.imageUrl,
                  singers: song.singers,
                  fileUrl: song.fileUrl,
                })}
                >
                  <CreativeSong
                    image={song.imageUrl}
                    title={song.name}
                    singers={song.singers}
                  />
                </Box>
              );
            })}
            {
              hasNextPage && !loading &&
              <Flex alignItems='center' flexDirection='column' width='100%' pt={1}>
                <Button variant='muted' onClick={fetchMoreItem}>
                  Xem thêm
                </Button>
              </Flex>
            }
          </Box>

        )}
      </Flex>
    </>
  );
}


export const SearchCreativeAvailable = React.memo(SearchCreativeAvailableComponent);
