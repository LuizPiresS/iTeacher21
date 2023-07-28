import { TenantIdError } from '../types/tenant-id.error';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class TenantIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof TenantIdError) {
          throw new HttpException('Tenant ID not found in header.', 400);
        } else {
          throw error;
        }
      }),
    );
  }
}
