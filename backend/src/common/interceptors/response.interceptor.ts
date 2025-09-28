import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Интерцептор для форматирования ответа API
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        return next.handle().pipe(
            map((data) => {
                return {
                    statusCode: response.statusCode,
                    message: response.statusMessage || 'OK',
                    data,
                    path: request.url,
                    timestamp: new Date().toISOString(),
                };
            }),
        );
    }
}
