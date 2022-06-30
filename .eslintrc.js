module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:styled-components-a11y/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'styled-components-a11y'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-explicit-any': 0,
        'react/static-property-placement': 0,
        // prettier-ignore
        'quotes': [2, 'single'],
        'import/no-unresolved': 0,
        'comma-dangle': 0,
        'linebreak-style': 0,
        'react/state-in-constructor': 0,
        'no-underscore-dangle': 0,
        'react/jsx-props-no-spreading': 0,
        // prettier-ignore
        'semi': 1,
        'comma-dangle:': 0,
        'import/prefer-default-export': 0,
        'import/extensions': 0,
        'react/jsx-filename-extension': [
          1,
          {
            extensions: ['.jsx', '.tsx'],
          },
        ],
        '@typescript-eslint/explicit-function-return-type': 0,
      },
    },
  ],
};
