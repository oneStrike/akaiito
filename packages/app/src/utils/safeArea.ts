/**
 * 安全区域工具函数
 * 用于获取不同平台的状态栏高度和安全区域信息
 */

/**
 * 获取状态栏高度（单位：px）
 * 兼容各种手机水滴屏、刘海屏等异形屏
 */
export function getStatusBarHeight(): number {
  try {
    const systemInfo = uni.getSystemInfoSync()

    // #ifdef APP-PLUS
    // App平台直接使用statusBarHeight
    return systemInfo.statusBarHeight || 0
    // #endif

    // #ifdef MP
    // 小程序平台使用statusBarHeight
    return systemInfo.statusBarHeight || 0
    // #endif

    // #ifdef H5
    // H5平台在移动端模拟器中可能需要特殊处理
    // 在真实移动端浏览器中，通常不需要状态栏高度
    return 0
    // #endif

    return 0
  } catch (error) {
    console.warn('获取状态栏高度失败:', error)
    return 0
  }
}

/**
 * 获取安全区域顶部高度（单位：px）
 * 包含状态栏高度 + 可能的刘海屏/水滴屏额外高度
 */
export function getSafeAreaTop(): number {
  try {
    const systemInfo = uni.getSystemInfoSync()

    // 优先使用safeArea信息
    if (systemInfo.safeArea && systemInfo.safeArea.top !== undefined) {
      return systemInfo.safeArea.top
    }

    // 降级使用statusBarHeight
    return getStatusBarHeight()
  } catch (error) {
    console.warn('获取安全区域顶部高度失败:', error)
    return getStatusBarHeight()
  }
}

/**
 * 获取安全区域底部高度（单位：px）
 * 用于适配底部指示器（如iPhone的Home Indicator）
 */
export function getSafeAreaBottom(): number {
  try {
    const systemInfo = uni.getSystemInfoSync()

    if (systemInfo.safeArea && systemInfo.screenHeight) {
      const safeAreaBottom =
        systemInfo.screenHeight - systemInfo.safeArea.bottom
      return safeAreaBottom > 0 ? safeAreaBottom : 0
    }

    return 0
  } catch (error) {
    console.warn('获取安全区域底部高度失败:', error)
    return 0
  }
}

/**
 * 获取导航栏高度（单位：px）
 * 包含状态栏 + 导航栏内容区域
 */
export function getNavigationBarHeight(): number {
  try {
    const systemInfo = uni.getSystemInfoSync()
    const statusBarHeight = getStatusBarHeight()

    // #ifdef APP-PLUS
    // App平台导航栏高度通常是44px（iOS）或48px（Android）
    const isIOS = systemInfo.platform === 'ios'
    const navBarContentHeight = isIOS ? 44 : 48
    return statusBarHeight + navBarContentHeight
    // #endif

    // #ifdef MP
    // 小程序平台的导航栏高度
    // 微信小程序导航栏内容区域通常是44px
    return statusBarHeight + 44
    // #endif

    // #ifdef H5
    // H5平台通常不需要考虑原生导航栏
    return 0
    // #endif

    return statusBarHeight + 44
  } catch (error) {
    console.warn('获取导航栏高度失败:', error)
    return 44
  }
}

/**
 * 将px转换为rpx
 * @param px 像素值
 * @returns rpx值
 */
export function pxToRpx(px: number): number {
  try {
    const systemInfo = uni.getSystemInfoSync()
    const screenWidth = systemInfo.screenWidth || 375
    return (px * 750) / screenWidth
  } catch (error) {
    console.warn('px转rpx失败:', error)
    return px * 2 // 降级处理，假设2倍关系
  }
}

/**
 * 获取状态栏高度（单位：rpx）
 */
export function getStatusBarHeightRpx(): number {
  return pxToRpx(getStatusBarHeight())
}

/**
 * 获取安全区域顶部高度（单位：rpx）
 */
export function getSafeAreaTopRpx(): number {
  return pxToRpx(getSafeAreaTop())
}

/**
 * 获取安全区域底部高度（单位：rpx）
 */
export function getSafeAreaBottomRpx(): number {
  return pxToRpx(getSafeAreaBottom())
}

/**
 * 获取导航栏高度（单位：rpx）
 */
export function getNavigationBarHeightRpx(): number {
  return pxToRpx(getNavigationBarHeight())
}
