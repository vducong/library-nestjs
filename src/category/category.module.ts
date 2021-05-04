import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from 'src/book/book.service';
import { Record } from 'src/record/record.entity';
import { BookModule } from 'src/book/book.module';
import { RecordService } from 'src/record/record.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  controllers: [CategoryController],
  exports: [CategoryService, CategoryModule, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Category, Record, User]), BookModule],
  providers: [BookService, CategoryService, RecordService, UserService],
})
export class CategoryModule {}
