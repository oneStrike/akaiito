<script setup lang="ts">
import { themeStore } from "@/stores";

export interface TextProps {
	text?: string;
	type?:
		| "default"
		| "info"
		| "minor"
		| "primary"
		| "success"
		| "warning"
		| "error";
	align?: "left" | "center" | "right";
	size?: "small" | "medium" | "large" | "huge" | "utmost";
	strong?: boolean;
	italic?: boolean;
	underline?: boolean;
	delete?: boolean;
	code?: boolean;
	center?: boolean;
}

const useThemeStore = themeStore();

const props = withDefaults(defineProps<TextProps>(), {
	text: "",
	size: "medium",
	type: "default",
	align: "left",
	strong: false,
	italic: false,
	underline: false,
	delete: false,
	code: false
});

const emits = defineEmits<{
	(event: "click"): void
}>();

const fontSize = computed(() => {
	switch (props.size) {
		case "small":
			return "fs12";
		case "medium":
			return "fs14";
		case "large":
			return "fs18";
		case "huge":
			return "fs20";
		case "utmost":
			return "fs24";
	}
});

const fontColor = computed(() => {
	let color = "";
	switch (props.type) {
		case "default":
			color = useThemeStore.fontColorScheme.color1;
			break;
		case "info":
			color = useThemeStore.fontColorScheme.color2;
			break;
		case "minor":
			color = useThemeStore.fontColorScheme.color3;
			break;
		default:
			color = useThemeStore.colorScheme[props.type];
	}
	return { color };
});

const fontAlign = computed(() => {
	switch (props.align) {
		case "left":
			return "tl";
		case "center":
			return "tc";
		case "right":
			return "tr";
	}
});

const textClassName = computed(() => {
	const classNames = [];
	if (props.strong) classNames.push("font_weight_bold");
	if (props.italic) classNames.push("font_italic");
	if (props.underline) classNames.push("font_underline");
	if (props.delete) classNames.push("font_delete");
	return classNames;
});

const platformClassName = ref("");
// #ifdef MP
platformClassName.value = "h_100";
// #endif
</script>

<template>
	<view :class="[platformClassName, fontAlign, center ? 'flex_center' : '']" @click="emits('click')">
		<text :class="[fontColor, fontSize, ...textClassName]" :style="fontColor">
			{{ text }}
		</text>
	</view>
</template>

<style scoped lang="scss"></style>
