import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Book } from 'src/book/book.entity';
import { CreateBookDto } from 'src/book/dto/create-book.dto';
import { CategoryPagination } from 'src/utils/pagination/pagination';
import { UpdateResult } from 'typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  // @Post('add-old-book')
  // @HttpCode(200)
  // async addOldBookToCategory(
  //   @Body() categoryId: number,
  //   @Body() bookId: number,
  // ): Promise<Category> {
  //   return this.categoryService.addOldBookToCategory(categoryId, bookId);
  // }

  // @Post('add-new-book')
  // @HttpCode(200)
  // async addNewBookToCategory(
  //   @Body() categoryId: number,
  //   @Body() bookDto: CreateBookDto,
  // ): Promise<Category> {
  //   return this.categoryService.addNewBookToCategory(categoryId, bookDto);
  // }

  @Get()
  @HttpCode(200)
  async findCategories(@Query() { page, limit }: CategoryPagination) {
    console.error(await this.categoryService.findCategories(page, limit));
    return this.categoryService.findCategories(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: number): Promise<Category> {
    const category = await this.categoryService.findOne(+id);
    if (!category)
      throw new HttpException(
        'Category with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    return category;
  }

  @Get(':id/book')
  @HttpCode(200)
  async findBooksOfOne(@Param('id') id: number): Promise<Book[]> {
    const books = await this.categoryService.findBooksOfOne(+id);
    if (!books.length)
      throw new HttpException(
        'Category does not contain any books',
        HttpStatus.NOT_FOUND,
      );
    return books;
  }

  @Post(':id/book')
  @HttpCode(201)
  async addNewBookToCategory(
    @Param('id') id: number,
    @Body() bookDto: CreateBookDto,
  ): Promise<Category> {
    return this.categoryService.addNewBookToCategory(id, bookDto);
  }

  @Patch(':id/book')
  @HttpCode(200)
  async addOldBookToCategory(
    @Param('id') id: number,
    @Body('bookId') bookId: number,
  ): Promise<Category> {
    return this.categoryService.addOldBookToCategory(id, bookId);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<UpdateResult> {
    return this.categoryService.remove(+id);
  }
}
