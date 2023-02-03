import { AfterFind, Model, Table } from 'sequelize-typescript'

@Table
export class BaseEntity extends Model {
  // @Column({
  //   type: DataType.TINYINT,
  //   comment: '删除标识',
  //   unique: 'deleteFlag',
  //   allowNull: false,
  //   defaultValue: 0,
  // })
  // deleteFlag: number;

  @AfterFind
  static afterFindHook(instance) {
    if (Array.isArray(instance)) {
      instance.map((item) => {
        delete item.deleteFlag
        delete item.deletedAt
        return item
      })
    } else if (instance?.toString() === '[object Object]') {
      delete instance.deleteFlag
      delete instance.deletedAt
    }
  }
}
