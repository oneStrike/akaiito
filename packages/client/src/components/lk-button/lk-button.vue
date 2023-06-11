<script setup lang="ts">
import { themeStore } from "@/stores";

export interface ButtonProps {
	type?: "primary" | "success" | "error" | "warning" | "link";
	size?: "small" | "medium" | "large";
	text?: string;
	color?: string;
	light?: boolean,
}

const useThemeStore = themeStore();

const props = withDefaults(defineProps<ButtonProps>(), {
	type: "primary",
	size: "medium",
	text: "",
	light: false
});

const emits = defineEmits<{
	(event: "click"): void
}>();

const btnClassName = computed(() => {
	const { type, size } = props;
	let fontSizeClassName = "";
	switch (size) {
		case "large":
			fontSizeClassName = "fs16";
			break;
		case "medium":
			fontSizeClassName = "fs14";
			break;
		case "small":
			fontSizeClassName = "fs12";
	}
	return {
		btn: [size + "_btn"],
		text: [fontSizeClassName]
	};
});

const backgroundStyle = computed(() => {
	const type = props.type === "link" ? "transparent" : props.type;
	return useThemeStore.getThemeStyle(type);
});

</script>

<template>
	<button class="clear_btn bd_radius_small" @click="emits('click')">
		<view :class="btnClassName.btn.concat(['flex_center', 'bd_radius_small'])" :style="backgroundStyle">
			<text :class="btnClassName.text" :style="{color}">
				{{ text }}
			</text>
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

.link_bg {
	background-color: transparent;
}
</style>