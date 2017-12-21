const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const extractSass = new ExtractTextPlugin({filename: 'test.css'})

module.exports = {
  entry: [
    './test/test'
  ],
  resolve: {
    extensions: ['.scss', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'test'),
    filename: 'plectrum.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {sourceMap: true}
            }, {
              loader: 'sass-loader',
              options: {sourceMap: true}
            }
          ]
        })
      }
    ]
  },
  plugins: [
    extractSass,
    new HtmlPlugin({
      title: 'Plectrum',
      template: 'test/index.html'
    })
  ],
  devServer: {
    contentBase: 'web',
    historyApiFallback: true
  }
}
