import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsEmpty, IsNotEmpty } from 'class-validator';
import { RecordPagination } from 'src/utils/pagination/pagination';
import { Repository, UpdateResult } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepo: Repository<Record>,
  ) {}

  async create(createRecordDto: CreateRecordDto) {
    const record = new Record();
    Object.assign(record, createRecordDto);

    return this.recordRepo.save(record).catch(() => {
      throw new HttpException(
        'Unable to add new category',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async findRecords(page?: number, limit?: number) {
    const currentPage = page || RecordPagination.DEFAULT_PAGE;
    const take = limit || RecordPagination.DEFAULT_LIMIT;
    const skip = (currentPage - 1) * take;

    const [records, total] = await this.recordRepo
      .findAndCount({
        order: {
          id: 'ASC',
        },
        where: {
          isArchived: false,
        },
        take: take,
        skip: skip,
      })
      .catch(() => {
        throw new HttpException(
          'Unable to find records',
          HttpStatus.BAD_REQUEST,
        );
      });

    if (!records || records.length === 0)
      throw new HttpException('Records unavailable', HttpStatus.NOT_FOUND);

    return {
      total: total,
      page: currentPage,
      count: records.length,
      records: records,
    };
  }

  async findOne(id: number): Promise<Record> {
    return this.recordRepo.findOne({ id: id, isArchived: false }).catch(() => {
      throw new HttpException('Unable to find record', HttpStatus.BAD_REQUEST);
    });
  }

  async findBusyOne(userId: number, bookId: number) {
    return this.recordRepo
      .findOne(
        { borrowerId: userId, bookId: bookId },
        {
          where: {
            borrowedAt: IsNotEmpty(),
            returnedAt: IsEmpty(),
          },
        },
      )
      .catch(() => {
        throw new HttpException(
          'Unable to find record',
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async update(
    id: number,
    updateRecordDto: UpdateRecordDto,
  ): Promise<UpdateResult> {
    return this.recordRepo.update(id, updateRecordDto).catch(() => {
      throw new HttpException(
        "Unable to update this record's information",
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.recordRepo.update(id, { isArchived: true }).catch(() => {
      throw new HttpException(
        'Unable to delete record',
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
