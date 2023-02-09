import kRequest from './index'
import config from '@/config'
import type {
  AdminAddPrivacyReq,
  AdminAddPrivacyRes,
  AdminDeletePrivacyReq,
  AdminDeletePrivacyRes,
  AdminGetPrivacyDetailReq,
  AdminGetPrivacyDetailRes,
  AdminGetPrivacyPageReq,
  AdminGetPrivacyPageRes,
  AdminSwitchPrivacyStatusReq,
  AdminSwitchPrivacyStatusRes
} from '~@/apiTypes/privacy'

const context = config.REQUEST_PREFIX + '/privacy'

const api = {
  getPrivacyPage: `${context}/getPrivacyPage`,
  getPrivacyDetail: `${context}/getPrivacyDetail`,
  addPrivacy: `${context}/addPrivacy`,
  switchPrivacyStatus: `${context}/switchPrivacyStatus`,
  deletePrivacy: `${context}/deletePrivacy`
}

export function getPrivacyPageApi(
  params: AdminGetPrivacyPageReq
): Promise<AdminGetPrivacyPageRes> {
  return kRequest.get({
    url: api.getPrivacyPage,
    params
  })
}

export function getPrivacyDetailApi(
  params: AdminGetPrivacyDetailReq
): Promise<AdminGetPrivacyDetailRes> {
  return kRequest.get({
    url: api.getPrivacyDetail,
    params
  })
}

export function addPrivacyApi(
  params: AdminAddPrivacyReq
): Promise<AdminAddPrivacyRes> {
  return kRequest.post({
    url: api.addPrivacy,
    data: params
  })
}

export function switchPrivacyStatusApi(
  params: AdminSwitchPrivacyStatusReq
): Promise<AdminSwitchPrivacyStatusRes> {
  return kRequest.post({
    url: api.switchPrivacyStatus,
    data: params
  })
}

export function deletePrivacyApi(
  params: AdminDeletePrivacyReq
): Promise<AdminDeletePrivacyRes> {
  return kRequest.post({
    url: api.deletePrivacy,
    data: params
  })
}
