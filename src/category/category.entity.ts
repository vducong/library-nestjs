import LengthLimits from '../constants/length';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Book } from '../book/book.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: LengthLimits.SMALL_MAX_LENGTH })
  name: string;

  @Column({ nullable: true, length: LengthLimits.BIG_MAX_LENGTH })
  description: string;

  @Column({ default: false, name: 'is_archived' })
  @Exclude()
  isArchived: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date;

  @ManyToMany(() => Book, (book) => book.categories, {
    nullable: true,
    eager: true,
  })
  @JoinTable({
    name: 'category_books',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
  })
  books?: Book[];
}
