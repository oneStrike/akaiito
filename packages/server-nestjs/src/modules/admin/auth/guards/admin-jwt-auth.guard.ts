import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { BaseJwtAuthGuard } from '@/common/guards/base-jwt-auth.guard'

@Injectable()
export class AdminJwtAuthGuard extends BaseJwtAuthGuard {
  constructor(reflector: Reflector) {
    super(reflector)
  }

  getAuthenticatorName(): string {
    return 'admin-jwt'
  }
}
