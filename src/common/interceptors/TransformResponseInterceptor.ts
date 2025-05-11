import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { CustomResponse } from 'interfaces/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, CustomResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CustomResponse<T>> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;
    return next.handle().pipe(
      map((data) => {
        const message = data?.message ?? 'Success';
        delete data.message;
        return {
          statusCode: statusCode,
          message: message,
          data: data,
        };
      }),
    );
  }
}
