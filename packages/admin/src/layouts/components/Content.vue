<script setup lang="ts"></script>

<template>
  <div class="w_100 h_100 main_content pd_16" id="main_content">
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
<style>
.main_content {
  background: var(--color-fill-2);
  position: relative;
}
</style>
