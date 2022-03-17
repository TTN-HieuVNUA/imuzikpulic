import 'react-responsive-carousel/lib/styles/carousel.min.css';

import * as _ from 'lodash';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Box, Flex } from 'rebass';

import Icon from './Icon';

const renderIndicator = (
  onClickHandler: (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void,
  isSelected: boolean,
  index: number,
  label: string
) => (
  <Box
    css={{ borderRadius: 4, overflow: 'hidden', display: 'inline-block' }}
    width={8}
    height={8}
    mx={1}
    bg={isSelected ? 'secondary' : 'normalText'}
    // onClick={onClickHandler}
  />
);
const renderArrowPrevMx = (mx: number) => (
  onClickHandler: () => void,
  hasPrev: boolean,
  label: string
) => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    css={{ borderRadius: 12, overflow: 'hidden', position: 'absolute', top: -49, right: 44 }}
    width={24}
    height={24}
    mr={mx}
    bg="alternativeBackground"
    onClick={onClickHandler}>
    <Icon name="caret-left" color={hasPrev ? 'normalText' : 'lightText'} size={12} />
  </Flex>
);
const renderArrowNextMx = (mx: number) => (
  onClickHandler: () => void,
  hasNext: boolean,
  label: string
) => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    css={{ borderRadius: 12, overflow: 'hidden', position: 'absolute', top: -49, right: 0 }}
    width={24}
    height={24}
    mr={mx}
    bg="alternativeBackground"
    onClick={onClickHandler}>
    <Icon name="caret-right" color={hasNext ? 'normalText' : 'lightText'} size={12} />
  </Flex>
);

export function GridCarousel(props: {
  rows?: number;
  columns: number;
  mx?: number;
  showIndicators?: boolean;
  children: React.ReactNodeArray;
}) {
  const { rows = 1, columns, showIndicators = true, mx = 0 } = props;
  // const theme = useTheme<Theme>();
  const pages = _.chunk(props.children, rows * columns);
  const renderArrowNext = renderArrowNextMx(mx);
  const renderArrowPrev = renderArrowPrevMx(mx);
  return (
    <Box
      mx={-mx}
      css={{
        '.carousel-root': {
          paddingBottom: showIndicators && pages.length > 1 ? 40 : 0,
        },
        '.carousel .slide': {
          background: 'inherit',
        },
        '.carousel.carousel-slider': {
          overflow: 'visible',
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
        showIndicators={showIndicators && pages.length > 1}
        showThumbs={false}
        showStatus={false}
        {...{ renderIndicator, renderArrowPrev, renderArrowNext }}>
        {pages.map((p, idx) => (
          <Flex flexWrap="wrap" flexDirection="row" key={idx}>
            {p.map((i, idx) => (
              <Box key={idx} width={1 / columns}>
                <Box mx={mx}>{i}</Box>
              </Box>
            ))}
          </Flex>
        ))}
      </Carousel>
    </Box>
  );
}
