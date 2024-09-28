export const jwtConfig = {
  secret: 'auy',
  signOptions: { expiresIn: 1000 * 60 * 60 },
  verifyOptions: { complete: true },
  whiteList: ['/admin/user/login', '/open/captcha/getCaptcha'],
}
