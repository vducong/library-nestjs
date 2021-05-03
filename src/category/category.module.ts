import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from 'src/book/book.service';
import { Book } from 'src/book/book.entity';

@Module({
  controllers: [CategoryController],
  exports: [CategoryService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Book, Category])],
  providers: [BookService, CategoryService],
})
export class CategoryModule {}
