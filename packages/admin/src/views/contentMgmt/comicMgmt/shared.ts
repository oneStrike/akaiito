import type { EsFormOptions } from '@/components/es-form/types'
import type { EsTableColumn } from '@/components/es-table/types'
import type { EsToolbarProps } from '@/components/es-toolbar/types'
import { useValidate } from '@/hooks/useValidate'

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
    type: 'button',
    label: '解析',
    value: 'parse',
    props: {
      type: 'primary',
    },
  },
]

export const tableColumn: EsTableColumn = [
  {
    prop: 'name',
    label: '名称',
  },
]

export const formOptions: EsFormOptions[] = [
  {
    field: 'name',
    component: 'Input',
    props: {
      span: 2,
      label: '漫画名称',
      rules: useValidate.required('漫画名称'),
    },
    componentProps: {
      placeholder: '请输入漫画名称',
      maxlength: 50,
    },
  },
  {
    field: 'cover',
    component: 'Upload',
    props: {
      span: 2,
      label: '漫画封面',
      rules: useValidate.required('漫画封面'),
    },
    componentProps: {
      placeholder: '请上传漫画封面',
      scenario: 'shared',
      multiple: false,
      fileType: 'image',
    },
  },
  {
    field: 'authorId',
    component: 'Select',
    props: {
      span: 2,
      label: '作者',
      rules: useValidate.required('作者'),
    },
    componentProps: {
      remote: true,
      filterable: true,
      placeholder: '请输入关键字进行搜索',
    },
  },
  {
    field: 'categoryId',
    component: 'Select',
    props: {
      span: 2,
      label: '分类',
      rules: useValidate.required('分类'),
    },
    componentProps: {
      placeholder: '请选择分类',
    },
  },
  {
    field: 'publisher',
    component: 'Input',
    props: {
      span: 2,
      label: '出版社',
    },
    componentProps: {
      placeholder: '请输入出版社',
    },
  },
  {
    field: 'isFinished',
    component: 'Radio',
    props: {
      span: 2,
      label: '是否完结',
      rules: useValidate.required('是否完结'),
    },
    componentProps: {
      placeholder: '请输入出版社',
      options: [
        {
          label: '是',
          value: 1,
        },
        {
          label: '否',
          value: 0,
        },
      ],
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
    field: 'region',
    component: 'Select',
    props: {
      span: 2,
      label: '区域',
      rules: useValidate.required('区域'),
    },
    componentProps: {
      placeholder: '请选择区域',
      options: [],
    },
  },
  {
    field: 'description',
    component: 'Textarea',
    props: {
      label: '描述',
    },
    componentProps: {
      placeholder: '请输入描述',
      rows: 5,
    },
  },
]
