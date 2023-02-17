<script lang="ts" setup></script>

<template>
  <div
    id="main_page"
    class="pd_16 border_radius_sm h_100 over_scroll_x over_scroll_y bg_primary"
  >
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <Transition mode="out-in" name="scale">
          <component
            :is="Component"
            v-if="route.meta?.cache"
            :key="route.path"
          />
        </Transition>
      </keep-alive>
      <Transition mode="out-in" name="scale">
        <component :is="Component" v-if="!route.meta.cache" :key="route.path" />
      </Transition>
    </router-view>
  </div>
</template>
