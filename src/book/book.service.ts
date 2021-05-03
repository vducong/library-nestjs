import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookPagination } from 'src/utils/pagination/pagination';
import { Repository, UpdateResult } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = new Book();
    Object.assign(book, createBookDto);

    return this.bookRepo.save(book).catch(() => {
      throw new HttpException('Unable to add new book', HttpStatus.BAD_REQUEST);
    });
  }

  async findBooks(page?: number, limit?: number) {
    const currentPage = page || BookPagination.DEFAULT_PAGE;
    const take = limit || BookPagination.DEFAULT_LIMIT;
    const skip = (currentPage - 1) * take;

    const [books, total] = await this.bookRepo
      .findAndCount({
        order: {
          id: 'ASC',
        },
        where: {
          isArchived: false,
        },
        take: take,
        skip: skip,
      })
      .catch(() => {
        throw new HttpException('Unable to find books', HttpStatus.BAD_REQUEST);
      });

    if (!books || books.length === 0)
      throw new HttpException('Books unavailable', HttpStatus.NOT_FOUND);

    return {
      total: total,
      page: currentPage,
      count: books.length,
      users: books,
    };
  }

  async findOne(id: number): Promise<Book> {
    return this.bookRepo
      .findOne({
        id: id,
        isArchived: false,
      })
      .catch(() => {
        throw new HttpException('Unable to find book', HttpStatus.BAD_REQUEST);
      });
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    return this.bookRepo.update(id, updateBookDto).catch((error) => {
      throw new Error('Update Book ' + error);
    });
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.bookRepo.update(id, { isArchived: true }).catch(() => {
      throw new HttpException('Unable to delete book', HttpStatus.BAD_REQUEST);
    });
  }
}
