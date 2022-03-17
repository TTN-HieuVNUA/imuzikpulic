import React, { PropsWithChildren, useState } from 'react';
import { useEffect } from 'react';
import { Box, Button, Flex, Text } from 'rebass';

import { Section, H2 } from '../components';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import CreativeAvailable from '../containers/CreativeAvailable';
import CreativeUnavailable from '../containers/CreativeUnavailable';
import { WsProvider } from '../components/WaveSurfer/WsProvider';

const LinearBanner = (props: PropsWithChildren<{}>) => (
  <Flex
    css={{
      position: 'absolute',
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.08) 15.56%, #262523 100%)',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    }}
    pb={140}
    justifyContent="flex-end"
    height={375}
    flexDirection="column">
    <Section>{props.children}</Section>
  </Flex>
);
const CreativeBanner = () => {
  return (
    <div>
      <Flex
        pt={8}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height={374}
        style={{
          backgroundImage: `url("/imgs/creative.svg")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          objectFit: 'cover',
        }}></Flex>
      <LinearBanner />
    </div>
  );
};

enum CreativeType {
  available,
  unavailable,
}

export default function CreativePage() {
  let [type, setType] = useState<null | CreativeType>(null);

  let handleClickChoose = (type: CreativeType): void => {
    setType(type);
  };

  useEffect(() => {
    const loading_screen = document.getElementById('ipl-progress-indicator');
    loading_screen.classList.remove('available');
    {
      setTimeout(() => {
        loading_screen.classList.add('available');
      }, 500);
    }
  }, []);
  return (
    <Box>
      <Header.Fixed />
      <CreativeBanner />
      <Box>
        <Section>
          <Flex mt={4} mb={4} flexDirection="row" alignItems="center" flexWrap="wrap">
            <H2>Imuzik Sáng tạo</H2>
          </Flex>
        </Section>
        {/*Button*/}
        {type === null && (
          <Section>
            <Box
              pl={'15%'}
              pr={'15%'}
              flexDirection="row"
              alignItems="center"
              flexWrap="wrap"
              mb={9}>
              <Box mt={4}>
                <Button
                  onClick={() => handleClickChoose(CreativeType.available)}
                  variant="outline"
                  width="100%"
                  css={{ height: 68 }}
                >
                  Tạo nhạc chờ mới
                  <br />
                  từ bài hát có sẵn trên hệ thống
                </Button>
              </Box>

              <Box mt={4}>
                <Button
                  onClick={() => handleClickChoose(CreativeType.unavailable)}
                  variant="outline"
                  width="100%"
                  css={{ height: 68 }}>
                  Tạo nhạc chờ
                  <br />
                  từ bài hát chưa có trên hệ thống
                </Button>
              </Box>

              <Box mt={4} mb={2}>
                <Button variant="outline" width="100%" css={{ height: 68 }}>
                  Tạo nhạc chờ
                  <br />
                  do chính mình sáng tác
                </Button>
              </Box>
            </Box>
          </Section>
        )}
        {type === CreativeType.available && (
          <WsProvider>
            <CreativeAvailable />
          </WsProvider>
        )}
        {type === CreativeType.unavailable && (
          <WsProvider>
            <CreativeUnavailable setType={setType} />
          </WsProvider>
        )}
      </Box>
      <Footer />
    </Box>
  );
}
