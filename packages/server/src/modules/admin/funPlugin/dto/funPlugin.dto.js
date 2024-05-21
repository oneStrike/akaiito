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
exports.CreateFunPluginDto = exports.FunPluginDto = void 0;
const validate_1 = require("@midwayjs/validate");
const validate_2 = require("@/utils/validate");
class FunPluginDto {
}
exports.FunPluginDto = FunPluginDto;
__decorate([
    (0, validate_1.Rule)(validate_2.requiredNumber),
    __metadata("design:type", Number)
], FunPluginDto.prototype, "id", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.requiredString),
    __metadata("design:type", String)
], FunPluginDto.prototype, "name", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.requiredString),
    __metadata("design:type", String)
], FunPluginDto.prototype, "avatar", void 0);
__decorate([
    (0, validate_1.Rule)((0, validate_2.validateNumberLess)(2)),
    __metadata("design:type", Number)
], FunPluginDto.prototype, "type", void 0);
__decorate([
    (0, validate_1.Rule)((0, validate_2.validateNumberLess)(2)),
    __metadata("design:type", Number)
], FunPluginDto.prototype, "status", void 0);
__decorate([
    (0, validate_1.Rule)((0, validate_2.validateNumberLess)(2)),
    __metadata("design:type", Number)
], FunPluginDto.prototype, "isFree", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateNumber),
    __metadata("design:type", Function)
], FunPluginDto.prototype, "price", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateNumber),
    __metadata("design:type", Number)
], FunPluginDto.prototype, "assistPurchaseCount", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.requiredString),
    __metadata("design:type", String)
], FunPluginDto.prototype, "sourceName", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.requiredString),
    __metadata("design:type", String)
], FunPluginDto.prototype, "sourceUrl", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.requiredString),
    __metadata("design:type", String)
], FunPluginDto.prototype, "desc", void 0);
/*创建功能插件*/
class CreateFunPluginDto extends (0, validate_1.OmitDto)(FunPluginDto, ['id']) {
}
exports.CreateFunPluginDto = CreateFunPluginDto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuUGx1Z2luLmR0by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZ1blBsdWdpbi5kdG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWtEO0FBQ2xELCtDQUt5QjtBQUd6QixNQUFhLFlBQVk7Q0FpQ3hCO0FBakNELG9DQWlDQztBQS9CQztJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7O3dDQUNYO0FBR1Y7SUFEQyxJQUFBLGVBQUksRUFBQyx5QkFBYyxDQUFDOzswQ0FDVDtBQUdaO0lBREMsSUFBQSxlQUFJLEVBQUMseUJBQWMsQ0FBQzs7NENBQ1A7QUFHZDtJQURDLElBQUEsZUFBSSxFQUFDLElBQUEsNkJBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUM7OzBDQUNoQjtBQUdaO0lBREMsSUFBQSxlQUFJLEVBQUMsSUFBQSw2QkFBa0IsRUFBQyxDQUFDLENBQUMsQ0FBQzs7NENBQ2Q7QUFHZDtJQURDLElBQUEsZUFBSSxFQUFDLElBQUEsNkJBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUM7OzRDQUNkO0FBR2Q7SUFEQyxJQUFBLGVBQUksRUFBQyx5QkFBYyxDQUFDOzsyQ0FDTjtBQUdmO0lBREMsSUFBQSxlQUFJLEVBQUMseUJBQWMsQ0FBQzs7eURBQ007QUFHM0I7SUFEQyxJQUFBLGVBQUksRUFBQyx5QkFBYyxDQUFDOztnREFDSDtBQUdsQjtJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7OytDQUNKO0FBR2pCO0lBREMsSUFBQSxlQUFJLEVBQUMseUJBQWMsQ0FBQzs7MENBQ1Q7QUFHZCxVQUFVO0FBQ1YsTUFBYSxrQkFBbUIsU0FBUSxJQUFBLGtCQUFPLEVBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FBRztBQUF4RSxnREFBd0UifQ==