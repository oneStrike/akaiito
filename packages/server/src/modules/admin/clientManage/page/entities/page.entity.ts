import { Column, DataType, Table } from 'sequelize-typescript'
import { BaseEntity } from '../../../../../shared/entities/basic.entity'

@Table({
  tableName: 'client_manage_page'
})
export class ClientPageEntity extends BaseEntity {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    comment: '页面名称'
  })
  pageName: string

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    comment: '页面路径'
  })
  pagePath: string

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    comment: '页面标题'
  })
  pageTitle: string

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    comment: '页面权限',
    defaultValue: 'normal'
  })
  role: string

  @Column({
    type: DataType.INTEGER,
    comment: '会员登记访问，等级不到不允许访问'
  })
  vipLevel: number

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
    comment: '页面状态1启用，2禁用，3开发中'
  })
  status: number
}
