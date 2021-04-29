import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AppController } from './app.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
})
export class AppModule {}
