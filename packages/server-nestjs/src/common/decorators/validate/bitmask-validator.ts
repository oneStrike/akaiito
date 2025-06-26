import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

/**
 * 位掩码验证器
 *
 * @description 用于验证位掩码值是否为指定枚举的有效组合
 */
@ValidatorConstraint({ name: 'bitmask', async: false })
export class BitmaskValidator implements ValidatorConstraintInterface {
  /**
   * 验证位掩码值
   * @param value 待验证的值
   * @param args 验证参数
   * @returns 验证结果
   */
  validate(value: any, args: ValidationArguments): boolean {
    const [enumObject] = args.constraints as [Record<string, number>]

    // 空值由IsOptional处理
    if (value === undefined || value === null) {
      return true
    }

    // 转换为数字
    const numValue = typeof value === 'string' ? Number(value) : value

    // 检查是否为有效数字
    if (Number.isNaN(numValue)) {
      return false
    }

    // 检查是否为非负整数
    if (!Number.isInteger(numValue) || numValue < 0) {
      return false
    }

    // 获取枚举的所有数字值
    const enumValues = Object.values(enumObject).filter(
      (enumValue): enumValue is number => typeof enumValue === 'number',
    )

    // 如果没有数字枚举值，返回false
    if (enumValues.length === 0) {
      return false
    }

    // 计算所有有效位的组合
    const validBits = enumValues.reduce((acc, enumValue) => acc | enumValue, 0)

    // 检查是否包含无效位
    return (numValue & ~validBits) === 0
  }

  /**
   * 获取默认错误消息
   * @param args 验证参数
   * @returns 错误消息
   */
  defaultMessage(args: ValidationArguments): string {
    const [enumObject] = args.constraints as [Record<string, number>]
    const enumValues = Object.values(enumObject).filter(
      (enumValue): enumValue is number => typeof enumValue === 'number',
    )

    if (enumValues.length === 0) {
      return '无效的位掩码枚举配置'
    }

    const validBits = enumValues.reduce((acc, enumValue) => acc | enumValue, 0)
    const enumNames = Object.keys(enumObject).filter(
      (key) => typeof enumObject[key] === 'number',
    )

    return `位掩码值无效，有效范围: 0-${validBits}，可用选项: ${enumNames.join(', ')}`
  }
}
