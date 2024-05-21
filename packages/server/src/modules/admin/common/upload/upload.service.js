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
exports.UploadService = void 0;
const core_1 = require("@midwayjs/core");
const fs = require("fs-extra");
const utils_1 = require("../../../../utils");
let UploadService = class UploadService {
    async local(files, fields) {
        if (!this.basicConfig.resourceScenario.includes(fields.scenario)) {
            throw new core_1.httpError.BadRequestError('不受支持的场景文件');
        }
        const date = utils_1.utils.dayjs().format('YYYYMMDD');
        const reportData = [];
        files.forEach((item) => {
            const staticFileDefaultConfig = this.staticFileConfig.dirs.default;
            const fileName = item.data.split(/\\/).pop();
            const path = `/${fields.scenario}/${date}/${fileName}`;
            reportData.push({
                fileName,
                filePath: staticFileDefaultConfig.prefix + path,
                mimeType: item.mimeType
            });
            fs.move(item.data, staticFileDefaultConfig.dir + path);
        });
        return reportData;
    }
};
exports.UploadService = UploadService;
__decorate([
    (0, core_1.Config)('basicConfig'),
    __metadata("design:type", Object)
], UploadService.prototype, "basicConfig", void 0);
__decorate([
    (0, core_1.Config)('staticFile'),
    __metadata("design:type", Object)
], UploadService.prototype, "staticFileConfig", void 0);
exports.UploadService = UploadService = __decorate([
    (0, core_1.Provide)()
], UploadService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1cGxvYWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBMkQ7QUFFM0QsK0JBQThCO0FBQzlCLDZDQUF5QztBQUdsQyxJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFhO0lBT3hCLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBc0IsRUFBRSxNQUFxQjtRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDakUsTUFBTSxJQUFJLGdCQUFTLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2xELENBQUM7UUFDRCxNQUFNLElBQUksR0FBRyxhQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQzdDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQTtRQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckIsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtZQUNsRSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUM1QyxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFBO1lBQ3RELFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsUUFBUTtnQkFDUixRQUFRLEVBQUUsdUJBQXVCLENBQUMsTUFBTSxHQUFHLElBQUk7Z0JBQy9DLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUN4QixDQUFDLENBQUE7WUFDRixFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFBO1FBQ3hELENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxVQUFVLENBQUE7SUFDbkIsQ0FBQztDQUNGLENBQUE7QUExQlksc0NBQWE7QUFFeEI7SUFEQyxJQUFBLGFBQU0sRUFBQyxhQUFhLENBQUM7O2tEQUNYO0FBR1g7SUFEQyxJQUFBLGFBQU0sRUFBQyxZQUFZLENBQUM7O3VEQUNMO3dCQUxMLGFBQWE7SUFEekIsSUFBQSxjQUFPLEdBQUU7R0FDRyxhQUFhLENBMEJ6QiJ9