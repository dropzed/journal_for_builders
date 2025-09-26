import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Authorized } from '../../common/decorators/authorized.decorator';
import { Authorization } from '../../common/decorators/auth.decorator';
import { UserRole } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Authorization()
    @Get('profile')
    async findProfile(@Authorized('id') id: string) {
        return this.userService.findById(id);
    }

    @Authorization(UserRole.ADMIN)
    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.userService.findById(id);
    }
}
