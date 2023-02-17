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
  if (
    serverInfo.value &&
    parseFloat(serverInfo.value.diskTotal) > 0 &&
    parseFloat(serverInfo.value.diskUsed) >= 0
  ) {
    const { diskTotal, diskUsed } = serverInfo.value
    return parseFloat(
      ((parseFloat(diskUsed) / parseFloat(diskTotal)) * 100).toFixed(2)
    )
  }
  return 100
})

onUnmounted(() => {
  clearInterval(timer.value)
})
</script>
<template>
  <base-loading :loading="loading">
    <a-row :gutter="[16, 16]" v-if="serverInfo">
      <a-col :span="12" v-for="(item, index) in renderList" :key="index">
        <a-card :class="item.className" class="card_item pos_re">
          <template #header>
            <div>{{ item.title }}</div>
          </template>
          <a-row
            class="pt_12 pb_12"
            :gutter="[10, 10]"
            v-for="(child, i) in item.info"
            :key="i"
          >
            <a-col :span="8">{{ child.label }}:</a-col>
            <a-col class="text_cut" :span="16">
              <a-tooltip
                class="w_100"
                v-if="child.field === 'cpu'"
                effect="dark"
                placement="top"
                :title="formatValue(child)"
              >
                <div class="w_100 text_cut">{{ formatValue(child) }}</div>
              </a-tooltip>
              <template v-else>
                {{ formatValue(child) }}
              </template>
            </a-col>
          </a-row>
          <template v-if="item.flag === 'cpu'">
            <div class="cpu_speed flex1">
              <div
                style="margin-bottom: 3px"
                v-for="(item, index) in formatCpuSpeed()"
                :key="index"
              >
                <a-progress
                  :strokeWidth="12"
                  :percent="Number(item.toFixed(0))"
                />
              </div>
            </div>
          </template>
          <template v-if="item.flag === 'memory'">
            <a-progress
              class="pos_center_y"
              style="right: 30px"
              type="dashboard"
              :percent="memoryProgress"
            />
          </template>
          <template v-if="item.flag === 'disk'">
            <a-progress
              class="pos_center_y"
              style="right: 30px"
              type="dashboard"
              :percent="diskProgress"
            />
          </template>
        </a-card>
      </a-col>
    </a-row>
  </base-loading>
</template>

<style scoped lang="scss">
.card_item {
  height: 280px;
}
</style>
