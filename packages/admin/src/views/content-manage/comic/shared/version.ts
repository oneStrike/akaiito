import type { EsFormOptions } from '@/components/es-form/types.ts'
import type { EsTableColumn } from '@/components/es-table/types.ts'
import { useValidate } from '@/hooks/useValidate.ts'
import { formOptionsToFilterOptions } from '@/utils/formOptionsToFilterOptions'
import { formOptionsToTableColumn } from '@/utils/formOptionsToTableColumn.ts'
import { readRule } from '@/views/content-manage/comic/shared/common.ts'

export const versionForm: EsFormOptions[] = [
  {
    field: 'versionName',
    component: 'Input',
    props: {
      span: 2,
      label: '版本名称',
      rules: useValidate.required('版本名称'),
    },
    componentProps: {
      placeholder: '请输入版本名称',
      maxlength: 50,
    },
  },
  {
    field: 'language',
    component: 'Select',
    props: {
      span: 2,
      label: '语言',
      rules: useValidate.required('语言'),
    },
    componentProps: {
      placeholder: '请选择语言',
      options: [],
    },
  },
  {
    field: 'translatorGroup',
    component: 'Input',
    props: {
      span: 2,
      label: '汉化组',
    },
    componentProps: {
      placeholder: '请输入汉化组',
      maxlength: 50,
    },
  },
  {
    field: 'isRecommended',
    component: 'Radio',
    props: {
      span: 2,
      label: '是否推荐',
    },
    componentProps: {
      defaultValue: false,
      placeholder: '请选择是否推荐该版本',
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
  },
  {
    field: 'readRule',
    component: 'Radio',
    props: {
      span: 2,
      label: '浏览权限',
      rules: useValidate.required('浏览权限'),
    },
    componentProps: {
      options: readRule,
    },
  },
  {
    field: 'purchaseAmount',
    component: 'InputNumber',
    props: {
      span: 2,
      label: '所需积分',
      rules: useValidate.required('所需积分'),
    },
    componentProps: {
      min: 1,
      max: 999999,
      placeholder: '请输入所需积分',
    },
  },
  {
    field: 'description',
    component: 'Textarea',
    props: {
      label: '版本描述',
    },
    componentProps: {
      placeholder: '请输入版本描述',
      rows: 5,
    },
  },
  {
    field: 'copyright',
    component: 'Textarea',
    props: {
      label: '版权信息',
    },
    componentProps: {
      placeholder: '请输入版权信息',
      rows: 5,
    },
  },

  {
    field: 'remark',
    component: 'Textarea',
    props: {
      label: '备注',
    },
    componentProps: {
      placeholder: '请输入备注',
      rows: 5,
    },
  },
]

export const versionColumn: EsTableColumn = formOptionsToTableColumn(
  versionForm,
  [
    'remark',
    'disclaimer',
    'copyright',
    'purchaseAmount',
    'description',
    'isRecommended',
  ],
  {
    isPublished: {
      label: '发布状态',
      width: 100,
      align: 'center',
    },
    rating: {
      label: '评分',
      width: 100,
      align: 'center',
    },
    versionName: {
      columnType: 'link',
    },
    action: {
      width: 160,
    },
  },
)

export const versionFilter = formOptionsToFilterOptions(versionForm, {
  isRecommended: 4,
  readRule: 4,
  versionName: 4,
})
