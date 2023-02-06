import { post } from "./request";
import { newsDomain } from "./domain";


/**
 * 请求获取文章列表
 * @param param
 * @param success
 * @param fail
 * @returns {*}
 */
export const requestNewPage = (param, success, fail) => {
  return post(`${newsDomain}/news/page`, param, success, fail)
}


/**
 * 添加访问量
 * @param id
 * @param success
 * @param fail
 */
export const requestAddNewView = (id, success, fail) => {
  return post(`${newsDomain}/news/addViews/${id}`, {}, success, fail)
}

