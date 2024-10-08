import { scrypt as _scrypt, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(_scrypt)

export const encryption = async function encryption(
  str: string,
  salt?: string,
): Promise<string> {
  if (!salt) {
    salt = randomBytes(8).toString('hex')
  }
  const key = (await scrypt(str, salt, 32)) as Buffer
  return `${salt}.${key.toString('hex')}`
}
