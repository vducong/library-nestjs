import LengthLimits from '../common/constants/length';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Record } from '../record/record.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: LengthLimits.SMALL_MAX_LENGTH })
  name: string;

  @Column({ nullable: true, length: LengthLimits.BIG_MAX_LENGTH })
  description: string;

  @Column()
  price: number;

  @Column({ default: false, name: 'is_busy' })
  isBusy: boolean;

  @Column({ default: false, name: 'is_archived' })
  @Exclude()
  isArchived: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date;

  @ManyToMany(() => Category, (category) => category.books, {
    nullable: true,
  })
  categories?: Category[];

  @OneToMany(() => Record, (record) => record.book, { nullable: true })
  records: Record[];
}
