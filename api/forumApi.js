import { post, get, deleted } from "./request"
import { ossObject } from "./ossApi";
const { bbsDomain } = require("./domain")


/**
 * 获取动态查询
 * @param {*} success
 * @param {*} fail
 */

export const getBbsDynamic = (param, success, fail) => {
  console.log(param);
  return post(`${bbsDomain}/bbsDynamic/mini/listBbsDynamic`, param, success, fail)
}

/**
 * 获取话题查询
 * @param {*} success
 * @param {*} fail
 */
export const getBbsTopic = (param, success, fail) => {
  return post(`${bbsDomain}/bbsTopic/mini/topic`, param, success, fail)
}


/**
 * 获取动态评论查询
 * @param {*} success
 * @param {*} fail
 */
export const getListBbsComment = (param, success, fail) => {
  return post(`${bbsDomain}/bbsComment/listBbsCommentByDynamicId`, param, success, fail)
}


/**
 * 获取动态评论新增查询
 * @param {*} success
 * @param {*} fail
 */
export const getSaveBbsComment = (param, success, fail) => {
  return post(`${bbsDomain}/bbsComment/saveBbsComment`, param, success, fail)
}


/**
 * 获取动态评论删除查询
 * @param {*} success
 * @param {*} fail
 */
export const getRemoveBbsComment = (id, success, fail) => {
  return deleted(`${bbsDomain}/bbsComment/removeBbsComment/${id}`, id, success, fail)
}

/**
 * 请求评论点赞
 * @param param
 * @param success
 * @param fail
 * @returns {*}
 */
export const requestCommentGreat = (param, success, fail) => {
  return post(`${bbsDomain}/bbsCommentGreat/saveOrUpdateBbsDynamicGreat`, param, success, fail)
}

/**
 * 请求用户关注
 * @param id
 * @param success
 * @param fail
 */
export const requestUserAttention = (id, success, fail) => {
  return post(`${bbsDomain}/attention/${id}`, {}, success, fail)
}


/**
 * 获取动态新增查询
 * @param {*} success
 * @param {*} fail
 */
export const getSaveBbsDynamic = (param, success, fail) => {
  return post(`${bbsDomain}/bbsDynamic/saveBbsDynamic`, param, success, fail)
}


/**
 * 获取动态删除查询
 * @param {*} success
 * @param {*} fail
 */
export const getRemoveBbsDynamic = (id, success, fail) => {
  return deleted(`${bbsDomain}/bbsDynamic/removeBbsDynamic/${id}`, id, success, fail)
}


/**
 * 切换点赞状态
 * @param dynamicId 动态id
 * @param success
 * @param fail
 * @returns {*}
 */
export const switchGreat = (dynamicId, success, fail) => {
  return post(`${bbsDomain}/bbsDynamicGreat/saveOrUpdateBbsDynamicGreat`, { dynamicId }, success, fail)
}



/**
 * 切换关注状态
 * @param id
 * @param success
 * @param fail
 * @returns {*}
 */
export const switchAttention = (id, success, fail) => {
  return post(`${bbsDomain}/attention/${id}`, {}, success, fail)
}

/**
 * 切换收藏状态
 * @param id
 * @param success
 * @param fail
 * @returns {*}
 */
export const requestSwitchFavorite = (id, success, fail) => {
  return post(`${bbsDomain}//favorite/${id}`, {}, success, fail)
}




const systemName = "bbs"

/*
 * oss文件上传
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const forumFileUpload = (path, successCallback, fail) => {
  ossObject(systemName, path, successCallback, fail)
}



/**
 * 请求获取我的数据
 */
export const requestUserData = (success, fail) => {
  return get(`${bbsDomain}/home/getUserData`, {}, success, fail)
}
