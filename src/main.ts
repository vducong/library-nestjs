import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ExceptionsFilter } from './utils/exception-filter/exception.filter';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { ExcludeNullInterceptor } from './utils/interceptor/excludeNull.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ExcludeNullInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  await app.listen(3000);
}
bootstrap();
