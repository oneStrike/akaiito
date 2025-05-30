import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { BaseJwtAuthGuard } from '@/common/guards/base-jwt-auth.guard'

@Injectable()
export class ClientJwtAuthGuard extends BaseJwtAuthGuard {
  constructor(reflector: Reflector) {
    super(reflector)
  }

  getAuthenticatorName(): string {
    return 'client-jwt'
  }
}
