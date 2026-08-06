import { PartialType } from '@nestjs/mapped-types';
import { CreateFmDto } from './create-fm.dto';

export class UpdateFmDto extends PartialType(CreateFmDto) {}
