export const prismaErrorMessage = (code: string) => {
  switch (code) {
    case 'P2025':
      return '操作失败！未找到相关记录'
  }
}
