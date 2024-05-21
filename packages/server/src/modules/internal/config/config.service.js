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
exports.ConfigService = void 0;
const core_1 = require("@midwayjs/core");
const yaml = require("yaml");
const fs = require("fs/promises");
const path = require("path");
const configFilePath_1 = require("@/enum/configFilePath");
let ConfigService = class ConfigService {
    // 异步加载配置
    async loadConfig() {
        // 遍历 ConfigFilePathEnum 枚举的键
        for (const configFilePathEnumKey in configFilePath_1.ConfigFilePathEnum) {
            // 获取当前键对应的值
            const item = configFilePath_1.ConfigFilePathEnum[configFilePathEnumKey];
            // 获取配置文件的内容
            const config = await this.getYamlConfig(item);
            // 将配置对象添加到 midwayConfigServer 中
            this.midwayConfigServer.addObject(config);
        }
    }
    // 获取配置
    async getYamlConfig(pathEnum, field) {
        // 拼接配置文件路径
        const yamlFilePath = path.join(this.baseDir, pathEnum);
        // 读取配置文件内容
        const yamlFileContent = await fs.readFile(yamlFilePath, 'utf8');
        // 将配置文件内容解析为 YAML 对象
        const yamlConfig = yaml.parse(yamlFileContent);
        // 如果指定了 field，则返回指定字段的值；否则返回整个配置对象
        return field ? yamlConfig[field] : yamlConfig;
    }
    // 设置配置
    async setConfig(type, config) {
        // 获取当前配置文件的配置对象
        const yamlConfig = await this.getYamlConfig(type);
        // 将传入的配置对象合并到当前配置对象中
        Object.assign(yamlConfig, config);
        // 将配置对象转换为 YAML 字符串
        const yamlStr = yaml.stringify(yamlConfig);
        // 拼接配置文件路径
        const yamlFilePath = path.join(this.baseDir, type);
        // 将 YAML 字符串写入配置文件
        await fs.writeFile(yamlFilePath, yamlStr);
    }
};
exports.ConfigService = ConfigService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_1.MidwayConfigService)
], ConfigService.prototype, "midwayConfigServer", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", String)
], ConfigService.prototype, "baseDir", void 0);
exports.ConfigService = ConfigService = __decorate([
    (0, core_1.Provide)()
], ConfigService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBcUU7QUFDckUsNkJBQTRCO0FBQzVCLGtDQUFpQztBQUNqQyw2QkFBNEI7QUFDNUIsMERBQTBEO0FBSW5ELElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWE7SUFPeEIsU0FBUztJQUNULEtBQUssQ0FBQyxVQUFVO1FBQ2QsNkJBQTZCO1FBQzdCLEtBQUssTUFBTSxxQkFBcUIsSUFBSSxtQ0FBa0IsRUFBRSxDQUFDO1lBQ3ZELFlBQVk7WUFDWixNQUFNLElBQUksR0FBRyxtQ0FBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1lBQ3RELFlBQVk7WUFDWixNQUFNLE1BQU0sR0FBa0IsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzVELGdDQUFnQztZQUNoQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzNDLENBQUM7SUFDSCxDQUFDO0lBRUQsT0FBTztJQUNQLEtBQUssQ0FBQyxhQUFhLENBQ2pCLFFBQTZCLEVBQzdCLEtBQWU7UUFFZixXQUFXO1FBQ1gsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3RELFdBQVc7UUFDWCxNQUFNLGVBQWUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQy9ELHFCQUFxQjtRQUNyQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBTSxDQUFBO1FBQ25ELG1DQUFtQztRQUNuQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUE7SUFDL0MsQ0FBQztJQUVELE9BQU87SUFDUCxLQUFLLENBQUMsU0FBUyxDQUFJLElBQXdCLEVBQUUsTUFBUztRQUNwRCxnQkFBZ0I7UUFDaEIsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFJLElBQUksQ0FBQyxDQUFBO1FBQ3BELHFCQUFxQjtRQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUNqQyxvQkFBb0I7UUFDcEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUMxQyxXQUFXO1FBQ1gsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2xELG1CQUFtQjtRQUNuQixNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzNDLENBQUM7Q0FDRixDQUFBO0FBaERZLHNDQUFhO0FBRXhCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1csMEJBQW1CO3lEQUFBO0FBR3ZDO0lBREMsSUFBQSxhQUFNLEdBQUU7OzhDQUNNO3dCQUxKLGFBQWE7SUFEekIsSUFBQSxjQUFPLEdBQUU7R0FDRyxhQUFhLENBZ0R6QiJ9