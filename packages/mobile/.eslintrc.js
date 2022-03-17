module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  env: {
    browser: true,
  },
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  rules: {
    'eslint-comments/no-unlimited-disable': [0],
    'react-native/no-inline-styles': [0],
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'import/namespace': [0],
    'import/export': [0],
    'prettier/prettier': [2],
    'max-len': [
      'error',
      {
        code: 150,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'jest/expect-expect': [0],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
    'import/ignore': ['.css', '.scss', '.sass', '.less'],
  },
};
