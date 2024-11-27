import type { EsFormOptions } from '@/components/es-form/types'
import type { EsTableColumn } from '@/components/es-table/types'
import type { EsToolbarProps, ToolbarFilter } from '@/components/es-toolbar/types'
import { useValidate } from '@/hooks/useValidate'
import { utils } from '@/utils'

export const tableColumns: EsTableColumn = [
  {
    label: '标题',
    prop: 'title',
    align: 'center',
  },
  {
    label: '跳转页面',
    prop: 'pageName',
    align: 'center',
  },

  {
    label: '开始时间',
    prop: 'startTime',
    align: 'center',
    formatter: (row) => utils.formatTime(row.startTime) || '-',
  },
  {
    label: '结束时间',
    prop: 'endTime',
    align: 'center',
    formatter: (row) => utils.formatTime(row.endTime) || '-',
  },
  {
    label: '小程序',
    prop: 'enableApplet',
    align: 'center',
    slotName: 'enableApplet',
  },
  {
    label: 'WEB',
    prop: 'enableWeb',
    align: 'center',
    slotName: 'enableWeb',
  },
  {
    label: 'APP',
    prop: 'enableApp',
    align: 'center',
    slotName: 'enableApp',
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

export const formOptions: EsFormOptions[] = [
  {
    field: 'title',
    component: 'Input',
    props: {
      label: '标题',
      rules: useValidate.required('标题'),
    },
    componentProps: {
      placeholder: '请输入通知标题',
      maxlength: 100,
    },
  },
  {
    field: 'pageCode',
    component: 'Select',
    props: {
      span: 2,
      label: '跳转页面',
    },
    componentProps: {
      placeholder: '请选择跳转页面',
      options: [],
    },
  },
  {
    field: 'enable',
    component: 'Checkbox',
    props: {
      span: 2,
      label: '发布平台',
      rules: useValidate.required('发布平台'),
    },
    componentProps: {
      placeholder: '请选择发布平台',
      options: [
        {
          label: '小程序',
          value: 0,
        },
        {
          label: 'WEB',
          value: 1,
        },
        {
          label: 'APP',
          value: 2,
        },
      ],
    },
  },

  {
    field: 'content',
    component: 'RichText',
    props: {
      label: '内容',
      rules: useValidate.required('内容'),
    },
    componentProps: {
      placeholder: '请输入内容...',
    },
  },
  {
    field: 'backgroundImage',
    component: 'Upload',
    props: {
      span: 2,
      label: '弹窗背景',
      rules: [{ required: false, message: '请上传弹窗背景图片' }],
    },
    componentProps: {
      placeholder: '请上传弹窗背景图片',
      scenario: 'shared',
      multiple: false,
      fileType: 'image',
    },
  },
  {
    field: 'startTime',
    component: 'DateTime',
    props: {
      span: 2,
      label: '通知时间',
    },
    componentProps: {
      placeholder: '请选择通知时间',
    },
  },
]

export const filter: ToolbarFilter = [
  {
    field: 'title',
    component: 'Input',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '通知标题',
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
