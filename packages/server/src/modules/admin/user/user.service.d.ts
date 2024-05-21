import { PrismaClient, AdminUser } from '@prisma/client';
import { BasicService } from '../../../basic/service/basic.service';
import { CreateUserDto, UpdateUserPwd, UserDto, UserLoginDto } from './dto/user.dto';
import { Application } from '@midwayjs/koa';
import { Jwt } from '../../internal/authentication/jwt.service';
import { CaptchaService } from '../../internal/authentication/captcha.service';
export declare class UserService extends BasicService<AdminUser> {
    prismaClient: PrismaClient;
    app: Application;
    jwt: Jwt;
    captchaServer: CaptchaService;
    protected get model(): import("@prisma/client").Prisma.AdminUserDelegate<import("@prisma/client/runtime/library").DefaultArgs>;
    createUser(info: CreateUserDto): Promise<number>;
    login(info: UserLoginDto): Promise<{
        token: {
            accessToken: string;
            refreshToken: string;
        };
        userInfo: {
            id: number;
            username: string;
            password: string;
            avatar: string;
            mobile: string;
            status: number;
            isRoot: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    deleteAdminUser(delId: any, user: any): Promise<number>;
    updateUserInfo(userInfo: UserDto, user: UserDto, type?: string): Promise<any>;
    updateUserPwd(userInfo: UpdateUserPwd, user: UserDto): Promise<any>;
    refreshAccessToken(token: string, userInfo: UserDto): Promise<string>;
    private diffPassword;
}
