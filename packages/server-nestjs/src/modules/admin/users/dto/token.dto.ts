import { ApiProperty, OmitType } from '@nestjs/swagger'
import { ValidateString } from '@/common/decorators/validate.decorator'

export class TokenDto {
  @ValidateString({
    description: '账号令牌',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true,
  })
  accessToken!: string

  @ValidateString({
    description: '刷新令牌',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true,
  })
  refreshToken!: string
}

export class RefreshTokenDto extends OmitType(TokenDto, ['accessToken']) {}

export class RefreshTokenResponseDto {
  @ApiProperty({
    description: '刷新令牌响应',
    type: TokenDto,
  })
  tokens: TokenDto
}
