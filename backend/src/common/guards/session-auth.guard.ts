import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';


@Injectable()
export class SessionAuthGuard implements CanActivate {
    constructor(private readonly userService: UserService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.session.userId) {
            throw new UnauthorizedException('User not authenticated');
        }

        request.user = await this.userService.findById(request.session.userId);

        return true;
    }
}
