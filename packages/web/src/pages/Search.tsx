import _ from 'lodash';
import queryString from 'query-string';
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Box, Button, Flex } from 'rebass';
import { GridCarousel, H2 } from '../components';
import Avatar from '../components/Avatar';
import { CardBottom } from '../components/Card';
import { Section } from '../components/Section';
import { Playlist } from '../containers';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { useFetchMoreEdges } from '../hooks';
import { NodeType, SongBaseFragment, SongConnectionBaseFragment, useSearchQuery } from '../queries';

interface SearchSectionProps {
  query: string;
  selected?: boolean;
}

const SingersSection = ({ query, selected }: SearchSectionProps) => {
  const { data, loading, fetchMore } = useSearchQuery({
    variables: { query, first: selected ? 36 : 12, type: NodeType.Singer },
  });
  const fetchMoreItem = useFetchMoreEdges(loading, 'search', fetchMore, data?.search);
  const history = useHistory();
  if (!data?.search.totalCount) return null;
  return (
    <Section py={4}>
      <H2>Ca sĩ</H2>
      <GridCarousel columns={6} showIndicators={false}>
        {_(data?.search?.edges ?? [])
          .filter((e) => !!e.node)
          .map(({ node: singer }) =>
            singer?.__typename === 'Singer' ? (
              <Link to={`/ca-sy/${singer.slug}`} key={singer.id}>
                <Avatar name={singer.alias ?? ''} image={singer.imageUrl || ''} />
              </Link>
            ) : null
          )
          .take(selected ? 1000000 : 6)
          .value()}
      </GridCarousel>
      <Flex mt={35} justifyContent="center">
        {selected ? (
          data?.search?.edges.length < data?.search.totalCount && (
            <Button variant="muted" onClick={fetchMoreItem}>
              Xem thêm
            </Button>
          )
        ) : (
          <Button
            variant="muted"
            onClick={() =>
              history.push(`/tim-kiem?q=${encodeURIComponent(query)}&selected=singer`)
            }>
            Xem tất cả
          </Button>
        )}
      </Flex>
    </Section>
  );
};
const SongsSection = ({ query, selected }: SearchSectionProps) => {
  const { data, loading, fetchMore } = useSearchQuery({
    variables: { query, first: selected ? 20 : 10, type: NodeType.Song },
  });
  const fetchMoreItem = useFetchMoreEdges(loading, 'search', fetchMore, data?.search);
  const history = useHistory();
  return (
    <Section pb={6} pt={3}>
      <H2>Bài hát</H2>
      <Playlist
        songs={
          (data?.search as unknown) as {
            edges: { node: SongBaseFragment }[];
          } & SongConnectionBaseFragment
        }
        loading={loading}
        name={query}
        mb={26}
      />
      <Flex justifyContent="center">
        {data?.search.totalCount ? (
          selected ? (
            data?.search?.edges.length < data?.search.totalCount && (
              <Button variant="muted" onClick={fetchMoreItem}>
                Xem thêm
              </Button>
            )
          ) : (
            <Button
              variant="muted"
              onClick={() =>
                history.push(`/tim-kiem?q=${encodeURIComponent(query)}&selected=song`)
              }>
              Xem tất cả
            </Button>
          )
        ) : (
          'Không có bài hát nào'
        )}
      </Flex>
    </Section>
  );
};
const ContentProvidersSection = ({ query, selected }: SearchSectionProps) => {
  const { data, loading, fetchMore } = useSearchQuery({
    variables: { query, first: selected ? 20 : 4, type: NodeType.Cp },
  });
  const fetchMoreItem = useFetchMoreEdges(loading, 'search', fetchMore, data?.search);
  const history = useHistory();
  if (!data?.search.totalCount) return null;
  return (
    <Section pb="92px" onClick={fetchMoreItem}>
      <H2>Nhà cung cấp</H2>
      <GridCarousel rows={2} columns={2} showIndicators={false} mx={14.5}>
        {(data?.search?.edges ?? []).map(({ node: cp }) =>
          cp?.__typename === 'ContentProvider' ? (
            <Box pb="23px" key={cp.id}>
              <Link to={`/nha-cung-cap/${cp.code}`}>
                <CardBottom title={cp.name} image={cp.imageUrl} />
              </Link>
            </Box>
          ) : null
        )}
        {selected ? (
          data?.search?.edges.length < data?.search.totalCount && (
            <Button variant="muted" onClick={fetchMoreItem}>
              Xem thêm
            </Button>
          )
        ) : (
          <Button
            variant="muted"
            onClick={() => history.push(`/tim-kiem?q=${encodeURIComponent(query)}&selected=cp`)}>
            Xem tất cả
          </Button>
        )}
      </GridCarousel>
    </Section>
  );
};
export default function SearchPage() {
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  const searchQuery = parsed.q?.toString();
  const selected = parsed.selected?.toString();
  return (
    <Box>
      <Header.Fixed placeholder />
      {(!selected || selected === 'singer') && (
        <SingersSection query={searchQuery} selected={selected === 'singer'} />
      )}
      {(!selected || selected === 'song') && (
        <SongsSection query={searchQuery} selected={selected === 'song'} />
      )}
      {(!selected || selected === 'cp') && (
        <ContentProvidersSection query={searchQuery} selected={selected === 'cp'} />
      )}
      <Footer />
    </Box>
  );
}
