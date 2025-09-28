import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import { Authorized } from '../../common/decorators/authorized.decorator';
import { AuthorizationSkip2FA } from '../../common/decorators/auth-skip-2fa';
import { Request } from 'express';
import { Authorization } from '../../common/decorators/auth.decorator';

@Controller('two-factor')
export class TwoFactorController {
    constructor(
        private readonly twoFactorService: TwoFactorService,
    ) {
    }

    // 1. Сгенерировать секрет и QR
    @AuthorizationSkip2FA()
    @Post('generate-secret')
    async generateSecret(
        @Authorized('id') userId: string,
    ) {
        return this.twoFactorService.generateTwoFactorSecret(userId);
    }

    // 2. Включить двухфакторку (нужно ввести корректный код)
    @AuthorizationSkip2FA()
    @Post('enable')
    async enable(
        @Authorized('id') userId: string,
        @Body() body: { token: string },
        @Req() req: Request,
    ) {
        return this.twoFactorService.enableTwoFactor(userId, body.token, req);
    }

    // 3. Проверка токена при входе
    @AuthorizationSkip2FA()
    @Post('verify')
    async verify(
        @Authorized('id') userId: string,
        @Body() body: { token: string },
        @Req() req: Request,
    ) {
        return this.twoFactorService.verifyLoginToken(userId, body.token, req);
    }

    @Authorization()
    @Post('disable')
    async disable(
        @Authorized('id') userId: string,
        @Body() body: { token: string },
        @Req() req: Request,
    ) {
        return this.twoFactorService.disableTwoFactor(userId, body.token, req);
    }

    @Authorization()
    @Get('status')
    async getStatus(
        @Authorized('id') userId: string
    ) {
        return this.twoFactorService.getStatus(userId);
    }
}
