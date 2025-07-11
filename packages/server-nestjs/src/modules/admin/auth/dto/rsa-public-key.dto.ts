import { ApiProperty } from '@nestjs/swagger'

/**
 * RSA公钥响应DTO
 */
export class RsaPublicKeyDto {
  @ApiProperty({
    description: 'RSA公钥',
    example:
      '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzKCG0jg8qYQR3RCXrLAF\nUkPUn1s9y0RYdKrVIZ+YnKyuRRZAJvQsNT5If8O/QcRQvW5Xh2QJk5If8O/QcRQv\nW5Xh2QJk5If8O/QcRQvW5Xh2QJk5If8O/QcRQvW5Xh2QJk5If8O/QcRQvW5Xh2QJ\nk5If8O/QcRQvW5Xh2QJk5If8O/QcRQvW5Xh2QJk5If8O/QcRQvW5Xh2QJk5If8O/\nQcRQvW5Xh2QJk5If8O/QcRQvW5Xh2QJk5If8O/QcRQvW5Xh2QJk5If8O/QcRQvW5\nXh2QJk5If8O/QcRQvW5Xh2QJk5If8O/QcRQvW5Xh2QJk5If8O/QcRQvW5Xh2QJk5\nIQIDAQAB\n-----END PUBLIC KEY-----',
  })
  publicKey!: string
}
