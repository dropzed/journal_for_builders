import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { Request } from 'express';

@Injectable()
export class TwoFactorService {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
    }

    // Метод генерирует секрет и QR-код для настройки 2FA в приложении-аутентификаторе
    // ОН НЕ ВКЛЮЧАЕТ 2FA, а только генерирует секрет и QR-код и сохраняет секрет в БД
    async generateTwoFactorSecret(userId: string) {
        const user = await this.userService.findById(userId);

        const secret = this.generateSecret();
        if (!secret.otpauth_url) {
            throw new InternalServerErrorException('Failed to generate OTP auth URL');
        }

        user.twoFactorSecret = secret.base32;
        await this.userService.update(user);

        const qrCode = await this.generateQRCode(secret.otpauth_url);
        return { qrCode, secret: secret.base32 };
    }

    // Метод верифицирует токен и ставит флаг в сессии (ДЛЯ ПОСЛЕДУЮЩИХ ВХОДОВ)
    async verifyLoginToken(userId: string, token: string, req: Request) {
        const user = await this.userService.findById(userId);

        if (!user.twoFactorSecret || !user.isTwoFactorEnabled) {
            throw new BadRequestException('2FA is not enabled for this user');
        }

        const isValid = this.verifyToken(user.twoFactorSecret, token);
        if (!isValid) {
            throw new BadRequestException('Invalid token');
        }

        req.session.is2faPassed = true;

        return { message: '2FA verification successful' };
    }

    // Метод включает двухфакторную аутентификацию и ставит флаги в БД и сессию (ДЛЯ ПЕРВОГО ВКЛЮЧЕНИЯ)
    async enableTwoFactor(userId: string, token: string, req: Request) {
        const user = await this.userService.findById(userId);
        if (!user.twoFactorSecret) {
            throw new BadRequestException('No secret found. Generate secret first.');
        }

        const isValid = this.verifyToken(user.twoFactorSecret, token);
        if (!isValid) {
            throw new BadRequestException('Invalid token');
        }

        if (user.isTwoFactorEnabled) {
            throw new BadRequestException('2FA is already enabled');
        }

        user.isTwoFactorEnabled = true;
        await this.userService.update(user);

        req.session.is2faPassed = true;

        return { message: '2FA has been enabled successfully' };
    }

    // Метод отключает двухфакторную аутентификацию и сбрасывает флаги в БД и сессии
    async disableTwoFactor(userId: string, token: string, req: Request) {
        const user = await this.userService.findById(userId);
        if (!user.isTwoFactorEnabled || !user.twoFactorSecret) {
            throw new BadRequestException('2FA is not enabled for this user');
        }

        const isValid = this.verifyToken(user.twoFactorSecret, token);
        if (!isValid) {
            throw new BadRequestException('Invalid token');
        }

        user.isTwoFactorEnabled = false;
        user.twoFactorSecret = null;
        await this.userService.update(user);

        req.session.is2faPassed = false;

        return { message: '2FA has been disabled successfully' };
    }

    async getStatus(userId: string) {
        const user = await this.userService.findById(userId);
        return { isTwoFactorEnabled: user.isTwoFactorEnabled };
    }

    private generateSecret() {
        return speakeasy.generateSecret({
            name: this.configService.getOrThrow<string>('APP_NAME'),
        });
    }

    private async generateQRCode(otpAuthURL: string) {
        return await qrcode.toDataURL(otpAuthURL);
    }

    private verifyToken(secret: string, token: string) {
        return speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token,
            window: 1,
        });
    }
}
