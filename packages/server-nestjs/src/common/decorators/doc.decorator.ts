import { applyDecorators } from '@nestjs/common' // 新增导入
import { ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger'

// 新增自定义装饰器定义
export function ApiGetAdminUserPage() {
  return applyDecorators(
    ApiOperation({
      summary: '获取管理端用户分页列表',
    }),
    ApiResponse({
      status: 200,
      description: '获取管理端用户分页列表成功',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: { $ref: getSchemaPath(UserDto) },
          },
        },
      },
    }),
  )
}
