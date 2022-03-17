import 'react-responsive-carousel/lib/styles/carousel.min.css';

import * as _ from 'lodash';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Box, Flex } from 'rebass';

import Icon from './Icon';

const renderArrowPrev = (onClickHandler: () => void, hasPrev: boolean) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      css={{
        borderRadius: 40,
        overflow: 'hidden',
        position: 'absolute',
        left: -20,
        cursor: 'pointer',
        top: 32,
        zIndex: 1,
        visibility: hasPrev ? 'visible' : 'hidden',
        boxShadow: '0px 0px 4px #000000',
      }}
      width={40}
      height={40}
      ml="8px"
      bg="#202020"
      onClick={onClickHandler}>
      <Icon name="caret-left" color="white" size={16} />
    </Flex>
  );
};
const renderArrowNext = (onClickHandler: () => void, hasNext: boolean) => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    css={{
      borderRadius: 40,
      overflow: 'hidden',
      position: 'absolute',
      right: -20,
      cursor: 'pointer',
      top: 32,
      zIndex: 1,
      visibility: hasNext ? 'visible' : 'hidden',
      boxShadow: '0px 0px 4px #000000',
    }}
    width={40}
    height={40}
    mr="8px"
    bg="#202020"
    onClick={onClickHandler}>
    <Icon name="caret-right" color="white" size={16} />
  </Flex>
);

export function GridCarouselShare(props: { children: React.ReactNodeArray }) {
  // const theme = useTheme<Theme>();
  const pages = _.chunk(props.children, 6);
  return (
    <Box
      mx="-8px"
      css={{
        '.carousel .slide': {
          background: 'inherit',
        },
        '.carousel.carousel-slider': {
          display: 'flex',
          overflow: 'visible',
          alignItems: 'center',
        },
        '.carousel .control-dots': {
          bottom: -30,
          margin: 0,
          padding: 0,
        },
        '.carousel .slide img': {
          width: 'inherit',
        },
      }}>
      <Carousel
        autoPlay={false}
        interval={10000}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        {...{ renderArrowPrev, renderArrowNext }}>
        {pages.map((p, idx) => (
          <Flex flexWrap="wrap" flexDirection="row" key={idx}>
            {p.map((i, idx) => (
              <Box key={idx} width={1 / 6}>
                <Box mx="8px">{i}</Box>
              </Box>
            ))}
          </Flex>
        ))}
      </Carousel>
    </Box>
  );
}
