const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');


module.exports = (env)=>{

    return{
        plugins: [
            new webpack.EnvironmentPlugin({ NODE_ENV: env.NODE_ENV, test: true }),
        ],
        module:{
            rules: [
                { test: /\.(js|jsx)$/, exclude: /node_modules/, use: {loader: "babel-loader"}},
                { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
                // { test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000" },
                { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?prefix=font/&limit=5000" },
                { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
                { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                    options: {
                      name: '[path][name].[ext]',
                    },
                },
            ]
        },
    }
};





