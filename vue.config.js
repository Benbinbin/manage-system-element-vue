module.exports = {
  publicPath: '/manage-system-element-vue/',
  devServer: {
    port: 3030,
    open: true,
    // proxy: {}
  },
  css: {
    loaderOptions: {
      sass: {
        // 引入 SCSS 全局变量 _variable.scss 文件
        // @ 表示路径 src
        prependData: `@import "@/assets/scss/_variable.scss";`
      }
    }
  }
}