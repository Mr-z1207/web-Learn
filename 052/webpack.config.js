const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  //打包方式
  mode:'development',  //正在开发
  //入口
  entry: {
    index:'./src/index.js',
  },
  //出口
  output: {
    filename: '[name].js',
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
  },
  plugins:[
    new HtmlWebpackPlugin({
        template:'./src/index.html',
        filename:'index.html',
        inject:true,
        hash:true
    }),
    new CleanWebpackPlugin()
  ],
  devServer:{
    contentBase: path.join(__dirname, 'dist'),//内容的目录
    port:8080//服务运行的端口
  }
};