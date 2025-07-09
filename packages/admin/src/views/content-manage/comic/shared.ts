import type { EsFormOptions } from '@/components/es-form/types'
import type { EsTableColumn } from '@/components/es-table/types'
import type { EsToolbarProps } from '@/components/es-toolbar/types'
import { useFormTool } from '@/hooks/useForm'
import { formOptionsToFilterOptions } from '@/utils/formOptionsToFilterOptions.ts'
import { formOptionsToTableColumn } from '@/utils/formOptionsToTableColumn.ts'

export const readRule = [
  {
    label: '所有人',
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
    label: '购买',
    value: 3,
  },
]

export const serialStatus = [
  {
    label: '未开始',
    value: 0,
  },
  {
    label: '连载中',
    value: 1,
  },
  {
    label: '已完结',
    value: 2,
  },
  {
    label: '暂停',
    value: 3,
  },
  {
    label: '停更',
    value: 4,
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
      label: '内容年龄分级',
      rules: useValidate.required('内容年龄分级'),
    },
    componentProps: {
      placeholder: '请选择内容年龄分级',
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
      span: 2,
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
      span: 2,
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
      label: '购买金额',
      rules: useValidate.required('购买金额'),
    },
    componentProps: {
      min: 1,
      max: 999999,
      placeholder: '请输入购买金额',
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
    'categoryIds',
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
  ],
  {
    cover: {
      index: 0,
    },
    publishAt: {
      formatter: (row: any) => {
        return row.publishAt ? row.publishAt.split('T')[0] : '-'
      },
    },
    versionCount: {
      label: '版本',
      columnType: 'link',
      align: 'center',
    },
    action: {
      width: 120,
    },
  },
)

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
    field: 'subtitle',
    component: 'Input',
    props: {
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
      label: '章节序号',
      rules: useValidate.required('章节序号'),
    },
    componentProps: {
      placeholder: '请输入章节序号',
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
      label: '购买金额',
      rules: useValidate.required('购买金额'),
    },
    componentProps: {
      min: 1,
      max: 999999,
      placeholder: '请输入购买金额',
      maxlength: 50,
    },
  },
  {
    field: 'isPreview',
    component: 'Radio',
    props: {
      span: 2,
      label: '是否为试读章节',
      rules: useValidate.required('是否为试读章节'),
    },
    componentProps: {
      placeholder: '请选择是否为试读章节',
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
  [],
)

export const contentColumn: EsTableColumn = [
  {
    prop: 'imagePreview',
    label: '预览图片',
    align: 'center',
  },
  {
    prop: 'imageInfo',
    label: '图片信息',
    align: 'center',
  },
  {
    prop: 'createdAt',
    label: '上传时间',
    align: 'center',
  },
  {
    prop: 'action',
    label: '操作',
    align: 'center',
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
      placeholder: '发布状态',
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

export const filter: EsFormOptions[] = formOptionsToFilterOptions(formOptions, {
  readRule: 4,
  serialStatus: 4,
  name: 4,
})

export const versionForm: EsFormOptions[] = [
  {
    field: 'name',
    component: 'Input',
    props: {
      label: '版本名称',
      rules: useValidate.required('版本名称'),
    },
    componentProps: {
      placeholder: '请输入版本名称',
      maxlength: 50,
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
    },
  },
]
