<script setup lang="ts">
import {
  basicOptions,
  basicDividerOptions
} from '@/views/App/Devise/PageDiy/attr/shared'
import { useDiyStore } from '@/stores'
import { findFormItem } from '@/utils'
const formOptions = basicOptions()
const dividerOptions = basicDividerOptions()
const diyStore = useDiyStore()

const { currentModule } = storeToRefs(diyStore)

const backgroundColor = findFormItem(formOptions, 'backgroundColor')
const backgroundImage = findFormItem(formOptions, 'backgroundImage')
const aroundRadius = findFormItem(formOptions, 'aroundRadius')
const topRadius = findFormItem(formOptions, 'topRadius')
const bottomRadius = findFormItem(formOptions, 'bottomRadius')
watch(
  currentModule,
  (val) => {
    if (val) {
      const { backgroundType, borderRadius } = val.commonAttr
      backgroundColor.hide = backgroundType === 'image'
      backgroundImage.hide = backgroundType === 'color'
      topRadius.hide = borderRadius !== 'top'
      aroundRadius.hide = borderRadius !== 'around'
      bottomRadius.hide = borderRadius !== 'bottom'
    }
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <basic-form
    v-if="currentModule"
    v-model="currentModule.commonAttr"
    :label-width="120"
    :show-btn="false"
    :options="formOptions"
  >
    <div class="pl_16" v-if="currentModule.commonAttr.divider">
      <basic-form
        v-model="currentModule.divider"
        :options="dividerOptions"
        :show-btn="false"
        :label-width="120"
        :label-size="14"
      ></basic-form>
    </div>
  </basic-form>
</template>
