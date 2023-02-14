<script lang="ts" setup></script>

<template>
  <div
    class="pd_12 border_radius_sm h_100 over_scroll_x over_scroll_y bg_primary"
  >
    <router-view v-slot="{ Component, route }">
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
        <component :is="Component" v-if="!route.meta.cache" :key="route.path" />
      </Transition>
    </router-view>
  </div>
</template>
