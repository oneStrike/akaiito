<script setup lang="ts">
import type { BasicTableColumn } from '@/typings/components/basic/basicTable'
import type {
  AdminAddPrivacyReq,
  AdminGetPrivacyPageRes
} from '~@/apiTypes/privacy'
import type { JoinLoading } from '@/typings/shared'
import { useMessage } from '@/hook/naviaDiscreteApi'
import type {
  BasicFormInst,
  BasicFormOptions
} from '@/typings/components/basic/basicForm'
import {
  addPrivacyApi,
  deletePrivacyApi,
  getPrivacyPageApi,
  switchPrivacyStatusApi
} from '@/api/privacy'
import BasicTable from '@/components/basic/BasicTable.vue'

type PrivacyItem = JoinLoading<AdminGetPrivacyPageRes['list'][number]>

const tableRef = ref<BasicFormInst>()

const addPrivacy = async (privacy: AdminAddPrivacyReq) => {
  await addPrivacyApi(privacy)
  useMessage.success(HintEnum.ADD_SUC)
  tableRef.value?.reset()
}

const deletePrivacy = async (ids: number[]) => {
  await deletePrivacyApi({ ids })
  useMessage.success(HintEnum.DEL_SUC)
  tableRef.value?.reset()
}

const toggleStatus = async (privacy: PrivacyItem, status: number) => {
  try {
    privacy.loading = true
    await switchPrivacyStatusApi({ ids: [privacy.id], status })
    useMessage.success(HintEnum.OPT_SUC)
    tableRef.value?.reset()
    privacy.loading = false
  } catch (e) {
    privacy.loading = false
  }
}

//批量操作
const batch = async (type: 'enable' | 'delete' | 'disabled', ids: number[]) => {
  if (type === 'enable' || type === 'disabled') {
    const status = type === 'enable' ? 1 : 0
    await switchPrivacyStatusApi({ ids, status })
  } else {
    await deletePrivacyApi({ ids })
  }
  useMessage.success(HintEnum.OPT_SUC)
  tableRef.value?.reset()
}

const platforms = [
  {
    label: 'APP',
    value: 1
  },
  {
    label: 'WEB',
    value: 2
  },
  {
    label: '小程序',
    value: 3
  }
]

const transformPlatform = (platform: string) => {
  const platformValueArr = platform.split(',')
  const platformLabelArr = platforms.map((item) => item.label)
  return platformValueArr
    .map((item, index) => platformLabelArr[parseInt(item) - 1])
    .join('，')
}

const tableColumns: BasicTableColumn[] = [
  {
    key: 'name',
    title: '名称'
  },
  {
    key: 'platform',
    title: '平台',
    render: (rowData) => transformPlatform(rowData.platform as string)
  },
  {
    key: 'status',
    title: '状态',
    render: (rowData) => {
      const row = rowData as unknown as PrivacyItem
      return useSwitch({
        value: row.status,
        loading: row.loading,
        onUpdateValue: (status) => toggleStatus(row, status)
      })
    }
  },
  {
    key: 'remark',
    title: '备注',
    render: (rowData) => (rowData.remark ? rowData.remark : '-') as string
  },
  {
    key: 'createdAt',
    title: '创建日期'
  }
]

const filterOptions: BasicFormOptions[] = [
  {
    component: 'Select',
    bind: {
      label: '状态',
      path: 'status',
      width: 140
    },
    componentProps: {
      bind: {
        placeholder: '状态'
      },
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  },
  {
    component: 'Select',
    bind: {
      label: '平台',
      path: 'platform',
      width: 200
    },
    componentProps: {
      bind: {
        placeholder: '状态',
        multiple: true,
        maxTagCount: 'responsive',
        transform: true,
      },
      options: platforms
    }
  },
  {
    component: 'Input',
    bind: {
      label: '名称',
      path: 'name',
      width: 200
    },
    componentProps: {
      bind: {
        placeholder: '名称'
      }
    }
  }
]
</script>
<template>
  <n-card class="h_100">
    <basic-table
      ref="tableRef"
      :columns="tableColumns"
      :request-api="getPrivacyPageApi"
      :filter-options="filterOptions"
    ></basic-table>
  </n-card>
</template>
