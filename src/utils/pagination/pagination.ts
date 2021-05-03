import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UserPagination {
  static DEFAULT_PAGE = 1;
  static DEFAULT_LIMIT = 5;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}

export class BookPagination {
  static DEFAULT_PAGE = 1;
  static DEFAULT_LIMIT = 5;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}

export class CategoryPagination {
  static DEFAULT_PAGE = 1;
  static DEFAULT_LIMIT = 5;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}

export class RecordPagination {
  static DEFAULT_PAGE = 1;
  static DEFAULT_LIMIT = 5;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}
