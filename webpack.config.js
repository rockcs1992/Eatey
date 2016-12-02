var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/main.jsx',
  output: { path: __dirname + '/client', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, 
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      }
    ]
  },
};
