import kRequest from './index'
import type {
  AdminAddPrivacyReq,
  AdminAddPrivacyRes,
  AdminGetPrivacyDetailReq,
  AdminGetPrivacyDetailRes,
  AdminGetPrivacyPageReq,
  AdminGetPrivacyPageRes,
  AdminSwitchPrivacyStatusReq,
  AdminSwitchPrivacyStatusRes,
  AdminDeletePrivacyReq,
  AdminDeletePrivacyRes
} from '~@/apiTypes/privacy'

const context = '/privacy'

const api = {
  getPrivacyPage: `${context}/getPrivacyPage`,
  getPrivacyDetail: `${context}/getPrivacyDetail`,
  addPrivacy: `${context}/addPrivacy`,
  switchPrivacyStatus: `${context}/switchPrivacyStatus`,
  deletePrivacy: `${context}/deletePrivacy`
}

export const getPrivacyPageApi = (
  params: AdminGetPrivacyPageReq
): Promise<AdminGetPrivacyPageRes> => {
  return kRequest.get({
    url: api.getPrivacyPage,
    params
  })
}

export const getPrivacyDetailApi = (
  params: AdminGetPrivacyDetailReq
): Promise<AdminGetPrivacyDetailRes> => {
  return kRequest.get({
    url: api.getPrivacyDetail,
    params
  })
}

export const addPrivacyApi = (
  params: AdminAddPrivacyReq
): Promise<AdminAddPrivacyRes> => {
  return kRequest.post({
    url: api.addPrivacy,
    data: params
  })
}

export const deletePrivacyApi = (
  params: AdminDeletePrivacyReq
): Promise<AdminDeletePrivacyRes> => {
  return kRequest.post({
    url: api.deletePrivacy,
    data: params
  })
}

export const switchPrivacyStatusApi = (
  params: AdminSwitchPrivacyStatusReq
): Promise<AdminSwitchPrivacyStatusRes> => {
  return kRequest.post({
    url: api.switchPrivacyStatus,
    data: params
  })
}
