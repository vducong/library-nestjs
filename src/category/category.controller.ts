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
} from '@nestjs/common';
import { CreateBookDto } from 'src/book/dto/create-book.dto';
import { CategoryPagination } from 'src/utils/pagination/pagination';
import { UpdateResult } from 'typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// @UseInterceptors(ExcludeNullInterceptor)
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

  @Post('add-old-book')
  @HttpCode(200)
  async addOldBookToCategory(
    @Body() categoryId: number,
    @Body() bookId: number,
  ): Promise<Category> {
    return this.categoryService.addOldBookToCategory(categoryId, bookId);
  }

  @Post('add-new-book')
  @HttpCode(200)
  async addNewBookToCategory(
    @Body() categoryId: number,
    @Body() bookDto: CreateBookDto,
  ): Promise<Category> {
    return this.categoryService.addNewBookToCategory(categoryId, bookDto);
  }

  @Get()
  @HttpCode(200)
  async findCategories(@Query() { page, limit }: CategoryPagination) {
    return this.categoryService.findCategories(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(+id);
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
