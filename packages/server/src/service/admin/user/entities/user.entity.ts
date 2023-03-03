import { Table, Column, DataType } from 'sequelize-typescript'
import { BaseEntity } from '../../../../shared/entities/basic.entity'

@Table({
  tableName: 'admin_user'
})
export class AdminUserEntity extends BaseEntity {
  @Column({
    comment: '昵称',
    type: DataType.STRING(50),
    unique: true
  })
  username: string

  @Column({
    comment: '账号',
    type: DataType.STRING(50),
    unique: true
  })
  account: string

  @Column({
    comment: '密码',
    type: DataType.STRING(100)
  })
  password: string

  @Column({
    comment: '头像',
    type: DataType.STRING(100)
  })
  avatar: string

  @Column({
    comment: '手机号',
    type: DataType.STRING(20),
    unique: true
  })
  mobile: string

  @Column({
    comment: '邮箱',
    type: DataType.STRING(100),
    unique: true
  })
  email: string

  @Column({
    type: DataType.TINYINT,
    comment: '1超管0普通',
    defaultValue: 0,
  })
  isRoot: number

  @Column({
    type: DataType.TINYINT,
    defaultValue: 1,
    comment: ' 1启用  0禁用',
  })
  status: number
}
