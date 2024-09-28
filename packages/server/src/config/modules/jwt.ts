export const jwtConfig = {
  secret: 'akaiito',
  signOptions: { expiresIn: 1000 * 60 * 60 },
  verifyOptions: { complete: true },
  whiteList: ['/admin/user/login', '/open/captcha/getCaptcha'],
}
