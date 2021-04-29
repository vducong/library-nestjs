import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    Object.assign(category, createCategoryDto);
    return await this.categoryRepo.save(category).catch((error) => {
      throw new Error('Create Category ' + error);
    });
  }

  async findAll(): Promise<Array<Category>> {
    return await this.categoryRepo.find().catch((error) => {
      throw new Error('Find Categories ' + error);
    });
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepo.findOne(id).catch((error) => {
      throw new Error('Find Category ' + error);
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoryRepo
      .update(id, updateCategoryDto)
      .catch((error) => {
        throw new Error('Update Category ' + error);
      });
  }

  async remove(id: number): Promise<UpdateResult> {
    return await this.update(id, { isArchived: true }).catch((error) => {
      throw new Error('Remove Category ' + error);
    });
  }
}
