module.exports = {
  // publicPath
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/',
  devServer: {
    port: 80,
    // proxy: {
    //   '/api': {
    //     target: 'https://course-ec-api.hexschool.io/api',
    //   },
    // },
  },
};
