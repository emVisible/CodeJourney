import { Controller, Get } from '@nestjs/common';
import { RelationsService } from './relations.service';

@Controller('relations')
export class RelationsController {
  constructor(private readonly relationsService: RelationsService) { }
  @Get()
  getRelations() {
    return this.relationsService.getRelations()
  }
}