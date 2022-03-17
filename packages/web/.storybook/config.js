import { addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-emotion-theme';
import StoryRouter from 'storybook-react-router';

import { darkTheme, lightTheme } from '../src/themes';

const themes = [darkTheme, lightTheme];
addDecorator(withThemesProvider(themes));
addDecorator(StoryRouter());
