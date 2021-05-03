import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((value) => this.recursivelyStripNullValues(value)));
  }

  recursivelyStripNullValues(value: unknown): unknown {
    console.error(1);
    console.error(value);
    if (Array.isArray(value)) {
      console.error(2);
      console.error(value);
      return value.map(this.recursivelyStripNullValues);
    }
    if (value !== null && typeof value === 'object') {
      console.error(3);
      console.error(value);
      return Object.fromEntries(
        Object.entries(value).map(([key, value]) => [
          key,
          this.recursivelyStripNullValues(value),
        ]),
      );
    }
    if (value !== null) {
      console.error(5);
      console.error(value);
      return value;
    }
  }
}
