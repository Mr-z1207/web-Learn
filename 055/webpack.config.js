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
    path: path.resolve(__dirname, 'dist'),
    //指定输出参考根路径
    publicPath:'/',
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
      },
      {
        test:/\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env','es2015','react','stage-3'],
                plugins: [
                    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] 
                ]
            }
        }               
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
        template:'./src/index.html',
        filename:'index.html',
        // inject:true,
        hash:true
    }),
    new CleanWebpackPlugin()
  ],
  devServer:{
    contentBase: path.join(__dirname, 'dist'),//内容的目录
    port:8080,//服务运行的端口,
    historyApiFallback:true//让h5路由不向后端发送请求
  }
};