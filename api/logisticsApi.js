import { get, post, put } from "./request"
import { ossObject } from "./ossApi";

const { logisticsDomain } = require("./domain")

const systemName = 'logistics'

const roomLevel = 5

/**
 * 宿舍的层级
 * @type {number}
 */
const dormLevel = 3
/**
 * 房间号
 * @param {*} success
 * @param {*} fail
 */
export const requestRoomTree = (success, fail) => {
  return get(`${logisticsDomain}/logistics-dorm/mini/tree/${roomLevel}`, {}, success, fail)
}
/**
 * 查询电量余额
 * @param roomId
 * @param {*} success
 * @param {*} fail
 */
export const getBalance = (roomId, success, fail) => {
  return get(`${logisticsDomain}/logistics_electric/getRemainingElectricity/${roomId}`, {}, success, fail)
}


/**
 * 查询实时功率
 * @param roomId
 * @param {*} success
 * @param {*} fail
 */
export const requestGetPowerByRoomId = (roomId, success, fail) => {
  return get(`${logisticsDomain}/logistics_electric/getPower/${roomId}`, {}, success, fail)
}


/**
 * 查询电量余额
 * @param
 * @param {*} success
 * @param {*} fail
 */
export const getMyDorm = (success, fail) => {
  return get(`${logisticsDomain}/logistics_user_dorm/getMyDorm`, {}, success, fail)
}
/**
 * 查询充电记录
 * @param
 * @param {*} success
 * @param {*} fail
 */
export const getUpEle = (body, success, fail) => {
  return post(`${logisticsDomain}/logistics_electric_pay/list`, body, success, fail)
}

/**
 * 查询违规记录
 * @param {*} success
 * @param {*} fail
 */
export const getViolationsList = (param, success, fail) => {
  return post(`${logisticsDomain}/logistics_electric_record_violations/list`, param, success, fail)
}

/**
 * 获取申请报修
 * @param {*} success
 * @param {*} fail
 */

export const getRepair = (param, success, fail) => {
  return post(`${logisticsDomain}/repair`, param, success, fail)
}
/**
 * 通过房间id获取阿房间详细信息
 * @param id 房间id
 * @param {*} success
 * @param {*} fail
 */

export const getRoomDetailByRoomId = (id, success, fail) => {
  return get(`${logisticsDomain}/logistics-dorm/detail/${id}`, {}, success, fail)
}
/**
 * 签到
 * @param {*} success
 * @param {*} fail
 */

export const sign = (param, success, fail) => {
  return post(`${logisticsDomain}/sign/signIn`, param, success, fail)
}

/**
 * 获取报修列表
 * @param param
 * @param success
 * @param fail
 */
export const requestGetRepairList = (param, success, fail) => {
  return post(`${logisticsDomain}/repair/list/user`, param, success, fail)
}


/**
 * 返回到楼栋的树形结构 签到和打分使用
 * @param success
 * @param fail
 */
export const requestGetDormTree = (success, fail) => {
  return get(`${logisticsDomain}/logistics-dorm/mini/tree/${dormLevel}`, {}, success, fail)
}


/**
 * 根据日期请求获取当天评分列表
 * @param param
 * @param success
 * @param fail
 */
export const requestScoreListByDate = (param, success, fail) => {
  return post(`${logisticsDomain}/logistics_question_record/getScoreListByDate`, param, success, fail)
}


/**
 * 请求获取我的宿舍的评分信息
 * @param param
 * @param success
 * @param fail
 */
export const requestMyDormScore = (param, success, fail) => {
  //http://smart-api.jxwazx.cn/logistics/logistics_question_record/getScoreList
  return post(`${logisticsDomain}/logistics_question_record/getScoreList`, param, success, fail)
}

/**
 * 请求提交评分
 * @param param
 * @param success
 * @param fail
 */
export const requestSubmitScore = (param, success, fail) => {
  return post(`${logisticsDomain}/logistics_question_record/submitQuestion`, param, success, fail)
}

/**
 * 获取我的签到列表
 * @param param
 * @param success
 * @param fail
 */
export const requestMySignList = (param, success, fail) => {
  return post(`${logisticsDomain}/sign/mySignList`, param, success, fail)
}


/**
 * 请求获取签到详情
 * @param id
 * @param success
 * @param fail
 */
export const requestSignDetail = (id, success, fail) => {
  return get(`${logisticsDomain}/sign/${id}`, {}, success, fail)
}

/**
 * 获取我居住的宿舍信息
 * @param success
 * @param fail
 */
export const requestMyDormInfo = (success, fail) => {
  return get(`${logisticsDomain}/logistics-dorm/getMyDormInfo`, {}, success, fail)
}

/**
 * 请求已提交问卷详情
 * @param id
 * @param success
 * @param fail
 */
export const requestQuestionDetail = (id, success, fail) => {
  return get(`${logisticsDomain}/logistics_question_record/${id}`, {}, success, fail)
}

/**
 * 请求最新问卷
 * @param success
 * @param fail
 */
export const requestQuestion = (success, fail) => {
  return get(`${logisticsDomain}/logistics_question/getQuestion`, {}, success, fail)
}

/**
 * 请求提交表单
 * @param param
 * @param success
 * @param fail
 */
export const requestSubmitQuestion = (param, success, fail) => {
  return post(`${logisticsDomain}/logistics_question_record/submitQuestion`, param, success, fail)

}


/**
 * 请求获取在指定日期的签到列表
 * @param param
 * @param success
 * @param fail
 */
export const requestAdminSignList = (param, success, fail) => {
  return post(`${logisticsDomain}/sign/detailByDormId`, param, success, fail)
}

/**
 * 根据房间id查询签到纪录
 * @param roomId 房间id
 * @param param
 * @param success
 * @param fail
 */
export const requestDormSignDetail = (roomId, param, success, fail) => {
  return post(`${logisticsDomain}/sign/monitorDetail/${roomId}`, param, success, fail)
}
/**
 * 请求维修师傅的工单
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
export const requestStaffRepairList = (param, success, fail) => {
  return post(`${logisticsDomain}/repair/list/staff`, param, success, fail)
}


/**
 * 确认上门时间
 * @param param
 * @param success
 * @param fail
 */
export const requestTaskOrder = (param, success, fail) => {
  return put(`${logisticsDomain}/repair/staff/take_orders`, param, success, fail)
}

/**
 * 完成工单
 * @param param
 * @param success
 * @param fail
 */
export const requestOrderOver = (param, success, fail) => {
  return put(`${logisticsDomain}/repair/staff/takeOrdersOver`, param, success, fail)
}

/**
 * 提交评论
 * @param param
 * @param success
 * @param fail
 */
export const requestSubmitComments = (param, success, fail) => {
  return post(`${logisticsDomain}/repair/comments`, param, success, fail)
}



/**
 * 获取近七天用电量
 * @param param
 * @param success
 * @param fail
 */
export const requestElectricPayList = (param, success, fail) => {
  return post(`${logisticsDomain}/logistics_electric_record/miniList`, param, success, fail)
}


/**
 * 提交充值
 * @param param
 * @param success
 * @param fail
 */
export const requestCreatePay = (roomId, money, success, fail) => {
  return post(`${logisticsDomain}/logistics_electric_pay/miniCreatePay`, { money, roomId }, success, fail)
}

/*
 * oss文件上传
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const logisticsFileUpload = (path, successCallback, fail) => {
  console.log('path', path);
  ossObject(systemName, path, successCallback, fail)
}
