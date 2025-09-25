import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { RegisterDto, LoginDto } from './dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {
    }

    async register(req: Request, dto: RegisterDto) {
        const isExisting = await this.userService.findByEmail(dto.email);
        if (isExisting) {
            throw new ConflictException('Email already exists');
        }

        const newUser = await this.userService.create(dto.email, dto.password, false);
        return this.saveSession(req, newUser);
    }

    async login(req: Request, dto: LoginDto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isValidPassword = await bcrypt.compare(dto.password, user.password);
        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid password');
        }

        return this.saveSession(req, user);
    }

    async logout(req: Request, res: Response): Promise<void> {
        return new Promise((resolve, reject) => {
            //Уничтожаем сессию
            req.session.destroy(error => {
                if (error) {
                    return reject(
                        new InternalServerErrorException('Could not destroy session'),
                    );
                }

                //Удаляем куки сессии
                res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
                resolve();
            });
        });
    }

    async getProfile(req: Request) {
        if (!req.session.userId) {
            throw new UnauthorizedException('User not logged in');
        }

        const user = await this.userService.findById(req.session.userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    //Сохраняем сессию пользователя
    private async saveSession(req: Request, user: User) {
        return new Promise((resolve, reject) => {
            req.session.userId = user.id;

            req.session.save(error => {
                if (error) {
                    return reject(
                        new InternalServerErrorException('Could not save session'),
                    );
                }

                resolve({ user });
            });
        });
    }
}
