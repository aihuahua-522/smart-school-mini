import { extensionDomain, logisticsDomain } from "./domain"
import { get, post } from "./request"

import { showError, showSuccess } from '../utils/MessageUtil'
import { ossObject } from "./ossApi";

const systemName = 'extension-activity'
/**
 * 请求活动列=
 * @param {*} success
 * @param {*} fail
 */
export const requestActivityList = (param, success, fail) => {
  return post(`${extensionDomain}/activity/mini/list`, param, success, fail)
}


/**
 * 获取活动详情
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const requestActivityDetail = (id, success, fail) => {
  return get(`${extensionDomain}/activity/mini/${id}`, {}, success, fail)
}


/**
 * 切换收藏状态
 * @param {*} id  活动id
 * @param {*} favorite 收藏状态
 * @param {*} success
 * @param {*} fail
 */
export const requestSwitchFavorite = (id, favorite, success, fail) => {
  return post(`${extensionDomain}/favorite/addFavorite/${id}/${favorite}`, {}, success, fail)
}

/**
 *  根据活动id 获取所有成员信息
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
export const requestMemberList = (param, success, fail) => {
  return post(`${extensionDomain}/activity/mini/getActivityMemberList`, param, success, fail)
}


/**
 * 活动id
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const requestImgList = (id, success, fail) => {
  return get(`${extensionDomain}/live/${id}`, {}, success, false)
}


/**
 * 获取评论列表
 * @param {*} id
 * @param {*} pageSize
 * @param {*} offset
 * @param {*} success
 * @param {*} fail
 */
export const requestCommentList = (id, offset, pageSize, type = undefined, success, fail) => {
  return post(`${extensionDomain}/comment/list/${id}`, { pageSize, offset, scoreFlag: type }, success, fail)
}

/**
 * 获取活动的分数
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const requestScore = (id, success, fail) => {
  return get(`${extensionDomain}/comment/score/${id}`, {}, success, fail)
}

/**
 * 获取评论数据预览
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const requestCommentPreview = (id, success, fail) => {
  return get(`${extensionDomain}/comment/commentPreview/${id}`, {}, success, fail)
}


/**
 * 请求检测gps
 * @param {*} id
 * @param {*} latitude
 * @param {*} longitude
 * @param {*} success
 * @param {*} fail
 */
export const requestCheckGps = (id, latitude, longitude, success, fail) => {
  return post(`${extensionDomain}/sign/checkGps/${id}`, { latitude, longitude }, success, fail)
}

/**
 * 评论新增
 * @param {*} id
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
export const requestAddComment = (id, param, success, fail) => {
  return post(`${extensionDomain}/comment/${id}`, param, success, fail)
}


/**
 * 获取活动进度条
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const requestActivityStep = (id, success, fail) => {
  return get(`${extensionDomain}/activity/mini/getStep/${id}`, {}, success, fail)
}


/**
 * 获取活动最新的一条通知
 */
export const requestNewActivityNotice = (id, success, fail) => {
  return get(`${extensionDomain}/notice/getNewNotice/${id}`, {}, success, fail);
}


/**
 *  请求获取公告详情
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const requestNoticeDetail = (id, success, fail) => {
  return get(`${extensionDomain}/notice/${id}`, {}, success, fail)
}

/**
 * 后去活动通知列表
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const requestActivityNoticeList = (id, success, fail) => {
  return get(`${extensionDomain}/notice/getNoticeByActivityId/${id}`, {}, success, fail)
}


/**
 * 请求活动报名
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const requestApply = (id, success, fail) => {
  return post(`${extensionDomain}/apply/${id}`, {}, success, fail)
}

/**
 * 获取代码
 * @param {*} success
 * @param {*} fail
 */
export const requestQrCode = (success, fail) => {
  return get(`${extensionDomain}/sign/getQrCode`, {}, success, fail)
}


