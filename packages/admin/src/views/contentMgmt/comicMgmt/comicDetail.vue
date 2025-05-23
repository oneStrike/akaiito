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
    dataDict?: IterateObject
  }
  console.log('props', props.dataDict)
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
    <div class="p-6 space-y-6 bg-gray-50 rounded-lg">
      <!-- 顶部：封面和基本信息卡片 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- 封面 -->
          <div class="w-full md:w-48 flex-shrink-0 flex flex-col">
            <div class="group relative">
              <el-image
                :src="comicDetail.cover"
                fit="cover"
                class="w-full md:w-48 h-64 rounded-lg shadow-sm"
                :preview-src-list="[comicDetail.cover]"
              />
            </div>
            <div class="flex flex-wrap gap-1.5 justify-center mt-4">
              <el-tag
                v-for="cat in comicDetail.categories"
                :key="cat.id"
                size="small"
                effect="plain"
                class="!mr-0"
              >
                {{ cat.name }}
              </el-tag>
            </div>
          </div>

          <!-- 基本信息 -->
          <div class="flex-1 flex flex-col">
            <div class="flex items-center gap-3 mb-4">
              <h3 class="text-xl font-bold text-gray-800">
                {{ comicDetail.name }}
              </h3>
              <span v-if="comicDetail.alias" class="text-gray-400 text-sm">
                ({{ comicDetail.alias }})
              </span>
            </div>

            <div class="flex items-center gap-2 mb-4">
              <i class="el-icon-user text-primary-500" />
              <span class="text-gray-500">作者：</span>
              <el-link
                type="primary"
                underline="never"
                class="text-base font-medium"
              >
                {{ comicDetail.author.name }}
              </el-link>
            </div>

            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="flex items-center gap-2">
                <i class="el-icon-location text-primary-500" />
                <span class="text-gray-500">区域：</span>
                <span>{{ comicDetail.region }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="el-icon-message text-primary-500" />
                <span class="text-gray-500">语言：</span>
                <span>{{ comicDetail.language }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="el-icon-warning text-primary-500" />
                <span class="text-gray-500">年龄分级：</span>
                <span>{{ comicDetail.ageRating }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="el-icon-office-building text-primary-500" />
                <span class="text-gray-500">出版社：</span>
                <span>{{ comicDetail.publisher || '-' }}</span>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 mt-4">
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-xs text-gray-500 mb-1">章节数</div>
                <div class="text-lg font-bold text-primary-600">
                  {{ comicDetail.chapterCount ?? '-' }}
                </div>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-xs text-gray-500 mb-1">热度</div>
                <div class="text-lg font-bold text-orange-500">
                  {{ comicDetail.popularity }}
                </div>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-xs text-gray-500 mb-1">辅助热度</div>
                <div class="text-lg font-bold text-blue-500">
                  {{ comicDetail.virtualPopularity ?? '-' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 状态与权限 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-5 bg-primary-500 rounded-sm" />
          <h3 class="text-lg font-medium text-gray-700">状态与权限</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 flex flex-col items-center"
          >
            <div class="text-gray-500 text-sm mb-2">作品状态</div>
            <el-tag
              :type="comicDetail.isFinished ? 'success' : 'warning'"
              size="large"
              effect="light"
              class="w-full flex items-center justify-center gap-1"
            >
              <i
                :class="
                  comicDetail.isFinished ? 'el-icon-check' : 'el-icon-loading'
                "
              />
              {{ comicDetail.isFinished ? '已完结' : '连载中' }}
            </el-tag>
          </div>

          <div
            class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 flex flex-col items-center"
          >
            <div class="text-gray-500 text-sm mb-2">发布状态</div>
            <el-tag
              :type="comicDetail.isPublish ? 'success' : 'info'"
              size="large"
              effect="light"
              class="w-full flex items-center justify-center gap-1"
            >
              <i
                :class="
                  comicDetail.isPublish
                    ? 'el-icon-upload-success'
                    : 'el-icon-edit'
                "
              />
              {{ comicDetail.isPublish ? '已发布' : '未发布' }}
            </el-tag>
          </div>

          <div
            class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 flex flex-col items-center"
          >
            <div class="text-gray-500 text-sm mb-2">查看规则</div>
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
              class="w-full flex items-center justify-center gap-1"
            >
              <i
                :class="{
                  'el-icon-unlock': comicDetail.viewRule === 0,
                  'el-icon-user': comicDetail.viewRule === 1,
                  'el-icon-medal': comicDetail.viewRule === 2,
                  'el-icon-shopping-cart-full': comicDetail.viewRule === 3,
                }"
              />
              {{
                ['公开', '登录', '会员', '购买'][comicDetail.viewRule] || '-'
              }}
            </el-tag>
            <span
              v-if="comicDetail.viewRule === 3 && comicDetail.purchaseAmount"
              class="mt-2 text-xs text-gray-500 flex items-center gap-1"
            >
              <i class="el-icon-coin text-yellow-500" />
              需消耗 {{ comicDetail.purchaseAmount }} 积分
            </span>
          </div>

          <div class="col-span-1 md:col-span-3 grid grid-cols-2 gap-4">
            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <i class="el-icon-download text-gray-400" />
                <span class="text-gray-500">允许下载</span>
              </div>
              <el-switch
                v-model="comicDetail.canDownload"
                disabled
                :active-value="true"
                :inactive-value="false"
                class="ml-4"
              />
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <i class="el-icon-chat-dot-round text-gray-400" />
                <span class="text-gray-500">允许评论</span>
              </div>
              <el-switch
                v-model="comicDetail.canComment"
                disabled
                :active-value="true"
                :inactive-value="false"
                class="ml-4"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 时间信息 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-5 bg-primary-500 rounded-sm" />
          <h3 class="text-lg font-medium text-gray-700">时间信息</h3>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div
            class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4"
          >
            <div class="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <i class="el-icon-date" />
              <span>作品发布日期</span>
            </div>
            <div class="mt-1 font-medium">{{ comicDetail.publishAt }}</div>
          </div>

          <div
            class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4"
          >
            <div class="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <i class="el-icon-refresh" />
              <span>最后更新时间</span>
            </div>
            <div class="mt-1 font-medium">
              {{ comicDetail.lastUpdated || '-' }}
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4"
          >
            <div class="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <i class="el-icon-plus" />
              <span>创建时间</span>
            </div>
            <div class="mt-1 font-medium">{{ comicDetail.createdAt }}</div>
          </div>

          <div
            class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4"
          >
            <div class="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <i class="el-icon-edit" />
              <span>更新时间</span>
            </div>
            <div class="mt-1 font-medium">{{ comicDetail.updatedAt }}</div>
          </div>
        </div>
      </div>

      <!-- 作品描述 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-5 bg-primary-500 rounded-sm" />
          <h3 class="text-lg font-medium text-gray-700">作品描述</h3>
        </div>

        <div
          class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 text-sm leading-relaxed whitespace-pre-line min-h-[100px]"
        >
          {{ comicDetail.description || '暂无描述' }}
        </div>
      </div>
    </div>
  </es-modal>
</template>
