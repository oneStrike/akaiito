"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredNumberArray = exports.validateNumberArray = exports.requiredDate = exports.validateDate = exports.givenRange = exports.givenValue = exports.requiredNumberLess = exports.validateNumberLess = exports.requiredNumber = exports.validateNumber = exports.validateUrl = exports.validatePhone = exports.validatePwd = exports.validateEmail = exports.multiTypeChecks = exports.scopeLengthString = exports.specifyLengthString = exports.requiredString = exports.validateString = void 0;
const validate_1 = require("@midwayjs/validate");
const index_1 = require("./index");
/**
 * 限定为字符串类型
 */
exports.validateString = validate_1.RuleType.string().empty('');
/**
 * 限定为必传字符串类型
 */
exports.requiredString = exports.validateString.required();
/**
 * 指定长度字符串
 * @param length
 */
const specifyLengthString = (length) => exports.requiredString.length(length);
exports.specifyLengthString = specifyLengthString;
/**
 * 指定长度范围的字符串
 * @param min 最小长度，缺省 1
 * @param max 最大长度 缺省 99
 */
const scopeLengthString = (min = 1, max = 99) => exports.requiredString.min(min).max(max);
exports.scopeLengthString = scopeLengthString;
/**
 * 多类型校验
 * @param values
 */
const multiTypeChecks = (values) => validate_1.RuleType.alternatives(values);
exports.multiTypeChecks = multiTypeChecks;
/**
 * 限定为邮箱
 */
exports.validateEmail = exports.requiredString.email();
/**
 * 限定为密码（至少包含大小写字母、数字、特殊字符、8~16位！）
 */
exports.validatePwd = exports.requiredString.pattern(index_1.utils.validate.validPwd);
/**
 * 限定为国内手机号
 */
exports.validatePhone = exports.requiredString.pattern(index_1.utils.validate.validPhone);
/**
 /**
 * 限定为url
 */
exports.validateUrl = exports.requiredString.uri();
/**
 * 限定为数字类型
 */
exports.validateNumber = validate_1.RuleType.number().empty('');
/**
 * 限定为必传数字类型
 */
exports.requiredNumber = exports.validateNumber.required();
/**
 * 数字小于
 */
const validateNumberLess = (less) => validate_1.RuleType.number().less(less).empty('');
exports.validateNumberLess = validateNumberLess;
/**
 * 限定为必传数字小于
 */
const requiredNumberLess = (less) => {
    return (0, exports.validateNumberLess)(less).required();
};
exports.requiredNumberLess = requiredNumberLess;
/**
 * 限定为给定值
 * @param values 给定值
 * @param isRequired 是否必须
 */
const givenValue = (values, isRequired = true) => {
    values.push(...values.map((item) => item.toString()));
    const rule = validate_1.RuleType.valid(...index_1.utils._.uniq(values));
    return isRequired ? rule.required() : rule.empty(['']);
};
exports.givenValue = givenValue;
/**
 * 限定为给定范围，仅限数字类型
 * @param values 给定值
 * @param isRequired 是否必须
 */
const givenRange = ([max, min], isRequired = true) => {
    const rule = exports.validateNumber.max(max).min(min);
    return isRequired ? rule.required() : rule;
};
exports.givenRange = givenRange;
/**
 * 限定为日期类型
 */
exports.validateDate = validate_1.RuleType.date().empty('');
/**
 * 限定为必传日期类型
 */
exports.requiredDate = exports.validateDate.required();
/**
 * 数字类型的数组
 */
exports.validateNumberArray = validate_1.RuleType.array().items(exports.requiredNumber);
/**
 * 限定为数字类型的数组
 */
exports.requiredNumberArray = validate_1.RuleType.array()
    .items(exports.requiredNumber)
    .required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2YWxpZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBNkM7QUFDN0MsbUNBQStCO0FBRS9COztHQUVHO0FBQ1UsUUFBQSxjQUFjLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7QUFFekQ7O0dBRUc7QUFDVSxRQUFBLGNBQWMsR0FBRyxzQkFBYyxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBRXZEOzs7R0FHRztBQUNJLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUNwRCxzQkFBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQURsQixRQUFBLG1CQUFtQix1QkFDRDtBQUUvQjs7OztHQUlHO0FBQ0ksTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQ3JELHNCQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQURyQixRQUFBLGlCQUFpQixxQkFDSTtBQUVsQzs7O0dBR0c7QUFDSSxNQUFNLGVBQWUsR0FBRyxDQUFDLE1BQWEsRUFBRSxFQUFFLENBQUMsbUJBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7QUFBbEUsUUFBQSxlQUFlLG1CQUFtRDtBQUUvRTs7R0FFRztBQUNVLFFBQUEsYUFBYSxHQUFHLHNCQUFjLENBQUMsS0FBSyxFQUFFLENBQUE7QUFFbkQ7O0dBRUc7QUFDVSxRQUFBLFdBQVcsR0FBRyxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxhQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBRTFFOztHQUVHO0FBQ1UsUUFBQSxhQUFhLEdBQUcsc0JBQWMsQ0FBQyxPQUFPLENBQUMsYUFBSyxDQUFDLFFBQVEsQ0FB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