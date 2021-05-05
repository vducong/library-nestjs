import {
  IsBoolean,
  IsDate,
  IsInstance,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Book } from '../../book/book.entity';
import { User } from '../../user/user.entity';

export class CreateRecordDto {
  @IsInstance(User)
  @IsNotEmpty()
  borrower: User;

  @IsInstance(Book)
  @IsNotEmpty()
  book: Book;

  @IsDate()
  @IsOptional()
  borrowedAt?: Date;

  @IsDate()
  @IsOptional()
  returnedAt?: Date;

  @IsBoolean()
  @IsOptional()
  isArchived?: boolean;
}
