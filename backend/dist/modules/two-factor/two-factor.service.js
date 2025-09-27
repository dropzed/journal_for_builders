"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorService = void 0;
const common_1 = require("@nestjs/common");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
let TwoFactorService = class TwoFactorService {
    configService;
    userService;
    constructor(configService, userService) {
        this.configService = configService;
        this.userService = userService;
    }
    async generateTwoFactorSecret(userId) {
        const user = await this.userService.findById(userId);
        const secret = this.generateSecret();
        if (!secret.otpauth_url) {
            throw new common_1.InternalServerErrorException('Failed to generate OTP auth URL');
        }
        user.twoFactorSecret = secret.base32;
        await this.userService.update(user);
        const qrCode = await this.generateQRCode(secret.otpauth_url);
        return { qrCode, secret: secret.base32 };
    }
    async verifyLoginToken(userId, token, req) {
        const user = await this.userService.findById(userId);
        if (!user.twoFactorSecret || !user.isTwoFactorEnabled) {
            throw new common_1.BadRequestException('2FA is not enabled for this user');
        }
        const isValid = this.verifyToken(user.twoFactorSecret, token);
        if (!isValid) {
            throw new common_1.BadRequestException('Invalid token');
        }
        req.session.is2faPassed = true;
        return { message: '2FA verification successful' };
    }
    async enableTwoFactor(userId, token, req) {
        const user = await this.userService.findById(userId);
        if (!user.twoFactorSecret) {
            throw new common_1.BadRequestException('No secret found. Generate secret first.');
        }
        const isValid = this.verifyToken(user.twoFactorSecret, token);
        if (!isValid) {
            throw new common_1.BadRequestException('Invalid token');
        }
        if (user.isTwoFactorEnabled) {
            throw new common_1.BadRequestException('2FA is already enabled');
        }
        user.isTwoFactorEnabled = true;
        await this.userService.update(user);
        req.session.is2faPassed = true;
        return { message: '2FA has been enabled successfully' };
    }
    async disableTwoFactor(userId, token, req) {
        const user = await this.userService.findById(userId);
        if (!user.isTwoFactorEnabled || !user.twoFactorSecret) {
            throw new common_1.BadRequestException('2FA is not enabled for this user');
        }
        const isValid = this.verifyToken(user.twoFactorSecret, token);
        if (!isValid) {
            throw new common_1.BadRequestException('Invalid token');
        }
        user.isTwoFactorEnabled = false;
        user.twoFactorSecret = null;
        await this.userService.update(user);
        req.session.is2faPassed = false;
        return { message: '2FA has been disabled successfully' };
    }
    async getStatus(userId) {
        const user = await this.userService.findById(userId);
        return { isTwoFactorEnabled: user.isTwoFactorEnabled };
    }
    generateSecret() {
        return speakeasy.generateSecret({
            name: this.configService.getOrThrow('APP_NAME'),
        });
    }
    async generateQRCode(otpAuthURL) {
        return await qrcode.toDataURL(otpAuthURL);
    }
    verifyToken(secret, token) {
        return speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token,
            window: 1,
        });
    }
};
exports.TwoFactorService = TwoFactorService;
exports.TwoFactorService = TwoFactorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService])
], TwoFactorService);
//# sourceMappingURL=two-factor.service.js.map