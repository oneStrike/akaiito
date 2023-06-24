<script setup lang="ts">
import { themeStore } from "@/stores";

const alignKeys = ["left", "center", "right"] as const;
const sizeKeys = ["tiny", "small", "medium", "large", "huge", "utmost"] as const;
const typeKeys = ["default", "info", "minor", "primary", "success", "warning", "error"] as const;

export interface TextProps {
	text?: string;
	color?: string;
	type?: typeof typeKeys[number];
	align?: typeof alignKeys[number];
	size?: typeof sizeKeys[number];
	strong?: boolean;
	center?: boolean;
	icon?: string;
}

const useThemeStore = themeStore();

const props = withDefaults(defineProps<TextProps>(), {
	text: "",
	size: "medium",
	type: "default",
	align: "left",
	strong: false
});

const emits = defineEmits<{
	(event: "click"): void
}>();

const sizeValue = ref<number>();
const colorValue = ref("");

const textStyle = computed(() => {
	sizeValue.value = useThemeStore.sizeScheme[props.size];
	const colorValues = Object.assign(useThemeStore.fontColorScheme, useThemeStore.colorScheme);
	colorValue.value = props.color || colorValues[props.type];
	return {
		fontSize: `${sizeValue.value}px`,
		color: colorValue.value,
		display: "inline-block"
	};
});

const textClass = computed(() => {
	const classNames = [];
	switch (props.align) {
		case "left":
			classNames.push("tl");
			break;
		case "center":
			classNames.push("tc w_100");
			break;
		case "right":
			classNames.push("tr");
			break;
	}
	if (props.strong) classNames.push("font_weight_bold");
	return classNames;
});

</script>

<template>
	<text :class="textClass" :style="textStyle" v-if="!icon">
		{{ text }}
	</text>
	<uni-icons v-else :size="sizeValue" :type="icon" :color="colorValue"></uni-icons>
</template>

<style scoped lang="scss"></style>
