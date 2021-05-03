import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class SignedInUserDto extends PickType(CreateUserDto, [
  'username',
  'password',
] as const) {}
