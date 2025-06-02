import { Buffer } from 'node:buffer'
import {
  constants,
  generateKeyPairSync,
  privateDecrypt,
  publicEncrypt,
} from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RsaKeyType } from '@/common/enum/rsa'
/**
 * RSA密钥对
 */
export interface RsaKeyPair {
  publicKey: string
  privateKey: string
}

/**
 * RSA服务
 * 负责初始化RSA密钥对并提供加密解密功能
 */
@Injectable()
export class RsaService implements OnModuleInit {
  private static instance: RsaService
  private keyPairs: Map<RsaKeyType, RsaKeyPair> = new Map()
  private isDevelopment: boolean

  constructor(private configService: ConfigService) {
    this.isDevelopment = configService.get<string>('NODE_ENV') === 'development'
  }

  /**
   * 模块初始化时，初始化RSA密钥对
   */
  async onModuleInit() {
    await this.initialize()
    console.log('RSA密钥对初始化完成')
  }

  /**
   * 初始化RSA密钥对
   * 检查环境变量中是否有admin、client、login的公私钥配置
   * 如果没有则生成，开发环境写入环境变量文件，生产环境写入系统环境变量
   */
  public async initialize(): Promise<void> {
    // 初始化Admin RSA密钥对
    await this.initializeKeyPair(RsaKeyType.ADMIN)

    // 初始化Client RSA密钥对
    await this.initializeKeyPair(RsaKeyType.CLIENT)

    // 初始化Login RSA密钥对
    await this.initializeKeyPair(RsaKeyType.LOGIN)
  }

  /**
   * 初始化指定类型的RSA密钥对
   * @param keyType 密钥类型
   */
  private async initializeKeyPair(keyType: RsaKeyType): Promise<void> {
    const prefix = `${keyType}_RSA`

    const privateKeyPath = this.configService.get<string>(
      `${prefix}_PRIVATE_KEY_PATH`,
    )
    const publicKeyPath = this.configService.get<string>(
      `${prefix}_PUBLIC_KEY_PATH`,
    )
    const publicKeyEnv = this.configService.get<string>(`${prefix}_PUBLIC_KEY`)
    const privateKeyEnv = this.configService.get<string>(
      `${prefix}_PRIVATE_KEY`,
    )

    // 如果环境变量中直接配置了公私钥，则使用环境变量中的公私钥
    if (publicKeyEnv && privateKeyEnv) {
      this.keyPairs.set(keyType, {
        publicKey: publicKeyEnv,
        privateKey: privateKeyEnv,
      })
      return
    }

    // 如果只配置了公钥，则只能用于加密，不能用于解密
    if (publicKeyEnv) {
      this.keyPairs.set(keyType, {
        publicKey: publicKeyEnv,
        privateKey: '',
      })
      return
    }

    // 如果配置了密钥路径，尝试从文件中读取
    if (privateKeyPath && publicKeyPath) {
      try {
        // 确保目录存在
        this.ensureDirectoryExists(privateKeyPath)
        this.ensureDirectoryExists(publicKeyPath)

        // 检查文件是否存在
        if (existsSync(privateKeyPath) && existsSync(publicKeyPath)) {
          const privateKey = readFileSync(privateKeyPath, 'utf8')
          const publicKey = readFileSync(publicKeyPath, 'utf8')
          this.keyPairs.set(keyType, { privateKey, publicKey })
          return
        }
      } catch (error) {
        console.error(`读取${keyType} RSA密钥文件失败:`, error)
      }
    }

    // 如果无法从文件或环境变量读取，则生成新的密钥对
    const newKeyPair = this.generateKeyPair()
    this.keyPairs.set(keyType, newKeyPair)

    // 根据环境决定如何保存密钥
    if (this.isDevelopment) {
      // 开发环境：保存到环境变量文件
      if (privateKeyPath && publicKeyPath) {
        try {
          this.ensureDirectoryExists(privateKeyPath)
          this.ensureDirectoryExists(publicKeyPath)
          writeFileSync(privateKeyPath, newKeyPair.privateKey)
          writeFileSync(publicKeyPath, newKeyPair.publicKey)
          console.log(`${keyType} RSA密钥对已生成并保存到文件`)
        } catch (error) {
          console.error(`保存${keyType} RSA密钥文件失败:`, error)
        }
      } else {
        console.log(`${keyType} RSA密钥对已生成，但未配置保存路径`)
        // 这里可以考虑将密钥写入.env.development文件
        // 但需要额外的文件操作逻辑
      }
    } else {
      // 生产环境：记录日志，提示管理员设置环境变量
      console.warn(
        `${keyType} RSA密钥对已生成，但在生产环境中应通过环境变量配置`,
      )
    }
  }

