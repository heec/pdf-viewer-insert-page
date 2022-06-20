const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pdfwebviewerDir = path.join(
  path.dirname(require.resolve('@pdf-tools/four-heights-pdf-web-viewer')),
  '../pdfwebviewer'
)

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          to: 'pdfwebviewer',
          context: pdfwebviewerDir,
        },
        {
          from: '**/*',
          to: './',
          context: 'public',
        },
      ],
    }),
  ],
}
