import type { EsFormOptions } from '@/components/es-form/es-form.vue'
import type { EsTableColumn } from '@/components/es-table/es-table.vue'
import type { EsToolbarProps, ToolbarFilter } from '@/components/es-toolbar/es-toolbar.vue'

const pluginType = [
  {
    label: '小说',
    value: 1,
  },
  {
    label: '漫画',
    value: 2,
  },
  {
    label: '图片',
    value: 3,
  },
]

export const tableColumns: EsTableColumn = []

export const formOptions: EsFormOptions[] = []

export const filter: ToolbarFilter = [
  {
    field: 'contentModel',
    component: 'Select',
    componentProps: {
      placeholder: '内容模型',
      clearable: true,
      options: pluginType,
      multiple: true,
      collapseTags: true,
      collapseTagsTooltip: true,
    },
  },
  {
    field: 'status',
    component: 'Select',
    componentProps: {
      placeholder: '状态',
      clearable: true,
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
  },
  {
    field: 'name',
    component: 'Input',
    componentProps: {
      placeholder: '分类名称',
      clearable: true,
    },
  },
]

export const toolbar: EsToolbarProps['toolbar'] = [
  {
    type: 'button',
    label: '添加',
    value: 'add',
    props: {
      type: 'primary',
    },
  },
]
