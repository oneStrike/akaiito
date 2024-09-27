function loginCode() {
  // #ifdef MP
  return new Promise(resolve => {
    uni.login({
      provider: 'weixin',
      success: (res: any) => {
        resolve(res.code)
      },
    })
  })
  // #endif

  // #ifndef MP
  return ''
  // #endif
}

export async function appId() {
  // #ifdef MP
  return uni.getAccountInfoSync().miniProgram.appId
  // #endif

  // #ifndef MP
  return ''
  // #endif
}

export const useWx = {
  loginCode,
  appId,
}
