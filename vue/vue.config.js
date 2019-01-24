const path = require('path')
const fs = require('fs')

const resolve = dir => {
   return path.join(__dirname, dir)
}

// const env = process.env.NODE_ENV || 'development'
// fs.writeFileSync(path.join(__dirname, './config/env.js'), `export default '${env}'
// `)

// 这里需要修改为你线上项目存放的路径
// 比如你打包的文件放到服务器的my-app文件夹，域名为a.com，则应改为
// http(s)://a.com/my-app/
const BASE_URL = '/exchange/b11/'

module.exports = {
   // Project deployment base
   // By default we assume your app will be deployed at the root of a domain,
   // e.g. https://www.my-app.com/
   // If your app is deployed at a sub-path, you will need to specify that
   // sub-path here. For example, if your app is deployed at
   // https://www.foobar.com/my-app/
   // then change this to '/my-app/'
   baseUrl: BASE_URL,
   //输出到指定的目录
   outputDir: '../exchange/b11',
   // tweak internal webpack configuration.
   // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   chainWebpack: config => {
      config.resolve.alias
         .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
         .set('_c', resolve('src/components'))
         .set('_api', resolve('api'))
         config
         .entry('main.js')
         .add('babel-polyfill')
      // .set('vue','vue/dist/vue.js')
   },
//    configureWebpack: {
//       plugins: [
//          new MyAwesomeWebpackPlugin()
//        ]
//   },
   // 生产环境是否生成 sourceMap 文件
   productionSourceMap: false,
   devServer: {
      proxy: {
         '/api': {
            target: 'http://www.test_uat.55.exchange:5555/', // 测试本地环境
             // target: 'https://www.55.com/', // 测试本地环境
            changeOrigin: true,
            pathRewrite: {
               // '^/api': ''
            },
            secure: false
         },
         '/broker': {
            target: 'http://www.test_uat.55.exchange:5555/', // 测试环境行情推送
             // target: 'https://www.55.com/', // 测试本地环境
            changeOrigin: true,
            pathRewrite: {
               // '^/broker': ''
            },
            secure: false
         },
         '/quote': {
            target: 'http://www.test_uat.55.exchange:5555/', // 测试环境行情推送
             // target: 'https://www.55.com/', // 测试本地环境
            changeOrigin: true,
            pathRewrite: {
               // '^/quote': ''
            },
            secure: false
         },
      },

      //  proxy: {
      //    '/api': {
      //       // target: 'http://www.test_uat.55.exchange:5555/', // 测试本地环境
      //       target: 'https://www.55.com/', // 测试本地环境
      //       changeOrigin: true,
      //       pathRewrite: {
      //          // '^/api': ''
      //       },
      //       secure: false
      //    },
      //    '/broker': {
      //       // target: 'http://www.test_uat.55.exchange:5555/', // 测试环境行情推送
      //       target: 'https://www.55.com/', // 测试本地环境
      //       changeOrigin: true,
      //       pathRewrite: {
      //          // '^/broker': ''
      //       },
      //       secure: false
      //    },
      //    '/quote': {
      //       // target: 'http://www.test_uat.55.exchange:5555/', // 测试环境行情推送
      //       target: 'https://www.55.com/', // 测试本地环境
      //       changeOrigin: true,
      //       pathRewrite: {
      //          // '^/quote': ''
      //       },
      //       secure: false
      //    },
      // },
   }
}
