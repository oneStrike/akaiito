export const jwtConfig = {
  secret: 'akaiito',
  sign: {
    expiresIn: '2h',
    algorithm: 'ES256',
  },
  verify: {
    complete: true,
  },
  whiteList: [
    '/open/captcha/getCaptcha',
    '/admin/user/login',
    '/app/user/createAppUser',
    '/app/user/login',
    '/common/upload/uploadFile',
  ],
}
