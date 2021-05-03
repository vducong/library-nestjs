import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';

@Module({
  controllers: [RecordController],
  exports: [RecordService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Book, Record, User])],
  providers: [RecordService],
})
export class RecordModule {}
