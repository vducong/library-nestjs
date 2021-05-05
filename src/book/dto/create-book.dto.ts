import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';
import LengthLimits from '../../common/constants/length';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @Length(LengthLimits.MIN_LENGTH, LengthLimits.SMALL_MAX_LENGTH)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(LengthLimits.BIG_MAX_LENGTH)
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @IsBoolean()
  @IsOptional()
  isBusy?: boolean;

  @IsBoolean()
  @IsOptional()
  isArchived?: boolean;
}
