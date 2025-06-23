import type { EsFormOptions } from '@/components/es-form/types'
import type { EsTableColumn } from '@/components/es-table/types'
import type {
  EsToolbarProps,
  ToolbarFilter,
} from '@/components/es-toolbar/types'
import { formOptionsToFilterOptions } from '@/utils/formOptionsToFilterOptions.ts'
import { formOptionsToTableColumn } from '@/utils/formOptionsToTableColumn.ts'

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
      multiple: false,
      maxCount: 1,
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

export const tableColumns: EsTableColumn = formOptionsToTableColumn(
  formOptions,
  [],
  {
    createdAt: {
      width: 160,
    },
  },
)
export const filter: (span?: number) => ToolbarFilter = (span = 4) => [
  {
    field: 'isEnabled',
    component: 'Select',
    props: {
      span,
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
  ...formOptionsToFilterOptions(formOptions, {
    code: span,
    name: span,
  }),
]
