import { utils } from '@/utils'
import type { EsFormOptions } from '@/components/es-form/es-form.vue'
import type { EsTableColumn } from '@/components/es-table/es-table.vue'
import type {
  EsToolbarProps,
  ToolbarFilter,
} from '@/components/es-toolbar/es-toolbar.vue'

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
    type: 'dropdown',
    label: '批量操作',
    props: { disabled: false },
    options: [
      {
        label: '批量删除',
        value: 'delete',
      },
      {
        label: '批量启用',
        value: 'enable',
      },
      {
        label: '批量禁用',
        value: 'disable',
      },
    ],
  },
]

export const tableColumns: EsTableColumn = [
  {
    label: '名称',
    prop: 'name',
    align: 'center',
    slotName: 'name',
  },
  {
    label: '编码',
    prop: 'code',
    align: 'center',
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    align: 'center',
    formatter: utils.formatter,
  },
  {
    label: '状态',
    prop: 'status',
    align: 'center',
    slotName: 'status',
  },
  {
    label: '操作',
    prop: 'action',
    align: 'center',
    slotName: 'action',
  },
]

export const filter: () => ToolbarFilter = () => [
  {
    field: 'name',
    component: 'Input',
    componentProps: {
      placeholder: '名称',
      clearable: true,
    },
  },
  {
    field: 'code',
    component: 'Input',
    componentProps: {
      placeholder: '编码',
      clearable: true,
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
]

export const formOptions: EsFormOptions[] = [
  {
    field: 'name',
    component: 'Input',
    props: {
      label: '名称',
      rules: [{ required: true, message: '请输入名称' }],
    },
    componentProps: {
      placeholder: '请输入名称',
    },
  },
  {
    field: 'code',
    component: 'Input',
    props: {
      label: '编码',
      rules: [{ required: true, message: '请输入编码' }],
    },
    componentProps: {
      placeholder: '请输入编码',
    },
  },
  {
    field: 'desc',
    component: 'Textarea',
    props: {
      label: '描述信息',
      rules: [{ required: true, message: '请输入描述信息' }],
    },
    componentProps: {
      placeholder: '请输入描述信息',
    },
  },
]
