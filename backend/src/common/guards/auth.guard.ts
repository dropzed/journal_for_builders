import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';

// Эдуард проверяет аутентификацию пользователя
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly userService: UserService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (typeof request.session.userId === 'undefined') {
            throw new UnauthorizedException('User not authenticated');
        }

        request.user = await this.userService.findById(request.session.userId);

        if (request.user?.isTwoFactorEnabled && !request.session.is2faPassed) {
            throw new ForbiddenException('2FA verification required');
        }

        return true;
    }
}