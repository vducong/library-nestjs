import { Request } from '@nestjs/common';
import { User } from 'src/user/user.entity';

export type AuthResponse = {
  access_token: string;
};

export type Payload = {
  sub: number;
  username: string;
};

export type JwtUser = {
  userId: number;
  username: string;
};

export interface IRequest extends Request {
  user: User & {
    auth?: AuthResponse;
  };
}
