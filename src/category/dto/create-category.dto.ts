import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import LengthLimits from 'src/constants/length';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(LengthLimits.MIN_LENGTH, LengthLimits.SMALL_MAX_LENGTH)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(LengthLimits.BIG_MAX_LENGTH)
  description?: string;

  @IsBoolean()
  @IsOptional()
  isArchived?: boolean;
}
