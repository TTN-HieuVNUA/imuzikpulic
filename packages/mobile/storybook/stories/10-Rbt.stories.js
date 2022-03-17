import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { Rbt } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';

storiesOf('Rbt', module)
  .add('Dark', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" p={3}>
        <Rbt
          song={{
            image: 'https://via.placeholder.com/200',
            title: 'Lối Nhỏ',
            artist: 'Đen ft. Phương Anh Đào',
            composer: 'Đen',
          }}
          code="12342945"
          cp="DTECH"
          price={3000}
          expiry={30}
          published="20/09/2019"
          download={24015}
        />
      </Box>
    </ThemeProvider>
  ))
  .add('Light', () => (
    <ThemeProvider theme={lightTheme}>
      <Box bg="defaultBackground" p={3}>
        <Rbt
          song={{
            image: 'https://via.placeholder.com/200',
            title: 'Lối Nhỏ',
            artist: 'Đen ft. Phương Anh Đào',
            composer: 'Đen',
          }}
          code="12342945"
          cp="DTECH"
          price={3000}
          expiry={30}
          published="20/09/2019"
          download={24015}
        />
      </Box>
    </ThemeProvider>
  ));
