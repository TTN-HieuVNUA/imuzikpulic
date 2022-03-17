import { useTheme } from 'emotion-theming';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text } from 'rebass';

import { Theme } from '../themes';

type Item = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  slug?: string | null;
};

const CELL_HEIGHT = 155;
const COL_COUNT = 5;
const ROW_COUNT = 3;

const DescriptionBox = (props: { item?: Item }) => {
  const theme = useTheme<Theme>();
  return (
    <Flex
      width={1 / COL_COUNT}
      height={CELL_HEIGHT * 2}
      bg="alternativeBackground"
      flexDirection="column"
      css={{ overflow: 'hidden' }}>
      <Text color="primary" p={5} pb={3} fontSize={3} fontWeight="bold">
        {props.item?.title}
      </Text>
      <Box
        css={{
          height: 1,
          backgroundColor: theme.colors.primary,
        }}
        mr={5}
      />
      <Text color="normalText" px={5} py={2} fontSize={2}>
        {props.item?.description}
      </Text>
    </Flex>
  );
};

const ItemBox = (props: { item: Item; onHover: () => void }) => {
  return (
    <Box
      width={1 / COL_COUNT}
      height={CELL_HEIGHT}
      style={{ backgroundImage: `url(${props.item.image})` }}
      onMouseEnter={props.onHover}
      css={{
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}>
      <Link to={`/the-loai/${props.item.slug}`}>
        <Flex
          css={{
            background: 'linear-gradient(180deg, rgba(108, 108, 108, 0) 40%, rgba(0,0,0,0.9) 100%)',
            '&:hover': {
              borderBottom: '7px #FDCC26 solid',
              '.text': {
                paddingBottom: 8,
              },
            },
          }}
          width="100%"
          height="100%"
          justifyContent="flex-end"
          flexDirection="column">
          <Text fontSize={3} fontWeight="bold" color="white" px={4} py={3} className="text">
            {props.item.title}
          </Text>
        </Flex>
      </Link>
    </Box>
  );
};

export default function Grid(props: { data?: Item[] }) {
  const [active, setActive] = useState<Item | undefined>(undefined);
  return (
    <Flex
      flexDirection="column"
      flexWrap="wrap"
      height={CELL_HEIGHT * ROW_COUNT}
      css={{
        alignContent: 'flex-start',
      }}>
      <DescriptionBox item={active} />
      {(props.data || []).map((item) => (
        <ItemBox key={item.id} item={item} onHover={() => setActive(item)} />
      ))}
    </Flex>
  );
}
