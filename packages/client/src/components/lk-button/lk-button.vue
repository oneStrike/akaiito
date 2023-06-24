<script setup lang="ts">
import { themeStore } from "@/stores";

const typeKeys = ["primary", "success", "warning", "error"] as const;
const sizeKeys = ["small", "medium", "large"] as const;

export interface ButtonProps {
	type?: typeof typeKeys[number];
	size?: typeof sizeKeys[number];
	text?: string;
	color?: string;
	light?: boolean,
}

const useThemeStore = themeStore();

const props = withDefaults(defineProps<ButtonProps>(), {
	type: "primary",
	size: "medium",
	text: "",
	light: false,
	color: "#ffffff"
});

const emits = defineEmits<{
	(event: "click"): void
}>();


const backgroundStyle = computed(() => {
	return useThemeStore.getThemeStyle(props.type);
});

</script>

<template>
	<button class="clear_btn bd_radius_small" @click="emits('click')">
		<view :class="['flex_center', 'bd_radius_small',size + '_btn']" :style="backgroundStyle">
			<lk-text :text="text" :size="size" :color="color" />
		</view>
	</button>

</template>

<style scoped lang="scss">
/* #ifndef APP-PLUS-NVUE*/
text {
	display: block;
}

/* #endif*/

.small_btn {
	padding: 4px 8px !important;
}

.medium_btn {
	padding: 8px 24px !important;
}

.large_btn {
	padding: 12px 32px !important;
}

</style>