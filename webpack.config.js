const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')
const ReloadHtmlPlugin = require('reload-html-webpack-plugin')
const webpack = require('webpack')

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
        use: [
            {
              loader: 'style-loader',
              options: {sourceMap: true}
            }, {
              loader: 'css-loader',
              options: {sourceMap: true}
            }, {
              loader: 'sass-loader',
              options: {sourceMap: true}
            }
          ]
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      title: 'Plectrum',
      template: 'test/index.html'
    }),
    new ReloadHtmlPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    contentBase: 'test',
    historyApiFallback: true
  }
}
