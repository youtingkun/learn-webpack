const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/index',
  // output是一个对象
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    // 先尝试 ts，tsx 后缀的 TypeScript 源码文件
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // use的顺序默认为从右到左
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        // 命中 SCSS 文件
        test: /\.scss$/,
        // 使用一组 Loader 去处理 SCSS 文件。
        // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // 排除 node_modules 目录下的文件
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        // 命中 JavaScript 文件
        test: /\.js$/,
        // 用 babel-loader 转换 JavaScript 文件,会根据.babelrc中的配置来转换。
        // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
        use: ['babel-loader?cacheDirectory'],
        // 只命中src目录里的js文件，加快 Webpack 搜索速度
        include: path.resolve(__dirname, 'src')
      },
      {
        // 同时匹配 ts，tsx 后缀的 TypeScript 源码文件
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        // 对非文本文件采用 file-loader 加载
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        use: ['file-loader']
      }
    ]
  },
  // plugins是一个数组，需要通过构造函数传入参数
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new VueLoaderPlugin()
  ],
  // mode: 'production',
  mode: 'development'
}
