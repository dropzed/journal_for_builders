import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {
    }

    async findById(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException('User does not exist');
        }

        return user;
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async create(email: string, password: string, isVerified: boolean) {
        const hashedPassword = bcrypt.hashSync(password, 10);

        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                isVerified
            },
        });
    }
}
