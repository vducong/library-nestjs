import { Book } from '../../book/book.entity';
import { Category } from '../../category/category.entity';
import { Record } from '../../record/record.entity';
import { User } from '../../user/user.entity';

type Pagination = {
  total: number;
  page: number;
  count: number;
};

export type BookPagination = Pagination & {
  books: Book[];
};

export type CategoryPagination = Pagination & {
  categories: Category[];
};

export type RecordPagination = Pagination & {
  records: Record[];
};

export type UserPagination = Pagination & {
  users: User[];
};
