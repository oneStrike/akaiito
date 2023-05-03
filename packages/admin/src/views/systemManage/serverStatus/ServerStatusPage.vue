<script lang="ts" setup>
import { getSystemInfo } from '@/api/common'
import dayjs from 'dayjs'
import type { AdminSystemInfoRes } from '~@/apiTypes/system'
const loading = ref(false)
const timer = ref()
const serverInfo = ref<AdminSystemInfoRes>()
const renderList = reactive([
  {
    title: '基本信息',
    className: 'mb_16',
    info: [
      {
        label: 'OS',
        field: 'platform'
      },
      {
        label: 'V8',
        field: 'v8'
      },
      {
        label: 'Node',
        field: 'node'
      },
      {
        label: '系统时间',
        field: 'serverTime'
      },
      {
        label: '运行时间',
        field: 'Uptime'
      }
    ]
  },
  {
    title: '内存信息',
    className: 'mb_16',
    flag: 'memory',
    info: [
      {
        label: '总大小',
        field: 'memoryTotal'
      },
      {
        label: '空闲大小',
        field: 'memoryFree'
      },
      {
        label: '以用大小',
        field: 'memoryUsed'
      }
    ]
  },
  {
    title: 'cpu信息',
    flag: 'cpu',
    info: [
      {
        label: 'cpu型号',
        field: 'cpu'
      }
    ]
  },
  {
    title: '磁盘信息',
    flag: 'disk',
    info: [
      {
        label: '标识符',
        field: 'diskPath'
      },
      {
        label: '总容量',
        field: 'diskTotal'
      },
      {
        label: '剩余容量',
        field: 'diskFree'
      },
      {
        label: '已使用容量',
        field: 'diskUsed'
      }
    ]
  }
])
loadData()

async function loadData() {
  loading.value = true
  serverInfo.value = await getSystemInfo()
  loading.value = false
}
timer.value = setInterval(() => loadData(), 1000 * 10)

/**
 * 转换时间
 * @param val
 * @param type
 */
function formatDate(val: number, type?: string) {
  if (type === 'serverTime') {
    return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
  }
  const days = Math.floor(val / 86400)
    .toString()
    .padStart(2, '0')
  const hours = Math.floor((val % 86400) / 3600)
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor(((val % 86400) % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor(((val % 86400) % 3600) % 60)
    .toString()
    .padStart(2, '0')
  return days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
}

/**
 * 格式化cpu展示频率
 */
function formatCpuSpeed() {
  if (serverInfo.value) {
    const cpuUsageArr = serverInfo.value.cpuUsage.split('/')
    return cpuUsageArr.map((item) => parseFloat(item))
  }
  return []
}

function formatValue(val: (typeof renderList)[number]['info'][number]) {
  const field = val.field as keyof typeof serverInfo.value
  if (serverInfo.value) {
    switch (val.field) {
      case 'serverTime':
        return formatDate(Number(serverInfo.value[field]), val.field)
      case 'Uptime':
        return formatDate(Number(serverInfo.value[field]), val.field)
    }
  }
  return field && serverInfo.value ? serverInfo.value[field] : ''
}

//内存使用进度条
const memoryProgress = computed(() => {
  if (serverInfo.value) {
    const { memoryUsed, memoryTotal } = serverInfo.value
    return parseFloat(
      ((parseFloat(memoryUsed) / parseFloat(memoryTotal)) * 100).toFixed(2)
    )
  }
  return 100
})

//磁盘使用进度条
const diskProgress = computed(() => {
  if (serverInfo.value) {
    const total = parseFloat(serverInfo.value.diskTotal)
    const used = serverInfo.value.diskUsed.includes('G')
      ? parseFloat(serverInfo.value.diskUsed)
      : parseFloat(serverInfo.value.diskUsed) / 1024
    if (serverInfo.value && total > 0 && used >= 0) {
      return parseFloat(((used / total) * 100).toFixed(2))
    }
    return 100
  }
})

onUnmounted(() => {
  clearInterval(timer.value)
})
</script>
<template>
  <n-spin size="large" :show="loading" class="h_100">
    <n-grid x-gap="12" :cols="2" :y-gap="12" v-if="serverInfo" class="h_100">
      <n-grid-item
        v-for="(item, index) in renderList"
        :key="index"
        class="h_100"
      >
        <n-card class="h_100">
          <template #header>{{ item.title }}</template>
          <n-space vertical :size="0">
            <template v-for="(child, idx) in item.info" :key="idx">
              <n-space :wrap="false" v-if="item.flag !== 'cpu'" :size="0">
                <n-h5 style="min-width: 100px">{{ child.label }}： </n-h5>
                <n-ellipsis line-clamp="1">{{ formatValue(child) }}</n-ellipsis>
              </n-space>

              <template v-if="item.flag === 'cpu'">
                <n-space :wrap="false" :size="0">
                  <n-h5 style="min-width: 100px">{{ child.label }}： </n-h5>
                  <n-ellipsis line-clamp="1">{{
                    formatValue(child)
                  }}</n-ellipsis>
                </n-space>
                <n-scrollbar>
                  <n-progress
                    v-for="(item, index) in formatCpuSpeed()"
                    :key="index"
                    :percentage="item"
                    type="line"
                  >
                    {{ item }}%
                  </n-progress>
                </n-scrollbar>
              </template>
              <template
                v-if="item.flag === 'memory' && idx + 1 === item.info.length"
              >
                <n-progress
                  class="dashboard"
                  style="right: 30px"
                  type="dashboard"
                  :percentage="memoryProgress"
                />
              </template>
              <template
                v-if="item.flag === 'disk' && idx + 1 === item.info.length"
              >
                <n-progress
                  class="dashboard"
                  style="right: 30px"
                  type="dashboard"
                  :percentage="diskProgress"
                />
              </template>
            </template>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-spin>
</template>

<style scoped lang="scss">
::v-deep(.n-spin-content) {
  height: 100%;
}

.dashboard {
  max-width: 100%;
  position: absolute !important;
  top: 50%;
  transform: translateY(-50%);
  right: 30px;
}
</style>
