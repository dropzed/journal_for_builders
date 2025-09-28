import { UserRole } from '@prisma/client';
export declare function Authorization(...roles: UserRole[]): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
