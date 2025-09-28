import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        email: string;
        password: string;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        isTwoFactorEnabled: boolean;
        twoFactorSecret: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        email: string;
        password: string;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        isTwoFactorEnabled: boolean;
        twoFactorSecret: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(user: User): Promise<{
        email: string;
        password: string;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        isTwoFactorEnabled: boolean;
        twoFactorSecret: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(email: string, password: string): Promise<{
        email: string;
        password: string;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        isTwoFactorEnabled: boolean;
        twoFactorSecret: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
