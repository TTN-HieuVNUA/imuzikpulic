import { Input } from '@rebass/forms';
import React, { useCallback, useState } from 'react';
import ReactModal from 'react-modal';
import { Flex, Box, Button, Text } from 'rebass';
export const Modal = ({
  showInput,
  isOpen,
  actions,
  onAction,
  onClose,
  closeActionIdx = 0,
  children,
  loading,
}: React.PropsWithChildren<{
  showInput?: boolean;
  isOpen?: boolean;
  actions: { title: string; isPrimary?: boolean }[];
  onAction?: (actionIdx: number, input?: string) => void;
  onClose?:()=>void;
  closeActionIdx?: number;
  loading?: boolean;
}>) => {
  return (
    <ReactModal
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
          css={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={()=>onClose()}
        />
        <Flex
          maxWidth="700px"
          maxHeight="250px"
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
          justifyContent="center"
          px={57}
          py={37}>
          <Text color="white" fontSize="20px" lineHeight="24px" textAlign="center">
            {children}
          </Text>
          {showInput && (
            <Input
              // value={giftNumber}
              // onChange={(e) => setGiftNumber(e.target.value ?? '')}
              width={360}
              mt={16}
            />
          )}
          <Flex alignItems="center" mt={38}>
            {actions.map((action, idx) => {
              if (!action.isPrimary)
                return (
                  <Button
                    key={idx}
                    onClick={() => onAction(idx)}
                    variant="clear"
                    fontSize={20}
                    lineHeight="24px"
                    width={113}
                    height={48}
                    disabled={loading}
                    mr={32}>
                    {action.title}
                  </Button>
                );
              return (
                <Button
                  key={idx}
                  disabled={loading}
                  onClick={() => onAction(idx)}
                  width={113}
                  height={48}
                  sx={{ borderRadius: 5 }}
                  // disabled={giftNumber.length !== 10}
                >
                  {action.title}
                </Button>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </ReactModal>
  );
};

export const useAlert = (actionTitle = 'Đóng') => {
  const [isOpened, setIsOpened] = useState(false);
  const [text, setText] = useState<string | React.ReactNode>('');
  const show = useCallback((givenText: string | React.ReactNode) => {
    setIsOpened(true);
    setText(givenText);
  }, []);
  const hide = useCallback(() => {
    setIsOpened(false);
  }, []);
  return {
    node: (
      <Modal
        isOpen={isOpened}
        actions={[{ title: actionTitle, isPrimary: true }]}
        onAction={hide}
        closeActionIdx={0}>
        {text}
      </Modal>
    ),
    show,
  };
};
