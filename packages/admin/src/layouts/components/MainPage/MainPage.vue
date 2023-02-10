<script lang="ts" setup>
import useTabs from '@/hooks/useTabs'
const isActive = computed(() => useTabs.isRouterAlive.value)
</script>

<template>
  <a-layout-content
    v-if="isActive"
    id="basic_main"
    class="bg_box mg_12 border_radius_base box_shadow"
  >
    <router-view v-slot="{ Component, route }">
      <empty-block>
        <keep-alive>
          <Transition mode="out-in" name="el-fade-in-linear">
            <component
              :is="Component"
              v-if="route.meta?.cache"
              :key="route.path"
            />
          </Transition>
        </keep-alive>
        <Transition mode="out-in" name="el-fade-in-linear">
          <component
            :is="Component"
            v-if="!route.meta.cache"
            :key="route.path"
          />
        </Transition>
      </empty-block>
    </router-view>
  </a-layout-content>
</template>

<style scoped lang="scss">
.fade-leave-to {
  display: none;
}
</style>
