import type { EsTableColumn } from '@/components/es-table/types.ts'

export const contentColumn: EsTableColumn = [
  {
    prop: 'imagePreview',
    label: '预览图片',
    align: 'center',
  },
  {
    prop: 'imageInfo',
    label: '图片信息',
    align: 'center',
  },
  {
    prop: 'createdAt',
    label: '上传时间',
    align: 'center',
  },
  {
    prop: 'action',
    label: '操作',
    align: 'center',
  },
]
