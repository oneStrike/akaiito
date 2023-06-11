<script setup lang="ts">
import { themeStore } from "@/stores";
import { ColorScheme } from "@/typings/store/theme";

export interface ViewProps {
	mode?: "default" | "page" | "box";
	radius?: "small" | "base" | "circle";
	type?: keyof ColorScheme;
	center?: boolean;
	relative?: boolean;
	flex?: boolean;
	between?: boolean;
	around?: boolean;
}

const useThemeStore = themeStore();

const props = withDefaults(defineProps<ViewProps>(), {
	mode: "default",
	type: "white",
	center: false,
	relative: true
});

const emits = defineEmits<{
	(event: "click"): void
}>();

const viewMode = computed(() => {
	switch (props.mode) {
		case "page":
			return "pd_16 m_h_full";
		case "box":
			return "pd_16";
	}
});


const viewClassNames = computed(() => {
	const classNames = [];
	if (props.center) classNames.push("flex_center");
	if (props.relative) classNames.push("pos_re");
	if (props.radius) classNames.push("border_radius_" + props.radius);
	if (props.flex) classNames.push("flex");
	if (props.between) classNames.push("main_between");
	if (props.around) classNames.push("main_around");
	return classNames;
});

const backgroundColor = computed(() => {
	return useThemeStore.getThemeStyle(props.type);

});
</script>

<template>
	<view :class="[viewMode, ...viewClassNames]" :style="backgroundColor" @click="emits('click')">
		<slot></slot>
	</view>
</template>
