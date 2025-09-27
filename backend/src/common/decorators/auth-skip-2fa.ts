import { applyDecorators, UseGuards } from '@nestjs/common';
import { SessionAuthGuard } from '../guards/session-auth.guard';

// Декоратор для авторизации только по сессии (без 2FA и ролей)
export function AuthorizationSkip2FA() {
    return applyDecorators(
        UseGuards(SessionAuthGuard),
    );
}
