import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript'
import { BaseEntity } from '../../../../shared/entities/basic.entity'

/**
 * 素材分组表
 */
@Table({
  tableName: 'material_group'
})
export class MaterialGroupEntity extends BaseEntity {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
    comment: '素材库分组名称'
  })
  groupName: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    comment: '排序'
  })
  sort: number
}

/**
 * 素材表
 */
@Table({
  tableName: 'material'
})
export class MaterialEntity extends BaseEntity {
  @ForeignKey(() => MaterialGroupEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '分组id'
  })
  groupId: number

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    comment: '素材名称'
  })
  materialName: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '素材路径',
    unique: true
  })
  path: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '素材类型'
  })
  materialType: string
}
