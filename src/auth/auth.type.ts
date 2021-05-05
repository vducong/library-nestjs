import { Request } from '@nestjs/common';
import { User } from '../user/user.entity';

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

export type AccessToken = {
  access_token: string;
};

export interface IRequest extends Request {
  user: User & {
    auth?: AuthResponse;
  };
}
