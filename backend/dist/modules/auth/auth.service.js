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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    userService;
    configService;
    constructor(userService, configService) {
        this.userService = userService;
        this.configService = configService;
    }
    async register(req, dto) {
        const isExisting = await this.userService.findByEmail(dto.email);
        if (isExisting) {
            throw new common_1.ConflictException('Email already exists');
        }
        const newUser = await this.userService.create(dto.email, dto.password, false);
        return this.saveSession(req, newUser);
    }
    async login(req, dto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isValidPassword = await bcrypt.compare(dto.password, user.password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        return this.saveSession(req, user);
    }
    async logout(req, res) {
        return new Promise((resolve, reject) => {
            req.session.destroy(error => {
                if (error) {
                    return reject(new common_1.InternalServerErrorException('Could not destroy session'));
                }
                res.clearCookie(this.configService.getOrThrow('SESSION_NAME'));
                resolve();
            });
        });
    }
    async getProfile(req) {
        if (!req.session.userId) {
            throw new common_1.UnauthorizedException('User not logged in');
        }
        const user = await this.userService.findById(req.session.userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async saveSession(req, user) {
        return new Promise((resolve, reject) => {
            req.session.userId = user.id;
            req.session.save(error => {
                if (error) {
                    return reject(new common_1.InternalServerErrorException('Could not save session'));
                }
                resolve({ user });
            });
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map