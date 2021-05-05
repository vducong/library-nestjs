import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AccessToken, IRequest } from './auth.type';
import { GoogleAuthGuard } from './guard/google.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { LocalAuthGuard } from './guard/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  getProfile(@Req() request: IRequest): User {
    return request.user;
  }

  @Post('signup')
  @HttpCode(201)
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.register(createUserDto);
  }

  // Todo: use function instead
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(200)
  login(@Req() request: IRequest): AccessToken {
    return this.authService.login(request.user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async loginGoogle(@Req() _request: IRequest) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  loginGoogleRedirect(@Req() request: IRequest): AccessToken {
    return this.authService.login(request.user);
  }
}
