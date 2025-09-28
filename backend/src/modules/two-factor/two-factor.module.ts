import { Module } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import { TwoFactorController } from './two-factor.controller';
import { UserService } from '../user/user.service';

@Module({
    imports: [],
    controllers: [TwoFactorController],
    providers: [TwoFactorService, UserService],
})
export class TwoFactorModule {
}
