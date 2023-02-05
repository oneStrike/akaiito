import kRequest from './index'
import config from '@/config'
import type {
  AdminAddPrivacyReq,
  AdminAddPrivacyRes,
  AdminDeletePrivacyStatusReq,
  AdminDeletePrivacyStatusRes,
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
  switchStatus: `${context}/switchPrivacyStatus`,
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
  return kRequest.get({
    url: api.getPrivacyDetail,
    data: params
  })
}

export function switchStatusApi(
  params: AdminSwitchPrivacyStatusReq
): Promise<AdminSwitchPrivacyStatusRes> {
  return kRequest.get({
    url: api.switchStatus,
    data: params
  })
}

export function deletePrivacyApi(
  params: AdminDeletePrivacyStatusReq
): Promise<AdminDeletePrivacyStatusRes> {
  return kRequest.get({
    url: api.deletePrivacy,
    data: params
  })
}
