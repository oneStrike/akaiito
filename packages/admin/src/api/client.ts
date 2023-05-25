import kRequest from "@/api/index";
import type {
	AdminGetClientConfigRes,
	AdminGetClientPageRes,
	AdminUpdateClientConfigReq,
	AdminUpdateClientConfigRes
} from "~@/apiTypes/clientManage";

const context = "/clientManage";

const api = {
	getClientPage: `${context}/getClientPage`, //获取客户端页面信息列表
	updateClientConfig: `${context}/updateClientConfig`, //更新客户端配置信息
	getClientConfig: `${context}/getClientConfig`, //获取客户端配置信息
	exportClientPackage: `${context}/exportClientPackage` //导出客户端代码包
};

export function clientPageApi(): Promise<AdminGetClientPageRes> {
	return kRequest.get({
		url: api.getClientPage
	});
}

export function updateClientConfigApi(
	params: AdminUpdateClientConfigReq
): Promise<AdminUpdateClientConfigRes> {
	return kRequest.post({
		url: api.updateClientConfig,
		data: params
	});
}

export function getClientConfigApi(): Promise<AdminGetClientConfigRes> {
	return kRequest.get({
		url: api.getClientConfig
	});
}

export function exportClientPackage(): Promise<{
	blob: Blob,
	fileName: string
}> {
	return kRequest.get({
		url: api.exportClientPackage,
		responseType: "blob"
	});
}
