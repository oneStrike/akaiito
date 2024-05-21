import { RuleType } from '@midwayjs/validate';
/**
 * 限定为字符串类型
 */
export declare const validateString: RuleType.StringSchema<string>;
/**
 * 限定为必传字符串类型
 */
export declare const requiredString: RuleType.StringSchema<string>;
/**
 * 指定长度字符串
 * @param length
 */
export declare const specifyLengthString: (length: number) => RuleType.StringSchema<string>;
/**
 * 指定长度范围的字符串
 * @param min 最小长度，缺省 1
 * @param max 最大长度 缺省 99
 */
export declare const scopeLengthString: (min?: number, max?: number) => RuleType.StringSchema<string>;
/**
 * 多类型校验
 * @param values
 */
export declare const multiTypeChecks: (values: any[]) => RuleType.AlternativesSchema<any>;
/**
 * 限定为邮箱
 */
export declare const validateEmail: RuleType.StringSchema<string>;
/**
 * 限定为密码（至少包含大小写字母、数字、特殊字符、8~16位！）
 */
export declare const validatePwd: RuleType.StringSchema<string>;
/**
 * 限定为国内手机号
 */
export declare const validatePhone: RuleType.StringSchema<string>;
/**
 /**
 * 限定为url
 */
export declare const validateUrl: RuleType.StringSchema<string>;
/**
 * 限定为数字类型
 */
export declare const validateNumber: RuleType.NumberSchema<number>;
/**
 * 限定为必传数字类型
 */
export declare const requiredNumber: RuleType.NumberSchema<number>;
/**
 * 数字小于
 */
export declare const validateNumberLess: (less: number) => RuleType.NumberSchema<number>;
/**
 * 限定为必传数字小于
 */
export declare const requiredNumberLess: (less: number) => RuleType.NumberSchema<number>;
/**
 * 限定为给定值
 * @param values 给定值
 * @param isRequired 是否必须
 */
export declare const givenValue: (values: any[], isRequired?: boolean) => RuleType.AnySchema<any>;
/**
 * 限定为给定范围，仅限数字类型
 * @param values 给定值
 * @param isRequired 是否必须
 */
export declare const givenRange: ([max, min]: [number, number], isRequired?: boolean) => RuleType.NumberSchema<number>;
/**
 * 限定为日期类型
 */
export declare const validateDate: RuleType.DateSchema<Date>;
/**
 * 限定为必传日期类型
 */
export declare const requiredDate: RuleType.DateSchema<Date>;
/**
 * 数字类型的数组
 */
export declare const validateNumberArray: RuleType.ArraySchema<any[]>;
/**
 * 限定为数字类型的数组
 */
export declare const requiredNumberArray: RuleType.ArraySchema<any[]>;
