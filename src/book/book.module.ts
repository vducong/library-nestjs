import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { UserService } from 'src/user/user.service';
import { RecordService } from 'src/record/record.service';
import { RecordModule } from 'src/record/record.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [BookController],
  exports: [BookService, BookModule, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Book]), RecordModule, UserModule],
  providers: [BookService, RecordService, UserService],
})
export class BookModule {}
