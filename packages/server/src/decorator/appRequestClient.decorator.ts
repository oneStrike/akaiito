import { createCustomParamDecorator } from '@midwayjs/core'

export const APP_REQUEST_PLATFORM = 'decorator:app_request_platform_key'

/**
 * 获取app请求客户端，app，web,applet
 * @constructor
 */
export function AppRequestPlatform(): ParameterDecorator {
  return createCustomParamDecorator(APP_REQUEST_PLATFORM, {})
}

export function getAppRequestPlatformHandler(options): 'web' | 'applet' | 'app' {
  const ctx = options.originArgs[0]
  return ctx.request.headers.platform
}
