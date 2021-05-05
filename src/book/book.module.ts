import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordModule } from '../record/record.module';
import { RecordService } from '../record/record.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { BookController } from './book.controller';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Module({
  controllers: [BookController],
  exports: [BookService, BookModule, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Book]), RecordModule, UserModule],
  providers: [BookService, RecordService, UserService],
})
export class BookModule {}
