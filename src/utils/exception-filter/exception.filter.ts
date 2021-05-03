import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let statusCode: number, statusMessage: string;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      statusMessage = exception.getResponse() as string;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      statusMessage = 'Internal Server Error';
    }

    response.status(statusCode).json({
      statusCode: statusCode,
      statusMessage: statusMessage,
      timestamp: new Date().toISOString(),
    });
  }
}
