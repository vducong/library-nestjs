import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import * as ormConfig from '../../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const config = Object.assign({}, ormConfig);
        config.entities = [path.join(process.cwd(), 'dist', '**/*.entity.js')];
        return config as TypeOrmModuleOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
