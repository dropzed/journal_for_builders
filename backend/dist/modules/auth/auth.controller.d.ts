import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(req: Request, data: RegisterDto): Promise<unknown>;
    login(req: Request, data: LoginDto): Promise<unknown>;
    logout(req: Request, res: Response): Promise<void>;
}
