<script lang="ts" setup>
import { searchWordApi } from '@/apis/thirdParty'
import { toolbar } from '@/views/contentMgmt/contentMgmt/shared'

defineOptions({
  name: 'ContentMgmtPage',
})

const parseWord = reactive({
  list: [],
  modal: false,
  loading: false,
  keyword: '',
})

const handlerToolbar = (val: string) => {
  if (val === 'parse') {
    parseWord.modal = true
  }
}

const search = async () => {
  parseWord.loading = true
  parseWord.list = await searchWordApi({ keyword: parseWord.keyword })
  console.log(parseWord.list)
  parseWord.loading = false
}
</script>

<template>
  <div class="main-page">
    <es-toolbar :toolbar="toolbar" @handler="handlerToolbar" />

    <es-modal v-model="parseWord.modal" :height="600" :width="1080">
      <div class="flex">
        <el-input v-model="parseWord.keyword" placeholder="请输入作品名字" />
        <el-button type="primary" class="ml-4" @click="search">搜索</el-button>
      </div>
      <div class="mt-4 h-540px overflow-auto">
        <el-empty v-if="!parseWord.loading && !parseWord.list.length" />
        <div class="px-3" v-else>
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
                  <el-image :src="item.cover"></el-image>
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
