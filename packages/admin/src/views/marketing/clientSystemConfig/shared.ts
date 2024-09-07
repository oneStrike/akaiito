import type { EsFormOptions } from '@/components/es-form/es-form.vue'

export const formOptions: EsFormOptions[] = [
  {
    field: 'clientName',
    component: 'Input',
    props: {
      label: '客户端名称',
      rules: [{ required: true, message: '请输入客户端名称' }],
    },
    componentProps: {
      placeholder: '请输入客户端名称',
    },
  },
  {
    field: 'logo',
    component: 'Upload',
    props: {
      label: 'logo',
      rules: [{ required: true, message: '请上传程序logo' }],
    },
    componentProps: {
      placeholder: '请上传程序logo',
      scenario: 'shared',
      multiple: false,
      fileType: 'image',
    },
  },
]
