import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';

@Module({
  controllers: [RecordController],
  exports: [RecordService, RecordModule, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Record])],
  providers: [RecordService],
})
export class RecordModule {}
