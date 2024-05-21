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
exports.FindDictionItemsDto = exports.FindDictionDto = exports.CreateDictionaryItemsDto = exports.UpdateDictionaryDto = exports.CreateDictionaryDto = exports.DictionaryDto = void 0;
const validate_1 = require("@midwayjs/validate");
const validate_2 = require("@/utils/validate");
const basic_dto_1 = require("@/basic/dto/basic.dto");
class DictionaryDto {
}
exports.DictionaryDto = DictionaryDto;
__decorate([
    (0, validate_1.Rule)(validate_2.requiredNumber),
    __metadata("design:type", Number)
], DictionaryDto.prototype, "id", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.requiredString),
    __metadata("design:type", String)
], DictionaryDto.prototype, "name", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.requiredString),
    __metadata("design:type", String)
], DictionaryDto.prototype, "code", void 0);
__decorate([
    (0, validate_1.Rule)((0, validate_2.validateNumberLess)(2)),
    __metadata("design:type", Number)
], DictionaryDto.prototype, "status", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.requiredString),
    __metadata("design:type", String)
], DictionaryDto.prototype, "desc", void 0);
class CreateDictionaryDto extends (0, validate_1.OmitDto)(DictionaryDto, [
    'id',
    'status'
]) {
}
exports.CreateDictionaryDto = CreateDictionaryDto;
class UpdateDictionaryDto extends (0, validate_1.OmitDto)(DictionaryDto, ['status']) {
}
exports.UpdateDictionaryDto = UpdateDictionaryDto;
class CreateDictionaryItemsDto extends (0, validate_1.OmitDto)(DictionaryDto, [
    'id',
    'status'
]) {
}
exports.CreateDictionaryItemsDto = CreateDictionaryItemsDto;
__decorate([
    (0, validate_1.Rule)(validate_2.requiredNumber),
    __metadata("design:type", Number)
], CreateDictionaryItemsDto.prototype, "dictionaryId", void 0);
class FindDictionDto extends basic_dto_1.BasicPageDto {
}
exports.FindDictionDto = FindDictionDto;
__decorate([
    (0, validate_1.Rule)(validate_2.validateString),
    __metadata("design:type", String)
], FindDictionDto.prototype, "name", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateString),
    __metadata("design:type", String)
], FindDictionDto.prototype, "code", void 0);
__decorate([
    (0, validate_1.Rule)((0, validate_2.validateNumberLess)(2)),
    __metadata("design:type", Number)
], FindDictionDto.prototype, "status", void 0);
class FindDictionItemsDto extends basic_dto_1.BasicPageDto {
}
exports.FindDictionItemsDto = FindDictionItemsDto;
__decorate([
    (0, validate_1.Rule)(validate_2.requiredNumber),
    __metadata("design:type", Number)
], FindDictionItemsDto.prototype, "dictionaryId", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateString),
    __metadata("design:type", String)
], FindDictionItemsDto.prototype, "name", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateString),
    __metadata("design:type", String)
], FindDictionItemsDto.prototype, "code", void 0);
__decorate([
    (0, validate_1.Rule)((0, validate_2.validateNumberLess)(2)),
    __metadata("design:type", Number)
], FindDictionItemsDto.prototype, "status", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljdGlvbmFyeS5kdG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWN0aW9uYXJ5LmR0by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpREFBa0Q7QUFDbEQsK0NBS3lCO0FBQ3pCLHFEQUFvRDtBQUVwRCxNQUFhLGFBQWE7Q0FlekI7QUFmRCxzQ0FlQztBQWJDO0lBREMsSUFBQSxlQUFJLEVBQUMseUJBQWMsQ0FBQzs7eUNBQ1g7QUFHVjtJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7OzJDQUNUO0FBR1o7SUFEQyxJQUFBLGVBQUksRUFBQyx5QkFBYyxDQUFDOzsyQ0FDVDtBQUdaO0lBREMsSUFBQSxlQUFJLEVBQUMsSUFBQSw2QkFBa0IsRUFBQyxDQUFDLENBQUMsQ0FBQzs7NkNBQ2Q7QUFHZDtJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7OzJDQUNUO0FBR2QsTUFBYSxtQkFBb0IsU0FBUSxJQUFBLGtCQUFPLEVBQUMsYUFBYSxFQUFFO0lBQzlELElBQUk7SUFDSixRQUFRO0NBQ1QsQ0FBQztDQUFHO0FBSEwsa0RBR0s7QUFFTCxNQUFhLG1CQUFvQixTQUFRLElBQUEsa0JBQU8sRUFBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUFHO0FBQTlFLGtEQUE4RTtBQUU5RSxNQUFhLHdCQUF5QixTQUFRLElBQUEsa0JBQU8sRUFBQyxhQUFhLEVBQUU7SUFDbkUsSUFBSTtJQUNKLFFBQVE7Q0FDVCxDQUFDO0NBR0Q7QUFORCw0REFNQztBQURDO0lBREMsSUFBQSxlQUFJLEVBQUMseUJBQWMsQ0FBQzs7OERBQ0Q7QUFHdEIsTUFBYSxjQUFlLFNBQVEsd0JBQVk7Q0FTL0M7QUFURCx3Q0FTQztBQVBDO0lBREMsSUFBQSxlQUFJLEVBQUMseUJBQWMsQ0FBQzs7NENBQ1I7QUFHYjtJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7OzRDQUNSO0FBR2I7SUFEQyxJQUFBLGVBQUksRUFBQyxJQUFBLDZCQUFrQixFQUFDLENBQUMsQ0FBQyxDQUFDOzs4Q0FDYjtBQUdqQixNQUFhLG1CQUFvQixTQUFRLHdCQUFZO0NBWXBEO0FBWkQsa0RBWUM7QUFWQztJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7O3lEQUNEO0FBR3BCO0lBREMsSUFBQSxlQUFJLEVBQUMseUJBQWMsQ0FBQzs7aURBQ1I7QUFHYjtJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7O2lEQUNSO0FBR2I7SUFEQyxJQUFBLGVBQUksRUFBQyxJQUFBLDZCQUFrQixFQUFDLENBQUMsQ0FBQyxDQUFDOzttREFDYiJ9