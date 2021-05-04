import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/book/book.entity';
import { BookService } from 'src/book/book.service';
import { CreateBookDto } from 'src/book/dto/create-book.dto';
import { CategoryPagination } from 'src/utils/pagination/pagination';
import { Repository, UpdateResult } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    private readonly bookService: BookService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    Object.assign(category, createCategoryDto);

    if (await this.findOneName(category.name))
      throw new HttpException(
        'Already existed category name',
        HttpStatus.BAD_REQUEST,
      );

    return this.categoryRepo.save(category).catch(() => {
      throw new HttpException(
        'Unable to add new category',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async addOldBookToCategory(
    categoryId: number,
    bookId: number,
  ): Promise<Category> {
    const [category, book] = await Promise.all([
      this.findOne(categoryId),
      this.bookService.findOne(bookId),
    ]);

    if (!category || !book)
      throw new HttpException('Wrong category or book', HttpStatus.BAD_REQUEST);

    if (
      await this.categoryRepo
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.books', 'books')
        .where('category.id = :categoryId', { categoryId: categoryId })
        .andWhere('books.id = :bookId', { bookId: bookId })
        .getOne()
        .catch(() => {
          throw new HttpException(
            'Unable to find book',
            HttpStatus.BAD_REQUEST,
          );
        })
    )
      throw new HttpException(
        'Category already has this book',
        HttpStatus.CONFLICT,
      );

    category.books.push(book);
    await this.categoryRepo.save(category);
    return category;
  }

  async addNewBookToCategory(
    categoryId: number,
    bookDto: CreateBookDto,
  ): Promise<Category> {
    const category = await this.findOne(categoryId);
    const book = await this.bookService.create(bookDto);
    category.books.push(book);
    await this.categoryRepo.save(category);
    return category;
  }

  async findCategories(page?: number, limit?: number) {
    const currentPage = page || CategoryPagination.DEFAULT_PAGE;
    const take = limit || CategoryPagination.DEFAULT_LIMIT;
    const skip = (currentPage - 1) * take;

    const [categories, total] = await this.categoryRepo
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
        throw new HttpException(
          'Unable to find categories',
          HttpStatus.BAD_REQUEST,
        );
      });

    if (!categories || categories.length === 0)
      throw new HttpException('Categories unavailable', HttpStatus.NOT_FOUND);

    return {
      total: total,
      page: currentPage,
      count: categories.length,
      categories: categories,
    };
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepo
      .findOne(
        {
          id: id,
          isArchived: false,
        },
        { relations: ['books'] },
      )
      .catch(() => {
        throw new HttpException(
          'Unable to find category',
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async findOneName(name: string): Promise<Category> {
    return this.categoryRepo
      .findOne({ name: name, isArchived: false })
      .catch(() => {
        throw new HttpException(
          'Unable to find category',
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async findBooksOfOne(id: number): Promise<Book[]> {
    return (await this.findOne(id)).books;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoryRepo.update(id, updateCategoryDto).catch(() => {
      throw new HttpException(
        "Unable to update this category's information",
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.categoryRepo.update(id, { isArchived: true }).catch(() => {
      throw new HttpException(
        'Unable to delete category',
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
