export function prismaErrorMapping(err: IterateObject) {
  if(err.name === 'PrismaClientValidationError'){
    return '操作失败！数据格式校验失败'
  }
  switch (err.code) {
    case 'P2002':
      return `操作失败！【${err.meta.target}】字段重复`
    case 'P2025':
      return '操作失败！未找到相关记录'
  }
}
