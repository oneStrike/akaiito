import { ValidateString } from '@/common/decorators/validate.decorator'

export class RefreshTokenDto {
  @ValidateString({
    description: '刷新令牌',
    required: true,
  })
  refreshToken!: string
}
