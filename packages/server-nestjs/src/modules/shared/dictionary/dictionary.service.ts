import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '@/global/services/prisma.service'
import {
  DictionaryItemWhereInput,
  DictionaryWhereInput,
} from '@/prisma/client/models'
import { CreateDictionaryDto } from './dto/create-dictionary.dto'
import {
  CreateDictionaryItemDto,
  UpdateDictionaryItemDto,
} from './dto/dictionary-item.dto'
import {
  QueryDictionaryDto,
  QueryDictionaryItemDto,
} from './dto/query-dictionary.dto'
import { UpdateDictionaryDto } from './dto/update-dictionary.dto'

/**
 * 数据字典服务类
 * 提供字典和字典项的增删改查功能
 */
@Injectable()
export class DictionaryService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建数据字典
   * @param createDictionaryDto 创建字典数据
   * @returns 创建的字典信息
   */
  async createDictionary(createDictionaryDto: CreateDictionaryDto) {
    return this.prisma.dictionary.create({
      data: {
        ...createDictionaryDto,
        status: createDictionaryDto.status ?? true,
      },
    })
  }

  /**
   * 分页查询数据字典列表
   * @param queryDto 查询条件
   * @returns 分页数据
   */
  async findDictionaries(queryDto: QueryDictionaryDto) {
    const { pageIndex = 0, pageSize = 15, name, code, status } = queryDto
    // 构建查询条件
    const where: DictionaryWhereInput = {}
    if (name) {
      where.name = { contains: name }
    }
    if (code) {
      where.code = { contains: code }
    }
    if (status !== undefined) {
      where.status = status
    }

    const [data, total] = await Promise.all([
      this.prisma.dictionary.findMany({
        where,
        skip: pageIndex * pageSize,
        take: pageSize,
      }),
      this.prisma.dictionary.count({ where }),
    ])

    return {
      list: data,
      total,
      pageIndex,
      pageSize,
    }
  }

  /**
   * 根据ID获取字典详情
   * @param id 字典ID
   * @returns 字典详情
   */
  async findDictionaryById(id: number) {
    const dictionary = await this.prisma.dictionary.findUnique({
      where: { id },
    })

    if (!dictionary) {
      throw new HttpException(`ID为 ${id} 的字典不存在`, HttpStatus.NOT_FOUND)
    }
    return dictionary
  }

  /**
   * 根据编码获取字典详情
   * @param code 字典编码
   * @returns 字典详情
   */
  async findDictionaryByCode(code: string) {
    try {
      const dictionary = await this.prisma.dictionary.findUnique({
        where: { code },
        include: {
          items: {
            where: { status: true },
            orderBy: { order: 'asc' },
          },
        },
      })

      if (!dictionary) {
        throw new HttpException(
          `编码为 "${code}" 的字典不存在`,
          HttpStatus.NOT_FOUND,
        )
      }

      return dictionary
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        '获取字典详情失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 更新数据字典
   * @param updateDictionaryDto 更新数据
   * @returns 更新后的字典信息
   */
  async updateDictionary(updateDictionaryDto: UpdateDictionaryDto) {
    const { id } = updateDictionaryDto

    return this.prisma.dictionary.update({
      where: { id },
      data: updateDictionaryDto,
    })
  }

  /**
   * 删除数据字典
   * @param id 字典ID
   */
  async deleteDictionary(id: number) {
    // 检查字典是否存在
    const existingDictionary = await this.prisma.dictionary.findUnique({
      where: { id },
      include: { items: true },
    })
    if (!existingDictionary) {
      throw new HttpException(`ID为 ${id} 的字典不存在`, HttpStatus.NOT_FOUND)
    }

    try {
      // 由于设置了级联删除，删除字典时会自动删除相关的字典项
      await this.prisma.dictionary.delete({
        where: { id },
      })

      return { message: '字典删除成功' }
    } catch (error) {
      throw new HttpException('删除字典失败', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * 创建字典项
   * @param createDictionaryItemDto 创建字典项数据
   * @returns 创建的字典项信息
   */
  async createDictionaryItem(createDictionaryItemDto: CreateDictionaryItemDto) {
    // 检查字典是否存在
    const dictionary = await this.prisma.dictionary.findUnique({
      where: { code: createDictionaryItemDto.dictionaryCode },
    })
    if (!dictionary) {
      throw new HttpException(
        `字典编码 "${createDictionaryItemDto.dictionaryCode}" 不存在`,
        HttpStatus.NOT_FOUND,
      )
    }

    // 检查字典项编码在同一字典下是否已存在
    const existingItem = await this.prisma.dictionaryItem.findUnique({
      where: {
        dictionaryCode_code: {
          dictionaryCode: createDictionaryItemDto.dictionaryCode,
          code: createDictionaryItemDto.code,
        },
      },
    })
    if (existingItem) {
      throw new HttpException(
        `字典项编码 "${createDictionaryItemDto.code}" 在字典 "${createDictionaryItemDto.dictionaryCode}" 中已存在`,
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      return await this.prisma.dictionaryItem.create({
        data: {
          ...createDictionaryItemDto,
          status: createDictionaryItemDto.status ?? true,
        },
      })
    } catch (error) {
      throw new HttpException(
        '创建字典项失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 分页查询字典项列表
   * @param queryDto 查询条件
   * @returns 分页数据
   */
  async findDictionaryItems(queryDto: QueryDictionaryItemDto) {
    const {
      pageIndex = 0,
      pageSize = 15,
      dictionaryCode,
      name,
      code,
      status,
    } = queryDto

    // 检查字典是否存在
    const dictionary = await this.prisma.dictionary.findUnique({
      where: { code: dictionaryCode },
    })
    if (!dictionary) {
      throw new HttpException(
        `字典编码 "${dictionaryCode}" 不存在`,
        HttpStatus.NOT_FOUND,
      )
    }

    // 构建查询条件
    const where: DictionaryItemWhereInput = {
      dictionaryCode,
    }
    if (name) {
      where.name = { contains: name }
    }
    if (code) {
      where.code = { contains: code }
    }
    if (status !== undefined) {
      where.status = status
    }

    try {
      const [data, total] = await Promise.all([
        this.prisma.dictionaryItem.findMany({
          where,
          skip: pageIndex * pageSize,
          take: pageSize,
          orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        }),
        this.prisma.dictionaryItem.count({ where }),
      ])

      return {
        data,
        total,
        pageIndex,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      }
    } catch (error) {
      throw new HttpException(
        '查询字典项列表失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 根据ID获取字典项详情
   * @param id 字典项ID
   * @returns 字典项详情
   */
  async findDictionaryItemById(id: number) {
    try {
      const dictionaryItem = await this.prisma.dictionaryItem.findUnique({
        where: { id },
        include: {
          dictionary: true,
        },
      })

      if (!dictionaryItem) {
        throw new HttpException(
          `ID为 ${id} 的字典项不存在`,
          HttpStatus.NOT_FOUND,
        )
      }

      return dictionaryItem
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        '获取字典项详情失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 更新字典项
   * @param id 字典项ID
   * @param updateDictionaryItemDto 更新数据
   * @returns 更新后的字典项信息
   */
  async updateDictionaryItem(
    id: number,
    updateDictionaryItemDto: UpdateDictionaryItemDto,
  ) {
    // 检查字典项是否存在
    const existingItem = await this.prisma.dictionaryItem.findUnique({
      where: { id },
    })
    if (!existingItem) {
      throw new HttpException(`ID为 ${id} 的字典项不存在`, HttpStatus.NOT_FOUND)
    }

    // 检查编码是否与同一字典下的其他字典项冲突
    if (updateDictionaryItemDto.code) {
      const existingByCode = await this.prisma.dictionaryItem.findFirst({
        where: {
          dictionaryCode: existingItem.dictionaryCode,
          code: updateDictionaryItemDto.code,
          id: { not: id },
        },
      })
      if (existingByCode) {
        throw new HttpException(
          `字典项编码 "${updateDictionaryItemDto.code}" 在字典 "${existingItem.dictionaryCode}" 中已存在`,
          HttpStatus.BAD_REQUEST,
        )
      }
    }

    try {
      return await this.prisma.dictionaryItem.update({
        where: { id },
        data: updateDictionaryItemDto,
      })
    } catch (error) {
      throw new HttpException(
        '更新字典项失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 删除字典项
   * @param id 字典项ID
   */
  async deleteDictionaryItem(id: number) {
    // 检查字典项是否存在
    const existingItem = await this.prisma.dictionaryItem.findUnique({
      where: { id },
    })
    if (!existingItem) {
      throw new HttpException(`ID为 ${id} 的字典项不存在`, HttpStatus.NOT_FOUND)
    }

    try {
      await this.prisma.dictionaryItem.delete({
        where: { id },
      })

      return { message: '字典项删除成功' }
    } catch (error) {
      throw new HttpException(
        '删除字典项失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 获取所有启用的字典列表（不分页）
   * @returns 字典列表
   */
  async findAllEnabledDictionaries() {
    try {
      return await this.prisma.dictionary.findMany({
        where: { status: true },
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            where: { status: true },
            orderBy: { order: 'asc' },
          },
        },
      })
    } catch (error) {
      throw new HttpException(
        '获取字典列表失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
