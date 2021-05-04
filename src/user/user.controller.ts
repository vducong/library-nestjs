import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPagination } from 'src/utils/pagination/pagination';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { User } from './user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return await this.userService.register(createUserDto);
  // }

  @Get()
  @HttpCode(200)
  async findUsers(@Query() { page, limit }: UserPagination) {
    return this.userService.findUsers(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOne(+id);
    if (!user)
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.remove(+id);
  }
}
