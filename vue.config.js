const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const resolve = dir => {
   return path.join(__dirname, dir)
}

// const env = process.env.NODE_ENV || 'development'
// fs.writeFileSync(path.join(__dirname, './config/env.js'), `export default '${env}'
// `)

// 这里需要修改为你线上项目存放的路径
// 比如你打包的文件放到服务器的my-app文件夹，域名为a.com，则应改为
// http(s)://a.com/my-app/
const BASE_URL = '/'

const targetUrl = 'https://uat.us.55gm.co/' // us测试环境
//   const targetUrl='http://www.test_uat.55.exchange:5555/' // 测试本地环境
//  const targetUrl='http://uspc.55.exchange:8880/' // us测试环境
// const targetUrl='https://us.55gm.co/' //生产

module.exports = {
   transpileDependencies: [
      'vue-echarts',
      'resize-detector'
   ],
   // Project deployment base
   // By default we assume your app will be deployed at the root of a domain,
   // e.g. https://www.my-app.com/
   // If your app is deployed at a sub-path, you will need to specify that
   // sub-path here. For example, if your app is deployed at
   // https://www.foobar.com/my-app/
   // then change this to '/my-app/'
   publicPath: BASE_URL,
   //输出到指定的目录
   // outputDir: '../exchange/b11',
   // tweak internal webpack configuration.
   // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   chainWebpack: config => {
      config.resolve.alias
         .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
         .set('_c', resolve('src/components'))
         .set('_api', resolve('api'))
      // config
      // .entry('main.js')
      //   .add('babel-polyfill')
      // .set('vue','vue/dist/vue.js')
   },
   // configureWebpack: {
   //    plugins: [
   //       new webpack.ProvidePlugin({
   //          jQuery: 'jquery',
   //          $: 'jquery'
   //       })
   //    ]
   // },
   // 生产环境是否生成 sourceMap 文件
   productionSourceMap: false,
   // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
   // 设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
   // 如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'error'。这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
   lintOnSave: false,
   devServer: {
      proxy: {
         '/api': {
            target: targetUrl, // 全站
            changeOrigin: true,
            pathRewrite: {
               // '^/api': ''
            },
            secure: false
         },
         '/broker': {
            target: targetUrl, // 交易
            changeOrigin: true,
            pathRewrite: {
               // '^/broker': ''
            },
            secure: false
         },
         '/quote': {
            target: targetUrl, // 行情推送
            changeOrigin: true,
            pathRewrite: {
               // '^/quote': ''
            },
            secure: false
         },
      },
   }
}
