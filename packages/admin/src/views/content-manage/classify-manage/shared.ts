import type { EsFormOptions } from '@/components/es-form/types'
import type { EsToolbarProps } from '@/components/es-toolbar/types'
import { formOptionsToFilterOptions } from '@/utils/formOptionsToFilterOptions.ts'
import { formOptionsToTableColumn } from '@/utils/formOptionsToTableColumn.ts'

const contentType = [
  {
    label: '漫画',
    value: 1,
  },
  {
    label: '小说',
    value: 2,
  },
  {
    label: '插画',
    value: 4,
  },
  {
    label: '图集',
    value: 8,
  },
]

export const formOptions: EsFormOptions[] = [
  {
    field: 'icon',
    component: 'Upload',
    props: {
      label: '分类图标',
      rules: [{ required: false, message: '请上传分类图标' }],
    },
    componentProps: {
      placeholder: '请上传分类图标',
      scenario: 'shared',
      multiple: false,
      fileType: 'image',
    },
  },
  {
    field: 'name',
    component: 'Input',
    props: {
      label: '分类名称',
      rules: [{ required: true, message: '请输入分类名称' }],
    },

    componentProps: {
      placeholder: '请输入分类名称',
      maxlength: 50,
    },
  },
  {
    field: 'contentTypes',
    component: 'Checkbox',
    props: {
      label: '内容类型',
      rules: [{ required: true, message: '请选择内容类型' }],
    },
    componentProps: {
      placeholder: '请选择内容类型',
      options: contentType,
    },
  },
  {
    field: 'popularityWeight',
    component: 'InputNumber',
    props: {
      label: '辅助热度',
    },
    componentProps: {
      placeholder: '请输入辅助热度',
      min: 1,
      max: 999999,
      type: 'number',
    },
  },
  {
    field: 'order',
    component: 'InputNumber',
    props: {
      label: '排序',
    },
    componentProps: {
      placeholder: '请输入排序',
      min: 1,
      max: 999999,
      type: 'number',
    },
  },
]

const [icon, name, contentTypes, popularityWeight, order, action] =
  formOptionsToTableColumn(formOptions)

export const tableColumns = [
  icon,
  name,
  contentTypes,
  popularityWeight,
  {
    label: '漫画数量',
    prop: 'comicCount',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'comicCount',
  },
  {
    label: '小说数量',
    prop: 'novelCount',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'novelCount',
  },
  {
    label: '图片数量',
    prop: 'imageSetCount',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'imageSetCount',
  },
  {
    label: '插画数量',
    prop: 'illustrationCount',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'illustrationCount',
  },
  {
    label: '排序',
    prop: 'order',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'order',
  },
  {
    label: '启用状态',
    prop: 'isEnabled',
    align: 'center',
  },
  action,
]

export const filter = formOptionsToFilterOptions(formOptions, {
  contentType: 6,
  status: 6,
  name: 6,
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
