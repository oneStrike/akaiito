export default {
  accessToken: {
    expiresIn: 1000 * 60 * 60
  },
  refreshToken: {
    expiresIn: 1000 * 60 * 60 * 24 * 2
  },
  routerWhiteList: ['Login'],
  httpWhiteList: [
    '/open/captcha/getCaptcha',
    '/admin/user/refreshAccessToken',
    '/admin/user/login'
  ]
}
