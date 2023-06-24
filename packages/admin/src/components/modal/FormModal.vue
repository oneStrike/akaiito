<script setup lang="ts">
import type {
	BasicFormInst,
	BasicFormOptions
} from "@/typings/components/basic/basicForm";

interface FormModalProps {
	show: boolean;
	loading?: boolean;
	width?: number;
	height?: number;
	title?: string;
	modelValue?: Record<string | symbol, any> | null;
	options: BasicFormOptions[];
}

const props = withDefaults(defineProps<FormModalProps>(), {
	show: false,
	loading: false,
	width: 980,
	height: 80
});

const emits = defineEmits<{
	(event: "update:show"): void
	(event: "update:loading"): void
	(event: "update:modelValue"): void
	(event: "close"): void
	(event: "confirm", values: any): void
}>();

const show = useVModel(props, "show", emits);
const loading = useVModel(props, "loading", emits);
const formData = useVModel(props, "modelValue", emits);

const basicFormRef = ref<BasicFormInst>();
const confirm = async () => {
	console.log(formData.value);
	const validateRes = await basicFormRef.value?.validate();
	if (!validateRes || validateRes.errors) return;
	emits("confirm", validateRes.values);
};

const closeModal = () => {
	show.value = false;
};

watch(show, (value) => !value && emits("close"), {
	immediate: true,
	deep: true
});
</script>

<template>
	<shared-modal
		v-model:show="show"
		:title="title"
		:loading="loading"
		:width="width"
		:height="height"
		:trap-focus="false"
		@close="closeModal"
		@confirm="confirm"
	>
		<basic-form
			ref="basicFormRef"
			:options="options"
			v-model="formData"
			:show-btn="false"
			@submit="confirm"
		/>
	</shared-modal>
</template>
