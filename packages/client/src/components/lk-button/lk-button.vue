<script setup lang="ts">

export interface ButtonProps {
	type?: "primary" | "success" | "error" | "warning" | "link";
	size?: "small" | "medium" | "large";
	text?: string;
	color?: string;
	light?: boolean,
}

const props = withDefaults(defineProps<ButtonProps>(), {
	type: "primary",
	size: "medium",
	text: "",
	light: false
});


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
		btn: [type + "_bg", size + "_btn"],
		text: [props.type !== "link" ? "fc_white" : "", fontSizeClassName]
	};

});


</script>

<template>
	<button class="clear_btn bd_radius_small">
		<view :class="btnClassName.btn.concat(['flex_center', 'bd_radius_small'])">
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


.primary_bg {
	background-color: $primaryColor;
}

.success_bg {
	background-color: $successColor;
}

.warning_bg {
	background-color: $warningColor;
}

.error_bg {
	background-color: $errorColor;
}

.link_bg {
	background-color: transparent;
}
</style>