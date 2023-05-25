<script setup lang="ts">
import { darkTheme, lightTheme, zhCN, dateZhCN } from "naive-ui";
import { layoutStore } from "@/stores";

const useLayoutStore = layoutStore();

const theme = computed(() => {
	return useLayoutStore.theme === "light" ? lightTheme : darkTheme;
});
</script>

<template>
	<n-config-provider
		:locale="zhCN"
		:date-locale="dateZhCN"
		:theme="theme"
		inline-theme-dissabled
	>
		<n-watermark
			content="大家艰苦一下，一切都会有的"
			cross
			fullscreen
			:font-size="16"
			:line-height="16"
			:width="384"
			:height="384"
			:x-offset="12"
			:y-offset="60"
			:rotate="-15"
		/>
		<router-view></router-view>
	</n-config-provider>
</template>
 