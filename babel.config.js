module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.js', '.jsx', '.es', '.es6', '.mjs', '.ts', '.tsx'],
        alias: {
          '@src':'./src',
          '@Components':'./src/Components',
          '@utils':'./src/utils',
          '@Constants':'./src/Constants',
          "@Navigation": './src/Navigation',
          "@Services": './src/Services',
          "@Zustand" : './src/Zustand',


          '@app': './app',
          '@components': './app/components',
          '@screens': './app/screens',
          '@context': './app/context',
          '@constants': './app/constants',
          '@routes': './app/routes',
          '@helpers': './app/helpers',
          '@services': './app/services',
          '@types': './app/types',
          '@query': './app/query',
          '@hooks': './app/hooks',
          '@localization': './app/localization',
        },
      },
    ],
    ['@babel/plugin-transform-export-namespace-from'],
    ['react-native-reanimated/plugin'],
  ],
};
