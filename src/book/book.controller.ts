import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Query,
  HttpException,
  HttpStatus,
  Put,
  Req,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { IRequest } from 'src/auth/auth.type';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { BookPagination } from 'src/utils/pagination/pagination';
import { UpdateResult } from 'typeorm';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @HttpCode(200)
  async findBooks(@Query() { page, limit }: BookPagination) {
    return this.bookService.findBooks(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: number): Promise<Book> {
    const book = await this.bookService.findOne(+id);
    if (!book)
      throw new HttpException(
        'Book with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    return book;
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<UpdateResult> {
    return this.bookService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/borrow')
  @HttpCode(200)
  async borrow(
    @Req() request: IRequest,
    @Param('id') id: number,
  ): Promise<Book> {
    const book = await this.bookService.borrow(request.user.userId, +id);
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
    const book = await this.bookService.return(request.user.userId, +id);
    if (!book)
      throw new HttpException(
        'Book with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    return book;
  }
}
