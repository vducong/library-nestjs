import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import LengthLimits from '../common/constants/length';
import { Record } from '../record/record.entity';
import { Role } from '../role/role.enum';

@Entity()
export class User {
  static KEY_MAP = [
    'username',
    'passwordHash',
    'firstName',
    'lastName',
    'isAdmin',
  ];

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: LengthLimits.SMALL_MAX_LENGTH })
  username: string;

  @Column({ name: 'password_hash', length: LengthLimits.PASSWORD_HASH_LENGTH })
  @Exclude()
  passwordHash: string;

  @Column({ name: 'first_name', length: LengthLimits.SMALL_MAX_LENGTH })
  firstName: string;

  @Column({ name: 'last_name', length: LengthLimits.SMALL_MAX_LENGTH })
  lastName: string;

  @Column({ default: false, name: 'is_admin' })
  isAdmin: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => Record, (record) => record.borrower, { nullable: true })
  @Exclude()
  records: Record[];

  roles: Role[];
}
