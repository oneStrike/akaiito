const path = require('node:path')
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  target: 'node',
  experiments: {
    asyncWebAssembly: true, // 推荐使用异步 WebAssembly
    // 或者使用 syncWebAssembly（已弃用）
    // syncWebAssembly: true,
  },
  externals: [
    nodeExternals({
      allowlist: [
        'webpack/hot/poll?100',
        // 允许处理workspace包，确保热重载正常工作
        /@akaiito\/.*/,
        // 允许处理Prisma客户端的runtime模块，确保WASM文件能正确解析
        /@prisma\/client\/runtime\/.*/,
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            // 启用转译模式，提高编译速度
            transpileOnly: true,
            // 获取类型检查信息但不阻塞编译
            getCustomTransformers: (program) => ({
              before: [],
            }),
            // 编译器选项
            compilerOptions: {
              // 保持与tsconfig.json一致，但优化热重载
              incremental: true,
              tsBuildInfoFile: path.resolve(__dirname, '.tsbuildinfo'),
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.wasm$/,
        type: 'webassembly/async',
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // 修复 Prisma WASM 文件引用问题
      './query_compiler_bg.js': '@prisma/client/runtime/query_compiler_bg.postgresql.js',
    },
    // 优化模块解析
    modules: ['node_modules', path.resolve(__dirname, 'src')],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({
      name: 'server.js',
      autoRestart: false,
      // 添加信号处理，确保优雅重启
      signal: 'SIGUSR2',
      keyboard: true,
    }),
    // 添加环境变量插件
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    // 忽略不必要的文件变化
    new webpack.WatchIgnorePlugin({
      paths: [/\.git/, /node_modules/, /dist/, /\.tsbuildinfo$/],
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
    // 清理输出目录
    clean: true,
  },
  // 优化开发体验
  devtool: 'eval-source-map',
  // 监听配置
  watchOptions: {
    // 忽略文件
    ignored: /node_modules/,
    // 聚合变化，减少重新构建次数
    aggregateTimeout: 300,
    // 轮询间隔（毫秒）
    poll: 1000,
  },
  // 性能优化
  optimization: {
    // 移除未使用的导出
    usedExports: true,
    // 不进行代码分割（Node.js不需要）
    splitChunks: false,
    // 不压缩代码（开发模式）
    minimize: false,
  },
  // 统计信息配置
  stats: {
    colors: true,
    modules: false,
    chunks: false,
    chunkModules: false,
    children: false,
    warnings: true,
    errors: true,
  },
}
