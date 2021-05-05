import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IRequest } from '../auth/auth.type';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { Roles } from '../role/role.decorator';
import { Role } from '../role/role.enum';
import { UserPaginationParam } from '../utils/pagination/pagination.param';
import { UserPagination } from '../utils/pagination/pagination.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Get()
  @HttpCode(200)
  async findUsers(
    @Query() { page, limit }: UserPaginationParam,
  ): Promise<UserPagination> {
    return this.userService.findUsers(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(
    @Req() request: IRequest,
    @Param('id') id: number,
  ): Promise<User> {
    const currentUser = request.user;
    if (currentUser.isAdmin || currentUser.id === id) {
      const user = await this.userService.findOne(id);
      if (!user)
        throw new HttpException(
          'User with this id does not exist',
          HttpStatus.NOT_FOUND,
        );
      return user;
    }
    throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Req() request: IRequest,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const currentUser = request.user;
    if (currentUser.isAdmin || currentUser.id === id) {
      return this.userService.update(id, updateUserDto);
    }
    throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Req() request: IRequest,
    @Param('id') id: number,
  ): Promise<DeleteResult> {
    const currentUser = request.user;
    if (currentUser.isAdmin || currentUser.id === id) {
      return this.userService.remove(id);
    }
    throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
  }
}
