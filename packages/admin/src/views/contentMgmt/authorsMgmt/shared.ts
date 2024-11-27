import type { EsFormOptions } from '@/components/es-form/types'
import type { EsTableColumn } from '@/components/es-table/types'
import type { EsToolbarProps, ToolbarFilter } from '@/components/es-toolbar/types'
import { useValidate } from '@/hooks/useValidate'
import { utils } from '@/utils'

const pluginType = [
  {
    label: '作家',
    value: 1,
  },
  {
    label: '漫画家',
    value: 2,
  },
  {
    label: '插画师',
    value: 3,
  },
  {
    label: '模特',
    value: 4,
  },
]

export const tableColumns: EsTableColumn = [
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    type: 'link',
  },
  {
    label: '头像',
    prop: 'avatar',
    align: 'center',
    type: 'image',
  },
  {
    label: '身份',
    prop: 'contentModel',
    align: 'center',
    slotName: 'contentModel',
  },
  {
    label: '状态',
    prop: 'status',
    align: 'center',
    slotName: 'status',
  },
  {
    label: '外部主页',
    prop: 'website',
    align: 'center',
    slotName: 'website',
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'createdAt',
  },
  {
    label: '操作',
    prop: 'action',
    align: 'center',
    slotName: 'action',
  },
]

export const formOptions: EsFormOptions[] = [
  {
    field: 'avatar',
    component: 'Upload',
    props: {
      label: '头像',
    },
    componentProps: {
      placeholder: '请上传作者头像',
      scenario: 'shared',
      multiple: false,
      fileType: 'image',
    },
  },
  {
    field: 'name',
    component: 'Input',
    props: {
      span: 2,
      label: '作者',
      rules: useValidate.required('作者名字'),
    },
    componentProps: {
      placeholder: '请输入作者名称',
      maxlength: 50,
    },
  },

  {
    field: 'contentModel',
    component: 'Checkbox',
    props: {
      span: 2,
      label: '身份',
      rules: useValidate.required('身份'),
    },
    componentProps: {
      placeholder: '请选择身份',
      options: pluginType,
    },
  },
  {
    field: 'description',
    component: 'Textarea',
    props: {
      label: '作者描述',
      rules: useValidate.required('作者描述'),
    },
    componentProps: {
      placeholder: '请输入作者描述',
      rows: 5,
    },
  },
  {
    field: 'website',
    component: 'Input',
    props: {
      label: '作者外部主页',
      rules: useValidate.url(false),
    },
    componentProps: {
      placeholder: '请输入作者外部主页',
      maxlength: 50,
    },
  },
]

export const filter: ToolbarFilter = [
  {
    field: 'status',
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
    field: 'contentModel',
    component: 'Select',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '内容类型',
      clearable: true,
      options: pluginType,
    },
  },
  {
    field: 'name',
    component: 'Input',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '作者名称',
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