  /**
   * 确保目录存在
   * @param filePath 文件路径
   */
  private ensureDirectoryExists(filePath: string): void {
    const dir = dirname(filePath)
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }
  }

  /**
   * 生成RSA密钥对
   * @returns RSA密钥对
   */
  private generateKeyPair(): RsaKeyPair {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    })

    return {
      publicKey,
      privateKey,
    }
  }

  /**
   * 获取RSA公钥
   * @param keyType 密钥类型，默认为通用密钥
   * @returns RSA公钥
   */
  getPublicKey(keyType: RsaKeyType): string {
    const keyPair = this.keyPairs.get(keyType)
    if (!keyPair) {
      throw new Error(`${keyType} RSA密钥对未初始化`)
    }
    return keyPair.publicKey
  }

  /**
   * 获取Admin RSA公钥
   * @returns Admin RSA公钥
   */
  getAdminPublicKey(): string {
    return this.getPublicKey(RsaKeyType.ADMIN)
  }

  /**
   * 获取Client RSA公钥
   * @returns Client RSA公钥
   */
  getClientPublicKey(): string {
    return this.getPublicKey(RsaKeyType.CLIENT)
  }

  /**
   * 获取Login RSA公钥
   * @returns Login RSA公钥
   */
  getLoginPublicKey(): string {
    return this.getPublicKey(RsaKeyType.LOGIN)
  }

  /**
   * 使用RSA公钥加密数据
   * @param data 要加密的数据
   * @param keyType 密钥类型，默认为通用密钥
   * @returns 加密后的数据（Base64编码）
   */
  encrypt(data: string, keyType: RsaKeyType): string {
    const keyPair = this.keyPairs.get(keyType)
    if (!keyPair) {
      throw new Error(`${keyType} RSA密钥对未初始化`)
    }

    const buffer = Buffer.from(data, 'utf8')
    const encrypted = publicEncrypt(
      {
        key: keyPair.publicKey,
        // 修改填充方式为RSA_PKCS1_OAEP_PADDING
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        // 指定哈希算法
        oaepHash: 'sha256',
      },
      buffer,
    )

    return encrypted.toString('base64')
  }

  /**
   * 使用Admin RSA公钥加密数据
   * @param data 要加密的数据
   * @returns 加密后的数据
   */
  encryptWithAdmin(data: string): string {
    return this.encrypt(data, RsaKeyType.ADMIN)
  }

  /**
   * 使用Client RSA公钥加密数据
   * @param data 要加密的数据
   * @returns 加密后的数据
   */
  encryptWithClient(data: string): string {
    return this.encrypt(data, RsaKeyType.CLIENT)
  }

  /**
   * 使用Login RSA公钥加密数据
   * @param data 要加密的数据
   * @returns 加密后的数据
   */
  encryptWithLogin(data: string): string {
    return this.encrypt(data, RsaKeyType.LOGIN)
  }

  /**
   * 使用RSA私钥解密数据
   * @param encryptedData 加密后的数据（Base64编码）
   * @param keyType 密钥类型，默认为通用密钥
   * @returns 解密后的数据
   */
  decrypt(encryptedData: string, keyType: RsaKeyType): string {
    const keyPair = this.keyPairs.get(keyType)
    if (!keyPair || !keyPair.privateKey) {
      throw new Error(`${keyType} RSA私钥未初始化`)
    }

    const buffer = Buffer.from(encryptedData, 'base64')
    const decrypted = privateDecrypt(
      {
        key: keyPair.privateKey,
        // 替换填充方式为RSA_PKCS1_OAEP_PADDING
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        // 指定哈希算法
        oaepHash: 'sha256',
      },
      buffer,
    )

    return decrypted.toString('utf8')
  }

  /**
   * 使用Admin RSA私钥解密数据
   * @param encryptedData 加密后的数据
   * @returns 解密后的数据
   */
  decryptWithAdmin(encryptedData: string): string {
    return this.decrypt(encryptedData, RsaKeyType.ADMIN)
  }

  /**
   * 使用Client RSA私钥解密数据
   * @param encryptedData 加密后的数据
   * @returns 解密后的数据
   */
  decryptWithClient(encryptedData: string): string {
    return this.decrypt(encryptedData, RsaKeyType.CLIENT)
  }

  /**
   * 使用Login RSA私钥解密数据
   * @param encryptedData 加密后的数据
   * @returns 解密后的数据
   */
  decryptWithLogin(encryptedData: string): string {
    return this.decrypt(encryptedData, RsaKeyType.LOGIN)
  }
}
