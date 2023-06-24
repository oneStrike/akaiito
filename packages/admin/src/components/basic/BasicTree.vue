<script setup lang="ts">
import type { TreeProps } from "naive-ui";
import { utils } from "@/utils/index";

export interface BasicTreeProps {
	accordion?: TreeProps["accordion"];
	treeData: TreeProps["data"];
	defaultSelectedKeys?: TreeProps["defaultSelectedKeys"];
	keyField?: string;
	labelField?: string;
	search?: boolean;
	searchPlaceholder?: string;
	searchValue?: string;
	showIrrelevantNodes?: boolean;
	renderSuffix?: TreeProps["renderSuffix"];
	fillAll?: boolean;//填充 全部  选项
}

const props = withDefaults(defineProps<BasicTreeProps>(), {
	accordion: false,
	keyField: "value",
	labelField: "label",
	defaultSelectedKeys: () => [],
	search: true,
	searchValue: "",
	searchPlaceholder: "请输入搜索内容",
	showIrrelevantNodes: false
});

const emits = defineEmits<{
	(event: "update:searchValue", data: string | number): void
	(event: "selectChange", data: (string | number)[]): void
}>();

const innerTreeData = computed(() => {
	if (props.fillAll && props.treeData) {
		const closedValue = utils._.clone(props.treeData);
		closedValue.unshift({
			[props.labelField]: "全部",
			[props.keyField]: "all",
			fillAll: true
		});
		return closedValue;
	}
	return props.treeData;
});

const searchValue = ref("");

watch(
	() => props.searchValue,
	(value) => {
		searchValue.value = value;
	},
	{ immediate: true }
);

watch(searchValue, (value) => {
	emits("update:searchValue", value);
});

//选中项调整
const selectedChange = (val: (string | number)[]) => {
	emits("selectChange", val);
};

</script>

<template>
	<div>
		<div class="w_100 main_between cross_center" v-if="search">
			<n-input
				v-model:value="searchValue"
				:placeholder="searchPlaceholder"
				size="small"
			/>
			<div class="ml_16 flex_center">
				<slot name="search-after"></slot>
			</div>
		</div>
		<n-tree
			class="mt_16"
			block-line
			:pattern="searchValue"
			:data="innerTreeData"
			:default-selected-keys="defaultSelectedKeys!"
			:key-field="keyField"
			:label-field="labelField"
			:show-irrelevant-nodes="showIrrelevantNodes"
			selectable
			:render-suffix="renderSuffix"
			@update:selected-keys="selectedChange"
		/>
	</div>
</template>

<style scoped lang="scss"></style>
