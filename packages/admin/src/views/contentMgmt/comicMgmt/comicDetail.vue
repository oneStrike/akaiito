<script lang="ts" setup>
  import type { GetComicDetailTypesRes } from '@/apis/types/comic'
  import { getComicDetailApi } from '@/apis/comic'

  defineOptions({
    name: 'ComicDetail',
  })

  const props = withDefaults(defineProps<Props>(), {
    visible: false,
  })
  const emits = defineEmits(['close'])
  export interface Props {
    visible?: boolean
    comicId: number
  }
  const comicDetail = ref<GetComicDetailTypesRes>()

  getComicDetailApi({ id: props.comicId }).then((data) => {
    comicDetail.value = data
  })
</script>

<template>
  <es-modal
    v-if="visible && comicDetail"
    :model-value="visible"
    :title="`【${comicDetail?.name}】详情`"
    :width="820"
    @closed="emits('close')"
  >
    <div class="p-4 bg-gray-50 rounded-lg">
      <!-- 顶部：封面和基本信息卡片 -->
      <div class="bg-white rounded-lg shadow-md p-5 mb-4">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 封面 -->
          <div class="w-full md:w-48 flex-shrink-0 flex flex-col items-center">
            <el-image
              :src="comicDetail.cover"
              fit="cover"
              class="w-full md:w-48 h-64 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              :preview-src-list="[comicDetail.cover]"
            />
            <div class="flex flex-wrap gap-1 justify-center mt-3 w-full">
              <el-tag
                v-for="cat in comicDetail.categories"
                :key="cat.id"
                size="small"
                effect="light"
                class="!mr-0 mb-1"
              >
                {{ cat.name }}
              </el-tag>
            </div>
          </div>

          <!-- 基本信息 -->
          <div class="flex-1 flex flex-col">
            <div class="text-xl font-bold mb-1">
              {{ comicDetail.name }}
            </div>
            <div v-if="comicDetail.alias" class="text-gray-400 text-sm mb-3">
              ({{ comicDetail.alias }})
            </div>

            <div class="flex items-center gap-2 mb-3">
              <span class="text-gray-500">作者：</span>
              <el-link type="primary" underline="never" class="text-base">
                {{ comicDetail.author.name }}
              </el-link>
            </div>

            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm"
            >
              <div>
                <span class="text-gray-500">区域：</span>
                {{ comicDetail.region }}
              </div>
              <div>
                <span class="text-gray-500">语言：</span>
                {{ comicDetail.language }}
              </div>
              <div>
                <span class="text-gray-500">年龄分级：</span>
                {{ comicDetail.ageRating }}
              </div>
              <div>
                <span class="text-gray-500">出版社：</span>
                {{ comicDetail.publisher || '-' }}
              </div>
              <div>
                <span class="text-gray-500">章节数：</span>
                {{ comicDetail.chapterCount ?? '-' }}
              </div>
              <div>
                <span class="text-gray-500">热度：</span>
                {{ comicDetail.popularity }}
              </div>
              <div>
                <span class="text-gray-500">辅助热度：</span>
                {{ comicDetail.virtualPopularity ?? '-' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 中部：状态与权限卡片 -->
      <div class="bg-white rounded-lg shadow-md p-5 mb-4">
        <div
          class="text-base font-semibold text-gray-700 mb-3 border-b border-gray-200 pb-2"
        >
          <i class="el-icon-setting mr-1" />
          状态与权限
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div
            class="bg-gray-50 rounded-lg p-3 flex flex-col items-center justify-center"
          >
            <div class="text-gray-500 mb-2">作品状态</div>
            <el-tag
              :type="comicDetail.isFinished ? 'success' : 'warning'"
              size="large"
              effect="light"
              class="w-full flex justify-center"
            >
              {{ comicDetail.isFinished ? '已完结' : '连载中' }}
            </el-tag>
          </div>

          <div
            class="bg-gray-50 rounded-lg p-3 flex flex-col items-center justify-center"
          >
            <div class="text-gray-500 mb-2">发布状态</div>
            <el-tag
              :type="comicDetail.isPublish ? 'success' : 'info'"
              size="large"
              effect="light"
              class="w-full flex justify-center"
            >
              {{ comicDetail.isPublish ? '已发布' : '未发布' }}
            </el-tag>
          </div>

          <div
            class="bg-gray-50 rounded-lg p-3 flex flex-col items-center justify-center"
          >
            <div class="text-gray-500 mb-2">查看规则</div>
            <el-tag
              :type="
                comicDetail.viewRule === 0
                  ? 'success'
                  : comicDetail.viewRule === 3
                    ? 'danger'
                    : 'warning'
              "
              size="large"
              effect="light"
              class="w-full flex justify-center"
            >
              {{
                comicDetail.viewRule === 0
                  ? '公开'
                  : comicDetail.viewRule === 1
                    ? '登录'
                    : comicDetail.viewRule === 2
                      ? '会员'
                      : comicDetail.viewRule === 3
                        ? '购买'
                        : '-'
              }}
            </el-tag>
            <span
              v-if="comicDetail.viewRule === 3 && comicDetail.purchaseAmount"
              class="mt-1 text-xs text-gray-500"
            >
              需消耗 {{ comicDetail.purchaseAmount }} 积分
            </span>
          </div>

          <div
            class="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
          >
            <span class="text-gray-500">允许下载</span>
            <el-switch
              v-model="comicDetail.canDownload"
              disabled
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </div>

          <div
            class="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
          >
            <span class="text-gray-500">允许评论</span>
            <el-switch
              v-model="comicDetail.canComment"
              disabled
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </div>
        </div>
      </div>

      <!-- 时间信息卡片 -->
      <div class="bg-white rounded-lg shadow-md p-5 mb-4">
        <div
          class="text-base font-sees-modalext-gray-700 mb-3 border-b border-gray-200 pb-2"
        >
          <i class="el-icon-time mr-1" />
          时间信息
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="bg-gray-50 rounded-lg p-3">
            <div class="text-gray-500 mb-1">作品发布日期</div>
            <div>{{ comicDetail.publishAt }}</div>
          </div>

          <div class="bg-gray-50 rounded-lg p-3">
            <div class="text-gray-500 mb-1">最后更新时间</div>
            <div>{{ comicDetail.lastUpdated || '-' }}</div>
          </div>

          <div class="bg-gray-50 rounded-lg p-3">
            <div class="text-gray-500 mb-1">创建时间</div>
            <div>{{ comicDetail.createdAt }}</div>
          </div>

          <div class="bg-gray-50 rounded-lg p-3">
            <div class="text-gray-500 mb-1">更新时间</div>
            <div>{{ comicDetail.updatedAt }}</div>
          </div>
        </div>
      </div>

      <!-- 作品描述卡片 -->
      <div class="bg-white rounded-lg shadow-md p-5">
        <div
          class="text-base font-semibold text-gray-700 mb-3 border-b border-gray-200 pb-2"
        >
          <i class="el-icon-document mr-1" />
          作品描述
        </div>
        <div
          class="bg-gray-50 rounded-lg p-4 text-sm leading-relaxed whitespace-pre-line min-h-[80px]"
        >
          {{ comicDetail.description || '暂无描述' }}
        </div>
      </div>
    </div>
  </es-modal>
</template>
