import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { useTheme } from 'emotion-theming';
import React, { PropsWithChildren } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Box, Flex } from 'rebass';

import { Section } from '../components/Section';
import { Theme } from '../themes';

function Banner(props: { children?: React.ReactChild[]; autoPlay?: boolean; interval?: number }) {
  const theme = useTheme<Theme>();
  return (
    <>
      <Box
        height={585}
        css={{
          '.carousel': {
            '.slide': {
              textAlign: 'left',
              '.legend': {
                bottom: 140,
                position: 'relative',
              },
            },
            '.control-dots': {
              bottom: 100,
              '.dot': {
                background: 'white',
                opacity: 1,
                boxShadow: 'none',
                '&.selected': {
                  background: theme.colors.secondary,
                },
              },
            },
            img: {
              height: 585,
              position: 'relative',
              objectFit: 'cover',
              objectPosition: 'center',
            },
          },
          // marginBottom: -100,
          position: 'relative',
        }}>
        <Carousel infiniteLoop showThumbs={false} showStatus={false} {...props} />
        <Box css={{}} />
        <Section
          css={{
            position: 'absolute',
            bottom: 100,
            left: 0,
            right: 0,
          }}>
          <Box
            css={{
              width: '100%',
              height: 1,
              backgroundColor: 'white',
            }}
          />
        </Section>
      </Box>
    </>
  );
}

Banner.Content = (props: PropsWithChildren<{}>) => (
  <Flex
    css={{
      position: 'absolute',
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.08) 15.56%, #262523 100%)',
      // position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    }}
    pb={140}
    justifyContent="flex-end"
    flexDirection="column">
    <Section>{props.children}</Section>
  </Flex>
);

export default Banner;
