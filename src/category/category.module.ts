import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from '../book/book.module';
import { BookService } from '../book/book.service';
import { Record } from '../record/record.entity';
import { RecordService } from '../record/record.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  exports: [CategoryService, CategoryModule, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Category, Record, User]), BookModule],
  providers: [BookService, CategoryService, RecordService, UserService],
})
export class CategoryModule {}
