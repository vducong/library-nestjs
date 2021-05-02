import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';
import LengthLimits from 'src/constants/length';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  //required, due to the maximum length of bcrypt hash = 72
  @Length(
    LengthLimits.PASSWORD_PLAIN_MIN_LENGTH,
    LengthLimits.PASSWORD_PLAIN_MAX_LENGTH,
  )
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(LengthLimits.MIN_LENGTH, LengthLimits.SMALL_MAX_LENGTH)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(LengthLimits.MIN_LENGTH, LengthLimits.SMALL_MAX_LENGTH)
  lastName: string;

  @IsBoolean()
  isAdmin: boolean;
}
