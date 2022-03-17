import React, { FC, useState } from 'react';
import Modal from 'react-modal';
import { Box, Button, Flex, Text } from 'rebass';
import {
  useMyRbtDownloadsQuery,
  useRbtPackagesQuery,
  useMyRbtQuery,
  useDownloadRbtMutation,
  MyRbtDownloadsQuery,
  MyRbtDocument,
  MyRbtDownloadsDocument,
} from '../queries';
import { useTheme } from 'emotion-theming';
import { Theme } from '../themes';

export const useDownload = (
  userPackage: { brandId: string; name: string; price: string },
  myDownload?: MyRbtDownloadsQuery,
  songName?: string,
  toneCode?: string,
  singer?: string
): [string, 'confirm' | 'cancel'] => {

  if (userPackage.brandId === '') {
    return [
      `Bạn có chắc muốn đăng ký DV (10.000đ/tháng, gia hạn hàng tháng) và tải bài hát ${songName} MS ${toneCode ?? ''
      } của ca sỹ ${singer} làm nhạc chờ (3.000đ/bài/tháng, gia hạn hàng tháng).`,
      'confirm',
    ];
  } else {
    if (userPackage.brandId === '472' || userPackage.brandId === '75' || userPackage.brandId === '86') {
      return [
        `Bạn có chắc muốn tải bài hát ${songName} MS ${toneCode} của ca sỹ ${singer} làm nhạc chờ. Giá 0đ/tháng, gia hạn hàng tháng.`,
        'confirm',
      ];
    } else {
      return [
        `Bạn có chắc muốn tải bài hát ${songName} MS ${toneCode} của ca sỹ ${singer} làm nhạc chờ. Giá 3.000đ/tháng, gia hạn hàng tháng.`,
        'confirm',
      ];
    }
  }
};

interface DownloadProps {
  isOpen: boolean;
  onClose: () => void;
  name?: string;
  toneCode?: string;
  singer?: string;
}

const Download: FC<DownloadProps> = ({ isOpen, onClose, name, toneCode, singer }) => {
  //Todo: add theme light
  const theme = useTheme<Theme>();
  const [modalAlert, setModalAlert] = useState(false);
  const [contentMessage, setContentMessage] = useState('');
  const { data: myDownload } = useMyRbtDownloadsQuery();
  const { data: packagesData } = useRbtPackagesQuery();
  const { data: myRbtData } = useMyRbtQuery();
  const myPackage = packagesData?.rbtPackages?.find((p) => p.brandId === myRbtData?.myRbt?.brandId);
  const [downloadRbt] = useDownloadRbtMutation({
    refetchQueries: [{ query: MyRbtDocument }, { query: MyRbtDownloadsDocument }],
  });

  const [contentDownload] = useDownload(
    {
      brandId: myPackage?.brandId || '',
      name: myPackage?.name || '',
      price: myPackage?.price || '',
    },
    myDownload,
    name,
    toneCode,
    singer
  );
  const onDownload = () => {
    let message = '';
    if (myDownload) {
      if (myDownload.myRbt) {
        if (toneCode && myDownload.myRbt?.downloads?.find((x) => x.toneCode === toneCode)) {
          message = `${name} MS ${toneCode} đã có trong bộ sưu tập.`;
          onClose();
          setContentMessage(message);
          setModalAlert(true);
        } else {
          message = `${name} (${toneCode}) - Thực hiện thành công!`;
          downloadRbt({
            variables: { rbtCodes: [toneCode ?? ''] },
          }).then(({ data }) => {
            if (data?.downloadRbt?.success) {
              onClose();
              setContentMessage(message);
              setModalAlert(true);
            }
          });
        }
      }
    }

  }
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
            onClick={onClose}
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
            <Text
              color="white"
              fontSize="20px"
              lineHeight="24px"
              fontWeight="bold"
              textAlign="center">
              {contentDownload}
            </Text>
            <Flex alignItems="center" mt={27}>
              <Button onClick={onClose} variant="clear" fontSize={20} lineHeight="24px" mr={32}>
                Bỏ qua
              </Button>
              <Button onClick={onDownload} width={113} height={48} sx={{ borderRadius: 5 }}>
                Đồng ý
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>


      <Modal
        isOpen={modalAlert}
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
            onClick={() => setModalAlert(false)}
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
            <Text
              color="white"
              fontSize="20px"
              lineHeight="24px"
              fontWeight="bold"
              textAlign="center">
              {contentMessage}
            </Text>
            <Flex alignItems="center" mt={27}>
              <Button
                onClick={() => setModalAlert(false)}
                width={113}
                height={48}
                sx={{ borderRadius: 5 }}
              >
                Đóng
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>

    </>
  );
};

export default Download;
