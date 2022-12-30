import { Table, Column, DataType } from 'sequelize-typescript'
import { BasicEntity } from '../../../shared/entities/basic.entity'

@Table({
  tableName: 'diy_page'
})
export class DiyEntity extends BasicEntity {
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    comment: '页面模板名称'
  })
  diyName: string

  @Column({
    type: DataType.JSON,
    allowNull: false,
    comment: '页面模板数据'
  })
  diyData: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '是否正在使用',
    defaultValue: 0
  })
  use: number
}
