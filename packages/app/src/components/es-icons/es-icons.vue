<script setup lang="ts">
  import type { UniIconsProps } from '@uni-helper/uni-types'
  import type { EsIconProps } from '@/components/es-icons/types'
  import { useConfig } from '@/components/libs/hooks/useConfig'
  import icons from './es-icons.json'

  defineOptions({
    name: 'EsIcons',
    options: {},
  })

  const props = withDefaults(defineProps<EsIconProps>(), {
    size: 40,
    type: 'svg',
    color: 'base',
  })

  const emits = defineEmits<{
    (event: 'click'): void
  }>()

  const iconStyle = computed(() => {
    if (props.type === 'uni') {
      return ``
    }
    const iconSize = useConfig.getSize(props.size)
    const width = props.width || iconSize
    const height = props.height || iconSize
    const color = useConfig.getColor(props.color)
    return `
  width:  ${useConfig.addUnit(width)};
  height: ${useConfig.addUnit(height)};
  color:  ${String(color)};
  --un-icon: ${icons[props.name as keyof typeof icons]?.data}`
  })
</script>

<template>
  <view
    v-if="type === 'svg'"
    :class="colored ? 'icon-colour' : 'icon'"
    :style="iconStyle"
    :name="name"
    @click="emits('click')"
  />
  <uni-icons
    v-else
    :type="name as UniIconsProps['type']"
    :size="useConfig.getSize(size)"
    :color="useConfig.getColor(color)"
    @click="emits('click')"
  />
</template>

<style lang="scss" scoped>
  .icon {
    mask: var(--un-icon) no-repeat;
    mask-size: 100% 100%;
    -webkit-mask: var(--un-icon) no-repeat;
    -webkit-mask-size: 100% 100%;
    background-color: currentColor;
    display: inline-block;
    vertical-align: bottom;
  }

  .icon-colour {
    background: var(--un-icon) no-repeat;
    background-size: 100% 100%;
    background-color: transparent;
    vertical-align: bottom;
  }
</style>
