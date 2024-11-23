import type { EsTableColumn } from '@/components/es-table/es-table.vue'
import type { EsToolbarProps, ToolbarFilter } from '@/components/es-toolbar/es-toolbar.vue'
import type { EsFormOptions } from '@/components/es-form/types'

export const formOptions: EsFormOptions[] = [
  {
    field: 'pageName',
    component: 'Input',
    props: {
      label: '页面名称',
      rules: [{ required: true, message: '请输入页面名称' }],
    },
    componentProps: {
      placeholder: '请输入页面名称',
    },
  },
  {
    field: 'pageCode',
    component: 'Input',
    props: {
      label: '页面编码',
      rules: [{ required: true, message: '请输入页面编码' }],
    },
    componentProps: {
      placeholder: '请输入页面编码',
    },
  },
  {
    field: 'pagePath',
    component: 'Input',
    props: {
      label: '页面地址',
      rules: [{ required: true, message: '请输入页面地址' }],
    },
    componentProps: {
      placeholder: '请输入页面地址',
    },
  },
  {
    field: 'pageRule',
    component: 'Radio',
    props: {
      label: '页面权限',
      rules: [{ required: true, message: '请选择页面权限' }],
    },
    componentProps: {
      placeholder: '请选择页面权限',
      options: [
        { label: '普通', value: 1 },
        { label: '登录', value: 2 },
        { label: '会员', value: 3 },
      ],
    },
  },
  {
    field: 'status',
    component: 'Radio',
    props: {
      label: '页面状态',
      rules: [{ required: true, message: '请选择页面状态' }],
    },
    componentProps: {
      placeholder: '请选择页面状态',
      options: [
        { label: '禁用', value: 0 },
        { label: '正常', value: 1 },
        { label: '开发', value: 2 },
        { label: '维护', value: 3 },
      ],
    },
  },
  {
    field: 'description',
    component: 'Textarea',
    props: {
      label: '描述',
      rules: [{ required: false, message: '请输入描述' }],
    },
    componentProps: {
      placeholder: '请输入描述信息',
    },
  },
]

export const tableColumns: EsTableColumn = [
  {
    label: '名称',
    prop: 'pageName',
    align: 'center',
  },
  {
    label: '编码',
    prop: 'pageCode',
    align: 'center',
  },
  {
    label: '地址',
    prop: 'pagePath',
    align: 'center',
  },
  {
    label: '访问权限',
    prop: 'pageRule',
    align: 'center',
    slotName: 'pageRule',
  },
  {
    label: '页面状态',
    prop: 'status',
    align: 'center',
    slotName: 'status',
  },
  {
    label: '描述信息',
    prop: 'description',
    align: 'center',
    showOverflowTooltip: true,
  },
  {
    label: '操作',
    prop: 'action',
    align: 'center',
    slotName: 'action',
  },
]

export const filter: ToolbarFilter = [
  {
    field: 'pageName',
    component: 'Input',
    props: {
      span: 8,
    },
    componentProps: {
      placeholder: '页面名称',
    },
  },
  {
    field: 'pageRule',
    component: 'Select',
    props: {
      span: 8,
    },
    componentProps: {
      placeholder: '访问权限',
      clearable: true,
      options: [
        {
          label: '普通',
          value: 1,
        },
        {
          label: '登录',
          value: 2,
        },
        {
          label: '会员',
          value: 3,
        },
      ],
    },
  },
  {
    field: 'status',
    component: 'Select',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '页面状态',
      clearable: true,
      options: [
        {
          label: '普通',
          value: 0,
        },
        {
          label: '启用',
          value: 1,
        },
        {
          label: '开发',
          value: 2,
        },
        {
          label: '维护',
          value: 3,
        },
      ],
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
