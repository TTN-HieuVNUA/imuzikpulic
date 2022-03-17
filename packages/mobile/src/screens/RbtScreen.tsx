import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import _ from 'lodash';
import React, { useState } from 'react';

import { InputWithButton, Rbt } from '../components';
import { ModalBox } from '../platform/ModalBox';
import { useAlert, useNavigationLink } from '../platform/links';
import {
  MyRbtDocument,
  MyRbtDownloadsDocument,
  useDownloadRbtMutation,
  useGiftRbtMutation,
  useMyRbtDownloadsQuery,
  useMyRbtQuery,
  useRbtPackagesQuery,
  useSongQuery,
} from '../queries';
import { Box, Button } from '../rebass';
import { useVipBrandId } from '../hooks';

const checkGiftNumber = (giftNumber: string): boolean => {
  // const vnf_regex = /((086|096|097|098|032|033|034|035|036|037|038|039)+([0-9]{7})\b)/g;
  const vnf_regex = /^(0|84|\\+84)[1-9]([0-9]{8})/g;
  return vnf_regex.test(giftNumber);
};

const useGift = (
  giftNumber: string,
  songName?: string,
  toneCode?: string,
  songPrice?: number
): [string, 'confirm' | 'cancel' | 'cancel1stack'] => {
  return checkGiftNumber(giftNumber)
    ? [
        `Bạn đồng ý tặng bài nhạc chờ <${songName}>; mã số <${toneCode}>; giá cước ${songPrice}đ thời hạn sử dụng 30 ngày cho TB ${giftNumber}`,
        'confirm',
      ]
    : ['Số TB bạn nhập không đúng, vui lòng nhập lại số TB khác', 'cancel1stack'];
};

const useDownload = (
  userPackage: { brandId: string; name: string; price: string },
  myDownload: any,
  songName?: string,
  toneCode?: string,
  singer?: string,
  songPrice?: number
): [string, 'confirm' | 'cancel'] => {
  const vipBrandId = useVipBrandId();
  if (myDownload) {
    if (myDownload.myRbt) {
      if (
        toneCode &&
        myDownload?.myRbt?.downloads?.find((x: { toneCode: string }) => x.toneCode === toneCode)
      ) {
        return [`${songName} MS ${toneCode} đã có trong bộ sưu tập.`, 'cancel'];
      }
    }
  }
  if (userPackage.brandId === '') {
    return [
      `Bạn có chắc muốn đăng ký VIP (15.000đ/tháng, gia hạn hàng tháng) và tải bài hát ${songName} MS ${toneCode} của ca sỹ ${singer} làm nhạc chờ (${songPrice}đ/bài/tháng, gia hạn hàng tháng).`,
      'confirm',
    ];
  } else {
    if (
      userPackage.brandId === vipBrandId ||
      userPackage.brandId === '75' ||
      userPackage.brandId === '86'
    ) {
      return [
        `Bạn có chắc muốn tải bài hát ${songName} MS ${toneCode} của ca sỹ ${singer} làm nhạc chờ. Giá 0đ/tháng, gia hạn hàng tháng.`,
        'confirm',
      ];
    } else {
      return [
        `Bạn có chắc muốn tải bài hát ${songName} MS ${toneCode} của ca sỹ ${singer} làm nhạc chờ. Giá ${songPrice}đ/tháng, gia hạn hàng tháng.`,
        'confirm',
      ];
    }
  }
};

