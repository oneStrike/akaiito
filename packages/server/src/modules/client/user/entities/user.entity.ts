import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'client_user'
})
export class ClientUserEntity extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '用户昵称'
  })
  username: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '用户账号'
  })
  account: string

  @Column({
    type: DataType.TINYINT,
    comment: 'vip状态，0否，1是，2临时，3年费',
    defaultValue: 0
  })
  vipStatus: number

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
    comment: 'vip会员等级'
  })
  vipLevel: number
}
