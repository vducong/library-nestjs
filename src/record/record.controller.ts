import {
  Controller,
  Get,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { RecordPagination } from 'src/utils/pagination/pagination';
import { UpdateResult } from 'typeorm';
import { RecordService } from './record.service';
import { Record } from './record.entity';

// @UseInterceptors(ExcludeNullInterceptor)
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  @HttpCode(200)
  async findCategories(@Query() { page, limit }: RecordPagination) {
    return this.recordService.findRecords(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: number): Promise<Record> {
    return this.recordService.findOne(+id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<UpdateResult> {
    return this.recordService.remove(+id);
  }
}
