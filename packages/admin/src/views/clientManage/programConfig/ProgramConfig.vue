<script setup lang="ts">
import type { BasicFormOptions } from "@/typings/components/basic/basicForm";
import BasicForm from "@/components/basic/BasicForm.vue";
import type {
	AdminGetClientConfigRes,
	AdminUpdateClientConfigReq
} from "~@/apiTypes/clientManage";
import {
	exportClientPackage,
	getClientConfigApi,
	updateClientConfigApi
} from "@/api/client";
import { utils } from "@/utils/index";

const formData = ref<AdminGetClientConfigRes>();

const getConfigure = async () => {
	formData.value = await getClientConfigApi();
};
getConfigure();

//导出代码包
const exportCodePackage = async (val: AdminUpdateClientConfigReq) => {
	await updateClientConfigApi(val);
	const { blob, fileName } = await exportClientPackage();
	utils.downloadBlob(blob, fileName);
};

const reset = (val) => {
	console.log(val);
};

const formOptions: BasicFormOptions[] = [
	{
		sectionTitle: "隐私协议",
		sectionTips: "APP初次启动时会弹窗提示用户，若用户拒绝，则会主动退出APP，请认真填写",
		component: "Input",
		bind: {
			path: `privacyTitle`,
			label: "标题",
			rule: useValidate.required({ message: "标题" })
		},
		componentProps: {
			bind: {
				placeholder: "请输入协议弹窗标题"
			}
		}
	},
	{
		component: "Editor",
		bind: {
			path: "privacyMessage",
			label: "内容",
			rule: useValidate.required({ message: "内容" })
		},
		componentProps: {
			bind: {
				placeholder: "请输入协议内容"
			}
		}
	},
	{
		component: "Input",
		bind: {
			path: "privacySecondTitle",
			label: "二次标题",
			rule: useValidate.required({ message: "二次标题" })
		},
		componentProps: {
			bind: {
				placeholder: "请输入协议弹窗二次标题"
			}
		}
	},
	{
		component: "Editor",
		bind: {
			path: "privacySecondMessage",
			label: "二次内容",
			rule: useValidate.required({ message: "二次内容" })
		},
		componentProps: {
			bind: {
				placeholder: "请输入协议二次内容"
			}
		}
	}
];
</script>

<template>
	<n-card class="main_block">
		<basic-form
			v-model:model-value="formData"
			:options="formOptions"
			submit-text="导出代码包"
			reset-text="更新配置"
			:blank-reset="true"
			@submit="exportCodePackage"
			@reset="reset"
		></basic-form>
	</n-card>
</template>

<style scoped lang="scss"></style>
