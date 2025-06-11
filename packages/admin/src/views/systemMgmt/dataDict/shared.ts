import type { EsFormOptions } from '@/components/es-form/types'
import type { EsTableColumn } from '@/components/es-table/types'
import type {
  EsToolbarProps,
  ToolbarFilter,
} from '@/components/es-toolbar/types'

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
    label: '封面',
    prop: 'cover',
    align: 'center',
    type: 'image',
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    align: 'center',
  },
  {
    label: '状态',
    prop: 'isEnabled',
    align: 'center',
    slotName: 'isEnabled',
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
    field: 'isEnabled',
    component: 'Select',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '状态',
      clearable: true,
      options: [
        {
          label: '启用',
          value: true,
        },
        {
          label: '禁用',
          value: false,
        },
      ],
    },
  },
  {
    field: 'code',
    component: 'Input',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '编码',
      clearable: true,
    },
  },
  {
    field: 'name',
    component: 'Input',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '名称',
      clearable: true,
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
    field: 'cover',
    component: 'Upload',
    props: {
      label: '封面',
    },
    componentProps: {
      placeholder: '请上传封面',
      scenario: 'dataDict',
      multiple: true,
      maxCount: 2,
      fileType: 'image',
    },
  },
  {
    field: 'remark',
    component: 'Textarea',
    props: {
      label: '描述信息',
    },
    componentProps: {
      placeholder: '请输入描述信息',
      rows: 6,
    },
  },
]
