import { Table, Column, DataType } from 'sequelize-typescript'
import { BasicEntity } from '../../../shared/entities/basic.entity'

@Table({
  tableName: 'log'
})
export class LogEntity extends BasicEntity {
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    comment: '操作用户'
  })
  username?: string

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    comment: '操作账号哦'
  })
  userAccount?: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: '用户id'
  })
  userId?: number

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    comment: '行为'
  })
  action!: string

  @Column({
    type: DataType.STRING(20),
    comment: 'ip'
  })
  ip!: string

  @Column({
    type: DataType.STRING(300),
    comment: '地址'
  })
  ipAddress!: string

  @Column({
    type: DataType.INTEGER,
    comment: '回执结果',
    defaultValue: 1
  })
  receipt!: number

  @Column({
    type: DataType.STRING(300),
    comment: '回执结果描述',
    allowNull: true
  })
  receiptDesc?: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '路由地址'
  })
  path!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'user-agent'
  })
  userAgent!: string

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: '参数'
  })
  params?: string
}
