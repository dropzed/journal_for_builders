import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { TwoFactorModule } from './modules/two-factor/two-factor.module';

@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: !IS_DEV_ENV,
        }),
        PrismaModule,
        UserModule,
        TwoFactorModule
    ]
})
export class AppModule {
}
