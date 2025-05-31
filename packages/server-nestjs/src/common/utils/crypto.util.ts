import { randomBytes, scrypt as _scrypt } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(_scrypt)

/**
 * 密码加密函数
 * 使用 scrypt 算法对密码进行加密
 * 返回格式为 "salt.hash"
 * @param password 原始密码
 * @param salt 可选的盐值，如果不提供则随机生成
 * @returns 加密后的密码字符串
 */
export async function encryptPassword(
  password: string,
  salt?: string,
): Promise<string> {
  // 如果没有提供盐值，则随机生成一个
  if (!salt) {
    salt = randomBytes(8).toString('hex')
  }

  // 使用 scrypt 算法加密密码
  const key = (await scrypt(password, salt, 32)) as Buffer

  // 返回 "salt.hash" 格式的字符串
  return `${salt}.${key.toString('hex')}`
}

/**
 * 验证密码函数
 * 比较输入的密码与存储的加密密码是否匹配
 * @param inputPassword 用户输入的原始密码
 * @param storedPassword 数据库中存储的加密密码
 * @returns 密码是否匹配
 */
export async function verifyPassword(
  inputPassword: string,
  storedPassword: string,
): Promise<boolean> {
  // 从存储的密码中提取盐值
  const salt = storedPassword.split('.')[0]

  // 使用相同的盐值加密输入的密码
  const encryptedInput = await encryptPassword(inputPassword, salt)

  // 比较加密后的密码是否匹配
  return encryptedInput === storedPassword
}
