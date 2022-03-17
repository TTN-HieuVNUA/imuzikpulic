import React, { useEffect, useMemo } from 'react';
import { Box, Text, Flex } from '../../rebass';
import { HeaderClose, InputWithButton, Separator } from '../../components';
import { Icon, ICON_GRADIENT_1 } from '../../components/svg-icon';
import { ActivityIndicator, FlatList, Image } from 'react-native';
import { LoadingFooter } from '../../containers';
import { NavLink, useAlert } from '../../platform/links';
import { useSearchQuery } from '../../queries';
import { useFetchMoreEdges } from '../../hooks';

const SearchItem = (props: { name: string; image?: string | null }) => {
  return (
    <Box flexDirection="row" alignItems="center" py={2}>
      {props.image && (
        <Image source={{ uri: props.image }} style={{ width: 44, height: 44 }} resizeMode="cover" />
      )}
      <Box flexDirection="column" ml={2} flex={1}>
        <Text color="normalText" fontWeight="bold" fontSize={2} numberOfLines={1}>
          {props.name}
        </Text>
      </Box>
    </Box>
  );
};

export const ChartSongCreate = (props: {
  title: string;
  id: string;
  slug: string | undefined | null;
  artist: string;
  image?: string | null;
  index?: number | null;
}) => {
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      css={{
        height: 80,
      }}>
      {props.index && (
        <Flex ml={1} mr={1} width={25} alignItems="center">
          <Box ml={1} mr={1} width={25} alignItems="center">
            <Text fontSize={2} color="lightText">
              {props.index}
            </Text>
          </Box>
        </Flex>
      )}
      <Flex alignItems="center" flexDirection="row" flex={1}>
        <Flex
          bg="#C4C4C4"
          overflow="hidden"
          position="relative"
          borderRadius={4}
          justifyContent="center"
          alignItems="center"
          width={56}
          height={56}>
          {!!props.image && (
            <Image source={{ uri: props.image }} style={{ width: '100%', height: '100%' }} />
          )}
        </Flex>
        <Flex flex={1}>
          <Flex flexDirection="column" ml={3}>
            <Text color="normalText" fontSize={2} fontWeight="bold" numberOfLines={1}>
              {props.title}
            </Text>
            <Text color="lightText" fontSize={1} mb={2.5} fontWeight="bold" numberOfLines={1}>
              {props.artist}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default function CreateRbtFromLibrary() {
  const [query, setQuery] = React.useState('');
  const [queryInput, setQueryInput] = React.useState('');
  useEffect(() => {
    // only change query if there is no typing within 500ms
    const timeout = setTimeout(() => {
      setQuery(queryInput);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [queryInput]);
  const { data, loading, fetchMore, refetch } = useSearchQuery({ variables: { first: 10, query } });
  const onFetchMore = useFetchMoreEdges(loading, 'search', fetchMore, data?.search);
  const filteredEdges = useMemo(() => (data?.search.edges ?? []).filter((e) => e.node), [
    data?.search.edges,
  ]);
  const showPopup = useAlert({type: 'cancel1stack'});
  const checkVadidate = (inputValue : any) => {
    if (inputValue.length <= 255) {
      setQueryInput(inputValue)
    } else {
      showPopup({content: 'Quá 255 ký tự. Xin vui lòng thử lại!'});
      setQueryInput('');
    }
  }
  return (
    <Box bg="defaultBackground" position="relative" height="100%">
      <Flex flexDirection="row" justifyContent="flex-end">
        <HeaderClose />
      </Flex>
      <Flex flexDirection="row" alignItems="center" mx={2}>
        <Icon name="tune" size={50} color={ICON_GRADIENT_1} />
        <Text ml={2} fontSize={[3, 4, 5]} fontWeight="bold" color="normalText">
          Tạo nhạc chờ {'\n'}từ Bài hát có sẵn
        </Text>
      </Flex>
      <Flex mx={3} mt={3}>
        <InputWithButton
          value={queryInput}
          onChangeText={(e)=>checkVadidate(e)}
          iconColor="inputClose"
          placeholder="Nhập tên bài hát"
          iconSize={16}
          onPress={() => setQueryInput('')}
        />
        {
          loading ? (
            <Box flexDirection='row' alignItems='center' justifyContent='center'>
              <Text textAlign="center" color="lightText" py={4}>
                Đang tìm kiếm
              </Text>
              <ActivityIndicator size='small'/>
            </Box>
          ) : (
            (!query) || data?.search?.totalCount === 0 ? (
              <Box>
                {data?.search?.totalCount === 0 && !!query && (
                  <Text textAlign="center" color="lightText" p={4} mt={2}>
                    Không tìm thấy kết quả nào!
                  </Text>
                )}
              </Box>
            ) : (
              <>
                <Text color="primary" fontWeight="bold" my={3} fontSize={3}>
                  Kết quả tìm kiếm “{queryInput}”
                </Text>
                <FlatList
                  data={filteredEdges}
                  ListFooterComponent={
                    <LoadingFooter hasMore={data?.search?.pageInfo.hasNextPage || loading} />
                  }
                  initialNumToRender={10}
                  onEndReachedThreshold={0.2}
                  refreshing={loading}
                  onRefresh={refetch}
                  onEndReached={onFetchMore}
                  keyExtractor={({ node }, idx) => node?.id ?? `${idx}`}
                  renderItem={({ item: { node } }) => {
                    const name =
                      node?.__typename === 'Song'
                        ? node?.name
                        : node?.__typename === 'Genre'
                          ? node?.name
                          : node?.__typename === 'Singer'
                            ? node?.alias
                            : '';
                    const image =
                      node?.__typename === 'Song'
                        ? node?.imageUrl
                        : node?.__typename === 'Genre'
                          ? node?.imageUrl
                          : node?.__typename === 'Singer'
                            ? node?.imageUrl
                            : '';
                    return (
                      <Box>
                        {node?.__typename === 'Song' ? (
                          <NavLink
                            {...{
                              route: '/cat-nhac/[type]/[name][url][id]',
                              params: {
                                type: 'online',
                                name: node.name,
                                url: node.fileUrl,
                                id: node.slug,
                              },
                            }}>
                            <Box py={2}>
                              <ChartSongCreate
                                id={node.id}
                                slug={node.slug}
                                title={node.name}
                                image={image}
                                artist={node.singers.map((s) => s.alias).join(' - ')}
                              />
                            </Box>
                          </NavLink>
                        ) : (
                          <SearchItem image={image} name={name} />
                        )}

                        <Separator />
                      </Box>
                    );
                  }}
                />
              </>
            )
          )
        }
      </Flex>
    </Box>
  );
}
