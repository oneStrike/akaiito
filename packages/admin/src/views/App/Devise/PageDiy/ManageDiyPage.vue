<script setup lang="ts">
import EditDiyContainer from '@/views/App/Devise/PageDiy/components/EditDiyContainer.vue'
import {
  deleteDiyDataApi,
  getDiyDataApi,
  switchDiyDataApi
} from '@/api/diy/diy'
import type { TTableColumn } from '@/typings/components/basicTable'
import type { AdminGetDiyPageRes } from '~@/apiTypes/diyClientPage'
import { Hint } from '@/utils/hint'
import { useMessage } from '@/hooks/useMessage'
import { useDiyStore } from '@/stores'

const diyStore = useDiyStore()

const basicTableRef = ref()
const tableOptions: TTableColumn = [
  {
    prop: 'diyName',
    label: '名称'
  },
  {
    prop: 'createdAt',
    label: '创建时间'
  },
  {
    prop: 'updatedAt',
    label: '编辑时间'
  },
  {
    prop: 'action',
    label: '操作',
    width: 220,
    scoped: 'action'
  }
]

const showEdit = ref(false)
const closedEdit = (isReset?: boolean) => {
  showEdit.value = false
  isReset && basicTableRef.value.resetTable()
}

//编辑diy数据
const editDiy = (row: AdminGetDiyPageRes[number]) => {
  const parseDiyData = JSON.parse(row.diyData)
  diyStore.layoutData = parseDiyData.modules
  diyStore.overallPage = parseDiyData.page
  diyStore.reEditDiyData = row
  showEdit.value = true
}

//删除diy数据
const deleteDiyData = async (row: AdminGetDiyPageRes[number]) => {
  if (row.use === 1) {
    useMessage('warning', '您无法删除已经启用的模板')
    return
  }
  await deleteDiyDataApi({ id: row.id })
  await basicTableRef.value.resetTable()
  useMessage('success', Hint.DEL_SUC)
}

//切换diy数据使用状态
const switchDiy = async (row: AdminGetDiyPageRes[number], use: 0 | 1) => {
  if (row.use === use) return
  const params = {
    id: row.id,
    use
  }
  await switchDiyDataApi(params)
  await basicTableRef.value.resetTable()
  useMessage('success', Hint.OPT_SUC)
}
</script>

<template>
  <div class="h_100">
    <basic-table
      v-show="!showEdit"
      ref="basicTableRef"
      :requestApi="getDiyDataApi"
      :column-options="tableOptions"
      :showSearch="false"
    >
      <template #header>
        <el-button type="primary" @click="showEdit = true">添加</el-button>
      </template>
      <template #action="{ row }">
        <el-tooltip effect="dark" content="设为首页" placement="top">
          <svg-icon
            :type="row.use === 1 ? 'primary' : ''"
            class="mr_2"
            icon-name="home"
            @click="switchDiy(row, 1)"
          ></svg-icon>
        </el-tooltip>
        <el-tooltip effect="dark" content="停用" placement="top">
          <svg-icon
            class="mr_2"
            icon-name="ban"
            @click="switchDiy(row, 0)"
          ></svg-icon>
        </el-tooltip>
        <el-tooltip effect="dark" content="编辑" placement="top">
          <svg-icon
            class="mr_2"
            icon-name="edit"
            @click="editDiy(row)"
          ></svg-icon>
        </el-tooltip>
        <el-popconfirm
          width="200"
          @confirm="deleteDiyData(row)"
          :title="`确定删除【${row.diyName}】？`"
        >
          <template #reference>
            <span>
              <el-tooltip effect="dark" content="删除" placement="top">
                <svg-icon type="error" icon-name="delete"></svg-icon>
              </el-tooltip>
            </span>
          </template>
        </el-popconfirm>
      </template>
    </basic-table>
    <edit-diy-container
      v-if="showEdit"
      @closed="closedEdit"
    ></edit-diy-container>
  </div>
</template>

<style scoped lang="scss"></style>
