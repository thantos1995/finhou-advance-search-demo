const { merge } = require('webpack-merge');
const baseConfig = require('./base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env)=>{

  return merge(baseConfig(env), {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/react-advance-search/index.html'
      })
    ],
    // output: {
    //   path: path.resolve(__dirname, './dist'),
    //   filename: 'index_bundle.js'
    // },
  
    devtool: 'eval-source-map',

    entry: {
      "advance-search": './src/react-advance-search/index.jsx'
    },
    mode:'development',
    devServer: {
      inline: true,
      contentBase: './dist',
      port: '9000',
      hot: true,
    },
  
    module: {
      rules: [
        {test: /\.css$/i,use: ['style-loader','css-loader?importLoaders=1',]},
        {test: /\.html$/,use: [{loader: "html-loader"}]},
      ],
    },
  });
}