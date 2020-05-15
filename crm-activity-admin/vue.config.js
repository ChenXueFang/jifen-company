// vue.config.js
const path = require('path')

module.exports = {  
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  publicPath: './',  
  // 输出文件目录
  outputDir: 'dist',  
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,  
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,  
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,  
  // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,  
  // webpack相关配置
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', path.resolve(__dirname, './src'))
  },
  configureWebpack: (config) => {    
  if (process.env.NODE_ENV === 'production') {      
      // 为生产环境修改配置...
    } else {      
      // 为开发环境修改配置...
    }
  },  
  // css相关配置
  css: {    
    // css预设器配置项
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    },    
  },  
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,   
    // http 代理配置
    proxy: {      
      '/api': {
        target: 'http://medical.crmclick.com',
        changeOrigin: true,
        ws: false, //值为false防止控制台报错
        pathRewrite: {          
            '^/api': ''
        }
      }
    },
    before: (app) => {}
  }, 
  // 第三方插件配置
  pluginOptions: {

  }
}