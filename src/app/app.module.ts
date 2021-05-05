import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core/constants';
import { AuthModule } from '../auth/auth.module';
import { BookModule } from '../book/book.module';
import { CategoryModule } from '../category/category.module';
import { DatabaseModule } from '../database/database.module';
import { RecordModule } from '../record/record.module';
import { RolesGuard } from '../role/role.guard';
import { UserModule } from '../user/user.module';
import { ExceptionsFilter } from '../utils/exception-filter/exception.filter';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    BookModule,
    CategoryModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    RecordModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
