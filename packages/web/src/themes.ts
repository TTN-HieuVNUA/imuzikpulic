const gradients = ['linear-gradient(270deg, #11998E 0%, #38EF7D 100%)'];
const baseColors = {
  white: 'white',
  green: '#22E26B',
  yellow: '#FDCC26',
  red: '#F73939',
  yellow2: '#FCCC26',
  gradients,
};
const darkColors = {
  primary: baseColors.yellow,
  secondary: baseColors.green,
  ...baseColors,
  lightText: '#AAAAAA',
  normalText: 'white',
  defaultBackground: '#262523',
  alternativeBackground: '#32302E',
  playerBackground: '#5C5C5C',
  separator: '#3D3D3F',

  playerSeekBar: '#3D3D3F',
  playerCue: 'white',
  emptyCheckBox: '#757577',
  backgroundWs: '#32302E',
  hover: '#323231'
};
const lightColors = {
  ...baseColors,
  primary: baseColors.yellow,
  secondary: baseColors.green,
  lightText: '#676767',
  normalText: '#262523',
  defaultBackground: 'white',
  alternativeBackground: '#F1F1F1',
  playerBackground: '#aCaCaC',
  separator: '#F1F1F1',
  playerSeekBar: '#DDDDDD',
  playerCue: '#444444',
  emptyCheckBox: '#DDDDDD',
  backgroundWs: '#e7e4e4',
  hover: '#d2d1d1'
};
type Colors = typeof darkColors;
const fontSizes = [10, 12, 14, 17, 20, 23, 30, 42];

const themeCommon = (colors: Colors) => ({
  forms: {
    input: {
      color: colors.normalText,
      px: 5,
      py: 2,
    },
    label: {
      color: 'lightText',
      mb: 3,
    },
  },
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 5, 10, 15, 20, 30, 40, 50, 60, 100, 200],
  fontSizes,
  fonts: {
    body: 'Lato, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 24px rgba(0, 0, 0, .125)',
  },
  text: {
    color: colors.normalText,
  },
  buttons: {
    primary: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#262523',
      path: {
        fill: '#262523 !important',
      },
      '.icon': {
        paddingRight: 2,
      },
      bg: 'primary',
      padding: '6px 24px',
      fontSize: 4,
      fontWeight: 'bold',
      fontFamily: 'body',
    },
    secondary: {
      cursor: 'pointer',
      color: '#262523',
      background: gradients[0],
      fontSize: 2,
      fontWeight: 'bold',
      px: 3,
      py: 1,
      '&:disabled': {
        background: colors.separator,
        color: colors.lightText,
      },
    },
    clear: {
      cursor: 'pointer',
      color: 'lightText',
      background: 'transparent',
      fontSize: 2,
      fontWeight: 'bold',
      px: 3,
      py: 1,
      '&:disabled': {
        background: colors.separator,
        color: colors.lightText,
      },
    },
    outline: {
      cursor: 'pointer',
      borderRadius: 8,
      fontSize: 4,
      // fontWeight: 'bold',
      fontFamily: 'body',
      color: 'secondary',
      background: 'none',
      padding: '8px 16px',
      border: '1px solid',
      borderColor: 'secondary',
      '&:hover': {
        // padding: '9px 52px',
        background: gradients[0],
        color: '#262523',
        border: 'none',
      },
      '&:disabled': {
        // padding: '9px 52px',
        color: colors.lightText,
        borderColor: colors.lightText,
        border: '1px solid',
      },
      '&:disabled:hover': {
        // padding: '9px 52px',
        border: '1px solid',
        background: 'none',
        color: colors.lightText,
        borderColor: colors.lightText,
      },
    },
    mutedOutline: {
      cursor: 'pointer',
      fontSize: 2,
      fontWeight: 'bold',
      px: 3,
      py: 1,
      borderRadius: 5,
      color: colors.lightText,
      border: '1px solid',
      borderColor: colors.lightText,
      bg: 'transparent',
    },
    muted: {
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      textDecoration: 'underline',
      textTransform: 'uppercase',
      color: '#848484',
      fontSize: 17,
      lineHeight: '20px',
      padding: '24px 10px',
    },
  },
});

export const darkTheme = {
  ...themeCommon(darkColors),
  colors: darkColors,
  name: 'Dark',
};

export const lightTheme = {
  ...themeCommon(lightColors),
  colors: lightColors,
  name: 'Light',
};

export type Theme = typeof darkTheme;
