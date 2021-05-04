import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { Payload } from './auth.type';
import { ConfigService } from '@nestjs/config';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GoogleUserDto } from 'src/user/dto/google-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUserLocal(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneUsername(username);
    if (!user) throw new UnauthorizedException();
    if (!this.isMatchPassword(password, user.passwordHash))
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    return user;
  }

  async validateUserJwt(payload: Payload): Promise<User> {
    const user = await this.userService.findOnePayload(payload);
    if (!user)
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    return user;
  }

  async validateUserGoogle(userDto: GoogleUserDto): Promise<User> {
    let user = await this.userService.findOneUsername(userDto.username);
    if (!user)
      user = await this.userService.registerGoogleUser(userDto);
    return user;
  }

  async verifyTokenJwt(token: string) {
    const payload = (await this.jwtService.verify(token)) as Payload;
    return this.validateUserJwt({
      sub: payload.sub,
      username: payload.username,
    });
  }

  async login(user: User) {
    const payload: Payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getCookieWithJwtToken(user: User) {
    const payload: Payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get<string>(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  isMatchPassword(plainPassword: string, hashPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashPassword);
  }
}
