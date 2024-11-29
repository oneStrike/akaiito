import type { EsToolbarProps } from '@/components/es-toolbar/types'

export const toolbar: EsToolbarProps['toolbar'] = [
  {
    type: 'button',
    label: '添加',
    value: 'add',
    props: {
      type: 'primary',
    },
  },
  {
    type: 'button',
    label: '解析',
    value: 'parse',
    props: {
      type: 'primary',
    },
  },
]
