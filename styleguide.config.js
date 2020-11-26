module.exports = {
  webpackConfig: require('./webpack/dev.config.js'),
  serverPort: 8000,
  ignore: ['src/**/index.*'],
  sections:[
    {
      name: 'Giới thiệu',
      content: './src/react-advance-search/doc/introduction.md'
    },
    {
      name: 'Cài đặt',
      content: './src/react-advance-search/doc/installation.md'
    },
    {
      name: 'React Component',
      components: './src/react-advance-search/**/*.jsx',
      exampleModule: 'collapse',
      usageMode: 'expand'
    }
  ]
};