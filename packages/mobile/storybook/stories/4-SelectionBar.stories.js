import { text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { SelectionBar } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme } from '../../src/themes';

storiesOf('SelectionBar', module).add('Default', () => (
  <ThemeProvider theme={darkTheme}>
    <Box bg="defaultBackground" p={2}>
      <SelectionBar
        selectedKey="a"
        items={[
          { key: 'a', text: 'Nhạc trẻ' },
          { key: 'b', text: 'Trữ tình' },
          { key: 'c', text: 'Quốc tế' },
          { key: 'd', text: 'Sáng tạo' },
          { key: 'e', text: 'My Playlist' },
        ]}
      />
    </Box>
  </ThemeProvider>
));
