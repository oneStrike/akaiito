import { ajax } from "@/api";
import config from "@/config";
import { ClientGetSocialCirclePageReq, ClientGetSocialCirclePageRes } from "~@/apiTypes/socialCirlce";


const api = {
	getSocialCirclePage: config.REQUEST_PREFIX + "/socialCircle/getSocialCirclePage"
};


export const getSocialCirclePageApi = (params: ClientGetSocialCirclePageReq): Promise<ClientGetSocialCirclePageRes> => {
	return ajax.get({
		url: api.getSocialCirclePage,
		data: params
	});
};