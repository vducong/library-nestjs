import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRecordDto } from './create-record.dto';

export class UpdateRecordDto extends PartialType(
  OmitType(CreateRecordDto, ['borrower', 'book'] as const),
) {}
