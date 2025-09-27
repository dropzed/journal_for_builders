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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorController = void 0;
const common_1 = require("@nestjs/common");
const two_factor_service_1 = require("./two-factor.service");
const authorized_decorator_1 = require("../../common/decorators/authorized.decorator");
const auth_skip_2fa_1 = require("../../common/decorators/auth-skip-2fa");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
let TwoFactorController = class TwoFactorController {
    twoFactorService;
    constructor(twoFactorService) {
        this.twoFactorService = twoFactorService;
    }
    async generateSecret(userId) {
        return this.twoFactorService.generateTwoFactorSecret(userId);
    }
    async enable(userId, body, req) {
        return this.twoFactorService.enableTwoFactor(userId, body.token, req);
    }
    async verify(userId, body, req) {
        return this.twoFactorService.verifyLoginToken(userId, body.token, req);
    }
    async disable(userId, body, req) {
        return this.twoFactorService.disableTwoFactor(userId, body.token, req);
    }
    async getStatus(userId) {
        return this.twoFactorService.getStatus(userId);
    }
};
exports.TwoFactorController = TwoFactorController;
__decorate([
    (0, auth_skip_2fa_1.AuthorizationSkip2FA)(),
    (0, common_1.Post)('generate-secret'),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TwoFactorController.prototype, "generateSecret", null);
__decorate([
    (0, auth_skip_2fa_1.AuthorizationSkip2FA)(),
    (0, common_1.Post)('enable'),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TwoFactorController.prototype, "enable", null);
__decorate([
    (0, auth_skip_2fa_1.AuthorizationSkip2FA)(),
    (0, common_1.Post)('verify'),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TwoFactorController.prototype, "verify", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Post)('disable'),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TwoFactorController.prototype, "disable", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Get)('status'),
    __param(0, (0, authorized_decorator_1.Authorized)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TwoFactorController.prototype, "getStatus", null);
exports.TwoFactorController = TwoFactorController = __decorate([
    (0, common_1.Controller)('two-factor'),
    __metadata("design:paramtypes", [two_factor_service_1.TwoFactorService])
], TwoFactorController);
//# sourceMappingURL=two-factor.controller.js.map