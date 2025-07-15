import { Module } from '@nestjs/common'
import { CopyService } from './libs/copy.service'
import { WorkComicThirdPartyService } from './third-party-service'
import { WorkComicThirdPartyController } from './third-party.controller'

@Module({
  controllers: [WorkComicThirdPartyController],
  providers: [WorkComicThirdPartyService, CopyService],
  exports: [WorkComicThirdPartyService],
})
export class WorkComicThirdPartyModule {}
