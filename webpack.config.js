const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[name].[ext]?[hash]'
          }
        }]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.art$/,
        loader: 'art-template-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin({
      title: 'GPlayer',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      inject: true,
      js: ["https://cdn.jsdelivr.net/npm/stats.js"]
    })
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        }
      },
      'less-loader'
    ]
  })
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    historyApiFallback: true,
    hot: true
  }
  config.plugins.push( //对应上面hot,局部更新组建，不刷新网页
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'

  let extractLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {}
  }

  config.module.rules.push({
    test: /\.less$/,
    use: [
      extractLoader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'less-loader'
    ]
  })
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css'
    })
  )

  // https://juejin.im/post/5af1677c6fb9a07ab508dabb
  config.optimization = {
    splitChunks: {
      chunks: 'async', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
      // 大于30KB才单独分离成chunk
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3, // 最大初始化请求书，默认1
      name: true,
      cacheGroups: { //设置缓存的 chunks
        default: {
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          name: 'vendors', // 要缓存的 分隔出来的 chunk 名称
          test: /[\\/]node_modules[\\/]/, //正则规则验证 符合就提取 chunk
          priority: -10, // 缓存组优先级
          chunks: "all" // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        },

        echarts: {
          name: 'echarts',
          chunks: 'all',
          // 对echarts进行单独优化，优先级较高
          priority: 20,
          test: function (module) {
            var context = module.context;
            return context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0)
          }
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  }
}

module.exports = config