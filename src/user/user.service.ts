import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Payload } from '../auth/auth.type';
import { GoogleUserDto } from './dto/google-user.dto';
import { UserPagination } from '../utils/pagination/pagination.type';
import { UserPaginationParam } from '../utils/pagination/pagination.param';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  readonly SALT_ROUNDS = 10;

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.passwordHash = await this.hashPassword(createUserDto.password);
    User.KEY_MAP.forEach((key) => {
      user[key] = user[key] || createUserDto[key];
    });

    if (await this.findOneUsername(user.username))
      throw new HttpException(
        'Already existed username',
        HttpStatus.BAD_REQUEST,
      );

    return this.userRepo.save(user).catch(() => {
      throw new HttpException(
        'Unable to register a new user ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async registerGoogleUser(userDto: GoogleUserDto): Promise<User> {
    const user: User = new User();
    Object.assign(user, userDto);

    if (await this.findOneUsername(user.username))
      throw new HttpException(
        'Already existed username',
        HttpStatus.BAD_REQUEST,
      );

    return this.userRepo.save(user).catch(() => {
      throw new HttpException(
        'Unable to register a new Google user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, this.SALT_ROUNDS).catch((error) => {
      throw new Error('Password Hash ' + error);
    });
  }

  async findUsers(page?: number, limit?: number): Promise<UserPagination> {
    const currentPage = page || UserPaginationParam.DEFAULT_PAGE;
    const take = limit || UserPaginationParam.DEFAULT_LIMIT;
    const skip = (currentPage - 1) * take;

    const [users, total] = await this.userRepo
      .findAndCount({
        order: {
          id: 'ASC',
        },
        where: {
          isArchived: false,
        },
        take: take,
        skip: skip,
      })
      .catch(() => {
        throw new HttpException('Unable to find users', HttpStatus.BAD_REQUEST);
      });

    if (!users || users.length === 0)
      throw new HttpException('Users unavailable', HttpStatus.NOT_FOUND);

    return {
      total: total,
      page: currentPage,
      count: users.length,
      users: users,
    };
  }

  async findOne(id: number): Promise<User> {
    return this.userRepo.findOne(id).catch(() => {
      throw new HttpException('Unable to find user', HttpStatus.BAD_REQUEST);
    });
  }

  async findOneUsername(username: string): Promise<User> {
    return this.userRepo.findOne({ username: username }).catch(() => {
      throw new HttpException('Unable to find user', HttpStatus.BAD_REQUEST);
    });
  }

  async findOnePayload(payload: Payload): Promise<User> {
    return this.userRepo
      .findOne({
        id: payload.sub,
        username: payload.username,
      })
      .catch(() => {
        throw new HttpException('Unable to find user', HttpStatus.BAD_REQUEST);
      });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userRepo.update(id, updateUserDto).catch(() => {
      throw new HttpException(
        "Unable to update this user's information",
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.userRepo.delete(id).catch(() => {
      throw new HttpException('Unable to delete user', HttpStatus.BAD_REQUEST);
    });
  }
}
