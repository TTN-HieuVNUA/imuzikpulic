import './rn-addons';

import { configure, getStorybookUI } from '@storybook/react-native';
import { AppRegistry, AsyncStorage } from 'react-native';

import { loadStories } from './storyLoader';

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({ asyncStorage: AsyncStorage });

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('imuzik', () => StorybookUIRoot);

export default StorybookUIRoot;
