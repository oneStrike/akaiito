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
exports.BasicOrderDto = exports.BasicIdStatusDto = exports.BasicIdsStatusDto = exports.BasicIdsDto = exports.BasicIdDto = exports.BasicPageDto = void 0;
const validate_1 = require("@midwayjs/validate");
const validate_2 = require("@/utils/validate");
class BasicPageDto {
}
exports.BasicPageDto = BasicPageDto;
__decorate([
    (0, validate_1.Rule)(validate_2.validateNumber),
    __metadata("design:type", Number)
], BasicPageDto.prototype, "pageSize", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateNumber),
    __metadata("design:type", Number)
], BasicPageDto.prototype, "pageIndex", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateString),
    __metadata("design:type", String)
], BasicPageDto.prototype, "orderBy", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateDate),
    __metadata("design:type", String)
], BasicPageDto.prototype, "startTime", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateDate),
    __metadata("design:type", String)
], BasicPageDto.prototype, "endTime", void 0);
class BasicIdDto {
}
exports.BasicIdDto = BasicIdDto;
__decorate([
    (0, validate_1.Rule)(validate_2.requiredNumber),
    __metadata("design:type", Number)
], BasicIdDto.prototype, "id", void 0);
class BasicIdsDto {
}
exports.BasicIdsDto = BasicIdsDto;
__decorate([
    (0, validate_1.Rule)(validate_2.validateNumberArray),
    __metadata("design:type", Array)
], BasicIdsDto.prototype, "ids", void 0);
class BasicIdsStatusDto extends BasicIdsDto {
}
exports.BasicIdsStatusDto = BasicIdsStatusDto;
__decorate([
    (0, validate_1.Rule)((0, validate_2.requiredNumberLess)(2)),
    __metadata("design:type", Number)
], BasicIdsStatusDto.prototype, "status", void 0);
class BasicIdStatusDto extends BasicIdDto {
}
exports.BasicIdStatusDto = BasicIdStatusDto;
__decorate([
    (0, validate_1.Rule)((0, validate_2.requiredNumberLess)(2)),
    __metadata("design:type", Number)
], BasicIdStatusDto.prototype, "status", void 0);
class BasicOrderDto {
}
exports.BasicOrderDto = BasicOrderDto;
__decorate([
    (0, validate_1.Rule)(validate_2.requiredNumber),
    __metadata("design:type", Number)
], BasicOrderDto.prototype, "targetId", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.requiredNumber),
    __metadata("design:type", Number)
], BasicOrderDto.prototype, "targetOrder", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.requiredNumber),
    __metadata("design:type", Number)
], BasicOrderDto.prototype, "originId", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.requiredNumber),
    __metadata("design:type", Number)
], BasicOrderDto.prototype, "originOrder", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMuZHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzaWMuZHRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlEQUF5QztBQUN6QywrQ0FPeUI7QUFFekIsTUFBYSxZQUFZO0NBb0J4QjtBQXBCRCxvQ0FvQkM7QUFqQkM7SUFEQyxJQUFBLGVBQUksRUFBQyx5QkFBYyxDQUFDOzs4Q0FDSjtBQUlqQjtJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7OytDQUNIO0FBSWxCO0lBREMsSUFBQSxlQUFJLEVBQUMseUJBQWMsQ0FBQzs7NkNBQ0w7QUFJaEI7SUFEQyxJQUFBLGVBQUksRUFBQyx1QkFBWSxDQUFDOzsrQ0FDRDtBQUlsQjtJQURDLElBQUEsZUFBSSxFQUFDLHVCQUFZLENBQUM7OzZDQUNIO0FBR2xCLE1BQWEsVUFBVTtDQUl0QjtBQUpELGdDQUlDO0FBREM7SUFEQyxJQUFBLGVBQUksRUFBQyx5QkFBYyxDQUFDOztzQ0FDWDtBQUdaLE1BQWEsV0FBVztDQUl2QjtBQUpELGtDQUlDO0FBREM7SUFEQyxJQUFBLGVBQUksRUFBQyw4QkFBbUIsQ0FBQzs7d0NBQ2I7QUFHZixNQUFhLGlCQUFrQixTQUFRLFdBQVc7Q0FJakQ7QUFKRCw4Q0FJQztBQURDO0lBREMsSUFBQSxlQUFJLEVBQUMsSUFBQSw2QkFBa0IsRUFBQyxDQUFDLENBQUMsQ0FBQzs7aURBQ2Q7QUFHaEIsTUFBYSxnQkFBaUIsU0FBUSxVQUFVO0NBSS9DO0FBSkQsNENBSUM7QUFEQztJQURDLElBQUEsZUFBSSxFQUFDLElBQUEsNkJBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUM7O2dEQUNkO0FBR2hCLE1BQWEsYUFBYTtDQVl6QjtBQVpELHNDQVlDO0FBVkM7SUFEQyxJQUFBLGVBQUksRUFBQyx5QkFBYyxDQUFDOzsrQ0FDTDtBQUdoQjtJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7O2tEQUNGO0FBR25CO0lBREMsSUFBQSxlQUFJLEVBQUMseUJBQWMsQ0FBQzs7K0NBQ0w7QUFHaEI7SUFEQyxJQUFBLGVBQUksRUFBQyx5QkFBYyxDQUFDOztrREFDRiJ9