import React, { FC } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Modal from 'react-modal';
import { Box, Flex, Text, Image, Button } from 'rebass';
import { GridCarouselShare } from '../components/GridCarouselShare';

global.Buffer = require('buffer').Buffer;
const arr = window.location.href.split('/');
const SHARE_LINK = arr[0] + '//' + arr[2] + '/bai-hat/';
const SHARE_SOCIAL: { id: number; name: string; src: string; link: string; copy?: boolean }[] = [
  {
    id: 0,
    name: 'Copy link',
    src: '/imgs/copy.svg',
    link: SHARE_LINK,
    copy: true,
  },
  {
    id: 1,
    name: 'Facebook',
    src: '/imgs/facebook.svg',
    link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(SHARE_LINK)}`,
  },
  {
    id: 2,
    name: 'Zalo',
    src: '/imgs/zalo.svg',
    link: `https://sp.zalo.me/share_inline?d=${encodeURI(
      global.Buffer.from(`{"url":"${SHARE_LINK}"}`).toString('base64')
    )}`,
  },
  {
    id: 3,
    name: 'Tumblr',
    src: '/imgs/tumblr.svg',
    link: `https://www.tumblr.com/widgets/share/tool/preview?canonicalUrl=${encodeURI(SHARE_LINK)}`,
  },
  {
    id: 4,
    name: 'Twitter',
    src: '/imgs/twitter.svg',
    link: `https://twitter.com/intent/tweet?url=${encodeURI(SHARE_LINK)}`,
  }
];

interface ShareProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
}

const Share: FC<ShareProps> = ({ isOpen, onClose, slug }) => {
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1000,
        },
        content: {
          position: 'absolute',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          border: 'none',
          background: 'transparent',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: 'none',
          outline: 'none',
          padding: '0px',
        },
      }}>
      <Flex
        justifyContent="space-around"
        alignItems="center"
        height="100%"
        width="100%"
        css={{ position: 'relative' }}>
        <Box
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onClick={onClose}
        />
        <Flex
          maxWidth="800px"
          maxHeight="400px"
          width="100%"
          height="100%"
          css={{ position: 'relative' }}
          bg="#121212"
          sx={{
            boxShadow: '0px 0px 20px #000000',
            borderRadius: 16,
          }}
          flexDirection="column"
          alignItems="center"
          px={57}
          py={37}>
          <Text
            color="white"
            fontSize="24px"
            lineHeight="40px"
            fontWeight="bold"
            textAlign="center">
            Chia sẻ
          </Text>
          <Flex justifyContent="space-between" alignItems="center" mt={46} width="100%">
            {/* <GridCarouselShare> */}
              {SHARE_SOCIAL.map((item) => (
                <Flex key={item.id} flexDirection="column">
                  {item.copy ? (
                    <CopyToClipboard text={item.link + slug}>
                      <Box sx={{ cursor: 'pointer' }}>
                        <Image src={item.src} style={{ width: 100, height: 100 }} />
                      </Box>
                    </CopyToClipboard>
                  ) : (
                    <Box
                      onClick={() => window.open(item.link + slug, '_blank')}
                      sx={{ cursor: 'pointer' }}>
                      <Image src={item.src} style={{ width: 100, height: 100 }} />
                    </Box>
                  )}
                  <Text
                    mt="12px"
                    textAlign="center"
                    lineHeight="20px"
                    color="white"
                    fontSize="17px">
                    {item.name}
                  </Text>
                </Flex>
              ))}
            {/* </GridCarouselShare> */}
          </Flex>
          <Button onClick={onClose} mt={57} width={113} height={48} sx={{ borderRadius: 5 }}>
            Đóng
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default Share;
