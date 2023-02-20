<script lang="ts" setup>
import { getSystemInfo } from '@/api/common'
import dayjs from 'dayjs'
import type { AdminSystemInfoRes } from '~@/apiTypes/system'
const loading = ref(false)

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

async function loadData() {
  loading.value = true
  serverInfo.value = await getSystemInfo()
  loading.value = false
}

const { pause } = useIntervalFn(loadData, 1000 * 30, {
  immediateCallback: true
})

onUnmounted(pause)

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
    return cpuUsageArr.map((item) => parseInt(item) / 100)
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
      (parseFloat(memoryUsed) / parseFloat(memoryTotal)).toFixed(2)
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
    return parseFloat((parseFloat(diskUsed) / parseFloat(diskTotal)).toFixed(2))
  }
  return 100
})
</script>
<template>
  <div class="w_100 h_100 pd_8 box">
    <a-row class="w_100">
      <a-col :span="12" v-for="(item, index) in renderList" :key="index">
        <a-card
          :class="item.className"
          class="card_item pos_re box_shadow mg_8 border-radius_base"
          :loading="loading"
          :bordered="false"
        >
          <template #title>
            <div>{{ item.title }}</div>
          </template>
          <a-descriptions :column="1" size="large">
            <a-descriptions-item v-for="(child, i) in item.info" :key="i">
              <template #label>
                <a-typography-paragraph>
                  {{ child.label }}
                </a-typography-paragraph>
              </template>
              <a-typography-paragraph
                :ellipsis="{
                  rows: 1,
                  showTooltip: true
                }"
              >
                {{ formatValue(child) }}
              </a-typography-paragraph>
            </a-descriptions-item>
          </a-descriptions>
          <template v-if="item.flag === 'cpu'">
            <div class="cpu_speed flex1">
              <a-space direction="vertical" fill class="pr_8">
                <a-progress
                  class="pt_12 pb_12"
                  size="large"
                  v-for="(item, index) in formatCpuSpeed()"
                  :key="index"
                  :percent="item"
                />
              </a-space>
            </div>
          </template>
          <template v-if="item.flag === 'memory'">
            <a-progress
              class="pos_center_y"
              style="right: 30px"
              type="dashboard"
              size="large"
              :percent="memoryProgress"
            />
          </template>
          <template v-if="item.flag === 'disk'">
            <a-progress
              class="pos_center_y"
              style="right: 30px"
              type="dashboard"
              size="large"
              :percent="diskProgress"
            />
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="less" scoped>
:deep(.arco-typography) {
  margin-bottom: 0;
}

.box {
  position: absolute;
  top: 0;
  left: 0;

  .card_item {
    height: 288px;
    .cpu_speed {
      height: 160px;
      overflow-y: scroll;
    }
  }
}
</style>
