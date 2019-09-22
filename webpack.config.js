const Path = require('path')

module.exports = {
  watch: false,
  mode: 'development',
  entry: './src/index.js',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: Path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}