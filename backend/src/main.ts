import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import IORedis from 'ioredis';
import * as session from 'express-session';
import * as ms from 'ms';
import { StringValue } from 'ms';
import { RedisStore } from 'connect-redis';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    //подключение к редису
    const config = app.get(ConfigService);
    const redis = new IORedis(config.getOrThrow<string>('REDIS_URL'));

    //парсер куки
    app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));

    //глобальный пайп для валидации входящих данных
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    //глобальный интерсептор для форматирования ответов
    app.useGlobalInterceptors(new ResponseInterceptor());

    //настройка сессий, игнорируем ошибку типов. Не исправляется, потому что в библиотеке не обновили типы
    // @ts-ignore
    app.use(session({
        secret: config.getOrThrow<string>('SESSION_SECRET'),
        name: config.getOrThrow<string>('SESSION_NAME'),
        resave: true,
        saveUninitialized: false,
        cookie: {
            domain: config.getOrThrow<string>('SESSION_DOMAIN'),
            maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        },
        //Подключение редиса к сессиям, чтобы сессии сохранялись в редисе, а не в памяти сервера
        //и не терялись при перезагрузке сервера
        store: new RedisStore({
            client: redis,
            prefix: config.getOrThrow<string>('SESSION_FOLDER'),
        }),
    }));

    //настройка CORS, чтобы фронтенд мог общаться с бэкендом
    app.enableCors({
        origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
        credentials: true,
        exposedHeaders: ['set-cookie'],
    });

    await app.listen(config.getOrThrow<string>('PORT'));
}

bootstrap();
