// import LengthLimits from '../constants/length';
import LengthLimits from '../constants/length';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: LengthLimits.SMALL_MAX_LENGTH })
  name: string;

  @Column({ nullable: true, length: LengthLimits.BIG_MAX_LENGTH })
  description: string;

  @Column({ default: false, name: 'is_archived' })
  isArchived: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