/**
 * 请求社团
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
export const requestTeamPage = (status, offset, keyword, success, fail) => {
  return post(`${extensionDomain}/team/getTeamPage`, { keyword, status, offset, pageSize: 10 }, success, fail)
}


/**
 * 获取社团详情
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const requestTeamDetail = (id, success, fail) => {
  return get(`${extensionDomain}/team/detail/${id}`, {}, success, fail)

}

/**
 * 申请加入社团
 * @param {*} teamId
 * @param {*} reason
 * @param {*} success
 * @param {*} fail
 */
export const requestApplyTeam = (teamId, reason, success, fail) => {
  return post(`${extensionDomain}/team_apply`, { teamId, reason }, success, fail)
}


/**
 * 获取签到详情
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const requestSignDetail = (id, success, fail) => {
  return get(`${extensionDomain}/sign/${id}`, {}, success, fail)
}





/**
 * 活动id
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const requestGpsSign = (id, param, success, fail) => {
  console.log('签到', param);
  return post(`${extensionDomain}/sign/gpsSign/${id}`, param, success, fail)
}


/**
 * 手势签到
 * @param {*} activityId
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
export const requestGestureSign = (activityId, param, success, fail) => {
  return post(`${extensionDomain}/sign/gestureSign/${activityId}`, param, success, fail)
}


/**
 * 密码签到
 * @param {*} activityId
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
export const requestPasswordSign = (activityId, param, success, fail) => {
  return post(`${extensionDomain}/sign/passwordSign/${activityId}`, param, success, fail)
}





/**
 * 二维码签到
 * @param {*} activityId
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
export const requestQrSign = (activityId, param, success, fail) => {
  return post(`${extensionDomain}/sign/passwordSign/${activityId}`, param, success, fail)
}


/**
 * 请求社团列表
 * @param {*} success
 * @param {*} fail
 */
export const requestTeamList = (success, fail) => {
  return get(`${extensionDomain}/team`, {}, success, fail)
}


/**
 * 请求收藏列表
 * @param param
 * @param success
 * @param fail
 */
export const requestFavorite = (param, success, fail) => {
  return post(`${extensionDomain}/favorite/page`, param, success, fail)
}



/**
 * 我的活动列表
 * @param param
 * @param success
 * @param fail
 */
export const requestGetMyActivity = (param, success, fail) => {
  return post(`${extensionDomain}/activity/mini/getMyActivity`, param, success, fail)
}



/**
 * 我的活动列表
 * @param param
 * @param success
 * @param fail
 */
export const requestMyManageActivity = (param, success, fail) => {
  return post(`${extensionDomain}/activity/mini/getMyManagePage`, param, success, fail)
}


/**
 * 获取申报列表
 * @param param
 * @param success
 * @param fail
 */
export const requestGetCustomMyActivity = (param, success, fail) => {
  return post(`${extensionDomain}/activity/custom/getMyActivityList`, param, success, fail)
}

/**
 * 添加申报
 * @param param
 * @param success
 * @param fail
 */
export const requestAddCustom = (param, success, fail) => {
  return post(`${extensionDomain}/activity/custom`, param, success, fail)
}


/**
 * 申报详情
 * @param id
 * @param success
 * @param fail
 */
export const requestActivityCustomDetail = (id, success, fail) => {
  return get(`${extensionDomain}/activity/custom/${id}`, {}, success, fail)
}


/**
 * 请求获取用户的活动列表(个人详情页面)
 * @param userId
 * @param offset
 * @param pageSize
 * @param success
 * @param fail
 */
export const requestUserActivityList = (userId, offset, pageSize, success, fail) => {
  return post(`${extensionDomain}/activity/mini/getUserActivityPage/${userId}`, { offset, pageSize }, success, fail)
}


/*
 * oss文件上传
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const activityFileUpload = (path, successCallback, fail) => {
  ossObject(systemName, path, successCallback, fail)
}
