const { createProxyMiddleware } = require('http-proxy-middleware');

// eslint-disable-next-line func-names
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/lottowinnumber/fo/lottowinnumberlist', {
      target: 'https://www.fullayer.com',
      changeOrigin: true,
    }),
  );
};
