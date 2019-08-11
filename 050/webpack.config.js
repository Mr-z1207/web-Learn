const path = require('path');

module.exports = {
  //打包方式
  mode:'development',  //正在开发
  //入口
  entry: {
    index:'./src/index.js',
    // about:'./src/about.js'
  },
  //出口
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
                limit: 10
            }
          }
        ]
      }
    ]
  }
};