import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { Request } from 'express';
export declare class TwoFactorService {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    generateTwoFactorSecret(userId: string): Promise<{
        qrCode: string;
        secret: string;
    }>;
    verifyLoginToken(userId: string, token: string, req: Request): Promise<{
        message: string;
    }>;
    enableTwoFactor(userId: string, token: string, req: Request): Promise<{
        message: string;
    }>;
    disableTwoFactor(userId: string, token: string, req: Request): Promise<{
        message: string;
    }>;
    getStatus(userId: string): Promise<{
        isTwoFactorEnabled: boolean;
    }>;
    private generateSecret;
    private generateQRCode;
    private verifyToken;
}