export const RbtScreenBase = (props: {
  songSlug?: string;
  toneCode?: string;
  timeCreate?:string;
  downloadNumber?:string | null;
  type?: 'download' | 'gift' | 'info';
}) => {
  const [giftRbt] = useGiftRbtMutation();
  const [giftNumber, setGiftNumber] = useState('');

  const [downloadRbt, { loading: downloadLoading }] = useDownloadRbtMutation({
    refetchQueries: [{ query: MyRbtDocument }, { query: MyRbtDownloadsDocument }],
  });
  const { data } = useSongQuery({
    variables: { slug: props.songSlug ?? '', first: 10 },
  });
  const song = data?.song;
  const tone =
    (props.toneCode && (song?.tones ?? []).find((t) => t.toneCode === props.toneCode)) ||
    _.maxBy(song?.tones ?? [], (t) => t.orderTimes);
  
  const { data: myDownload } = useMyRbtDownloadsQuery();
  const { data: packagesData } = useRbtPackagesQuery();
  const { data: myRbtData } = useMyRbtQuery();
  const myPackage = packagesData?.rbtPackages?.find((p) => p.brandId === myRbtData?.myRbt?.brandId);

  const [contentGift, typeGift] = useGift(giftNumber, song?.name, tone?.toneCode, tone?.price);
  const [contentDownload, typeDownload] = useDownload(
    {
      brandId: myPackage?.brandId || '',
      name: myPackage?.name || '',
      price: myPackage?.price || '',
    },
    myDownload,
    song?.name,
    tone?.toneCode,
    song?.singers.map((s) => s.alias).join(' - ') || tone?.singerName,
    tone?.price
  );
  const showPopup = useAlert({ type: 'cancel' });
  const showGiftPopup = useNavigationLink('popup', {
    title: 'Tặng bài hát',
    type: typeGift,
    content: contentGift,
    action: () =>
      giftRbt({
        variables: { rbtCodes: [tone?.toneCode ?? ''], msisdn: giftNumber },
      }).then(({ data }) => {
        if (data?.giftRbt?.success) {
          setGiftNumber('');
        }
        showPopup({ content: data?.giftRbt?.result ?? data?.giftRbt?.message });
      }),
  });

  const showDownloadPopup = useNavigationLink('popup', {
    title: 'Tải bài hát',
    type: typeDownload,
    content: contentDownload,
    action: () =>
      downloadRbt({
        variables: { rbtCodes: [tone?.toneCode ?? ''] },
      }).then(({ data }) => {
        showPopup({ content: data?.downloadRbt?.result ?? data?.downloadRbt?.message });
      }),
  });

  return (
    <ModalBox heightRatio={0} px={3} py={5}>
      {tone && (
        <Rbt
          code={props.toneCode ?? tone.toneCode}
          price={(myPackage?.brandId === '75' || myPackage?.brandId === '86' || myPackage?.brandId === '472') ? 0 : tone.price}
          song={{
            image: song?.imageUrl,
            title: song?.name || tone.name,
            artist: song?.singers.map((s) => s.alias).join(' - ') || tone.singerName,
          }}
          timeCreate={(props.timeCreate && format(Date.parse(props.timeCreate), 'dd/MM/yyyy')) ?? ''}
          cp={tone.contentProvider?.group ?? ''}
          cpGroup={tone.contentProvider?.name}
          expiry={30}
          published={(tone.availableAt && format(Date.parse(tone.availableAt), 'dd/MM/yyyy')) ?? ''}
          download={props.downloadNumber ? parseInt(props.downloadNumber) :tone.orderTimes}
        />
      )}
      {tone && props.type === 'gift' && (
        <Box mt={4}>
          <InputWithButton
            placeholder="*Nhập số điện thoại người nhận"
            gradient={false}
            backgroundColor="transparent"
            height={48}
            border
            value={giftNumber}
            onChangeText={setGiftNumber}
          />
          <Button size="large" variant="secondary" fontSize={3} mt={4} onPress={showGiftPopup}>
            GỬI TẶNG
          </Button>
        </Box>
      )}
      {tone && props.type === 'download' && (
        <Box mt={4}>
          <Button
            size="large"
            variant="secondary"
            fontSize={3}
            mt={4}
            disabled={downloadLoading}
            onPress={showDownloadPopup}>
            CÀI NHẠC CHỜ
          </Button>
        </Box>
      )}
    </ModalBox>
  );
};

export const RbtScreen = () => {
  const route: {
    params?: { songSlug?: string; toneCode?: string; type?: 'download' | 'gift' | 'info' };
  } = useRoute();
  return <RbtScreenBase {...route.params} />;
};
