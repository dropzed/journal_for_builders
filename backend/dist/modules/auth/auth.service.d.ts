import { Request, Response } from 'express';
import { RegisterDto, LoginDto } from './dto';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    register(req: Request, dto: RegisterDto): Promise<unknown>;
    login(req: Request, dto: LoginDto): Promise<unknown>;
    logout(req: Request, res: Response): Promise<void>;
    getProfile(req: Request): Promise<{
        email: string;
        password: string;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        isVerified: boolean;
        isTwoFactorEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private saveSession;
}
