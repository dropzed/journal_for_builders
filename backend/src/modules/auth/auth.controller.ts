import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    async register(@Req() req: Request, @Body() data: RegisterDto) {
        return this.authService.register(req, data);
    }

    @Post('login')
    async login(@Req() req: Request, @Body() data: LoginDto) {
        return this.authService.login(req, data);
    }

    @Post('logout')
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.logout(req, res);
    }

    @Post('me')
    async getProfile(@Req() req: Request) {
        return this.authService.getProfile(req);
    }

}
