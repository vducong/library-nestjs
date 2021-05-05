import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { Roles } from '../role/role.decorator';
import { Role } from '../role/role.enum';
import { RecordPaginationParam } from '../utils/pagination/pagination.param';
import { RecordPagination } from '../utils/pagination/pagination.type';
import { Record } from './record.entity';
import { RecordService } from './record.service';

@UseGuards(JwtAuthGuard)
@Roles(Role.ADMIN)
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  @HttpCode(200)
  async findRecords(
    @Query() { page, limit }: RecordPaginationParam,
  ): Promise<RecordPagination> {
    return this.recordService.findRecords(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: number): Promise<Record> {
    const record = await this.recordService.findOne(id);
    if (!record)
      throw new HttpException(
        'Record with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    return record;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<UpdateResult> {
    return this.recordService.remove(id);
  }
}
