import { Controller, Post, Get, Req, Body, HttpCode } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { IRequest } from './auth.type';
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
  getProfile(@Req() request: IRequest) {
    return request.user;
  }

  @Post('signup')
  @HttpCode(201)
  async register(
    @Req() request: IRequest,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(200)
  async login(@Req() request: IRequest) {
    return this.authService.login(request.user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async loginGoogle(@Req() _request: IRequest) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async loginGoogleRedirect(@Req() request: IRequest) {
    return this.authService.loginGoogle(request);
  }
}
