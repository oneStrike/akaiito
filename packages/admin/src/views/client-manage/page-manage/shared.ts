import type { EsFormOptions } from '@/components/es-form/types'
import type {
  EsToolbarProps,
  ToolbarFilter,
} from '@/components/es-toolbar/types'
import { formOptionsToFilterOptions } from '@/utils/formOptionsToFilterOptions.ts'
import { formOptionsToTableColumn } from '@/utils/formOptionsToTableColumn.ts'

export const accessLevel = [
  {
    label: '游客',
    value: 0,
  },
  {
    label: '登录',
    value: 1,
  },
  {
    label: '会员',
    value: 2,
  },
  {
    label: 'VIP',
    value: 3,
  },
]

export const pageStatus = [
  {
    label: '禁用',
    value: 0,
  },
  {
    label: '启用',
    value: 1,
  },
  {
    label: '开发中',
    value: 2,
  },
  {
    label: '维护中',
    value: 3,
  },
]

export const formOptions: EsFormOptions[] = [
  {
    field: 'pageName',
    component: 'Input',
    props: {
      span: 2,
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
      span: 2,
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
      span: 2,
      label: '页面地址',
      rules: [{ required: true, message: '请输入页面地址' }],
    },
    componentProps: {
      placeholder: '请输入页面地址',
    },
  },
  {
    field: 'pageTitle',
    component: 'Input',
    props: {
      span: 2,
      label: '页面标题',
    },
    componentProps: {
      placeholder: '请输入页面标题',
    },
  },
  {
    field: 'accessLevel',
    component: 'Radio',
    props: {
      span: 2,
      label: '页面权限',
      rules: [{ required: true, message: '请选择页面权限' }],
    },
    componentProps: {
      placeholder: '请选择页面权限',
      options: accessLevel,
    },
  },
  {
    field: 'pageStatus',
    component: 'Radio',
    props: {
      span: 2,
      label: '页面状态',
      rules: [{ required: true, message: '请选择页面状态' }],
    },
    componentProps: {
      placeholder: '请选择页面状态',
      options: pageStatus,
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
      rows: 14,
    },
  },
]

export const tableColumns = formOptionsToTableColumn(formOptions, [
  'description',
])

export const filter: ToolbarFilter = formOptionsToFilterOptions(formOptions, {
  pageName: 6,
  accessLevel: 6,
  pageStatus: 6,
})

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
