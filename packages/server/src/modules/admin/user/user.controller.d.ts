import { CreateUserDto, RefreshAccessTokenDto, UpdateUserPwd, UserDto, UserLoginDto, UserPageDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Context } from '@midwayjs/koa';
import { BasicIdStatusDto, BasicIdDto } from '../../../basic/dto/basic.dto';
export declare class UserController {
    userService: UserService;
    ctx: Context;
    login(body: UserLoginDto): Promise<{
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
    createUser(body: CreateUserDto): Promise<number>;
    getUserInfo(query: {
        id?: number;
    }): Promise<{
        id: number;
        username: string;
        password: string;
        avatar: string;
        mobile: string;
        status: number;
        isRoot: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserPage(query: UserPageDto): Promise<{
        pageSize: number;
        pageIndex: number;
        total: number;
        list: {
            id: number;
            username: string;
            password: string;
            avatar: string;
            mobile: string;
            status: number;
            isRoot: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    updateUser(body: UserDto): Promise<any>;
    deleteAdminUser(body: BasicIdDto): Promise<number>;
    updateAdminUserPassword(body: UpdateUserPwd): Promise<any>;
    updateUserStatus(body: BasicIdStatusDto): Promise<any>;
    refreshAccessToken(body: RefreshAccessTokenDto): Promise<string>;
}
