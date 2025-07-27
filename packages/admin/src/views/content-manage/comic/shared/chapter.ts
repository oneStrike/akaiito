import type { EsFormOptions } from '@/components/es-form/types.ts'
import type { EsTableColumn } from '@/components/es-table/types.ts'
import { useValidate } from '@/hooks/useValidate.ts'
import { formOptionsToFilterOptions } from '@/utils/formOptionsToFilterOptions'
import { formOptionsToTableColumn } from '@/utils/formOptionsToTableColumn.ts'
import { readRule } from '@/views/content-manage/comic/shared/common.ts'

export const chapterFormOptions: EsFormOptions[] = [
  {
    field: 'title',
    component: 'Input',
    props: {
      span: 2,
      label: '章节标题',
      rules: useValidate.required('章节标题'),
    },
    componentProps: {
      placeholder: '请输入章节标题',
      maxlength: 50,
    },
  },
  {
    field: 'subtitle',
    component: 'Input',
    props: {
      span: 2,
      label: '副标题',
    },
    componentProps: {
      placeholder: '请输入副标题',
      maxlength: 100,
    },
  },
  {
    field: 'chapterNumber',
    component: 'InputNumber',
    props: {
      span: 2,
      label: '章节序号',
      rules: useValidate.required('章节序号'),
    },
    componentProps: {
      placeholder: '请输入章节序号',
    },
  },
  {
    field: 'publishAt',
    component: 'Date',
    props: {
      span: 2,
      label: '发布时间',
      rules: useValidate.required('发布时间'),
    },
    componentProps: {
      placeholder: '请选择作品发布时间',
      disabledDate: useFormTool().disableFutureDate,
    },
  },
  {
    field: 'readRule',
    component: 'Radio',
    props: {
      span: 2,
      label: '查看规则',
      rules: useValidate.required('查看规则'),
    },
    componentProps: {
      placeholder: '请输入查看规则',
      maxlength: 50,
      defaultValue: 0,
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
      maxlength: 50,
    },
  },
  {
    field: 'isPreview',
    component: 'Radio',
    props: {
      span: 2,
      label: '试读章节',
      rules: useValidate.required('试读章节'),
    },
    componentProps: {
      defaultValue: false,
      placeholder: '请选择是否为试读章节',
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
    field: 'remark',
    component: 'Textarea',
    props: {
      label: '备注',
    },
    componentProps: {
      placeholder: '请填写章节备注',
      rows: 5,
    },
  },
]

export const chapterColumn: EsTableColumn = formOptionsToTableColumn(
  chapterFormOptions,
  ['remark', 'purchaseAmount', 'isPreview'],
  {
    title: {
      columnType: 'link',
    },

    publishAt: {
      width: 120,
      formatter: (row: any) => {
        return row.publishAt ? row.publishAt.split('T')[0] : '-'
      },
    },
    action: {
      width: 200,
    },
  },
)

export const chapterFilter: EsFormOptions[] = formOptionsToFilterOptions(
  chapterFormOptions,
  {
    isPreview: 4,
    readRule: 4,
    title: 4,
  },
)
