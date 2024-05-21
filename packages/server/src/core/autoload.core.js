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
exports.AutoLoadCore = void 0;
const core_1 = require("@midwayjs/core");
const fs = require("fs-extra");
const config_service_1 = require("../modules/internal/config/config.service");
let AutoLoadCore = class AutoLoadCore {
    async init() {
        //初始化项目配置
        await this.configServer.loadConfig();
        //创建静态资源文件目录
        for (const item of this.basicConfig.resourceScenario) {
            await fs.ensureDir(this.staticFileConfig.dirs.default.dir + '/' + item);
        }
    }
};
exports.AutoLoadCore = AutoLoadCore;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", config_service_1.ConfigService)
], AutoLoadCore.prototype, "configServer", void 0);
__decorate([
    (0, core_1.Config)('basicConfig'),
    __metadata("design:type", Object)
], AutoLoadCore.prototype, "basicConfig", void 0);
__decorate([
    (0, core_1.Config)('staticFile'),
    __metadata("design:type", Object)
], AutoLoadCore.prototype, "staticFileConfig", void 0);
__decorate([
    (0, core_1.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutoLoadCore.prototype, "init", null);
exports.AutoLoadCore = AutoLoadCore = __decorate([
    (0, core_1.Autoload)(),
    (0, core_1.Provide)()
], AutoLoadCore);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2xvYWQuY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dG9sb2FkLmNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXdFO0FBQ3hFLCtCQUE4QjtBQUM5Qiw4RUFBeUU7QUFJbEUsSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBWTtJQVdqQixBQUFOLEtBQUssQ0FBQyxJQUFJO1FBQ1IsU0FBUztRQUNULE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNwQyxZQUFZO1FBQ1osS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDckQsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUE7UUFDekUsQ0FBQztJQUNILENBQUM7Q0FDRixDQUFBO0FBbkJZLG9DQUFZO0FBRXZCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ0ssOEJBQWE7a0RBQUE7QUFHM0I7SUFEQyxJQUFBLGFBQU0sRUFBQyxhQUFhLENBQUM7O2lEQUNYO0FBR1g7SUFEQyxJQUFBLGFBQU0sRUFBQyxZQUFZLENBQUM7O3NEQUNMO0FBR1Y7SUFETCxJQUFBLFdBQUksR0FBRTs7Ozt3Q0FRTjt1QkFsQlUsWUFBWTtJQUZ4QixJQUFBLGVBQVEsR0FBRTtJQUNWLElBQUEsY0FBTyxHQUFFO0dBQ0csWUFBWSxDQW1CeEIifQ==