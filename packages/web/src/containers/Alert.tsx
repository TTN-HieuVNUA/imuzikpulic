import React, { FC, PropsWithChildren, useState } from 'react';
import Modal from 'react-modal';
import { Box, Button, Flex, Text } from 'rebass';
interface AlertProps {
  isOpen: boolean;
  onAccept?: () => void;
  onClickOutSite?: () => void;
  title?: string;
  content?: string;
}

const Alert: FC<PropsWithChildren<AlertProps>> = ({ isOpen, onClickOutSite, onAccept, title, content, children }) => {
  return (
    <>
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
            onClick={onClickOutSite ? onClickOutSite : () => {}}
          />
          <Flex
            maxWidth="700px"
            css={{ position: 'relative' }}
            bg="#121212"
            sx={{
              boxShadow: '0px 0px 20px #000000',
              borderRadius: 16,
            }}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            px={30}
            py={30}>
            <Flex
              alignItems="center"
              justifyContent="center"
              mb={4}
              flex={1/10}>
              <Text
                color="primary"
                fontSize="24px"
                lineHeight="24px"
                fontWeight="bold"
                textAlign="center">
                {title}
              </Text>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              flex={8/10}>
              <Text
                color="white"
                fontSize="18px"
                lineHeight="22px"
                fontWeight="bold"
                textAlign="center">
                {content}
              </Text>
              {children}
            </Flex>
            <Flex flex={1/10} alignItems="center" mt={27}>
              <Button onClick={onAccept ? onAccept : () => {}} width={113} height={48} sx={{ borderRadius: 5 }}>
                Đồng ý
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default Alert;
