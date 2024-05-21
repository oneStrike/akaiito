"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshAccessTokenDto = exports.UserPageDto = exports.UserLoginDto = exports.UpdateUserPwd = exports.CreateUserDto = exports.UserDto = void 0;
const validate_1 = require("@midwayjs/validate");
const validate_2 = require("../../../../utils/validate");
const basic_dto_1 = require("../../../../basic/dto/basic.dto");
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, validate_1.Rule)(validate_2.requiredNumber),
    __metadata("design:type", Number)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateString),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateString),
    __metadata("design:type", String)
], UserDto.prototype, "avatar", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateString),
    __metadata("design:type", String)
], UserDto.prototype, "mobile", void 0);
__decorate([
    (0, validate_1.Rule)((0, validate_2.validateNumberLess)(2)),
    __metadata("design:type", Number)
], UserDto.prototype, "status", void 0);
__decorate([
    (0, validate_1.Rule)((0, validate_2.validateNumberLess)(2)),
    __metadata("design:type", Number)
], UserDto.prototype, "isRoot", void 0);
class CreateUserDto extends (0, validate_1.OmitDto)(UserDto, ['id']) {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, validate_1.Rule)(validate_2.validatePwd),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validatePwd),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confirmPassword", void 0);
class UpdateUserPwd extends basic_dto_1.BasicIdDto {
}
exports.UpdateUserPwd = UpdateUserPwd;
__decorate([
    (0, validate_1.Rule)(validate_2.validatePwd),
    __metadata("design:type", String)
], UpdateUserPwd.prototype, "oldPassword", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validatePwd),
    __metadata("design:type", String)
], UpdateUserPwd.prototype, "newPassword", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validatePwd),
    __metadata("design:type", String)
], UpdateUserPwd.prototype, "confirmNewPassword", void 0);
class UserLoginDto extends (0, validate_1.PickDto)(UserDto, ['mobile']) {
}
exports.UserLoginDto = UserLoginDto;
__decorate([
    (0, validate_1.Rule)(validate_2.validatePwd),
    __metadata("design:type", String)
], UserLoginDto.prototype, "password", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.requiredString),
    __metadata("design:type", String)
], UserLoginDto.prototype, "captcha", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.requiredString),
    __metadata("design:type", String)
], UserLoginDto.prototype, "captchaId", void 0);
class UserPageDto extends basic_dto_1.BasicPageDto {
}
exports.UserPageDto = UserPageDto;
__decorate([
    (0, validate_1.Rule)(validate_2.validateString),
    __metadata("design:type", String)
], UserPageDto.prototype, "username", void 0);
__decorate([
    (0, validate_1.Rule)((0, validate_2.validateNumberLess)(2)),
    __metadata("design:type", Number)
], UserPageDto.prototype, "status", void 0);
__decorate([
    (0, validate_1.Rule)((0, validate_2.validateNumberLess)(2)),
    __metadata("design:type", Number)
], UserPageDto.prototype, "isRoot", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateString),
    __metadata("design:type", String)
], UserPageDto.prototype, "mobile", void 0);
class RefreshAccessTokenDto {
}
exports.RefreshAccessTokenDto = RefreshAccessTokenDto;
__decorate([
    (0, validate_1.Rule)(validate_2.requiredString),
    __metadata("design:type", String)
], RefreshAccessTokenDto.prototype, "accessToken", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5kdG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyLmR0by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpREFBMkQ7QUFDM0QseURBTW1DO0FBQ25DLCtEQUEwRTtBQUUxRSxNQUFhLE9BQU87Q0FrQm5CO0FBbEJELDBCQWtCQztBQWhCQztJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7O21DQUNWO0FBR1g7SUFEQyxJQUFBLGVBQUksRUFBQyx5QkFBYyxDQUFDOzt5Q0FDSjtBQUdqQjtJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7O3VDQUNOO0FBR2Y7SUFEQyxJQUFBLGVBQUksRUFBQyx5QkFBYyxDQUFDOzt1Q0FDTjtBQUdmO0lBREMsSUFBQSxlQUFJLEVBQUMsSUFBQSw2QkFBa0IsRUFBQyxDQUFDLENBQUMsQ0FBQzs7dUNBQ2I7QUFHZjtJQURDLElBQUEsZUFBSSxFQUFDLElBQUEsNkJBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUM7O3VDQUNiO0FBR2pCLE1BQWEsYUFBYyxTQUFRLElBQUEsa0JBQU8sRUFBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQU0xRDtBQU5ELHNDQU1DO0FBSkM7SUFEQyxJQUFBLGVBQUksRUFBQyxzQkFBVyxDQUFDOzsrQ0FDRDtBQUdqQjtJQURDLElBQUEsZUFBSSxFQUFDLHNCQUFXLENBQUM7O3NEQUNNO0FBRzFCLE1BQWEsYUFBYyxTQUFRLHNCQUFVO0NBUzVDO0FBVEQsc0NBU0M7QUFQQztJQURDLElBQUEsZUFBSSxFQUFDLHNCQUFXLENBQUM7O2tEQUNFO0FBR3BCO0lBREMsSUFBQSxlQUFJLEVBQUMsc0JBQVcsQ0FBQzs7a0RBQ0U7QUFHcEI7SUFEQyxJQUFBLGVBQUksRUFBQyxzQkFBVyxDQUFDOzt5REFDUztBQUc3QixNQUFhLFlBQWEsU0FBUSxJQUFBLGtCQUFPLEVBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FTN0Q7QUFURCxvQ0FTQztBQVBDO0lBREMsSUFBQSxlQUFJLEVBQUMsc0JBQVcsQ0FBQzs7OENBQ0Q7QUFHakI7SUFEQyxJQUFBLGVBQUksRUFBQyx5QkFBYyxDQUFDOzs2Q0FDTDtBQUdoQjtJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7OytDQUNIO0FBR3BCLE1BQWEsV0FBWSxTQUFRLHdCQUFZO0NBWTVDO0FBWkQsa0NBWUM7QUFWQztJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7OzZDQUNKO0FBR2pCO0lBREMsSUFBQSxlQUFJLEVBQUMsSUFBQSw2QkFBa0IsRUFBQyxDQUFDLENBQUMsQ0FBQzs7MkNBQ2Q7QUFHZDtJQURDLElBQUEsZUFBSSxFQUFDLElBQUEsNkJBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUM7OzJDQUNkO0FBR2Q7SUFEQyxJQUFBLGVBQUksRUFBQyx5QkFBYyxDQUFDOzsyQ0FDTjtBQUdqQixNQUFhLHFCQUFxQjtDQUdqQztBQUhELHNEQUdDO0FBREM7SUFEQyxJQUFBLGVBQUksRUFBQyx5QkFBYyxDQUFDOzswREFDRiJ9