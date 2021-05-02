import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { PaginationParams } from 'src/utils/pagination/pagination';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  SALT_ROUNDS = 10;

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.passwordHash = await this.hashPassword(createUserDto.password);
    User.KEY_MAP.forEach((key) => {
      user[key] = user[key] || createUserDto[key];
    });

    if (!this.findOneUsername(user.username))
      return this.userRepo.save(user).catch((error) => {
        throw new Error('Create User ' + error);
      });
    throw new Error('Existed User');
  }

  async hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, this.SALT_ROUNDS).catch((error) => {
      throw new Error('Password Hash ' + error);
    });
  }

  async findUsers(page?: number, limit?: number) {
    const currentPage = page || PaginationParams.DEFAULT_PAGE;
    const take = limit || PaginationParams.DEFAULT_LIMIT;
    const skip = (currentPage - 1) * take;

    const [users, total] = await this.userRepo.findAndCount({
      order: {
        id: 'ASC',
      },
      take: take,
      skip: skip,
    });
    return {
      total: total,
      page: currentPage,
      count: users.length,
      users: users,
    };
  }

  async findOne(id: number): Promise<User> {
    return this.userRepo.findOne(id);
  }

  async findOneUsername(username: string): Promise<User> {
    return this.userRepo.findOne({ username: username });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userRepo.update(id, updateUserDto).catch((error) => {
      throw new Error('Update User ' + error);
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.userRepo.delete(id).catch((error) => {
      throw new Error('Delete User ' + error);
    });
  }
}
