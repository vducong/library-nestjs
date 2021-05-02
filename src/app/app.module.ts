import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core/constants';
import { BookModule } from 'src/book/book.module';
import { CategoryModule } from 'src/category/category.module';
import { DatabaseModule } from 'src/database/database.module';
import { ExceptionsFilter } from 'src/utils/exception-filter/exception.filter';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    BookModule,
    CategoryModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule {}
