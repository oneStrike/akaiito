<script setup lang="ts">
import type {
  BasicTableColumn,
  BasicTableInst
} from '@/typings/components/basic/basicTable'

import type {
  AdminGetPrivacyPageRes,
  AdminGetPrivacyDetailRes
} from '~@/apiTypes/privacy'

import type { JoinLoading } from '@/typings/shared'
import { useMessage } from '@/hooks/naviaDiscreteApi'

import * as privacyApi from '@/api/privacy'

import SharedModal from '@/components/shared/SharedModal.vue'
import FormModal from '@/components/modal/FormModal.vue'
import {
  options,
  platforms,
  filterOptions,
  batchOptions
} from '@/views/businessManage/privacyAgreement/options'

type PrivacyItem = JoinLoading<AdminGetPrivacyPageRes['list'][number]>

const tableRef = ref<BasicTableInst>()

//删除隐私协议
const deletePrivacy = async (ids: number[]) => {
  await privacyApi.deletePrivacyApi({ ids })
  useMessage.success(HintEnum.DEL_SUC)
  tableRef.value?.refresh()
}

//切换隐私协议启用状态
const toggleStatus = async (privacy: PrivacyItem, status: number) => {
  try {
    privacy.loading = true
    await privacyApi.switchPrivacyStatusApi({ ids: [privacy.id], status })
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
    await privacyApi.switchPrivacyStatusApi({ ids, status })
  } else {
    await privacyApi.deletePrivacyApi({ ids })
  }
  useMessage.success(HintEnum.OPT_SUC)
  tableRef.value?.refresh()
}

const currentPrivacy = ref<AdminGetPrivacyDetailRes | IteratorObject>()
const showDetailModal = ref(false)
const showFormModal = ref(false)
//查看详情
const showDetail = async ({ id }: PrivacyItem) => {
  currentPrivacy.value = await privacyApi.getPrivacyDetailApi({
    id: id.toString()
  })
  showDetailModal.value = true
}

//打开表单弹窗
const openFormModal = async (record?: PrivacyItem) => {
  if (record) {
    currentPrivacy.value = await privacyApi.getPrivacyDetailApi({
      id: record.id.toString()
    })
  } else {
    currentPrivacy.value = {}
  }

  showFormModal.value = true
}

const transformPlatform = (platform: string) => {
  const platformValueArr = platform.split(',')
  const platformLabelArr = platforms.map((item) => item.label)
  return platformValueArr
    .map((item) => platformLabelArr[parseInt(item) - 1])
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
          event: openFormModal
        },
        {
          text: '删除',
          tipField: 'name',
          confirm: () => deletePrivacy([row.id])
        },
        {
          text: '链接',
          event: () => {
            useClipboard().copy(
              window.location.origin + '/#/shared/view-privacy?id=' + row.id
            )
            useMessage.success('复制成功')
          }
        }
      ]
    })
}

//添加或编辑协议
const operationPrivacy = async (privacy: AdminGetPrivacyDetailRes) => {
  privacy.status = privacy.status || 1
  if (!privacy.id) {
    await privacyApi.addPrivacyApi(privacy)
    useMessage.success(HintEnum.ADD_SUC)
  } else {
    await privacyApi.updatePrivacyApi(privacy)
    useMessage.success(HintEnum.UPD_SUC)
  }
  showFormModal.value = false
  tableRef.value?.refresh()
}

const tableColumns: BasicTableColumn<PrivacyItem> = [
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
    ellipsis: {
      lineClamp: 2
    },
    render: (rowData) => (rowData.remark ? rowData.remark : '-')
  },

  action
]
</script>
<template>
  <n-card class="h_100">
    <basic-table
      ref="tableRef"
      :columns="tableColumns"
      :request-api="privacyApi.getPrivacyPageApi"
      :filter-options="filterOptions"
    >
      <template #left>
        <n-space :wrap="false">
          <n-button type="primary" @click="openFormModal()">新增</n-button>
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
        <div v-html="currentPrivacy?.content"></div>
      </div>
    </shared-modal>

    <form-modal
      :options="options"
      :title="currentPrivacy?.id ? '编辑' : '新增'"
      v-model="currentPrivacy"
      v-model:show="showFormModal"
      :width="880"
      @confirm="operationPrivacy"
    ></form-modal>
  </n-card>
</template>
