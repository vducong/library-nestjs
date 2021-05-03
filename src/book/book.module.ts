import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Category } from 'src/category/category.entity';
import { Record } from 'src/record/record.entity';

@Module({
  controllers: [BookController],
  exports: [BookService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Book, Category, Record])],
  providers: [BookService],
})
export class BookModule {}
