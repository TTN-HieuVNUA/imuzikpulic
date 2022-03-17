import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import React from 'react';
import { Box, Flex, Text } from 'rebass';
import { MarginProps } from 'styled-system';

export const CardTop = ({
  title,
  image,
  ...marginProps
}: { title: string; image: string } & MarginProps) => (
  <Box
    css={{
      borderRadius: 8,
      height: 164,
      overflow: 'hidden',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.05)',
      position: 'relative',
    }}
    style={{
      backgroundImage: `url(${image})`,
    }}
    {...marginProps}>
    <Box
      css={{
        background:
          'linear-gradient(180deg, #111111 0%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0) 100%)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
      }}
    />
    <Text
      p={4}
      color="white"
      fontWeight="bold"
      fontSize={4}
      textAlign="left"
      css={{ position: 'relative', zIndex: 2 }}>
      {title}
    </Text>
  </Box>
);

export const CardLeft = (props: { title: string; image?: string | null }) => (
  <Flex
    css={{
      borderRadius: 8,
      height: 66,
      overflow: 'hidden',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      position: 'relative',
    }}
    style={{
      backgroundImage: `url(${props.image})`,
    }}>
    <Flex
      css={{
        height: '100%',
        background: 'linear-gradient(91.23deg, rgba(0, 0, 0, .4) 80%, rgba(0, 0, 0, 0) 100%)',
      }}
      alignItems="center">
      <Box
        css={{
          background: 'linear-gradient(91.23deg, #393939 24.5%, rgba(255, 255, 255, 0) 99.93%)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      />
      <Text
        pl={3}
        pr={5}
        color="white"
        fontWeight="bold"
        fontSize={3}
        css={{
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 2,
        }}>
        {props.title}
      </Text>
    </Flex>
  </Flex>
);

export const CardCenter = (props: { title: string; image?: string | null }) => (
  <Flex
    css={{
      height: 149,
      overflow: 'hidden',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    style={{
      backgroundImage: `url(${props.image})`,
    }}>
    <Flex
      css={{
        height: '100%',
        width: '100%',
        background: 'rgba(0, 0, 0, .4)',
      }}
      alignItems="center"
      justifyContent="center">
      <Text
        color="white"
        fontWeight="bold"
        fontSize={3}
        css={{
          textTransform: 'uppercase',
        }}>
        {props.title}
      </Text>
    </Flex>
  </Flex>
);

export const CardBottom = ({
  title,
  image,
  ...marginProps
}: { title: string; image?: string | null } & MarginProps) => (
  <Flex
    css={{
      height: 159,
      overflow: 'hidden',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    }}
    style={{
      backgroundImage: `url(${image})`,
    }}
    {...marginProps}>
    <Flex
      css={{
        height: '100%',
        background: 'linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #000000 100%)',
      }}
      alignItems="flex-start"
      justifyContent="flex-end"
      flexDirection="column"
      flex={1}>
      <Text
        px={26}
        py={18}
        color="white"
        fontWeight="bold"
        fontSize={3}
        css={{
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 2,
        }}>
        {title}
      </Text>
    </Flex>
  </Flex>
);

export const FeaturedCard = ({
  time,
  title,
  image,
  description,
  ...props
}: {
  time: Date;
  title: string;
  image: string;
  description?: string;
} & MarginProps) => (
  <Flex
    css={{
      borderRadius: 8,
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    justifyContent="flex-end"
    flexDirection="column"
    overflow="hidden"
    height={208}
    {...props}>
    {/* <LinearGradient colors={['black', 'rgba(0, 0, 0, 0.0)']} start={[0, 1]} end={[0, 0]}> */}
    <Flex
      css={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.0), black)',
      }}
      p={3}
      width="100%"
      height={150}
      justifyContent="flex-end"
      flexDirection="column"
      alignItems="flex-start">
      {time ? (
        <Text
          color="primary"
          fontSize={0}
          css={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
          mb={1}>
          {formatDistanceToNow(time, {
            locale: vi,
            addSuffix: true,
          })}
        </Text>
      ) : null}
      <Text
        fontWeight="bold"
        fontSize={2}
        css={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
        color="white"
        mb={1}>
        {title}
      </Text>
      <Text
        color="#B2B2B2"
        width="100%"
        textAlign="left"
        fontSize={1}
        css={{
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
        {description}
      </Text>
    </Flex>
  </Flex>
);
