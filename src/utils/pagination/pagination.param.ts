import { IsNumber, Min, IsOptional, Max } from 'class-validator';
import { Type } from 'class-transformer';

class PaginationParam {
  static DEFAULT_PAGE = 1;
  static DEFAULT_LIMIT = 5;

  static MIN_PAGE = 1;

  static MIN_LIMIT = 1;
  static MAX_LIMIT = 10;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(PaginationParam.MIN_PAGE)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(PaginationParam.MIN_LIMIT)
  @Max(PaginationParam.MAX_LIMIT)
  limit?: number;
}

export class BookPaginationParam extends PaginationParam {}
export class CategoryPaginationParam extends PaginationParam {}
export class RecordPaginationParam extends PaginationParam {}
export class UserPaginationParam extends PaginationParam {}
