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
exports.Jwt = void 0;
const core_1 = require("@midwayjs/core");
const jwt = require("jsonwebtoken");
let Jwt = class Jwt {
    async sign(payload, options, secret) {
        secret = secret !== null && secret !== void 0 ? secret : this.jwtConfig.secret;
        options = Object.assign(this.jwtConfig.signOptions, options || {});
        return jwt.sign(payload, secret, options);
    }
    async verify(token, secretOrPublicKey, options) {
        const secret = secretOrPublicKey ? secretOrPublicKey : this.jwtConfig.secret;
        const opts = Object.assign(this.jwtConfig.verifyOptions, options);
        const { payload } = jwt.verify(token, secret, opts);
        return payload;
    }
};
exports.Jwt = Jwt;
__decorate([
    (0, core_1.Config)('jwt'),
    __metadata("design:type", Object)
], Jwt.prototype, "jwtConfig", void 0);
exports.Jwt = Jwt = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Request, { allowDowngrade: true })
], Jwt);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqd3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBa0U7QUFDbEUsb0NBQW1DO0FBTTVCLElBQU0sR0FBRyxHQUFULE1BQU0sR0FBRztJQUlkLEtBQUssQ0FBQyxJQUFJLENBQ1IsT0FBK0IsRUFDL0IsT0FBeUIsRUFDekIsTUFBZTtRQUVmLE1BQU0sR0FBRyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQTtRQUN4QyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxPQUFPLElBQUksRUFBRSxDQUFDLENBQUE7UUFDbEUsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQ1YsS0FBYSxFQUNiLGlCQUEwQixFQUMxQixPQUEyQjtRQUUzQixNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFBO1FBQzVFLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDakUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBRWpELENBQUE7UUFDRCxPQUFPLE9BQU8sQ0FBQTtJQUNoQixDQUFDO0NBQ0YsQ0FBQTtBQTFCWSxrQkFBRztBQUVkO0lBREMsSUFBQSxhQUFNLEVBQUMsS0FBSyxDQUFDOztzQ0FDTDtjQUZFLEdBQUc7SUFGZixJQUFBLGNBQU8sR0FBRTtJQUNULElBQUEsWUFBSyxFQUFDLGdCQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxDQUFDO0dBQ3RDLEdBQUcsQ0EwQmYifQ==