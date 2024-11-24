/**
 * 从路径中获取请求源。
 *
 * 该函数用于解析请求路径，提取出请求源的部分。
 * 它假设路径格式为 '/source/path'，其中 'source' 是请求源的标识。
 *
 * @param path 请求的完整路径，例如 '/app/path' 或 '/admin/path'。
 * @returns 返回请求源的标识，例如 'app' 或 'admin'。
 */
export function requestSource(path: string) {
  return path.split('/')[1]
}

/**
 * 判断请求是否来源于客户端。
 *
 * 该函数通过调用 `requestSource` 函数并与 'app' 进行比较，
 * 来确定请求是否来自客户端。
 *
 * @param path 请求的完整路径，例如 '/app/path' 或 '/admin/path'。
 * @returns 如果请求源是 'app'，则返回 true；否则返回 false。
 */
export function isAppRequest(path: string) {
  return requestSource(path) === 'app'
}

/**
 * 判断请求是否来源于管理员。
 *
 * 该函数通过调用 `requestSource` 函数并与 'admin' 进行比较，
 * 来确定请求是否来自管理员。
 *
 * @param path 请求的完整路径，例如 '/app/path' 或 '/admin/path'。
 * @returns 如果请求源是 'admin'，则返回 true；否则返回 false。
 */
export function isAdminRequest(path: string) {
  return requestSource(path) === 'admin'
}

export function isOpenRequest(path: string) {
  return requestSource(path) === 'open'
}
