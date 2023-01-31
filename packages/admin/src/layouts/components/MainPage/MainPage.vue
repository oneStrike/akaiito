<script lang="ts" setup>
import useTabs from '@/hooks/useTabs'
const isActive = computed(() => useTabs.isRouterAlive.value)
</script>

<template>
  <el-main
    v-if="isActive"
    id="basic_main"
    class="bg_box mg_12 border_radius_base"
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
  </el-main>
</template>

<style scoped lang="scss">
.fade-leave-to {
  display: none;
}
</style>
