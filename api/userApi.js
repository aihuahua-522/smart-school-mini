import { get, post, deleteHttp } from "./request"
import { ossObject } from "./ossApi";
import { miniDomain, systemDomain } from "./domain";
// const { miniDomain,systemDomain } = require("./domain")

/**
 * code 授权码
 */
export const requestLogin = (code, sussess, fail) => {
  return post(`${miniDomain}/user/login`, { code }, sussess, fail)
}


/**
 * 请求获取用户信息
 * @param {*} success
 * @param {*} fail
 */
export const requestUserInfo = (success, fail) => {
  return get(`${miniDomain}/userinfo`, {}, success, fail)
}
/**
 * 通过用户id查询他人用户信息
 * @param userId
 * @param success
 * @param fail
 */
export const requestOtherUserInfoByUserId = (userId, success, fail) => {

  return get(`${miniDomain}/user/info/${userId}`, {}, success, fail)
}

/**
 * 更改用户信息
 * @param {*} success
 * @param {*} fail
 */
export const changeUserInfo = (param, success, fail) => {
  return post(`${miniDomain}/common/user`, param, success, fail)
}


/**
 * 绑定用户
 * @param code 授权码
 * @param userName 账号
 * @param password 密码
 * @param {*} success
 * @param {*} fail
 */
export const requestBindUser = (code, userName, password, success, fail) => {
  return post(`${systemDomain}/user/bind`, { code, userName, password }, success, fail)
}

/**
 * 绑定用户
 * @param code 授权码
 * @param userName 账号
 * @param password 密码
 * @param {*} success
 * @param {*} fail
 */
export const requestUnBindUser = (success, fail) => {
  return deleteHttp(`${systemDomain}/user/unBind`, {}, success, fail)
}

const systemName = "smart-system"

/*
 * oss文件上传
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const logisticsFileUpload = (path, successCallback, fail) => {
  ossObject(systemName, path, successCallback, fail)
}


