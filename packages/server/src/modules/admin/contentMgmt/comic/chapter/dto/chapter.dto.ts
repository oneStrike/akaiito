// 导入所需的装饰器和验证规则
import { PickDto, Rule } from '@midwayjs/validate'
import {
  requiredNumber,
  requiredString,
  validateBoolean,
  validateNumber,
  validateNumberLess,
  validateString,
  validateStringArray,
} from '@/utils/validate'
import { BasicIdDTO, BasicPageDTO } from '@/basic/dto/basic.dto'

// 定义章节的基础数据传输对象
export class ChapterDTO {
  // 章节标题（必填，字符串）
  @Rule(requiredString)
  title!: string

  // 章节内容（可选，字符串数组）
  @Rule(validateStringArray)
  content?: string[]

  // 漫画 ID（可选，数字）
  @Rule(validateNumber)
  comicId?: number

  // 排序字段（可选，数字）
  @Rule(validateNumber)
  order?: number

  // 查看规则（可选，数字，最大值为 4）
  @Rule(validateNumberLess(4))
  viewRule?: number

  // 备注信息（可选，字符串）
  @Rule(validateString)
  remark?: string

  // 购买金额（可选，数字）
  @Rule(validateNumber)
  purchaseAmount?: number

  // 是否发布（可选，布尔值）
  @Rule(validateBoolean)
  isPublish?: boolean
}

// 分页查询章节的 DTO，继承基础分页 DTO
export class ChapterPageDTO extends BasicPageDTO {
  // 漫画 ID（必填，数字）
  @Rule(requiredNumber)
  comicId!: number

  // 是否发布（可选，布尔值）
  @Rule(validateBoolean)
  isPublish?: boolean

  // 章节标题（可选，字符串）
  @Rule(validateString)
  title?: string
}

// 更新章节的 DTO，继承并选择部分字段
export class UpdateChapterDTO extends PickDto(ChapterDTO, [
  'purchaseAmount',
  'viewRule',
  'title',
  'order',
]) {
  // 章节 ID（必填，数字）
  @Rule(requiredNumber)
  id!: number
}

// 更新章节发布状态的 DTO，继承并选择部分字段
export class updateChapterPublishDTO extends PickDto(ChapterDTO, [
  'isPublish',
]) {
  // 章节 ID（必填，数字）
  @Rule(requiredNumber)
  id!: number
}

// 获取漫画章节内容的 DTO，继承基础 ID DTO
export class ComicChapterContentDTO extends PickDto(BasicIdDTO, ['id']) {
  // 漫画 ID（必填，数字）
  @Rule(requiredNumber)
  comicId!: number
}

// 删除漫画章节内容的 DTO
export class DeleteComicChapterContentDTO {
  // 漫画 ID（必填，数字）
  @Rule(requiredNumber)
  comicId!: number

  // 章节 ID（必填，数字）
  @Rule(requiredNumber)
  chapterId!: number

  // 内容 ID（必填，数字）
  @Rule(requiredNumber)
  id!: number
}
