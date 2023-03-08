<script setup lang="ts">
import type {
  BasicTableColumn,
  BasicTableInst
} from '@/typings/components/basic/basicTable'
import type {
  AdminAddPrivacyReq,
  AdminGetPrivacyPageRes,
  AdminGetPrivacyDetailRes
} from '~@/apiTypes/privacy'
import type { JoinLoading } from '@/typings/shared'
import { useMessage } from '@/hook/naviaDiscreteApi'
import type { BasicFormOptions } from '@/typings/components/basic/basicForm'
import {
  addPrivacyApi,
  deletePrivacyApi,
  getPrivacyDetailApi,
  getPrivacyPageApi,
  switchPrivacyStatusApi,
  updatePrivacyApi
} from '@/api/privacy'
import BasicTable from '@/components/basic/BasicTable.vue'
import SharedModal from '@/components/shared/SharedModal.vue'
import FormModal from '@/components/modal/FormModal.vue'

type PrivacyItem = JoinLoading<AdminGetPrivacyPageRes['list'][number]>

const tableRef = ref<BasicTableInst>()

const addPrivacy = async (privacy: AdminAddPrivacyReq) => {
  await addPrivacyApi(privacy)
  useMessage.success(HintEnum.ADD_SUC)
  tableRef.value?.refresh()
}

const deletePrivacy = async (ids: number[]) => {
  await deletePrivacyApi({ ids })
  useMessage.success(HintEnum.DEL_SUC)
  tableRef.value?.refresh()
}

const toggleStatus = async (privacy: PrivacyItem, status: number) => {
  try {
    privacy.loading = true
    await switchPrivacyStatusApi({ ids: [privacy.id], status })
    useMessage.success(HintEnum.OPT_SUC)
    tableRef.value?.refresh()
    privacy.loading = false
  } catch (e) {
    privacy.loading = false
  }
}

//批量操作
const batch = async (type: 'enable' | 'delete' | 'disabled') => {
  const ids = tableRef.value?.selectKeys as number[]
  if (!ids || !ids.length) {
    useMessage.warning('至少选择一项')
    return
  }
  if (type === 'enable' || type === 'disabled') {
    const status = type === 'enable' ? 1 : 0
    await switchPrivacyStatusApi({ ids, status })
  } else {
    await deletePrivacyApi({ ids })
  }
  useMessage.success(HintEnum.OPT_SUC)
  tableRef.value?.refresh()
}

const currentPrivacy = ref<AdminGetPrivacyDetailRes | object>({})
const showDetailModal = ref(false)
const showEditModal = ref(false)
//查看详情
const showDetail = async ({ id }: PrivacyItem) => {
  currentPrivacy.value = await getPrivacyDetailApi({ id: id.toString() })
  showDetailModal.value = true
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

const action: BasicTableColumn<PrivacyItem>[number] = {
  key: 'action',
  title: '操作',
  align: 'center',
  render: (row) =>
    useTableBasicButtons({
      source: row,
      options: [
        {
          text: '编辑',
          event: async ({ id }: PrivacyItem) => {
            currentPrivacy.value = await getPrivacyDetailApi({
              id: id.toString()
            })
            showEditModal.value = true
          }
        },
        {
          text: '删除',
          tipField: 'name',
          confirm: () => deletePrivacy([row.id])
        }
      ]
    })
}

//添加或编辑协议
const operationPrivacy = async (privacy: AdminGetPrivacyDetailRes) => {
  privacy.status = privacy.status || 1
  if (!privacy.id) {
    await addPrivacyApi(privacy)
    useMessage.success(HintEnum.ADD_SUC)
  } else {
    await updatePrivacyApi(privacy)
    useMessage.success(HintEnum.UPD_SUC)
  }
  showEditModal.value = false
  tableRef.value?.refresh()
}

const tableColumns: BasicTableColumn<PrivacyItem> = [
  {
    type: 'selection'
  },
  {
    key: 'name',
    title: '名称',
    render: (row) =>
      useButton(row.name, {
        text: true,
        type: 'primary',
        onClick: () => showDetail(row)
      })
  },
  {
    key: 'platform',
    title: '平台',
    render: (rowData) => transformPlatform(rowData.platform)
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
    render: (rowData) => (rowData.remark ? rowData.remark : '-')
  },
  {
    key: 'createdAt',
    title: '创建日期'
  },
  action
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
        transform: true
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

const formOptions: BasicFormOptions[] = [
  {
    component: 'Input',
    bind: {
      path: 'name',
      label: '协议名称',
      rule: useValidate.required({ message: '协议名称' })
    },
    componentProps: {
      bind: {
        placeholder: '请输入协议名称'
      }
    }
  },
  {
    component: 'Checkbox',
    bind: {
      path: 'platform',
      label: '平台',
      rule: useValidate.required({ message: '平台' })
    },
    componentProps: {
      bind: {
        placeholder: '请选择平台',
        transform: true
      },
      options: platforms
    }
  },
  {
    component: 'Editor',
    bind: {
      path: 'content',
      label: '内容',
      rule: useValidate.required({ message: '内容' })
    },
    componentProps: {
      bind: {
        placeholder: '请输入内容'
      }
    }
  },
  {
    component: 'Input',
    bind: {
      path: 'remark',
      label: '备注'
    },
    componentProps: {
      bind: {
        placeholder: '请输入备注',
        type: 'textarea'
      }
    }
  }
]

const batchOptions = () => [
  {
    label: '批量禁用',
    key: 'disabled'
  },
  {
    label: '批量启用',
    key: 'enable'
  },
  {
    label: '批量删除',
    key: 'delete'
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
    >
      <template #left>
        <n-space :wrap="false">
          <n-button
            type="primary"
            @click=";(showEditModal = true), (currentPrivacy = {})"
            >新增</n-button
          >
          <n-dropdown trigger="hover" :options="batchOptions()" @select="batch">
            <n-button>批量操作</n-button>
          </n-dropdown>
        </n-space>
      </template>
    </basic-table>

    <shared-modal
      v-model:show="showDetailModal"
      :cancel-btn="false"
      :width="880"
      @confirm="showDetailModal = false"
    >
      <div class="pd_16" style="overflow: auto">
        <div v-html="currentPrivacy.content"></div>
      </div>
    </shared-modal>

    <form-modal
      :options="formOptions"
      :title="currentPrivacy.id ? '编辑' : '新增'"
      v-model="currentPrivacy"
      v-model:show="showEditModal"
      :width="880"
      @confirm="operationPrivacy"
    ></form-modal>
  </n-card>
</template>
