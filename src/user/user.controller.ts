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
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPagination } from 'src/utils/pagination/pagination';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { User } from './user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { IRequest } from 'src/auth/auth.type';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Get()
  @HttpCode(200)
  async findUsers(@Query() { page, limit }: UserPagination) {
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
      const user = await this.userService.findOne(+id);
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
      return this.userService.remove(+id);
    }
    throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
  }
}
