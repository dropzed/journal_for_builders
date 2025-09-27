import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
export declare class SessionAuthGuard implements CanActivate {
    private readonly userService;
    constructor(userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
