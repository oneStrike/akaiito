import type { EsFormOptions } from '@/components/es-form/types'
import type { EsTableColumn } from '@/components/es-table/types'
import type { EsToolbarProps } from '@/components/es-toolbar/types'
import { useFormTool } from '@/hooks/useForm'

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
    align: 'center',
    slotName: 'name',
  },
  {
    prop: 'cover',
    label: '封面',
    align: 'center',
    type: 'image',
  },
  {
    prop: 'popularity',
    label: '热度',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'popularity',
  },
  {
    prop: 'isFinished',
    label: '作品状态',
    align: 'center',
    slotName: 'isFinished',
  },
  {
    prop: 'author',
    label: '作者',
    align: 'center',
    slotName: 'author',
  },
  {
    prop: 'isPublish',
    label: '发布状态',
    align: 'center',
    slotName: 'isPublish',
  },
  {
    prop: 'lastUpdated',
    label: '最后更新时间',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'lastUpdated',
  },
  {
    prop: 'action',
    label: '操作',
    align: 'center',
    slotName: 'action',
  },
]

export const chapterColumn: EsTableColumn = [
  {
    prop: 'title',
    label: '章节名称',
    align: 'center',
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'createdAt',
  },
  {
    prop: 'isPublish',
    label: '发布状态',
    align: 'center',
    slotName: 'isPublish',
  },
  {
    prop: 'action',
    label: '操作',
    align: 'center',
    slotName: 'action',
  },
]

export const chapterFilter: EsFormOptions[] = [
  {
    field: 'isPublish',
    component: 'Select',
    props: {
      span: 4,
    },
    componentProps: {
      placeholder: '发布',
      options: [
        {
          label: '已发布',
          value: true,
        },
        {
          label: '未发布',
          value: false,
        },
      ],
    },
  },
  {
    field: 'title',
    component: 'Input',
    props: {
      span: 4,
    },
    componentProps: {
      placeholder: '章节名称',
      maxlength: 50,
    },
  },
]

export const chapterFormOptions: EsFormOptions[] = [
  {
    field: 'title',
    component: 'Input',
    props: {
      label: '章节标题',
      rules: useValidate.required('章节标题'),
    },
    componentProps: {
      placeholder: '请输入章节标题',
      maxlength: 50,
    },
  },
  {
    field: 'contents',
    component: 'Upload',
    props: {
      label: '内容',
      rules: useValidate.required('内容'),
    },
    componentProps: {
      placeholder: '请上传内容',
      listType: 'picture',
      fileType: 'image',
      multiple: true,
      scenario: 'content',
      maxCount: 9999,
      structure: 'string',
    },
  },
]

export const filter: EsFormOptions[] = [
  {
    field: 'isFinished',
    component: 'Select',
    props: {
      span: 4,
    },
    componentProps: {
      placeholder: '是否完结',
      options: [
        {
          label: '已完结',
          value: true,
        },
        {
          label: '连载中',
          value: false,
        },
      ],
    },
  },
  {
    field: 'name',
    component: 'Input',
    props: {
      span: 4,
    },
    componentProps: {
      placeholder: '漫画名称',
      maxlength: 50,
    },
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
    field: 'alias',
    component: 'Input',
    props: {
      span: 2,
      label: '漫画别名',
      rules: useValidate.required('漫画别名'),
    },
    componentProps: {
      placeholder: '请输入漫画别名',
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
    field: 'categoryIds',
    component: 'Select',
    props: {
      span: 2,
      label: '分类',
      rules: useValidate.required('分类'),
    },
    componentProps: {
      multiple: true,
      placeholder: '请选择分类',
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
    field: 'publisher',
    component: 'Select',
    props: {
      span: 2,
      label: '出版社',
    },
    componentProps: {
      placeholder: '请选择出版社',
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
      placeholder: '请选择是否完结',
      options: [
        {
          label: '已完结',
          value: true,
        },
        {
          label: '连载中',
          value: false,
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
    field: 'virtualPopularity',
    component: 'InputNumber',
    props: {
      span: 2,
      label: '辅助热度',
    },
    componentProps: {
      placeholder: '请输入辅助热度',
    },
  },
  {
    field: 'description',
    component: 'Textarea',
    props: {
      label: '简介',
      rules: useValidate.required('简介'),
    },
    componentProps: {
      placeholder: '请输入简介',
      rows: 5,
    },
  },
]
