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
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPagination } from 'src/utils/pagination/pagination';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { User } from './user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@UseGuards(JwtAuthGuard)
// @UseInterceptors(ExcludeNullInterceptor)
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
    return this.userService.findOne(+id);
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
