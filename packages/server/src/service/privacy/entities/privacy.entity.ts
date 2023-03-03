import { Column, DataType, Table } from 'sequelize-typescript'
import { BaseEntity } from '../../../shared/entities/basic.entity'

@Table({
  tableName: 'privacy'
})
export class PrivacyEntity extends BaseEntity {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    comment: '协议名称'
  })
  name: string

  @Column({
    type: DataType.TEXT('medium'),
    allowNull: false,
    comment: '协议内容'
  })
  content: string

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    comment: '平台，可多选 1>APP 2>web 3>小程序'
  })
  platform: string

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 1,
    comment: '状态 1启用 0 禁用'
  })
  status: string

  @Column({
    type: DataType.STRING,
    comment: '备注'
  })
  remark: string
}
