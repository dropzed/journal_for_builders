import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findProfile(id: string): Promise<{
        email: string;
        password: string;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        isVerified: boolean;
        isTwoFactorEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findById(id: string): Promise<{
        email: string;
        password: string;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        isVerified: boolean;
        isTwoFactorEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
