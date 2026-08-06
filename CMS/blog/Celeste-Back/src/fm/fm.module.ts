import { Module } from '@nestjs/common'
import { FmService } from './fm.service'
import { FmController } from './fm.controller'

@Module({
  imports:[],
  controllers: [FmController],
  providers: [FmService],
})
export class FmModule {}
