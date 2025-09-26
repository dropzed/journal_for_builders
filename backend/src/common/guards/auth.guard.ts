import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
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

        return true;
    }
}