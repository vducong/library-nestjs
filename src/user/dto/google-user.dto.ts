import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class GoogleUserDto extends PickType(CreateUserDto, [
  'username',
  'firstName',
  'lastName',
] as const) {}
