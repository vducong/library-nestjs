import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Record } from 'src/record/record.entity';

@Module({
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([User, Record])],
  providers: [UserService],
})
export class UserModule {}
