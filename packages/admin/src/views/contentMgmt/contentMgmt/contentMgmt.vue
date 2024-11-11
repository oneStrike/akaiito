<script lang="ts" setup>
import type { SearchWordTypesRes, ServiceTypesRes } from '@/apis/types/thirdParty'
import { searchWordApi, serviceApi } from '@/apis/thirdParty'
import { toolbar } from '@/views/contentMgmt/contentMgmt/shared'

defineOptions({
  name: 'ContentMgmtPage',
})

const parseWord = reactive({
  service: [] as ServiceTypesRes,
  list: [] as SearchWordTypesRes,
  serviceCode: '' as ServiceTypesRes[number]['code'],
  modal: false,
  loading: false,
  keyword: '',
})

const handlerToolbar = async (val: string) => {
  if (val === 'parse') {
    parseWord.service = await serviceApi()
    parseWord.modal = true
  }
}

const search = async () => {
  if (parseWord.keyword) {
    parseWord.loading = true
    parseWord.list = await searchWordApi({ keyword: parseWord.keyword, service: parseWord.serviceCode })
    parseWord.loading = false
  }
}
</script>

<template>
  <div class="main-page">
    <es-toolbar :toolbar="toolbar" @handler="handlerToolbar" />

    <es-modal v-model="parseWord.modal" :height="600" :width="1080">
      <div class="flex">
        <el-input v-model="parseWord.keyword" placeholder="请输入作品名字">
          <template #append>
            <el-select v-model="parseWord.serviceCode" placeholder="选择服务" style="width: 100px">
              <el-option v-for="item in parseWord.service" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </template>
        </el-input>
        <el-button
          type="primary"
          class="ml-4"
          :disabled="!parseWord.keyword && !!parseWord.serviceCode"
          @click="search"
        >
          搜索
        </el-button>
      </div>
      <div class="mt-4 h-540px overflow-auto">
        <el-empty v-if="!parseWord.loading && !parseWord.list.length" />
        <div v-else class="px-3">
          <el-row :gutter="20" justify="space-around">
            <el-col v-for="item in parseWord.list" :key="item.id" :span="8">
              <el-card shadow="hover" class="mb-5">
                <template #header>
                  <div class="flex justify-between">
                    <el-text type="danger">{{ item.name }}</el-text>
                    <el-button type="primary" link>解析</el-button>
                  </div>
                </template>
                <div class="w-30">
                  <el-image :src="item.cover" />
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </es-modal>
  </div>
</template>

<style scoped></style>
