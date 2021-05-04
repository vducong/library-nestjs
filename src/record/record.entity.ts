import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, name: 'borrower_id' })
  borrowerId: number;

  @Column({ nullable: true, name: 'book_id' })
  bookId: number;

  @Column({ default: false, name: 'is_archived' })
  @Exclude()
  isArchived: boolean;

  @Column({ name: 'borrowed_at' })
  borrowedAt: Date;

  @Column({ name: 'returned_at' })
  returnedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.records, { nullable: true })
  @JoinColumn({ name: 'borrower_id' })
  borrower: User;

  @ManyToOne(() => Book, (book) => book.records, { nullable: true })
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
