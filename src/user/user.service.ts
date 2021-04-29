import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    return await this.userRepo.save(user).catch((error) => {
      throw new Error('Create User ' + error);
    });
  }

  async findAll(): Promise<Array<User>> {
    return await this.userRepo.find().catch((error) => {
      throw new Error('Find Users ' + error);
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOne(id).catch((error) => {
      throw new Error('Find User ' + error);
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepo.update(id, updateUserDto).catch((error) => {
      throw new Error('Update User ' + error);
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id).catch((error) => {
      throw new Error('Delete User ' + error);
    });
  }
}
