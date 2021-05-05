import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { RecordService } from '../record/record.service';
import { UserService } from '../user/user.service';
import { BookPaginationParam } from '../utils/pagination/pagination.param';
import { BookPagination } from '../utils/pagination/pagination.type';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,

    private readonly recordService: RecordService,
    private readonly userService: UserService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = new Book();
    Object.assign(book, createBookDto);

    return this.bookRepo.save(book).catch(() => {
      throw new HttpException('Unable to add new book', HttpStatus.BAD_REQUEST);
    });
  }

  async findBooks(page?: number, limit?: number): Promise<BookPagination> {
    const currentPage = page || BookPaginationParam.DEFAULT_PAGE;
    const take = limit || BookPaginationParam.DEFAULT_LIMIT;
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
      books: books,
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
    return this.bookRepo.update(id, updateBookDto).catch(() => {
      throw new HttpException(
        "Unable to update this book's information",
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.bookRepo.update(id, { isArchived: true }).catch(() => {
      throw new HttpException('Unable to delete book', HttpStatus.BAD_REQUEST);
    });
  }

  async borrow(userId: number, bookId: number): Promise<Book> {
    const [user, book] = await Promise.all([
      this.userService.findOne(userId),
      this.findOne(bookId),
    ]);

    if (!user || !book)
      throw new HttpException('Wrong user or book', HttpStatus.BAD_REQUEST);

    if (book.isBusy)
      throw new HttpException(
        'Book is unavailable for now',
        HttpStatus.NOT_ACCEPTABLE,
      );

    book.isBusy = true;
    const [borrowedBook, _record] = await Promise.all([
      this.bookRepo.save(book),
      this.recordService.create({
        borrower: user,
        book: book,
        borrowedAt: new Date(Date.now()),
      }),
    ]);

    return borrowedBook;
  }

  async return(userId: number, bookId: number): Promise<Book> {
    const [user, book] = await Promise.all([
      this.userService.findOne(userId),
      this.findOne(bookId),
    ]);

    if (!user || !book)
      throw new HttpException('Wrong user or book', HttpStatus.BAD_REQUEST);

    if (!book.isBusy)
      throw new HttpException('Not your book...', HttpStatus.NOT_ACCEPTABLE);

    const record = await this.recordService.findBusyOne(userId, bookId);
    if (!record)
      throw new HttpException('Unable to return book', HttpStatus.CONFLICT);

    book.isBusy = false;
    const [borrowedBook, _record] = await Promise.all([
      this.bookRepo.save(book),
      this.recordService.update(record.id, {
        returnedAt: new Date(Date.now()),
      }),
    ]);

    return borrowedBook;
  }
}
