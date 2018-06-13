// 整个文件使用绝对路径
const path = require('path')
// 在index.html中引入main.js入口文件
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// css单独抽取打包  ExtractPlugin作用：将非Javascript的代码单独打包成一个静态资源文件
const ExtractPlugin = require('extract-text-webpack-plugin')

// 存在生产环境 和开发环境两种
// 判断开发或者生产环境  NODE_ENV在package.json中配置 配置项目启动和打包命令
const isDev = process.env.NODE_ENV === 'development'
const config = module.exports = {
  target: 'web',
  entry: ['babel-polyfill', path.join(__dirname, 'src/main.js')],
  output: {
    filename: 'bundle.[name].[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 处理以.js结尾的文件
        exclude: /node_modules/, // 处理除了nodde_modules里的js文件
        loader: 'babel-loader' // 用babel-loader处理实现ES6降级到ES5
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(gif|jpg|png|svg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: '[name]-a.[ex]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    })
  ],
  /* 外部扩展 */
  externals: {
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.common.js'
    }
  }
}
// 判断开发或者生产环境
if (isDev) {
  config.module.rules.push({
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  config.devtool = '#eval-source-map' // 调试源码而不是编译之后的代码
  config.devServer = {
    port: 8030,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HTMLPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: path.join(__dirname, 'dist/index.html')
    })
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/main.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl$/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    })
  })
  config.plugins.push(
    new HTMLPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: path.join(__dirname, 'dist/index.html'),
      chunks: ['runtime', 'vendor', 'commons', 'app'],
      chunksSortMode: 'manual'
    })
  )
}
config.plugins.push(
  // 执行输出的静态文件的名字
  new ExtractPlugin('styles.[contentHash:8].css'),
  // 配置单独打包vendor.js文件
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  }),
  // 把webpack相关的代码从app.js中单独拿出来单独打包到runtime（一般情况这样命名）文件
  new webpack.optimize.CommonsChunkPlugin({
    name: 'runtime'
  }),
  // 抽取第三方公用模块 element-ui
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    minChunks: function (module, count) {
    // any required modules inside node_modules are extracted to vendor
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf('element-ui') > -1 // 注意有没有其他模块的名称也包含 echarts
      )
    },
    chunks: ['vendor', 'app']
  })
)
module.exports = config
