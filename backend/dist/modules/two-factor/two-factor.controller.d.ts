import { TwoFactorService } from './two-factor.service';
import { Request } from 'express';
export declare class TwoFactorController {
    private readonly twoFactorService;
    constructor(twoFactorService: TwoFactorService);
    generateSecret(userId: string): Promise<{
        qrCode: string;
        secret: string;
    }>;
    enable(userId: string, body: {
        token: string;
    }, req: Request): Promise<{
        message: string;
    }>;
    verify(userId: string, body: {
        token: string;
    }, req: Request): Promise<{
        message: string;
    }>;
    disable(userId: string, body: {
        token: string;
    }, req: Request): Promise<{
        message: string;
    }>;
    getStatus(userId: string): Promise<{
        isTwoFactorEnabled: boolean;
    }>;
}
