import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    return await this.bookRepo.save(book).catch((error) => {
      throw new Error('Create Book ' + error);
    });
  }

  async findAll(): Promise<Array<Book>> {
    return await this.bookRepo.find().catch((error) => {
      throw new Error('Find Books ' + error);
    });
  }

  async findOne(id: number): Promise<Book> {
    return await this.bookRepo.findOne(id).catch((error) => {
      throw new Error('Find Book ' + error);
    });
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    return await this.bookRepo.update(id, updateBookDto).catch((error) => {
      throw new Error('Update Book ' + error);
    });
  }

  async remove(id: number): Promise<UpdateResult> {
    return await this.update(id, { isArchived: true }).catch((error) => {
      throw new Error('Remove Book ' + error);
    });
  }
}
