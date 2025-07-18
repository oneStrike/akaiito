<script setup lang="ts">
  import type { EsListProps } from '@/components/es-list/types'
  import type { IterateObject } from '@/types/global'

  defineOptions({
    name: 'EsList',
    options: {
      virtualHost: true,
    },
  })

  const props = withDefaults(defineProps<EsListProps>(), {
    autoLoad: true,
  })

  const params = defineModel('params', {
    default: () => ({}),
    type: Object,
  })

  const listData = defineModel('list', {
    type: Object,
    default: () => ({}),
  })

  const loading = ref(false)
  let skipParamsWatch = false

  const sendRequest = async (p?: IterateObject) => {
    loading.value = true
    skipParamsWatch = true
    if (p) {
      params.value = Object.assign(params.value, p)
    }
    if (typeof params.value.page !== 'number') {
      params.value.page = 0
    } else {
      params.value.page++
    }
    if (!params.value.pageSize) {
      params.value.pageSize = 15
    }

    const data = await props.api({
      ...params.value,
    })
    console.log(data)
    if (params.value.page === 0) {
      listData.value = {
        ...data.pagination,
        data: data.posts,
      }
    } else {
      listData.value = {
        ...data,
        data: listData.value?.data?.concat(data.posts),
      }
    }

    loading.value = false
    skipParamsWatch = false
  }

  onMounted(() => {
    if (props.autoLoad) {
      sendRequest()
    }
  })

  const refresh = async () => {
    listData.value = {}
    await sendRequest({
      page: -1,
      pageSize: params.value.pageSize || 15,
    })
  }
  watch(
    () => params,
    () => {
      if (!skipParamsWatch) {
        refresh()
      }
    },
    { deep: true },
  )

  const loadMoreStatus = computed(() => {
    if (listData.value?.data?.length >= listData.value?.total_posts) {
      return 'noMore'
    } else if (loading.value) {
      return 'loading'
    } else {
      return 'more'
    }
  })
  useRefresh(refresh)
  onReachBottom(() => {
    if (listData.value?.total_posts > listData.value?.data?.length) {
      sendRequest()
    }
  })

  defineExpose({
    refresh,
    listData,
    sendRequest,
  })
</script>

<template>
  <view>
    <slot />
    <es-empty v-if="(!listData?.data || !listData?.data.length) && !loading" />
    <uni-load-more v-else icon-type="snow" :status="loadMoreStatus" />
  </view>
</template>
