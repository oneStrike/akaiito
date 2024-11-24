/**
 * 获取微信登录凭证
 *
 * 该函数用于发起微信登录，返回一个Promise对象，该Promise对象解析为微信登录的临时票据（code）
 * 这个code后续可以用于换取微信开放平台的access_token等信息
 *
 * @returns {Promise<string>} 返回一个Promise对象，resolve时携带微信登录的临时票据code，reject时携带错误信息
 */
const getLoginCode = () => {
  return new Promise((resolve, reject) => {
    // #ifdef MP
    // 调用微信登录接口，指定使用微信作为登录提供者
    uni.login({
      provider: 'weixin',
      // 登录成功时的回调，将微信返回的临时票据code传递给resolve方法
      success(res) {
        resolve(res.code)
      },
      // 登录失败时的回调，通过reject方法传递错误
      fail: reject,
    })
    // #endif
    // #ifndef MP
    return resolve('')
    // #endif
  })
}

/**
 * 获取微信小程序的AppID
 *
 * 此函数通过uni.getAccountInfoSync()方法同步获取当前微信小程序的账户信息对象
 * 然后返回该对象中的appId属性，即小程序的唯一标识符
 */
const getWxAppId = () => {
  // #ifdef MP
  return uni.getAccountInfoSync().miniProgram.appId
  // #endif
}

export const useWx = {
  getLoginCode,
  getWxAppId,
}
