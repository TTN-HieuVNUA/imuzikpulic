import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { Icon, ICON_GRADIENT_1, ListItem } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';

const allTabBars = (
  <Box bg="defaultBackground" px={3}>
    <ListItem
      icon={<Icon name="address-book" size={16} />}
      title="Nhóm mặc định"
      titleWidth={1 / 2}
      showEllipsis="visible"
      onPress={action('onEllipsisClick')}
    />
    <ListItem
      title="039 592 1"
      value="Nguyễn Văn A"
      titleWidth={1 / 3}
      showEllipsis="visible"
      onPress={action('onEllipsisClick')}
    />
    <ListItem
      title="Viet Nam oi"
      subtitle="FM"
      value="Nguyễn Văn A"
      titleWidth={1 / 3}
      showEllipsis="visible"
      onPress={action('onEllipsisClick')}
    />
    <ListItem
      title="Vĩnh viễn"
      icon={<Icon name="check" size={16} color={ICON_GRADIENT_1} />}
      iconPadding={3}
      titleWidth={1}
    />
    <ListItem
      title="Vĩnh viễn"
      icon={<Icon name="round" size={16} color="emptyCheckBox" />}
      iconPadding={3}
      titleWidth={1}
    />
  </Box>
);
storiesOf('ListItem', module)
  .add('Dark', () => <ThemeProvider theme={darkTheme}>{allTabBars}</ThemeProvider>)
  .add('Light', () => <ThemeProvider theme={lightTheme}>{allTabBars}</ThemeProvider>);
