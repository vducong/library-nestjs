import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { IRequest } from '../auth/auth.type';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { Roles } from '../role/role.decorator';
import { Role } from '../role/role.enum';
import { BookPaginationParam } from '../utils/pagination/pagination.param';
import { BookPagination } from '../utils/pagination/pagination.type';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Post()
  @HttpCode(201)
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @HttpCode(200)
  async findBooks(
    @Query() { page, limit }: BookPaginationParam,
  ): Promise<BookPagination> {
    return this.bookService.findBooks(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: number): Promise<Book> {
    const book = await this.bookService.findOne(id);
    if (!book)
      throw new HttpException(
        'Book with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    return book;
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    return this.bookService.update(id, updateBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<UpdateResult> {
    return this.bookService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/borrow')
  @HttpCode(200)
  async borrow(
    @Req() request: IRequest,
    @Param('id') id: number,
  ): Promise<Book> {
    const book = await this.bookService.borrow(request.user.id, id);
    if (!book)
      throw new HttpException(
        'Book with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    return book;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/return')
  @HttpCode(200)
  async return(
    @Req() request: IRequest,
    @Param('id') id: number,
  ): Promise<Book> {
    const book = await this.bookService.return(request.user.id, id);
    if (!book)
      throw new HttpException(
        'Book with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    return book;
  }
}
