import type { EsFormOptions } from '@/components/es-form/types.ts'
import type { EsTableColumn } from '@/components/es-table/types.ts'
import type { EsToolbarProps } from '@/components/es-toolbar/types.ts'
import { useFormTool } from '@/hooks/useForm.ts'
import { useValidate } from '@/hooks/useValidate.ts'
import { formOptionsToTableColumn } from '@/utils/formOptionsToTableColumn.ts'
import {
  readRule,
  serialStatus,
} from '@/views/content-manage/comic/shared/common.ts'

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
    field: 'authorIds',
    component: 'Select',
    props: {
      span: 2,
      label: '作者',
      rules: useValidate.required('作者'),
    },
    componentProps: {
      multiple: true,
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
    field: 'originalSource',
    component: 'Input',
    props: {
      span: 2,
      label: '原作来源',
    },
    componentProps: {
      placeholder: '请输入原作来源（如：小说改编、游戏改编等）',
    },
  },
  {
    field: 'serialStatus',
    component: 'Select',
    props: {
      span: 2,
      label: '连载状态',
      rules: useValidate.required('连载状态'),
    },
    componentProps: {
      placeholder: '请选择连载状态',
      options: serialStatus,
    },
  },
  {
    field: 'ageRating',
    component: 'Select',
    props: {
      span: 2,
      label: '年龄分级',
      rules: useValidate.required('年龄分级'),
    },
    componentProps: {
      placeholder: '请选择年龄分级',
      options: [],
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
    field: 'popularityWeight',
    component: 'InputNumber',
    props: {
      span: 2,
      label: '辅助热度',
    },
    componentProps: {
      min: 1,
      max: 9999999,
      placeholder: '请输入辅助热度',
    },
  },
  {
    field: 'isNew',
    component: 'Radio',
    props: {
      span: 6,
      label: '是否新作',
      rules: useValidate.required('是否新作'),
    },
    componentProps: {
      defaultValue: false,
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
    field: 'isHot',
    component: 'Radio',
    props: {
      span: 6,
      label: '是否热门',
      rules: useValidate.required('是否热门'),
    },
    componentProps: {
      defaultValue: false,
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
    field: 'isRecommended',
    component: 'Radio',
    props: {
      span: 6,
      label: '是否推荐',
      rules: useValidate.required('是否推荐'),
    },
    componentProps: {
      defaultValue: true,
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
    field: 'canComment',
    component: 'Radio',
    props: {
      span: 4,
      label: '允许评论',
      rules: useValidate.required('允许评论'),
    },
    componentProps: {
      options: [
        {
          label: '允许',
          value: true,
        },
        {
          label: '不允许',
          value: false,
        },
      ],
    },
  },
  {
    field: 'canDownload',
    component: 'Radio',
    props: {
      span: 4,
      label: '允许下载',
      rules: useValidate.required('允许下载'),
    },
    componentProps: {
      options: [
        {
          label: '允许',
          value: true,
        },
        {
          label: '不允许',
          value: false,
        },
      ],
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
      label: '简介',
      rules: useValidate.required('简介'),
    },
    componentProps: {
      placeholder: '请输入简介',
      rows: 5,
    },
  },
  {
    field: 'seoTitle',
    component: 'Input',
    props: {
      span: 2,
      label: 'SEO标题',
    },
    componentProps: {
      min: 1,
      max: 999999,
      placeholder: '请输入SEO标题',
    },
  },
  {
    field: 'seoTitle',
    component: 'Input',
    props: {
      span: 2,
      label: 'SEO关键词',
    },
    componentProps: {
      min: 1,
      max: 999999,
      placeholder: '请输入EO关键词（逗号分隔）',
    },
  },
  {
    field: 'seoDescription',
    component: 'Textarea',
    props: {
      label: 'SEO描述',
    },
    componentProps: {
      placeholder: '请输入SEO描述',
      rows: 5,
    },
  },
  {
    field: 'disclaimer',
    component: 'Textarea',
    props: {
      label: '免责声明',
    },
    componentProps: {
      placeholder: '请输入免责声明',
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

export const tableColumn: EsTableColumn = formOptionsToTableColumn(
  formOptions,
  [
    'publisher',
    'originalSource',
    'ageRating',
    'language',
    'region',
    'popularityWeight',
    'canComment',
    'canDownload',
    'purchaseAmount',
    'seoTitle',
    'seoKeywords',
    'seoDescription',
    'disclaimer',
    'copyright',
    'description',
    'remark',
    'isHot',
    'isNew',
    'isRecommended',
  ],
  {
    cover: {
      width: 100,
      index: 0,
    },
    isPublished: {
      label: '发布状态',
      width: 100,
      align: 'center',
    },
    publishAt: {
      width: 100,
      formatter: (row: any) => {
        return row.publishAt ? row.publishAt.split('T')[0] : '-'
      },
    },
    authorIds: {
      width: 100,
    },
    readRule: {
      width: 100,
    },
    serialStatus: {
      width: 100,
    },
    action: {
      width: 160,
    },
  },
)
