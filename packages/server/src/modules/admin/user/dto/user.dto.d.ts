import { BasicIdDto, BasicPageDto } from '../../../../basic/dto/basic.dto';
export declare class UserDto {
    id: number;
    username?: string;
    avatar?: string;
    mobile?: string;
    status?: number;
    isRoot?: number;
}
declare const CreateUserDto_base: import("@midwayjs/validate").Dto<Omit<UserDto, "id">>;
export declare class CreateUserDto extends CreateUserDto_base {
    password: string;
    confirmPassword: string;
}
export declare class UpdateUserPwd extends BasicIdDto {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
declare const UserLoginDto_base: import("@midwayjs/validate").Dto<Pick<UserDto, "mobile">>;
export declare class UserLoginDto extends UserLoginDto_base {
    password: string;
    captcha: string;
    captchaId: string;
}
export declare class UserPageDto extends BasicPageDto {
    username?: string;
    status: number;
    isRoot: number;
    mobile?: string;
}
export declare class RefreshAccessTokenDto {
    accessToken: string;
}
export {};
